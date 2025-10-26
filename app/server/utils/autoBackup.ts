import fs from "fs";
import path from "path";
import db from "./databaseAdapter";

// Sistema de backup automático
export class AutoBackup {
  private static instance: AutoBackup;
  private backupInterval: NodeJS.Timeout | null = null;
  private readonly BACKUP_INTERVAL = 24 * 60 * 60 * 1000; // 24 horas
  private readonly MAX_BACKUPS_PER_USER = 7; // Manter 7 backups por usuário

  private constructor() {}

  public static getInstance(): AutoBackup {
    if (!AutoBackup.instance) {
      AutoBackup.instance = new AutoBackup();
    }
    return AutoBackup.instance;
  }

  public start(): void {
    if (this.backupInterval) {
      return;
    }

    // Executar backup imediatamente
    this.performBackup();

    // Agendar backups periódicos
    this.backupInterval = setInterval(() => {
      this.performBackup();
    }, this.BACKUP_INTERVAL);
  }

  public stop(): void {
    if (this.backupInterval) {
      clearInterval(this.backupInterval);
      this.backupInterval = null;
    }
  }

  private async performBackup(): Promise<void> {
    try {
      // Buscar todos os usuários ativos
      const users = db
        .prepare("SELECT id, username FROM users ORDER BY created_at DESC")
        .all() as any[];

      if (users.length === 0) {
        return;
      }

      let totalBackups = 0;
      let totalErrors = 0;

      for (const user of users) {
        try {
          await this.backupUserData(user.id, user.username);
          totalBackups++;
        } catch (error) {
          console.error(
            `Erro ao fazer backup do usuário ${user.username}:`,
            error
          );
          totalErrors++;
        }
      }

      // Limpar backups antigos
      this.cleanupOldBackups();
    } catch (error) {
      console.error("Erro geral no backup:", error);
    }
  }

  private async backupUserData(
    userId: number,
    username: string
  ): Promise<void> {
    // Buscar todos os dados do usuário
    const userData = {
      user: db.prepare("SELECT * FROM users WHERE id = ?").get(userId),
      characters: db
        .prepare("SELECT * FROM characters WHERE user_id = ?")
        .all(userId),
      resources: db
        .prepare(
          "SELECT * FROM resources WHERE character_id IN (SELECT id FROM characters WHERE user_id = ?)"
        )
        .all(userId),
      skills: db
        .prepare(
          "SELECT * FROM skills WHERE character_id IN (SELECT id FROM characters WHERE user_id = ?)"
        )
        .all(userId),
      equipment: db
        .prepare(
          "SELECT * FROM equipment WHERE character_id IN (SELECT id FROM characters WHERE user_id = ?)"
        )
        .all(userId),
      items: db
        .prepare(
          "SELECT * FROM items WHERE character_id IN (SELECT id FROM characters WHERE user_id = ?)"
        )
        .all(userId),
      upgrades: db
        .prepare(
          "SELECT * FROM upgrades WHERE character_id IN (SELECT id FROM characters WHERE user_id = ?)"
        )
        .all(userId),
      battles: db
        .prepare(
          "SELECT * FROM battles WHERE character_id IN (SELECT id FROM characters WHERE user_id = ?)"
        )
        .all(userId),
      story_progress: db
        .prepare(
          "SELECT * FROM story_progress WHERE character_id IN (SELECT id FROM characters WHERE user_id = ?)"
        )
        .all(userId),
    };

    // Criar diretório de backup se não existir
    const backupDir = path.join(process.cwd(), "backups");
    if (!fs.existsSync(backupDir)) {
      fs.mkdirSync(backupDir, { recursive: true });
    }

    // Gerar nome do arquivo de backup
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    const backupFileName = `user-${userId}-backup-${timestamp}.json`;
    const backupFilePath = path.join(backupDir, backupFileName);

    // Salvar backup
    fs.writeFileSync(backupFilePath, JSON.stringify(userData, null, 2));
  }

  private cleanupOldBackups(): void {
    try {
      const backupDir = path.join(process.cwd(), "backups");
      if (!fs.existsSync(backupDir)) {
        return;
      }

      // Agrupar backups por usuário
      const backupFiles = fs
        .readdirSync(backupDir)
        .filter((file) => file.endsWith(".json") && file.includes("-backup-"))
        .map((file) => {
          const filePath = path.join(backupDir, file);
          const stats = fs.statSync(filePath);
          return {
            fileName: file,
            filePath,
            createdAt: stats.birthtime,
            userId: this.extractUserIdFromFileName(file),
          };
        });

      // Agrupar por usuário
      const backupsByUser: { [userId: string]: any[] } = {};
      backupFiles.forEach((backup) => {
        if (!backupsByUser[backup.userId]) {
          backupsByUser[backup.userId] = [];
        }
        backupsByUser[backup.userId].push(backup);
      });

      // Limpar backups antigos para cada usuário
      Object.keys(backupsByUser).forEach((userId) => {
        const userBackups = backupsByUser[userId].sort(
          (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
        );

        if (userBackups.length > this.MAX_BACKUPS_PER_USER) {
          const backupsToDelete = userBackups.slice(this.MAX_BACKUPS_PER_USER);
          backupsToDelete.forEach((backup) => {
            try {
              fs.unlinkSync(backup.filePath);
            } catch (error) {}
          });
        }
      });
    } catch (error) {
      console.error("Erro ao limpar backups antigos:", error);
    }
  }

  private extractUserIdFromFileName(fileName: string): string {
    const match = fileName.match(/user-(\d+)-backup-/);
    return match ? match[1] : "unknown";
  }

  // Método para forçar backup manual
  public async forceBackup(): Promise<void> {
    await this.performBackup();
  }
}

// Inicializar backup automático quando o módulo for carregado
const autoBackup = AutoBackup.getInstance();
autoBackup.start();

export default autoBackup;

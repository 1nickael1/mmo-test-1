#!/usr/bin/env node

/**
 * Script para atualizar a versão da aplicação
 * Uso: node scripts/update-version.js [major|minor|patch] [mensagem]
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Caminhos dos arquivos
const VERSION_FILE = path.join(__dirname, "../app/server/api/version.get.ts");
const PACKAGE_FILE = path.join(__dirname, "../package.json");

// Função para ler a versão atual
function getCurrentVersion() {
  try {
    const content = fs.readFileSync(VERSION_FILE, "utf8");
    const match = content.match(/const currentVersion = "([^"]+)"/);
    return match ? match[1] : "1.0.0";
  } catch (error) {
    console.error("Erro ao ler versão atual:", error);
    return "1.0.0";
  }
}

// Função para incrementar versão
function incrementVersion(version, type) {
  const [major, minor, patch] = version.split(".").map(Number);

  switch (type) {
    case "major":
      return `${major + 1}.0.0`;
    case "minor":
      return `${major}.${minor + 1}.0`;
    case "patch":
      return `${major}.${minor}.${patch + 1}`;
    default:
      return `${major}.${minor}.${patch + 1}`;
  }
}

// Função para atualizar o arquivo de versão
function updateVersionFile(newVersion, message) {
  try {
    let content = fs.readFileSync(VERSION_FILE, "utf8");

    // Atualizar versão
    content = content.replace(
      /const currentVersion = "[^"]+"/,
      `const currentVersion = "${newVersion}"`
    );

    // Atualizar data
    const now = new Date().toISOString();
    content = content.replace(
      /const lastUpdate = "[^"]+"/,
      `const lastUpdate = "${now}"`
    );

    // Adicionar nova entrada no changelog (manual)
    const changelogEntry = {
      version: newVersion,
      date: now,
      changes: message ? [message] : [`Atualização para versão ${newVersion}`],
    };

    // Adicionar entrada no início do changelog
    const changelogStart = content.indexOf("const changelog = [");
    const changelogEnd = content.indexOf("];", changelogStart);

    if (changelogStart !== -1 && changelogEnd !== -1) {
      const beforeChangelog = content.substring(0, changelogStart + 19);
      const afterChangelog = content.substring(changelogEnd);

      const newEntry = `    {
      version: "${newVersion}",
      date: "${now}",
      changes: [
        "${message || `Atualização para versão ${newVersion}`}"
      ],
      breaking_changes: []
    },
`;

      content =
        beforeChangelog +
        newEntry +
        content.substring(changelogStart + 19, changelogEnd) +
        afterChangelog;
    }

    fs.writeFileSync(VERSION_FILE, content);
    console.log(`✅ Versão atualizada para ${newVersion}`);
    return true;
  } catch (error) {
    console.error("Erro ao atualizar arquivo de versão:", error);
    return false;
  }
}

// Função para atualizar package.json
function updatePackageJson(newVersion) {
  try {
    const packagePath = PACKAGE_FILE;
    const packageContent = JSON.parse(fs.readFileSync(packagePath, "utf8"));

    packageContent.version = newVersion;

    fs.writeFileSync(
      packagePath,
      JSON.stringify(packageContent, null, 2) + "\n"
    );
    console.log(`✅ package.json atualizado para versão ${newVersion}`);
    return true;
  } catch (error) {
    console.error("Erro ao atualizar package.json:", error);
    return false;
  }
}

// Função principal
function main() {
  const args = process.argv.slice(2);
  const type = args[0] || "patch";
  const message = args[1] || "";

  if (!["major", "minor", "patch"].includes(type)) {
    console.error("❌ Tipo de versão inválido. Use: major, minor ou patch");
    process.exit(1);
  }

  const currentVersion = getCurrentVersion();
  const newVersion = incrementVersion(currentVersion, type);

  console.log(`🔄 Atualizando versão de ${currentVersion} para ${newVersion}`);

  if (updateVersionFile(newVersion, message) && updatePackageJson(newVersion)) {
    console.log(`🎉 Versão ${newVersion} atualizada com sucesso!`);
    console.log(
      `📝 Mensagem: ${message || `Atualização para versão ${newVersion}`}`
    );
  } else {
    console.error("❌ Erro ao atualizar versão");
    process.exit(1);
  }
}

// Executar se chamado diretamente
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

export {
  getCurrentVersion,
  incrementVersion,
  updatePackageJson,
  updateVersionFile,
};

// Script para corrigir tipos de equipamento
const sqlite3 = require("better-sqlite3");
const path = require("path");

const db = new sqlite3(path.join(__dirname, "db.sqlite"));

console.log("🔧 Corrigindo tipos de equipamento...");

// Buscar todos os equipamentos
const equipment = db.prepare("SELECT * FROM equipment").all();

let fixedCount = 0;

for (const item of equipment) {
  let correctType = "accessory";

  // Determinar o tipo correto baseado no nome
  if (
    item.equipment_name.includes("Katana") ||
    item.equipment_name.includes("Shuriken") ||
    item.equipment_name.includes("Kusarigama") ||
    item.equipment_name.includes("Nunchaku") ||
    item.equipment_name.includes("Espada") ||
    item.equipment_name.includes("Machado") ||
    item.equipment_name.includes("Arco") ||
    item.equipment_name.includes("Cajado") ||
    item.equipment_name.includes("Rifle") ||
    item.equipment_name.includes("Pistola") ||
    item.equipment_name.includes("Sabre") ||
    item.equipment_name.includes("Lança") ||
    item.equipment_name.includes("Martelo")
  ) {
    correctType = "weapon";
  } else if (item.equipment_name.includes("Armadura")) {
    correctType = "armor";
  }

  // Atualizar se o tipo estiver incorreto
  if (item.equipment_type !== correctType) {
    console.log(
      `📝 Corrigindo: ${item.equipment_name} (${item.equipment_type} → ${correctType})`
    );
    db.prepare("UPDATE equipment SET equipment_type = ? WHERE id = ?").run(
      correctType,
      item.id
    );
    fixedCount++;
  }
}

console.log(`✅ ${fixedCount} equipamentos corrigidos com sucesso!`);

// Mostrar equipamentos por tipo
const weaponCount = db
  .prepare(
    "SELECT COUNT(*) as count FROM equipment WHERE equipment_type = 'weapon'"
  )
  .get().count;
const armorCount = db
  .prepare(
    "SELECT COUNT(*) as count FROM equipment WHERE equipment_type = 'armor'"
  )
  .get().count;
const accessoryCount = db
  .prepare(
    "SELECT COUNT(*) as count FROM equipment WHERE equipment_type = 'accessory'"
  )
  .get().count;

console.log("\n📊 Estatísticas:");
console.log(`⚔️  Armas: ${weaponCount}`);
console.log(`🛡️  Armaduras: ${armorCount}`);
console.log(`💍 Acessórios: ${accessoryCount}`);

db.close();

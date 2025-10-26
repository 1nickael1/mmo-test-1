#!/usr/bin/env node

import fs from 'fs';
import path from 'path';

// Função para processar um arquivo
function processFile(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;

    // Padrão 1: db.prepare().get() -> await db.prepare().get()
    const pattern1 = /(\s+)(const\s+\w+\s*=\s*db\s*\.prepare\([^)]+\)\s*\.get\([^)]+\))/g;
    if (pattern1.test(content)) {
      content = content.replace(pattern1, (match, indent, query) => {
        modified = true;
        return `${indent}const db = getDatabase();\n${indent}const query = await db.prepare(${query.match(/prepare\(([^)]+)\)/)[1]});\n${indent}const result = await query.get(${query.match(/get\(([^)]+)\)/)[1]});`;
      });
    }

    // Padrão 2: db.prepare().all() -> await db.prepare().all()
    const pattern2 = /(\s+)(const\s+\w+\s*=\s*db\s*\.prepare\([^)]+\)\s*\.all\([^)]*\))/g;
    if (pattern2.test(content)) {
      content = content.replace(pattern2, (match, indent, query) => {
        modified = true;
        return `${indent}const db = getDatabase();\n${indent}const query = await db.prepare(${query.match(/prepare\(([^)]+)\)/)[1]});\n${indent}const result = await query.all(${query.match(/all\(([^)]*)\)/)[1]});`;
      });
    }

    // Padrão 3: db.prepare().run() -> await db.prepare().run()
    const pattern3 = /(\s+)(const\s+\w+\s*=\s*db\s*\.prepare\([^)]+\)\s*\.run\([^)]*\))/g;
    if (pattern3.test(content)) {
      content = content.replace(pattern3, (match, indent, query) => {
        modified = true;
        return `${indent}const db = getDatabase();\n${indent}const query = await db.prepare(${query.match(/prepare\(([^)]+)\)/)[1]});\n${indent}const result = await query.run(${query.match(/run\(([^)]*)\)/)[1]});`;
      });
    }

    // Padrão 4: db.exec() -> await db.exec()
    const pattern4 = /(\s+)(db\s*\.exec\([^)]+\))/g;
    if (pattern4.test(content)) {
      content = content.replace(pattern4, (match, indent, query) => {
        modified = true;
        return `${indent}const db = getDatabase();\n${indent}await db.exec(${query.match(/exec\(([^)]+)\)/)[1]});`;
      });
    }

    if (modified) {
      fs.writeFileSync(filePath, content);
      console.log(`✅ Atualizado: ${filePath}`);
    }
  } catch (error) {
    console.error(`❌ Erro ao processar ${filePath}:`, error.message);
  }
}

// Função para processar diretório recursivamente
function processDirectory(dirPath) {
  const items = fs.readdirSync(dirPath);
  
  for (const item of items) {
    const fullPath = path.join(dirPath, item);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      processDirectory(fullPath);
    } else if (item.endsWith('.ts')) {
      processFile(fullPath);
    }
  }
}

// Processar todos os arquivos API
console.log('🔄 Atualizando arquivos para usar getDatabase()...');
processDirectory('./app/server/api');
processDirectory('./app/server/utils');
console.log('✅ Atualização concluída!');

-- Schema PostgreSQL para MMO RPG Project
-- Execute este script no Supabase SQL Editor

-- Users table
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  username VARCHAR(100) UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Characters table
CREATE TABLE IF NOT EXISTS characters (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  name VARCHAR(100) NOT NULL,
  class VARCHAR(50) NOT NULL,
  level INTEGER DEFAULT 1,
  xp INTEGER DEFAULT 0,
  health INTEGER DEFAULT 100,
  max_health INTEGER DEFAULT 100,
  mana INTEGER DEFAULT 50,
  max_mana INTEGER DEFAULT 50,
  attack INTEGER DEFAULT 10,
  defense INTEGER DEFAULT 5,
  speed INTEGER DEFAULT 8,
  gold INTEGER DEFAULT 100,
  materials INTEGER DEFAULT 0,
  crystals INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Skills table
CREATE TABLE IF NOT EXISTS skills (
  id SERIAL PRIMARY KEY,
  character_id INTEGER NOT NULL REFERENCES characters(id) ON DELETE CASCADE,
  skill_name VARCHAR(100) NOT NULL,
  level INTEGER DEFAULT 1,
  last_used TIMESTAMP,
  UNIQUE(character_id, skill_name)
);

-- Equipment table
CREATE TABLE IF NOT EXISTS equipment (
  id SERIAL PRIMARY KEY,
  character_id INTEGER NOT NULL REFERENCES characters(id) ON DELETE CASCADE,
  equipment_name VARCHAR(100) NOT NULL,
  equipment_type VARCHAR(50) NOT NULL,
  equipped BOOLEAN DEFAULT FALSE,
  stats_json TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Upgrades table
CREATE TABLE IF NOT EXISTS upgrades (
  id SERIAL PRIMARY KEY,
  character_id INTEGER NOT NULL REFERENCES characters(id) ON DELETE CASCADE,
  upgrade_type VARCHAR(50) NOT NULL,
  level INTEGER DEFAULT 0,
  max_level INTEGER DEFAULT 10,
  cost_gold INTEGER DEFAULT 0,
  cost_materials INTEGER DEFAULT 0,
  cost_crystals INTEGER DEFAULT 0,
  upgrade_time INTEGER DEFAULT 0,
  started_at TIMESTAMP,
  completed_at TIMESTAMP,
  UNIQUE(character_id, upgrade_type)
);

-- Story progress table
CREATE TABLE IF NOT EXISTS story_progress (
  id SERIAL PRIMARY KEY,
  character_id INTEGER NOT NULL REFERENCES characters(id) ON DELETE CASCADE,
  chapter INTEGER NOT NULL,
  completed BOOLEAN DEFAULT FALSE,
  completed_at TIMESTAMP,
  UNIQUE(character_id, chapter)
);

-- Missions table
CREATE TABLE IF NOT EXISTS missions (
  id SERIAL PRIMARY KEY,
  character_id INTEGER NOT NULL REFERENCES characters(id) ON DELETE CASCADE,
  mission_name VARCHAR(100) NOT NULL,
  description TEXT,
  reward_gold INTEGER DEFAULT 0,
  reward_xp INTEGER DEFAULT 0,
  reward_materials INTEGER DEFAULT 0,
  completed BOOLEAN DEFAULT FALSE,
  completed_at TIMESTAMP
);

-- Battle logs table
CREATE TABLE IF NOT EXISTS battle_logs (
  id SERIAL PRIMARY KEY,
  character_id INTEGER NOT NULL REFERENCES characters(id) ON DELETE CASCADE,
  opponent_name VARCHAR(100) NOT NULL,
  result VARCHAR(20) NOT NULL,
  damage_dealt INTEGER DEFAULT 0,
  damage_received INTEGER DEFAULT 0,
  gold_earned INTEGER DEFAULT 0,
  xp_earned INTEGER DEFAULT 0,
  battle_duration INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Índices para performance
CREATE INDEX IF NOT EXISTS idx_characters_user_id ON characters(user_id);
CREATE INDEX IF NOT EXISTS idx_skills_character_id ON skills(character_id);
CREATE INDEX IF NOT EXISTS idx_equipment_character_id ON equipment(character_id);
CREATE INDEX IF NOT EXISTS idx_upgrades_character_id ON upgrades(character_id);
CREATE INDEX IF NOT EXISTS idx_story_progress_character_id ON story_progress(character_id);
CREATE INDEX IF NOT EXISTS idx_missions_character_id ON missions(character_id);
CREATE INDEX IF NOT EXISTS idx_battle_logs_character_id ON battle_logs(character_id);

-- Função para atualizar updated_at automaticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers para updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_characters_updated_at BEFORE UPDATE ON characters
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Inserir dados de seed (opcional)
-- Descomente as linhas abaixo se quiser dados de exemplo

-- INSERT INTO users (email, password_hash, username) VALUES 
-- ('admin@example.com', '$2a$10$example_hash', 'admin'),
-- ('test@example.com', '$2a$10$example_hash', 'testuser');

-- INSERT INTO characters (user_id, name, class, level, xp) VALUES
-- (1, 'Admin Character', 'ninja', 1, 0),
-- (2, 'Test Character', 'guerreiro_espacial', 1, 0);

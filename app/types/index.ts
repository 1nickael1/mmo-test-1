export interface User {
  id: number;
  email: string;
  username: string;
  created_at: string;
  updated_at: string;
}

export interface Character {
  id: number;
  user_id: number;
  name: string;
  class:
    | "ninja"
    | "guerreiro_espacial"
    | "mago_elemental"
    | "arqueiro_elfo"
    | "paladino_sagrado"
    | "ladrao_sombrio";
  level: number;
  xp: number;
  stats: CharacterStats;
  stats_json?: string;
  created_at: string;
  updated_at: string;
}

export interface CharacterStats {
  strength: number;
  agility: number;
  defense: number;
  health: number;
  max_health: number;
}

export interface Skill {
  id: number;
  character_id: number;
  skill_name: string;
  level: number;
  unlocked: boolean;
  cooldown_seconds?: number;
  last_used?: string;
  damage?: number;
  description?: string;
  created_at: string;
}

export interface Resource {
  id: number;
  character_id: number;
  resource_type: "ouro" | "cristais" | "materiais";
  amount: number;
  updated_at: string;
}

export interface Battle {
  id: number;
  character_id: number;
  opponent_type: string;
  opponent_level: number;
  outcome: "victory" | "defeat";
  xp_gained: number;
  rewards: BattleRewards;
  battle_date: string;
}

export interface BattleRewards {
  xp: number;
  gold: number;
  items?: string[];
  materials?: number;
  crystals?: number;
}

export interface Item {
  id: number;
  character_id: number;
  item_name: string;
  item_type: "weapon" | "armor" | "consumable" | "potion";
  quantity: number;
  stats?: ItemStats;
  description?: string;
  effect?: string;
  cooldown?: number;
  created_at: string;
}

export interface Equipment {
  id: number;
  character_id: number;
  equipment_name: string;
  equipment_type: "weapon" | "armor" | "accessory";
  equipped: boolean;
  stats: EquipmentStats;
  created_at: string;
}

export interface EquipmentStats {
  strength?: number;
  agility?: number;
  defense?: number;
  health?: number;
  max_health?: number;
  damage?: number;
  stealth?: number;
  radiation_resistance?: number;
  energy_shield?: number;
  mobility?: number;
  intelligence?: number;
  magic_power?: number;
  accuracy?: number;
  nature_resistance?: number;
  magic_damage?: number;
  holy_damage?: number;
  holy_resistance?: number;
  holy_protection?: number;
  holy_power?: number;
}

export interface StoryChapter {
  id: number;
  chapter: number;
  title: string;
  description: string;
  story_text: string;
  npc: NPC;
  rewards: {
    xp: number;
    gold: number;
    items?: string[];
    equipment?: string;
  };
  level_required: number;
  can_play?: boolean;
  is_completed?: boolean;
  is_locked?: boolean;
}

export interface StoryProgress {
  id: number;
  character_id: number;
  chapter: number;
  completed: boolean;
  completed_at?: string;
  created_at: string;
}

export interface ShopItem {
  id: string;
  name: string;
  type: "potion" | "equipment";
  price: number;
  level_required: number;
  stats?: EquipmentStats;
  description: string;
  category: string;
  can_buy?: boolean;
}

export interface ActiveBattle {
  id: number;
  character_id: number;
  battle_type: "normal" | "story";
  opponent_data: NPC;
  character_health: number;
  opponent_health: number;
  battle_turn: number;
  battle_data?: any;
  created_at: string;
  updated_at: string;
}

export interface ItemStats {
  damage?: number;
  defense?: number;
  health_bonus?: number;
}

export interface Upgrade {
  id: number | string;
  character_id: number;
  upgrade_type: "building" | "stat" | "skill" | "class_specific";
  upgrade_name: string;
  name?: string;
  type?: string;
  description?: string;
  level: number;
  max_level?: number;
  current_level?: number;
  current_cost?: UpgradeCost;
  can_afford?: boolean;
  can_upgrade?: boolean;
  time_seconds?: number;
  time_remaining?: number;
  is_in_progress?: boolean;
  cost: UpgradeCost;
  is_completed: boolean;
  started_at?: string;
  completed_at?: string;
  created_at: string;
}

export interface UpgradeCost {
  gold: number;
  materials?: number;
  crystals?: number;
  time_seconds?: number;
}

export interface NPC {
  id: string;
  name: string;
  level: number;
  stats: CharacterStats;
  xp_reward: number;
  gold_reward: number;
  difficulty: "easy" | "medium" | "hard";
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  username: string;
}

export interface CreateCharacterRequest {
  name: string;
  class:
    | "ninja"
    | "guerreiro_espacial"
    | "mago_elemental"
    | "arqueiro_elfo"
    | "paladino_sagrado"
    | "ladrao_sombrio";
}

export interface BattleRequest {
  character_id: number;
  opponent_id: string;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface JWTPayload {
  id: number;
  username: string;
  email: string;
  role?: string;
  version?: string;
}

export interface AdminUser {
  id: number;
  username: string;
  password_hash: string;
  role: string;
  created_at: string;
  updated_at: string;
}

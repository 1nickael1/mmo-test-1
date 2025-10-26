import { f as defineStore } from './server.mjs';
import { ref, readonly } from 'vue';
import { u as useCookie } from './cookie-b4_mmrzk.mjs';

const useCharacterStore = defineStore("character", () => {
  const currentCharacter = ref(null);
  const characters = ref([]);
  const loading = ref(false);
  const getAuthHeaders = () => {
    const token = useCookie("@mmo/ninja/token");
    if (!token.value) {
      throw new Error("Usu\xE1rio n\xE3o autenticado");
    }
    return {
      Authorization: `Bearer ${token.value}`
    };
  };
  const getBaseStats = (characterClass) => {
    if (characterClass === "ninja") {
      return {
        strength: 8,
        agility: 12,
        defense: 6,
        health: 80,
        max_health: 80
      };
    } else {
      return {
        strength: 12,
        agility: 6,
        defense: 10,
        health: 100,
        max_health: 100
      };
    }
  };
  const getXpForLevel = (level) => {
    if (level <= 10) {
      return 1e3 + (level - 1) * 500;
    } else if (level <= 20) {
      return Math.floor(5500 + Math.pow(level - 10, 1.8) * 1e3);
    } else if (level <= 30) {
      return Math.floor(15e3 + Math.pow(level - 20, 2.2) * 2e3);
    } else if (level <= 40) {
      return Math.floor(5e4 + Math.pow(level - 30, 2.5) * 5e3);
    } else {
      return Math.floor(15e4 + Math.pow(level - 40, 3) * 1e4);
    }
  };
  const canLevelUp = (character) => {
    const xpNeeded = getXpForLevel(character.level);
    return character.xp >= xpNeeded;
  };
  const levelUp = (character) => {
    const newLevel = character.level + 1;
    const newStats = { ...character.stats };
    newStats.strength += 1;
    newStats.agility += 1;
    newStats.defense += 1;
    newStats.health += 10;
    newStats.max_health += 10;
    return {
      ...character,
      level: newLevel,
      stats: newStats,
      updated_at: (/* @__PURE__ */ new Date()).toISOString()
    };
  };
  const addXp = async (characterId, xpAmount) => {
    loading.value = true;
    try {
      const { data } = await $fetch(`/api/characters/${characterId}/add-xp`, {
        method: "POST",
        headers: getAuthHeaders(),
        body: { xp: xpAmount }
      });
      if (data) {
        currentCharacter.value = data;
        const index = characters.value.findIndex((c) => c.id === characterId);
        if (index !== -1) {
          characters.value[index] = data;
        }
      }
    } catch (error) {
    } finally {
      loading.value = false;
    }
  };
  const loadCharacters = async () => {
    loading.value = true;
    try {
      const { data } = await $fetch("/api/characters", {
        headers: getAuthHeaders()
      });
      characters.value = data || [];
      if (currentCharacter.value) {
        const updatedCharacter = data == null ? void 0 : data.find(
          (c) => {
            var _a;
            return c.id === ((_a = currentCharacter.value) == null ? void 0 : _a.id);
          }
        );
        if (updatedCharacter) {
          currentCharacter.value = updatedCharacter;
        }
      } else if (false) ;
    } catch (error) {
      console.error("Store: Erro ao carregar personagens:", error);
    } finally {
      loading.value = false;
    }
  };
  const selectCharacter = (character) => {
    currentCharacter.value = character;
  };
  const ensureCharacterSelected = async () => {
    if (!currentCharacter.value) {
      await loadCharacters();
      if (characters.value.length > 0) {
        currentCharacter.value = characters.value[0];
      }
    }
  };
  const createCharacter = async (characterData) => {
    loading.value = true;
    try {
      const { data } = await $fetch("/api/characters", {
        method: "POST",
        headers: getAuthHeaders(),
        body: characterData
      });
      if (data) {
        characters.value.push(data);
        currentCharacter.value = data;
        if (false) ;
        return data;
      }
    } catch (error) {
      throw error;
    } finally {
      loading.value = false;
    }
  };
  return {
    currentCharacter,
    characters: readonly(characters),
    loading: readonly(loading),
    getAuthHeaders,
    getBaseStats,
    getXpForLevel,
    canLevelUp,
    levelUp,
    addXp,
    loadCharacters,
    selectCharacter,
    createCharacter,
    ensureCharacterSelected
  };
});

export { useCharacterStore as u };
//# sourceMappingURL=character-BOYLEA6w.mjs.map

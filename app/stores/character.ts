import { defineStore } from "pinia";
import type { Character, CharacterStats } from "~/types";

export const useCharacterStore = defineStore("character", () => {
  const currentCharacter = ref<Character | null>(null);
  const characters = ref<Character[]>([]);
  const loading = ref(false);

  const getAuthHeaders = () => {
    const token = useCookie("@mmo/ninja/token");
    if (!token.value) {
      throw new Error("Usuário não autenticado");
    }
    return {
      Authorization: `Bearer ${token.value}`,
    };
  };

  // Inicializar stats base por classe
  const getBaseStats = (
    characterClass: "ninja" | "guerreiro_espacial"
  ): CharacterStats => {
    if (characterClass === "ninja") {
      return {
        strength: 8,
        agility: 12,
        defense: 6,
        health: 80,
        max_health: 80,
      };
    } else {
      return {
        strength: 12,
        agility: 6,
        defense: 10,
        health: 100,
        max_health: 100,
      };
    }
  };

  // Calcular XP necessário para próximo nível (curva balanceada até nível 50)
  const getXpForLevel = (level: number): number => {
    if (level <= 10) {
      // Níveis 1-10: crescimento linear suave
      return 1000 + (level - 1) * 500;
    } else if (level <= 20) {
      // Níveis 11-20: crescimento exponencial moderado
      return Math.floor(5500 + Math.pow(level - 10, 1.8) * 1000);
    } else if (level <= 30) {
      // Níveis 21-30: crescimento exponencial mais acentuado
      return Math.floor(15000 + Math.pow(level - 20, 2.2) * 2000);
    } else if (level <= 40) {
      // Níveis 31-40: crescimento exponencial forte
      return Math.floor(50000 + Math.pow(level - 30, 2.5) * 5000);
    } else {
      // Níveis 41-50: crescimento exponencial muito forte
      return Math.floor(150000 + Math.pow(level - 40, 3) * 10000);
    }
  };

  // Verificar se pode subir de nível
  const canLevelUp = (character: Character): boolean => {
    const xpNeeded = getXpForLevel(character.level);
    return character.xp >= xpNeeded;
  };

  // Subir de nível
  const levelUp = (character: Character): Character => {
    const newLevel = character.level + 1;
    const newStats = { ...character.stats };

    // Aumentar stats por nível
    newStats.strength += 1;
    newStats.agility += 1;
    newStats.defense += 1;
    newStats.health += 10;
    newStats.max_health += 10;

    return {
      ...character,
      level: newLevel,
      stats: newStats,
      updated_at: new Date().toISOString(),
    };
  };

  // Adicionar XP e verificar level up
  const addXp = async (characterId: number, xpAmount: number) => {
    loading.value = true;

    try {
      const { data } = await $fetch(`/api/characters/${characterId}/add-xp`, {
        method: "POST",
        headers: getAuthHeaders(),
        body: { xp: xpAmount },
      });

      if (data) {
        currentCharacter.value = data;
        // Atualizar na lista também
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

  // Carregar personagens do usuário
  const loadCharacters = async () => {
    loading.value = true;

    try {
      const { data } = await $fetch("/api/characters", {
        headers: getAuthHeaders(),
      });
      characters.value = data || [];

      // Se há um personagem atual, atualizar com os dados mais recentes
      if (currentCharacter.value) {
        const updatedCharacter = data?.find(
          (c: Character) => c.id === currentCharacter.value?.id
        );
        if (updatedCharacter) {
          currentCharacter.value = updatedCharacter;
        }
      } else if (process.client) {
        // Tentar restaurar personagem selecionado do localStorage
        const selectedCharacterId = localStorage.getItem(
          "@mmo/ninja/selectedCharacterId"
        );
        if (selectedCharacterId && data) {
          const character = data.find(
            (c: Character) => c.id.toString() === selectedCharacterId
          );
          if (character) {
            currentCharacter.value = character;
          }
        }
      }
    } catch (error) {
      } finally {
      loading.value = false;
    }
  };

  // Selecionar personagem atual
  const selectCharacter = (character: Character) => {
    currentCharacter.value = character;

    // Persistir no localStorage
    if (process.client) {
      localStorage.setItem(
        "@mmo/ninja/selectedCharacterId",
        character.id.toString()
      );
    }

    // Forçar atualização de todas as páginas que dependem do personagem
    if (process.client) {
      // Disparar evento customizado para notificar outras partes da aplicação
      window.dispatchEvent(
        new CustomEvent("characterChanged", {
          detail: { character },
        })
      );
    }
  };

  // Garantir que sempre haja um personagem selecionado
  const ensureCharacterSelected = async () => {
    if (!currentCharacter.value) {
      await loadCharacters();

      if (characters.value.length > 0) {
        // Tentar restaurar do localStorage primeiro
        if (process.client) {
          const selectedCharacterId = localStorage.getItem(
            "@mmo/ninja/selectedCharacterId"
          );
          if (selectedCharacterId) {
            const character = characters.value.find(
              (c: Character) => c.id.toString() === selectedCharacterId
            );
            if (character) {
              currentCharacter.value = character;
              return;
            }
          }
        }

        // Se não encontrou no localStorage, usar o primeiro
        currentCharacter.value = characters.value[0];
        if (process.client) {
          localStorage.setItem(
            "@mmo/ninja/selectedCharacterId",
            characters.value[0].id.toString()
          );
        }
      }
    }
  };

  // Criar novo personagem
  const createCharacter = async (characterData: {
    name: string;
    class: "ninja" | "guerreiro_espacial";
  }) => {
    loading.value = true;

    try {
      const { data } = await $fetch("/api/characters", {
        method: "POST",
        headers: getAuthHeaders(),
        body: characterData,
      });

      if (data) {
        characters.value.push(data);
        currentCharacter.value = data;
        // Persistir no localStorage
        if (process.client) {
          localStorage.setItem(
            "@mmo/ninja/selectedCharacterId",
            data.id.toString()
          );
        }
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
    getBaseStats,
    getXpForLevel,
    canLevelUp,
    levelUp,
    addXp,
    loadCharacters,
    selectCharacter,
    createCharacter,
    ensureCharacterSelected,
  };
});

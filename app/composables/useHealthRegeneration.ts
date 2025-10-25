import { ref } from "vue";
import { useCharacterStore } from "~/stores/character";

export const useHealthRegeneration = () => {
  const characterStore = useCharacterStore();
  let regenerationInterval: NodeJS.Timeout | null = null;
  const lastHealTime = ref(0);

  const startHealthRegeneration = () => {
    if (regenerationInterval) {
      clearInterval(regenerationInterval);
    }

    // Regenerar vida a cada 15 segundos
    regenerationInterval = setInterval(async () => {
      if (characterStore.currentCharacter) {
        try {
          await $fetch("/api/characters/regenerate-health", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: {
              character_id: characterStore.currentCharacter.id,
            },
          });

          // Atualizar tempo da última cura
          lastHealTime.value = Date.now();

          // Recarregar personagem para atualizar a vida
          await characterStore.loadCharacters();
        } catch (error) {
          }
      }
    }, 15000); // 15 segundos
  };

  const stopHealthRegeneration = () => {
    if (regenerationInterval) {
      clearInterval(regenerationInterval);
      regenerationInterval = null;
    }
  };

  return {
    startHealthRegeneration,
    stopHealthRegeneration,
    lastHealTime,
  };
};

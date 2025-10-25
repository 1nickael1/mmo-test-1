import { useCharacterStore } from "~/stores/character";

export const useCharacterManager = () => {
  const characterStore = useCharacterStore();
  const router = useRouter();

  // Garantir que sempre haja um personagem selecionado
  const ensureCharacterSelected = async () => {
    await characterStore.ensureCharacterSelected();
  };

  // Trocar personagem e recarregar dados
  const switchCharacter = async (character: any) => {
    // Selecionar o novo personagem
    characterStore.selectCharacter(character);

    // Aguardar um pouco para garantir que o store foi atualizado
    await new Promise((resolve) => setTimeout(resolve, 100));

    // Recarregar dados do personagem
    await characterStore.loadCharacters();
  };

  // Escutar mudanças de personagem
  const onCharacterChange = (callback: (character: any) => void) => {
    if (process.client) {
      window.addEventListener("characterChanged", (event: any) => {
        callback(event.detail.character);
      });
    }
  };

  return {
    ensureCharacterSelected,
    switchCharacter,
    onCharacterChange,
  };
};

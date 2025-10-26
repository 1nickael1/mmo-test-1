import { u as useCharacterStore } from './character-BOYLEA6w.mjs';
import { u as useRouter } from './server.mjs';

const useCharacterManager = () => {
  const characterStore = useCharacterStore();
  useRouter();
  const ensureCharacterSelected = async () => {
    await characterStore.ensureCharacterSelected();
  };
  const switchCharacter = async (character) => {
    characterStore.selectCharacter(character);
    await new Promise((resolve) => setTimeout(resolve, 100));
    await characterStore.loadCharacters();
  };
  const onCharacterChange = (callback) => {
  };
  return {
    ensureCharacterSelected,
    switchCharacter,
    onCharacterChange
  };
};

export { useCharacterManager as u };
//# sourceMappingURL=useCharacterManager-4e-hc2Oy.mjs.map

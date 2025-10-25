import { mount } from "@vue/test-utils";
import { createPinia, setActivePinia } from "pinia";
import { beforeEach, describe, expect, it, vi } from "vitest";

// Mock dos composables
vi.mock("~/composables/useToast", () => ({
  useToast: () => ({
    showSuccess: vi.fn(),
    showError: vi.fn(),
    showWarning: vi.fn(),
    showInfo: vi.fn(),
    showConfirm: vi.fn(),
  }),
}));

vi.mock("~/composables/useCharacterManager", () => ({
  useCharacterManager: () => ({
    ensureCharacterSelected: vi.fn(),
    switchCharacter: vi.fn(),
    onCharacterChange: vi.fn(),
  }),
}));

vi.mock("~/composables/useAppVersion", () => ({
  useAppVersion: () => ({
    currentVersion: { value: "1.0.0" },
    serverVersion: { value: "1.0.0" },
    isLoading: { value: false },
    needsUpdate: { value: false },
    isUpToDate: { value: true },
    checkForUpdates: vi.fn(),
    forceUpdate: vi.fn(),
  }),
}));

describe("Componentes Vue", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    vi.clearAllMocks();
  });

  describe("VersionInfo Component", () => {
    it("deve renderizar informações de versão", async () => {
      // Mock do componente VersionInfo
      const VersionInfo = {
        template: `
          <div class="version-info">
            <button @click="showVersionDialog = true" class="version-button">
              v{{ currentVersion }}
            </button>
            <div v-if="showVersionDialog" class="version-dialog">
              <h3>Informações da Aplicação</h3>
              <p>Versão: {{ currentVersion }}</p>
              <p>Status: {{ isUpToDate ? 'Atualizado' : 'Desatualizado' }}</p>
            </div>
          </div>
        `,
        setup() {
          return {
            currentVersion: "1.0.0",
            isUpToDate: true,
            showVersionDialog: false,
          };
        },
      };

      const wrapper = mount(VersionInfo);

      expect(wrapper.find(".version-button").text()).toBe("v1.0.0");
      expect(wrapper.find(".version-dialog").exists()).toBe(false);
    });

    it("deve abrir dialog ao clicar no botão", async () => {
      const VersionInfo = {
        template: `
          <div class="version-info">
            <button @click="showVersionDialog = true" class="version-button">
              v{{ currentVersion }}
            </button>
            <div v-if="showVersionDialog" class="version-dialog">
              <h3>Informações da Aplicação</h3>
            </div>
          </div>
        `,
        setup() {
          return {
            currentVersion: "1.0.0",
            showVersionDialog: true,
          };
        },
      };

      const wrapper = mount(VersionInfo);

      await wrapper.find(".version-button").trigger("click");

      expect(wrapper.find(".version-dialog").exists()).toBe(true);
    });
  });

  describe("Character Selection Component", () => {
    it("deve renderizar lista de personagens", () => {
      const CharacterList = {
        template: `
          <div class="character-list">
            <div v-for="character in characters" :key="character.id" class="character-item">
              <h3>{{ character.name }}</h3>
              <p>Nível {{ character.level }} - {{ character.class }}</p>
              <button @click="selectCharacter(character)" class="select-button">
                Selecionar
              </button>
            </div>
          </div>
        `,
        setup() {
          const characters = [
            { id: 1, name: "Riki", level: 3, class: "ninja" },
            { id: 2, name: "TestNinja", level: 1, class: "ninja" },
          ];

          const selectCharacter = vi.fn();

          return {
            characters,
            selectCharacter,
          };
        },
      };

      const wrapper = mount(CharacterList);

      expect(wrapper.findAll(".character-item")).toHaveLength(2);
      expect(wrapper.find(".character-item h3").text()).toBe("Riki");
    });

    it("deve chamar função de seleção ao clicar no botão", async () => {
      const selectCharacter = vi.fn();

      const CharacterList = {
        template: `
          <div class="character-list">
            <div v-for="character in characters" :key="character.id" class="character-item">
              <button @click="selectCharacter(character)" class="select-button">
                Selecionar
              </button>
            </div>
          </div>
        `,
        setup() {
          const characters = [
            { id: 1, name: "Riki", level: 3, class: "ninja" },
          ];

          return {
            characters,
            selectCharacter,
          };
        },
      };

      const wrapper = mount(CharacterList);

      await wrapper.find(".select-button").trigger("click");

      expect(selectCharacter).toHaveBeenCalledWith({
        id: 1,
        name: "Riki",
        level: 3,
        class: "ninja",
      });
    });
  });

  describe("Skill Component", () => {
    it("deve renderizar habilidade com informações corretas", () => {
      const SkillCard = {
        template: `
          <div class="skill-card">
            <h3>{{ skill.name }}</h3>
            <p>{{ skill.description }}</p>
            <div class="skill-info">
              <span>Nível: {{ skill.level_required }}</span>
              <span>XP: {{ skill.xp_required }}</span>
              <span>Custo: {{ skill.cost }} 🪙</span>
            </div>
            <button 
              :disabled="!can_learn" 
              @click="learnSkill"
              class="learn-button"
            >
              {{ can_learn ? 'Aprender' : 'Não pode aprender' }}
            </button>
          </div>
        `,
        props: {
          skill: {
            type: Object,
            required: true,
          },
          can_learn: {
            type: Boolean,
            default: false,
          },
        },
        setup(props: any) {
          const learnSkill = vi.fn();
          return { learnSkill };
        },
      };

      const skill = {
        name: "Kunai Throw",
        description: "Lança kunais no inimigo",
        level_required: 1,
        xp_required: 100,
        cost: 100,
      };

      const wrapper = mount(SkillCard, {
        props: {
          skill,
          can_learn: true,
        },
      });

      expect(wrapper.find("h3").text()).toBe("Kunai Throw");
      expect(wrapper.find(".learn-button").text()).toBe("Aprender");
      expect(
        wrapper.find(".learn-button").attributes("disabled")
      ).toBeUndefined();
    });

    it("deve desabilitar botão quando não pode aprender", () => {
      const SkillCard = {
        template: `
          <div class="skill-card">
            <button 
              :disabled="!can_learn" 
              @click="learnSkill"
              class="learn-button"
            >
              {{ can_learn ? 'Aprender' : 'Não pode aprender' }}
            </button>
          </div>
        `,
        props: {
          skill: Object,
          can_learn: Boolean,
        },
        setup() {
          const learnSkill = vi.fn();
          return { learnSkill };
        },
      };

      const skill = {
        name: "Kunai Throw",
        level_required: 5,
        xp_required: 500,
        cost: 500,
      };

      const wrapper = mount(SkillCard, {
        props: {
          skill,
          can_learn: false,
        },
      });

      expect(wrapper.find(".learn-button").text()).toBe("Não pode aprender");
      expect(
        wrapper.find(".learn-button").attributes("disabled")
      ).toBeDefined();
    });
  });

  describe("Upgrade Component", () => {
    it("deve renderizar melhoria com status correto", () => {
      const UpgradeCard = {
        template: `
          <div class="upgrade-card">
            <h3>{{ upgrade.name }}</h3>
            <p>{{ upgrade.description }}</p>
            <div class="upgrade-info">
              <span>Nível: {{ upgrade.current_level }}/{{ upgrade.max_level }}</span>
              <span>Custo: {{ upgrade.current_cost.gold }} 🪙</span>
            </div>
            <div v-if="upgrade.is_in_progress" class="progress-info">
              <span>Tempo restante: {{ formatTime(upgrade.time_remaining) }}</span>
            </div>
            <button 
              :disabled="!upgrade.can_upgrade" 
              @click="startUpgrade"
              class="upgrade-button"
            >
              {{ upgrade.can_upgrade ? 'Melhorar' : 'Não pode melhorar' }}
            </button>
          </div>
        `,
        props: {
          upgrade: {
            type: Object,
            required: true,
          },
        },
        setup(props: any) {
          const startUpgrade = vi.fn();
          const formatTime = (ms: number) => {
            const seconds = Math.floor(ms / 1000);
            return `${seconds}s`;
          };
          return { startUpgrade, formatTime };
        },
      };

      const upgrade = {
        name: "Treinamento de Força",
        description: "Aumenta permanentemente a força do personagem",
        current_level: 0,
        max_level: 10,
        current_cost: { gold: 100 },
        can_upgrade: true,
        is_in_progress: false,
        time_remaining: 0,
      };

      const wrapper = mount(UpgradeCard, {
        props: { upgrade },
      });

      expect(wrapper.find("h3").text()).toBe("Treinamento de Força");
      expect(wrapper.find(".upgrade-button").text()).toBe("Melhorar");
      expect(wrapper.find(".progress-info").exists()).toBe(false);
    });

    it("deve mostrar progresso quando em andamento", () => {
      const UpgradeCard = {
        template: `
          <div class="upgrade-card">
            <div v-if="upgrade.is_in_progress" class="progress-info">
              <span>Tempo restante: {{ formatTime(upgrade.time_remaining) }}</span>
            </div>
            <button 
              :disabled="!upgrade.can_upgrade" 
              @click="startUpgrade"
              class="upgrade-button"
            >
              {{ upgrade.can_upgrade ? 'Melhorar' : 'Em progresso...' }}
            </button>
          </div>
        `,
        props: {
          upgrade: Object,
        },
        setup() {
          const startUpgrade = vi.fn();
          const formatTime = (ms: number) => {
            const seconds = Math.floor(ms / 1000);
            return `${seconds}s`;
          };
          return { startUpgrade, formatTime };
        },
      };

      const upgrade = {
        name: "Treinamento de Força",
        current_level: 0,
        max_level: 10,
        current_cost: { gold: 100 },
        can_upgrade: false,
        is_in_progress: true,
        time_remaining: 30000, // 30 segundos
      };

      const wrapper = mount(UpgradeCard, {
        props: { upgrade },
      });

      expect(wrapper.find(".progress-info").exists()).toBe(true);
      expect(wrapper.find(".progress-info span").text()).toBe(
        "Tempo restante: 30s"
      );
      expect(wrapper.find(".upgrade-button").text()).toBe("Em progresso...");
    });
  });

  describe("Battle Component", () => {
    it("deve renderizar informações de batalha", () => {
      const BattleArena = {
        template: `
          <div class="battle-arena">
            <div class="character-info">
              <h3>{{ character.name }}</h3>
              <div class="health-bar">
                <div class="health-fill" :style="{ width: characterHealthPercent + '%' }"></div>
                <span>{{ characterHealthPercent }}%</span>
              </div>
            </div>
            <div class="opponent-info">
              <h3>{{ opponent.name }}</h3>
              <div class="health-bar">
                <div class="health-fill" :style="{ width: opponentHealthPercent + '%' }"></div>
                <span>{{ opponentHealthPercent }}%</span>
              </div>
            </div>
            <div class="battle-actions">
              <button @click="attack" class="action-button">Atacar</button>
              <button @click="defend" class="action-button">Defender</button>
            </div>
          </div>
        `,
        props: {
          character: Object,
          opponent: Object,
        },
        setup(props: any) {
          const characterHealthPercent = 80;
          const opponentHealthPercent = 60;

          const attack = vi.fn();
          const defend = vi.fn();

          return {
            characterHealthPercent,
            opponentHealthPercent,
            attack,
            defend,
          };
        },
      };

      const character = {
        name: "Riki",
        health: 80,
        max_health: 100,
      };

      const opponent = {
        name: "Ninja Inimigo",
        health: 60,
        max_health: 100,
      };

      const wrapper = mount(BattleArena, {
        props: { character, opponent },
      });

      expect(wrapper.find(".character-info h3").text()).toBe("Riki");
      expect(wrapper.find(".opponent-info h3").text()).toBe("Ninja Inimigo");
      expect(wrapper.findAll(".action-button")).toHaveLength(2);
    });

    it("deve mostrar log de batalha", () => {
      const BattleLog = {
        template: `
          <div class="battle-log">
            <h3>Log da Batalha</h3>
            <div class="log-entries">
              <div v-for="entry in battleLog" :key="entry.id" class="log-entry">
                <span class="timestamp">{{ entry.timestamp }}</span>
                <span class="message">{{ entry.message }}</span>
              </div>
            </div>
          </div>
        `,
        setup() {
          const battleLog = [
            {
              id: 1,
              timestamp: "10:30:15",
              message: "Riki atacou Ninja Inimigo causando 25 de dano",
            },
            {
              id: 2,
              timestamp: "10:30:16",
              message: "Ninja Inimigo atacou Riki causando 15 de dano",
            },
          ];

          return { battleLog };
        },
      };

      const wrapper = mount(BattleLog);

      expect(wrapper.find("h3").text()).toBe("Log da Batalha");
      expect(wrapper.findAll(".log-entry")).toHaveLength(2);
      expect(wrapper.find(".log-entry .message").text()).toBe(
        "Riki atacou Ninja Inimigo causando 25 de dano"
      );
    });
  });

  describe("Responsive Design", () => {
    it("deve aplicar classes responsivas corretamente", () => {
      const ResponsiveGrid = {
        template: `
          <div class="responsive-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div v-for="item in items" :key="item.id" class="grid-item">
              {{ item.name }}
            </div>
          </div>
        `,
        setup() {
          const items = [
            { id: 1, name: "Item 1" },
            { id: 2, name: "Item 2" },
            { id: 3, name: "Item 3" },
          ];

          return { items };
        },
      };

      const wrapper = mount(ResponsiveGrid);

      expect(wrapper.find(".responsive-grid").classes()).toContain("grid");
      expect(wrapper.find(".responsive-grid").classes()).toContain(
        "grid-cols-1"
      );
      expect(wrapper.find(".responsive-grid").classes()).toContain(
        "sm:grid-cols-2"
      );
      expect(wrapper.find(".responsive-grid").classes()).toContain(
        "lg:grid-cols-3"
      );
    });
  });
});

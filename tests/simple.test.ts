import { describe, expect, it } from "vitest";

describe("Testes Básicos", () => {
  it("deve executar teste básico", () => {
    expect(1 + 1).toBe(2);
  });

  it("deve validar regras de negócio básicas", () => {
    // Teste de cálculo de XP
    const getXpForLevel = (level: number) => level * 100;
    expect(getXpForLevel(1)).toBe(100);
    expect(getXpForLevel(3)).toBe(300);

    // Teste de validação de nome
    const isValidName = (name: string) => {
      return Boolean(name && name.length >= 2 && name.length <= 20);
    };
    expect(isValidName("Riki")).toBe(true);
    expect(isValidName("A")).toBe(false);
    expect(isValidName("")).toBe(false);

    // Teste de cooldown
    const calculateCooldown = (level: number) => {
      return Math.max(1, Math.round((level / 50) * 30));
    };
    expect(calculateCooldown(1)).toBe(1);
    expect(calculateCooldown(50)).toBe(30);
  });

  it("deve validar sistema de versionamento", () => {
    const compareVersions = (v1: string, v2: string): number => {
      const v1parts = v1.split(".").map(Number);
      const v2parts = v2.split(".").map(Number);

      for (let i = 0; i < Math.max(v1parts.length, v2parts.length); i++) {
        const v1part = v1parts[i] || 0;
        const v2part = v2parts[i] || 0;

        if (v1part > v2part) return 1;
        if (v1part < v2part) return -1;
      }

      return 0;
    };

    expect(compareVersions("1.0.0", "1.0.0")).toBe(0);
    expect(compareVersions("1.1.0", "1.0.0")).toBe(1);
    expect(compareVersions("1.0.0", "1.1.0")).toBe(-1);
  });
});

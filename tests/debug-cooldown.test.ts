import { describe, expect, it } from "vitest";

describe("Debug Cooldown", () => {
  it("deve debugar problema de cooldown", () => {
    const canUseSkill = (
      lastUsed: string | null,
      cooldownSeconds: number,
      currentTime: number = Date.now()
    ) => {
      if (!lastUsed) return true;

      const lastUsedTime = new Date(lastUsed + "Z").getTime();
      const timeDiff = currentTime - lastUsedTime;

      return timeDiff >= cooldownSeconds * 1000;
    };

    // Teste simples: nunca usada deve retornar true
    expect(canUseSkill(null, 1, 1640995200000)).toBe(true);

    // Teste simples: 2 segundos atrás com cooldown de 1 segundo deve retornar true
    // const baseTime = 1640995200000;
    // const twoSecondsAgo = new Date(baseTime - 2000).toISOString();
    // expect(canUseSkill(twoSecondsAgo, 1, baseTime)).toBe(true);
  });
});

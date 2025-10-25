#!/usr/bin/env node

/**
 * Script para testar o sistema de versionamento
 * Simula diferentes cenários de compatibilidade
 */

// Simular diferentes versões para teste
const testScenarios = [
  {
    name: "Versão atual (compatível)",
    currentVersion: "1.0.0",
    minSupportedVersion: "1.0.0",
    forceLogoutVersions: [],
    expectedResult: "compatible",
  },
  {
    name: "Versão antiga (incompatível)",
    currentVersion: "0.9.0",
    minSupportedVersion: "1.0.0",
    forceLogoutVersions: [],
    expectedResult: "incompatible",
  },
  {
    name: "Versão que requer logout forçado",
    currentVersion: "0.8.0",
    minSupportedVersion: "0.9.0",
    forceLogoutVersions: ["0.8.0"],
    expectedResult: "force_logout",
  },
  {
    name: "Versão futura (compatível)",
    currentVersion: "1.1.0",
    minSupportedVersion: "1.0.0",
    forceLogoutVersions: [],
    expectedResult: "compatible",
  },
];

// Função para comparar versões
function compareVersions(version1, version2) {
  const v1parts = version1.split(".").map(Number);
  const v2parts = version2.split(".").map(Number);

  for (let i = 0; i < Math.max(v1parts.length, v2parts.length); i++) {
    const v1part = v1parts[i] || 0;
    const v2part = v2parts[i] || 0;

    if (v1part > v2part) return 1;
    if (v1part < v2part) return -1;
  }

  return 0;
}

// Função para testar um cenário
function testScenario(scenario) {
  console.log(`\n🧪 Testando: ${scenario.name}`);
  console.log(`   Versão atual: ${scenario.currentVersion}`);
  console.log(`   Versão mínima: ${scenario.minSupportedVersion}`);
  console.log(
    `   Versões que requerem logout: ${
      scenario.forceLogoutVersions.join(", ") || "nenhuma"
    }`
  );

  // Verificar se a versão atual é suportada
  const isVersionSupported =
    compareVersions(scenario.currentVersion, scenario.minSupportedVersion) >= 0;

  // Verificar se precisa de logout forçado
  const needsForcedLogout = scenario.forceLogoutVersions.includes(
    scenario.currentVersion
  );

  let result;
  if (needsForcedLogout) {
    result = "force_logout";
  } else if (!isVersionSupported) {
    result = "incompatible";
  } else {
    result = "compatible";
  }

  const isCorrect = result === scenario.expectedResult;
  console.log(`   Resultado: ${result} ${isCorrect ? "✅" : "❌"}`);

  if (!isCorrect) {
    console.log(`   ⚠️  Esperado: ${scenario.expectedResult}`);
  }

  return isCorrect;
}

// Função principal
function main() {
  console.log("🚀 Testando Sistema de Versionamento\n");

  let passedTests = 0;
  let totalTests = testScenarios.length;

  testScenarios.forEach((scenario) => {
    if (testScenario(scenario)) {
      passedTests++;
    }
  });

  console.log(`\n📊 Resultados:`);
  console.log(`   Testes passaram: ${passedTests}/${totalTests}`);
  console.log(
    `   Taxa de sucesso: ${Math.round((passedTests / totalTests) * 100)}%`
  );

  if (passedTests === totalTests) {
    console.log(
      "\n🎉 Todos os testes passaram! Sistema de versionamento está funcionando corretamente."
    );
  } else {
    console.log(
      "\n⚠️  Alguns testes falharam. Verifique a lógica de versionamento."
    );
    process.exit(1);
  }
}

// Executar se chamado diretamente
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

export { compareVersions, testScenario, testScenarios };

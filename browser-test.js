// Script para testar o sistema de versionamento no navegador
// Cole este código no console do navegador (F12 > Console)

console.log("🧪 Testando Sistema de Versionamento no Navegador");
console.log("===============================================");

// Verificar localStorage atual
console.log("📱 Estado atual do localStorage:");
console.log(
  "   @mmo/ninja/app_version:",
  localStorage.getItem("@mmo/ninja/app_version")
);
console.log(
  "   @mmo/ninja/app_storage_version:",
  localStorage.getItem("@mmo/ninja/app_storage_version")
);
console.log(
  "   @mmo/ninja/token:",
  localStorage.getItem("@mmo/ninja/token") ? "Presente" : "Ausente"
);

// Simular versão antiga para teste
console.log("\n🔧 Simulando versão antiga para teste...");
localStorage.setItem("@mmo/ninja/app_version", "1.1.0");
localStorage.setItem("@mmo/ninja/app_storage_version", "1.0.0");

console.log("📱 Estado após simulação:");
console.log(
  "   @mmo/ninja/app_version:",
  localStorage.getItem("@mmo/ninja/app_version")
);
console.log(
  "   @mmo/ninja/app_storage_version:",
  localStorage.getItem("@mmo/ninja/app_storage_version")
);

// Testar fetch do servidor
console.log("\n🌐 Testando fetch do servidor...");
fetch("/api/version")
  .then((response) => response.json())
  .then((data) => {
    console.log("✅ Servidor respondeu:");
    console.log("   Versão:", data.data.version);
    console.log("   Mínima suportada:", data.data.minSupportedVersion);
    console.log(
      "   Logout forçado:",
      data.data.forceLogoutVersions.join(", ") || "Nenhuma"
    );

    // Simular lógica de comparação
    const userVersion = localStorage.getItem("@mmo/ninja/app_version");
    const minSupported = data.data.minSupportedVersion;

    const compareVersions = (version1, version2) => {
      const v1parts = version1.split(".").map(Number);
      const v2parts = version2.split(".").map(Number);

      for (let i = 0; i < Math.max(v1parts.length, v2parts.length); i++) {
        const v1part = v1parts[i] || 0;
        const v2part = v2parts[i] || 0;

        if (v1part > v2part) return 1;
        if (v1part < v2part) return -1;
      }

      return 0;
    };

    const isSupported = compareVersions(userVersion, minSupported) >= 0;

    console.log("\n🔍 Resultado da verificação:");
    console.log("   Versão do usuário:", userVersion);
    console.log("   Versão mínima:", minSupported);
    console.log("   Comparação:", compareVersions(userVersion, minSupported));
    console.log("   É suportada:", isSupported ? "Sim" : "Não");

    if (!isSupported) {
      console.log("   🚨 RESULTADO: Usuário deve ser deslogado!");
      console.log("   📝 Ação: Mostrar toast de erro e redirecionar");
    } else {
      console.log("   ✅ RESULTADO: Usuário pode continuar");
    }
  })
  .catch((error) => {
    console.error("❌ Erro ao testar servidor:", error);
  });

console.log("\n🎯 Teste iniciado! Verifique os resultados acima.");

<template>
  <div
    class="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 p-4"
  >
    <div class="max-w-md w-full space-y-8 p-4 md:p-8">
      <div class="text-center">
        <h1 class="text-2xl md:text-4xl font-bold text-white mb-2">
          Ninja Space RPG
        </h1>
        <p class="text-gray-300 text-sm md:text-base">
          Entre em sua conta para continuar sua jornada
        </p>
      </div>

      <Card class="bg-white/10 backdrop-blur-sm border-white/20">
        <CardHeader>
          <CardTitle class="text-white text-center">Login</CardTitle>
        </CardHeader>
        <CardContent>
          <form @submit.prevent="handleLogin" class="space-y-4">
            <div class="space-y-2">
              <Label for="username" class="text-white">Login</Label>
              <Input
                id="username"
                v-model="form.username"
                type="text"
                placeholder="Seu nome de usuário"
                required
                class="bg-white/20 border-white/30 text-white placeholder:text-gray-300"
              />
            </div>

            <div class="space-y-2">
              <Label for="password" class="text-white">Senha</Label>
              <Input
                id="password"
                v-model="form.password"
                type="password"
                placeholder="Sua senha"
                required
                class="bg-white/20 border-white/30 text-white placeholder:text-gray-300"
              />
            </div>

            <Button
              type="submit"
              :disabled="loading"
              class="w-full bg-blue-600 hover:bg-blue-700 text-white"
            >
              {{ loading ? "Entrando..." : "Entrar" }}
            </Button>
          </form>

          <div class="mt-6 text-center">
            <p class="text-gray-300">
              Não tem uma conta?
              <NuxtLink
                to="/cadastro"
                class="text-blue-400 hover:text-blue-300 font-medium"
              >
                Cadastre-se aqui
              </NuxtLink>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { nextTick, onMounted, ref } from "vue";
import type { LoginRequest } from "~/types";

definePageMeta({
  layout: false,
});

// Verificar se usuário já está logado e redirecionar
onMounted(() => {
  const token = useCookie("token");
  if (token.value) {
    navigateTo("/home");
  }
});

const form = ref<LoginRequest>({
  username: "",
  password: "",
});

const loading = ref(false);
const { showError } = useToast();

const handleLogin = async () => {
  loading.value = true;

  try {
    const response = await $fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form.value),
    });

    if (response && response.success) {
      // Aguarda o cookie ser persistido antes de navegar
      await nextTick();
      // Pequeno delay para garantir que o cookie seja persistido
      await new Promise((resolve) => setTimeout(resolve, 100));
      // Verifica se usuário já possui personagem
      try {
        const token = useCookie("token");
        const charactersResp = await $fetch("/api/characters", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token.value}`,
          },
        });
        if (
          Array.isArray(charactersResp?.data) &&
          charactersResp.data.length > 0
        ) {
          await navigateTo("/selecionar-personagem", { replace: true });
        } else {
          await navigateTo("/criar-personagem", { replace: true });
        }
      } catch (e) {
        // Se der erro ao obter personagens, segue para criação
        await navigateTo("/criar-personagem", { replace: true });
      }
    }
  } catch (error: any) {
    showError("Dados inválidos. Verifique seu login e senha.");
  } finally {
    loading.value = false;
  }
};
</script>

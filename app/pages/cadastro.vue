<template>
  <div
    class="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900"
  >
    <div class="max-w-md w-full space-y-8 p-8">
      <div class="text-center">
        <h1 class="text-4xl font-bold text-white mb-2">Ninja Space RPG</h1>
        <p class="text-gray-300">Crie sua conta e comece sua aventura</p>
      </div>

      <Card class="bg-white/10 backdrop-blur-sm border-white/20">
        <CardHeader>
          <CardTitle class="text-white text-center">Cadastro</CardTitle>
        </CardHeader>
        <CardContent>
          <form @submit.prevent="handleRegister" class="space-y-4">
            <div class="space-y-2">
              <Label for="username" class="text-white">Nome de Usuário</Label>
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
              <Label for="email" class="text-white">Email</Label>
              <Input
                id="email"
                v-model="form.email"
                type="email"
                placeholder="seu@email.com"
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

            <div class="space-y-2">
              <Label for="confirmPassword" class="text-white"
                >Confirmar Senha</Label
              >
              <Input
                id="confirmPassword"
                v-model="form.confirmPassword"
                type="password"
                placeholder="Confirme sua senha"
                required
                class="bg-white/20 border-white/30 text-white placeholder:text-gray-300"
              />
            </div>

            <Button
              type="submit"
              :disabled="loading || form.password !== form.confirmPassword"
              class="w-full bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-50"
            >
              {{ loading ? "Criando conta..." : "Criar Conta" }}
            </Button>
          </form>

          <div class="mt-6 text-center">
            <p class="text-gray-300">
              Já tem uma conta?
              <NuxtLink
                to="/login"
                class="text-blue-400 hover:text-blue-300 font-medium"
              >
                Faça login aqui
              </NuxtLink>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { Input } from "~/components/ui/input";
import type { RegisterRequest } from "~/types";

definePageMeta({
  layout: false,
  middleware: [],
});

const form = ref<RegisterRequest & { confirmPassword: string }>({
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
});

const loading = ref(false);
const { showError } = useToast();

const handleRegister = async () => {
  if (form.value.password !== form.value.confirmPassword) {
    showError("As senhas não coincidem.");
    return;
  }

  loading.value = true;

  try {
    const requestBody = {
      username: form.value.username,
      email: form.value.email,
      password: form.value.password,
    };

    // Usar $fetch com headers explícitos
    const response = await $fetch("/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    if (response && response.success && response.data) {
      await navigateTo("/criar-personagem");
    }
  } catch (error: any) {
    console.error("Erro no cadastro:", error?.data || error?.message || error);
    showError("Dados inválidos. Verifique as informações fornecidas.");
  } finally {
    loading.value = false;
  }
};
</script>

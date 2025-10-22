<template>
  <div
    class="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 flex items-center justify-center p-4"
  >
    <Card class="w-full max-w-2xl bg-white/10 backdrop-blur-sm border-white/20">
      <CardHeader>
        <CardTitle class="text-3xl font-bold text-white text-center">
          Criar Personagem
        </CardTitle>
        <CardDescription class="text-gray-300 text-center">
          Escolha o nome e classe do seu personagem ninja espacial
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form @submit.prevent="handleCreateCharacter" class="space-y-6">
          <!-- Nome do Personagem -->
          <div class="space-y-2">
            <Label for="name" class="text-white text-lg"
              >Nome do Personagem</Label
            >
            <Input
              id="name"
              v-model="form.name"
              type="text"
              placeholder="Digite o nome do seu personagem"
              required
              class="bg-white/20 border-white/30 text-white placeholder:text-gray-300 h-12 text-lg"
            />
          </div>

          <!-- Seleção de Classe -->
          <div class="space-y-4">
            <Label class="text-white text-lg">Escolha sua Classe</Label>
            <div class="grid md:grid-cols-2 gap-4">
              <!-- Ninja -->
              <Card
                class="cursor-pointer transition-all duration-200 hover:scale-105"
                :class="
                  form.class === 'ninja'
                    ? 'ring-2 ring-blue-400 bg-blue-500/20'
                    : 'bg-white/10 hover:bg-white/20'
                "
                @click="form.class = 'ninja'"
              >
                <CardContent class="p-6">
                  <div class="text-center">
                    <div class="text-4xl mb-3">🥷</div>
                    <h3 class="text-xl font-bold text-white mb-2">Ninja</h3>
                    <p class="text-gray-300 text-sm mb-4">
                      Ágil e furtivo, especialista em ataques rápidos e
                      habilidades de stealth.
                    </p>
                    <div class="space-y-1 text-sm text-gray-300">
                      <div>⚡ Agilidade: 12</div>
                      <div>💪 Força: 8</div>
                      <div>🛡️ Defesa: 6</div>
                      <div>❤️ Vida: 80</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <!-- Guerreiro Espacial -->
              <Card
                class="cursor-pointer transition-all duration-200 hover:scale-105"
                :class="
                  form.class === 'guerreiro_espacial'
                    ? 'ring-2 ring-red-400 bg-red-500/20'
                    : 'bg-white/10 hover:bg-white/20'
                "
                @click="form.class = 'guerreiro_espacial'"
              >
                <CardContent class="p-6">
                  <div class="text-center">
                    <div class="text-4xl mb-3">🚀</div>
                    <h3 class="text-xl font-bold text-white mb-2">
                      Guerreiro Espacial
                    </h3>
                    <p class="text-gray-300 text-sm mb-4">
                      Poderoso e resistente, especialista em combate direto e
                      tecnologia avançada.
                    </p>
                    <div class="space-y-1 text-sm text-gray-300">
                      <div>💪 Força: 12</div>
                      <div>🛡️ Defesa: 10</div>
                      <div>⚡ Agilidade: 6</div>
                      <div>❤️ Vida: 100</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <!-- Botão de Criação -->
          <Button
            type="submit"
            :disabled="loading || !form.name || !form.class"
            class="w-full bg-blue-600 hover:bg-blue-700 text-white h-12 text-lg disabled:opacity-50"
          >
            {{ loading ? "Criando Personagem..." : "Criar Personagem" }}
          </Button>
        </form>
      </CardContent>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useCharacterStore } from "~/stores/character";
import type { CreateCharacterRequest } from "~/types";

definePageMeta({
  layout: false,
  middleware: "auth",
});

const characterStore = useCharacterStore();

const form = ref<CreateCharacterRequest>({
  name: "",
  class: "ninja",
});

const loading = ref(false);

const handleCreateCharacter = async () => {
  loading.value = true;

  try {
    const character = await characterStore.createCharacter(form.value);

    if (character) {
      await navigateTo("/home");
    }
  } catch (error: any) {
    console.error("Erro ao criar personagem:", error);
    // Aqui você pode adicionar um toast de erro
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <div
    class="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900"
  >
    <div class="container mx-auto px-4 py-16">
      <div class="text-center mb-16">
        <h1 class="text-6xl font-bold text-white mb-6">Ninja Space RPG</h1>
        <p class="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
          Uma aventura épica combinando elementos de ninjas e estratégia
          espacial. Crie seu personagem, desenvolva habilidades e construa seu
          império!
        </p>

        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            @click="navigateTo('/login')"
            size="lg"
            class="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3"
          >
            Entrar
          </Button>
          <Button
            @click="navigateTo('/cadastro')"
            variant="outline"
            size="lg"
            class="border-white text-white hover:bg-white hover:text-gray-900 px-8 py-3"
          >
            Cadastrar
          </Button>
        </div>
      </div>

      <div class="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        <Card class="bg-white/10 backdrop-blur-sm border-white/20">
          <CardHeader>
            <CardTitle class="text-white text-center"
              >⚔️ Batalhas Épicas</CardTitle
            >
          </CardHeader>
          <CardContent>
            <p class="text-gray-300 text-center">
              Enfrente NPCs poderosos em batalhas turn-based. Ganhe XP, recursos
              e itens raros!
            </p>
          </CardContent>
        </Card>

        <Card class="bg-white/10 backdrop-blur-sm border-white/20">
          <CardHeader>
            <CardTitle class="text-white text-center"
              >🏗️ Construção Estratégica</CardTitle
            >
          </CardHeader>
          <CardContent>
            <p class="text-gray-300 text-center">
              Construa e melhore sua base espacial. Gerencie recursos e
              desenvolva tecnologias avançadas!
            </p>
          </CardContent>
        </Card>

        <Card class="bg-white/10 backdrop-blur-sm border-white/20">
          <CardHeader>
            <CardTitle class="text-white text-center"
              >🎯 Progressão de Personagem</CardTitle
            >
          </CardHeader>
          <CardContent>
            <p class="text-gray-300 text-center">
              Desenvolva habilidades únicas, suba de nível e torne-se o ninja
              espacial mais poderoso!
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";

definePageMeta({
  layout: false,
  middleware: [],
});
</script>

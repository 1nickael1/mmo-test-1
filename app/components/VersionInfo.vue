<template>
  <div class="version-info">
    <!-- Botão de versão (sempre visível) -->
    <Button
      variant="ghost"
      size="sm"
      @click="showVersionDialog = true"
      class="text-xs text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
    >
      v{{ currentVersion }}
    </Button>

    <!-- Dialog de informações de versão -->
    <Dialog v-model:open="showVersionDialog">
      <DialogContent class="max-w-md">
        <DialogHeader>
          <DialogTitle>Informações da Aplicação</DialogTitle>
        </DialogHeader>
        
        <div class="space-y-4">
          <!-- Status da versão -->
          <div class="flex items-center justify-between">
            <span class="text-sm font-medium">Versão Atual:</span>
            <div class="flex items-center gap-2">
              <Badge :variant="isUpToDate ? 'default' : 'destructive'">
                {{ currentVersion }}
              </Badge>
              <Badge v-if="isUpToDate" variant="secondary" class="text-xs">
                ✅ Atualizado
              </Badge>
              <Badge v-else variant="destructive" class="text-xs">
                ⚠️ Desatualizado
              </Badge>
            </div>
          </div>

          <!-- Versão do servidor -->
          <div v-if="serverVersion && serverVersion !== currentVersion" class="flex items-center justify-between">
            <span class="text-sm font-medium">Versão do Servidor:</span>
            <Badge variant="outline">{{ serverVersion }}</Badge>
          </div>

          <!-- Última atualização -->
          <div class="flex items-center justify-between">
            <span class="text-sm font-medium">Última Atualização:</span>
            <span class="text-sm text-gray-600 dark:text-gray-400">
              {{ formatDate(lastUpdate) }}
            </span>
          </div>

          <!-- Changelog -->
          <div v-if="changelog.length > 0">
            <h4 class="text-sm font-medium mb-2">Principais Mudanças:</h4>
            <div class="max-h-40 overflow-y-auto space-y-2">
              <div
                v-for="(change, index) in changelog[0]?.changes || []"
                :key="index"
                class="text-xs text-gray-600 dark:text-gray-400 flex items-start gap-2"
              >
                <span class="text-green-600 dark:text-green-400 mt-0.5">•</span>
                <span>{{ change }}</span>
              </div>
            </div>
          </div>

          <!-- Ações -->
          <div class="flex gap-2 pt-4">
            <Button
              v-if="!isUpToDate"
              @click="handleForceUpdate"
              variant="default"
              size="sm"
              class="flex-1"
            >
              🔄 Atualizar Agora
            </Button>
            <Button
              @click="handleCheckUpdates"
              variant="outline"
              size="sm"
              :disabled="isLoading"
              class="flex-1"
            >
              <span v-if="isLoading">Verificando...</span>
              <span v-else>Verificar Atualizações</span>
            </Button>
          </div>

          <!-- Aviso sobre limpeza de dados -->
          <div v-if="!isUpToDate" class="p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
            <div class="flex items-start gap-2">
              <span class="text-yellow-600 dark:text-yellow-400 text-sm">⚠️</span>
              <div class="text-xs text-yellow-800 dark:text-yellow-200">
                <p class="font-medium">Atenção:</p>
                <p>A atualização pode limpar dados temporários armazenados localmente para garantir compatibilidade.</p>
              </div>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button @click="showVersionDialog = false" variant="outline">
            Fechar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useAppVersion } from '~/composables/useAppVersion';
import { useToast } from '~/composables/useToast';

const { 
  currentVersion, 
  serverVersion, 
  isLoading, 
  isUpToDate, 
  checkForUpdates, 
  forceUpdate 
} = useAppVersion();

const { showSuccess, showError } = useToast();

const showVersionDialog = ref(false);
const lastUpdate = ref('2025-01-25T18:00:00Z');
const changelog = ref([
  {
    version: '1.0.0',
    date: '2025-01-25T18:00:00Z',
    changes: [
      'Sistema de versionamento implementado',
      'Correção do sistema de troca de personagem',
      'Expansão de habilidades até nível 50',
      'Correção da validação de recursos em melhorias',
      'Sistema de cooldown proporcional para habilidades',
      'Melhorias na responsividade mobile',
      'Correção de sincronização entre API e banco de dados'
    ]
  }
]);

// Formatar data
const formatDate = (dateString: string) => {
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  } catch {
    return dateString;
  }
};

// Verificar atualizações
const handleCheckUpdates = async () => {
  try {
    await checkForUpdates();
    if (isUpToDate.value) {
      showSuccess('Aplicação está atualizada!');
    }
  } catch (error) {
    showError('Erro ao verificar atualizações');
  }
};

// Forçar atualização
const handleForceUpdate = () => {
  const { showConfirm } = useToast();
  showConfirm(
    'Atualizar Aplicação',
    'Isso irá limpar dados temporários e recarregar a aplicação. Deseja continuar?',
    () => {
      forceUpdate();
    }
  );
};
</script>

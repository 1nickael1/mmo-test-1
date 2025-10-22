<script setup lang="ts">
import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "vue";

const props = defineProps<{
  class?: HTMLAttributes["class"];
}>();
</script>

<template>
  <div
    :class="cn('rounded-xl border bg-white text-gray-900 shadow', props.class)"
  >
    <slot />
  </div>
</template>

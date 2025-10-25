<script lang="ts" setup>
import { Toaster } from "vue-sonner";

interface ToasterProps {
  position?:
    | "top-left"
    | "top-center"
    | "top-right"
    | "bottom-left"
    | "bottom-center"
    | "bottom-right";
  toastOptions?: any;
}

const props = withDefaults(defineProps<ToasterProps>(), {
  position: "top-right",
});
</script>

<template>
  <Toaster
    class="toaster group"
    :position="props.position"
    :toast-options="{
      duration: 4000,
      classes: {
        toast:
          'group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg',
        description: 'group-[.toast]:text-muted-foreground',
        actionButton:
          'group-[.toast]:bg-primary group-[.toast]:text-primary-foreground',
        cancelButton:
          'group-[.toast]:bg-muted group-[.toast]:text-muted-foreground',
      },
    }"
  />
</template>

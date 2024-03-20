<script setup lang="ts">
import { useDark, useToggle } from "@vueuse/core";
import { Sun, MoonStar } from "lucide-vue-next";
import Button from "@/components/ui/button/Button.vue";

const isDark = useDark();
const toggleDark = useToggle(isDark);
</script>
<template>
  <div :class="isDark ? 'dark' : ''">
    <div class="mb-4 p-2 flex justify-center">
      <h1 class="flex-1 text-center text-3xl font-bold underline">ISS test</h1>

      <Button
        class="rounded-full"
        variant="outline"
        size="icon"
        @click="toggleDark()"
      >
        <Sun v-if="isDark" class="w-5 h-5" />
        <MoonStar v-else class="w-5 h-5" />
      </Button>
    </div>

    <slot></slot>
  </div>
</template>

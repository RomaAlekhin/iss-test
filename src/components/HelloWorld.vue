<script setup lang="ts">
import { ref } from "vue";
import { Button } from "@/components/ui/button";

defineProps<{ msg: string }>();

const count = ref(0);
</script>

<template>
  <h1 class="text-3xl font-bold underline">ISS test</h1>
  <Button>Click me</Button>
</template>

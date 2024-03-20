<script setup lang="ts">
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Edit2 } from "lucide-vue-next";
import { Todo } from "../types";

const emit = defineEmits<{
  (e: "edit-todo"): void;
  (e: "click-todo"): void;
}>();

defineProps<{
  todo: Todo;
  checked: boolean;
  isEdit?: boolean;
}>();

const handleClickButtonEdit = () => {
  emit("edit-todo");
};

const handleClickTodoItem = () => {
  emit("click-todo");
};
</script>

<template>
  <li
    @click="handleClickTodoItem"
    class="flex items-center gap-3 py-2 px-3 rounded-lg border border-slate-400"
  >
    <Checkbox v-if="isEdit" :checked="checked" />

    <span>{{ todo.name }}</span>

    <div class="ml-auto flex gap-2" @click="(e) => e.stopPropagation()">
      <Button variant="secondary" size="icon" :onclick="handleClickButtonEdit">
        <Edit2 class="w-4 h-4" />
      </Button>
    </div>
  </li>
</template>

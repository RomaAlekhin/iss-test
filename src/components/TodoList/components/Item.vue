<script setup lang="ts">
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Edit2, Check, X } from "lucide-vue-next";
import { Todo, TodoStatus } from "../types";
import { Badge } from "@/components/ui/badge";
import { todoStatusLabel } from "../utils";

const emit = defineEmits<{
  (e: "done"): void;
  (e: "edit"): void;
  (e: "click"): void;
}>();

defineProps<{
  todo: Todo;
  checked: boolean;
  isEdit?: boolean;
}>();

const handleClickButtonEdit = () => {
  emit("edit");
};

const handleClickButtonDone = () => {
  emit("done");
};

const handleClickTodoItem = () => {
  emit("click");
};
</script>

<template>
  <li
    @click="handleClickTodoItem"
    class="flex items-center gap-3 py-2 px-3 rounded-lg border border-slate-400"
  >
    <Checkbox v-if="isEdit" :checked="checked" />

    <span :class="todo.status === TodoStatus.DONE ? 'line-through' : ''">{{
      todo.name
    }}</span>

    <div class="ml-auto flex gap-2" @click="(e) => e.stopPropagation()">
      <Badge variant="outline" class="my-auto">
        {{ todoStatusLabel[todo.status] }}
      </Badge>

      <Button
        variant="secondary"
        class="size-8"
        size="icon"
        :onclick="handleClickButtonDone"
      >
        <X v-if="todo.status === TodoStatus.DONE" class="w-4 h-4" />
        <Check v-else class="w-4 h-4" />
      </Button>

      <Button
        variant="outline"
        class="size-8"
        size="icon"
        :onclick="handleClickButtonEdit"
      >
        <Edit2 class="w-4 h-4" />
      </Button>
    </div>
  </li>
</template>

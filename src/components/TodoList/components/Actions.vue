<script setup lang="ts">
import { Button } from "@/components/ui/button";
import { Edit, Trash, Plus } from "lucide-vue-next";

const emit = defineEmits<{
  (e: "add-todo"): void;
  (e: "edit-todos"): void;
  (e: "remove-todos"): void;
}>();

defineProps<{
  isEdit?: boolean;
  isSelectedSomeTodos?: boolean;
}>();

const handleClickButtonAdd = () => {
  emit("add-todo");
};

const handleClickButtonEdit = () => {
  emit("edit-todos");
};

const handleClickButtonRemove = () => {
  emit("remove-todos");
};
</script>

<template>
  <div class="flex justify-between gap-4">
    <div class="flex gap-2">
      <Button
        size="icon"
        :variant="isEdit ? 'default' : 'outline'"
        :onclick="handleClickButtonEdit"
      >
        <Edit class="w-4 h-4" />
      </Button>

      <slot name="filter"></slot>
    </div>

    <div class="flex gap-2">
      <Button
        v-if="isSelectedSomeTodos"
        variant="outline"
        :onclick="handleClickButtonRemove"
      >
        <Trash class="w-4 h-4 mr-2" />
        Remove todos
      </Button>

      <Button variant="outline" :onclick="handleClickButtonAdd">
        <Plus class="w-4 h-4 mr-2" />
        Add todo
      </Button>
    </div>
  </div>
</template>

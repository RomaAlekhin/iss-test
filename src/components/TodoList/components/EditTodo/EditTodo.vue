<script setup lang="ts">
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import TodoForm from "./TodoForm.vue";
import { Todo, TodoAdd } from "../../types";

const emit = defineEmits<{
  (e: "submit", todo: TodoAdd): void;
  (e: "remove", id: Todo["id"]): void;
  (e: "close"): void;
}>();

const isOpen = defineModel<boolean>();

defineProps<{
  todo?: Todo;
}>();

const handleSubmit = (todo: TodoAdd) => {
  emit("submit", todo);
};

const handleDelete = (id: Todo["id"]) => {
  emit("remove", id);
};

const handleClose = () => {
  emit("close");
};
</script>

<template>
  <Dialog v-model:open="isOpen" @update:open="handleClose">
    <DialogContent class="sm:max-w-[425px] rounded-lg">
      <DialogHeader>
        <DialogTitle>{{ todo ? "Edit" : "Add" }} todo</DialogTitle>
      </DialogHeader>

      <TodoForm :todo="todo" @submit="handleSubmit" @remove="handleDelete" />
    </DialogContent>
  </Dialog>
</template>

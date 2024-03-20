<script setup lang="ts">
import { Todo } from "../types";
import Item from "./Item.vue";

const emit = defineEmits<{
  (e: "edit-todo", id: Todo["id"]): void;
  (e: "update:checked", value: Record<Todo["id"], boolean>): void;
}>();

const props = defineProps<{
  checked: Record<Todo["id"], boolean>;
  todos: Todo[];
  isEdit?: boolean;
}>();

const handleClickTodoEdit = (id: Todo["id"]) => {
  emit("edit-todo", id);
};

const handleClickTodoItem = (todo: Todo) => {
  if (!props.isEdit) return;

  emit("update:checked", {
    ...props.checked,
    [todo.id]: !props.checked[todo.id],
  });
};
</script>

<template>
  <ul class="flex flex-col gap-4">
    <Item
      v-for="todo in todos"
      :key="todo.id"
      :checked="checked[todo.id]"
      :is-edit="isEdit"
      :todo="todo"
      @click-todo="() => handleClickTodoItem(todo)"
      @edit-todo="() => handleClickTodoEdit(todo.id)"
    />
  </ul>
</template>

<script setup lang="ts">
import { Todo } from "../types";
import Item from "./Item.vue";

const emit = defineEmits<{
  (e: "edit", todo: Todo): void;
  (e: "done", id: Todo["id"]): void;
  (e: "update:checked", value: Record<Todo["id"], boolean>): void;
}>();

const props = defineProps<{
  checked: Record<Todo["id"], boolean>;
  todos: Todo[];
  isEdit?: boolean;
}>();

const handleClickTodoEdit = (todo: Todo) => {
  emit("edit", todo);
};

const handleClickTodoDone = (id: Todo["id"]) => {
  emit("done", id);
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
      v-for="(todo, index) in todos"
      :key="todo.id"
      :data-index="index"
      :checked="checked[todo.id]"
      :is-edit="isEdit"
      :todo="todo"
      @click="() => handleClickTodoItem(todo)"
      @edit="() => handleClickTodoEdit(todo)"
      @done="() => handleClickTodoDone(todo.id)"
    />
  </ul>
</template>

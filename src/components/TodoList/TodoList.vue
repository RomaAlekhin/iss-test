<script setup lang="ts">
import { computed, ref } from "vue";
import Actions from "./components/Actions.vue";
import List from "./components/List.vue";
import { useTodoList } from "./composables/useTodoList";
import { Separator } from "@/components/ui/separator";
import { Todo, TodoSelected } from "./types";

const { todos, addTodoItem, removeTodoItems } = useTodoList();

const isEdit = ref(false);
const checkedState = ref<TodoSelected>({});

const checkedIds = computed(() => {
  return Object.entries(checkedState.value).reduce<string[]>(
    (acc, [id, isChecked]) => {
      if (isChecked) {
        acc.push(id);
      }

      return acc;
    },
    []
  );
});

const handleAddTodo = () => {
  addTodoItem({
    name: "test name",
    description: "test description",
  });
};

const handleEditTodos = () => {
  if (isEdit) {
    checkedState.value = {};
  }

  isEdit.value = !isEdit.value;
};

const handleEditTodoItem = (id: Todo["id"]) => {
  alert(`edit ${id}`);
};

const handleRemoveTodos = () => {
  removeTodoItems(checkedIds.value);

  checkedState.value = {};
  isEdit.value = false;
};
</script>

<template>
  <div class="flex justify-center">
    <div class="flex flex-col max-w-96 w-full gap-4 mx-4">
      <Actions
        :is-edit="isEdit"
        :is-selected-some-todos="checkedIds.length > 0"
        @add-todo="handleAddTodo"
        @edit-todos="handleEditTodos"
        @remove-todos="handleRemoveTodos"
      />

      <Separator />

      <List
        v-model:checked="checkedState"
        :todos="todos"
        :is-edit="isEdit"
        @edit-todo="handleEditTodoItem"
      />

      {{ checkedState }}
      {{ checkedIds }}
    </div>
  </div>
</template>

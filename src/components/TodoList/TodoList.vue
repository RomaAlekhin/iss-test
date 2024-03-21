<script setup lang="ts">
import { computed, ref } from "vue";
import { Actions, List, EditTodo, Filter } from "./components";
import { useTodoList } from "./composables/useTodoList";
import { Separator } from "@/components/ui/separator";
import { Todo, TodoAdd, TodoSelected } from "./types";
import { useModalEditTodo } from "./composables/useModalEditTodo";
import { useSearchFilter } from "./composables/useSearchFilter";

const { todos, addTodoItem, removeTodoItem, removeTodoItems, editTodoItem } =
  useTodoList();

const { isOpen, todoToEdit, onClose, onOpen } = useModalEditTodo();

const { todos: filteredTodos, search, status } = useSearchFilter(todos.value);

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

const handleEditTodos = () => {
  if (isEdit) {
    checkedState.value = {};
  }

  isEdit.value = !isEdit.value;
};

const onModifyTodoItem = (todo: TodoAdd) => {
  const id = todoToEdit.value?.id;

  if (id) {
    editTodoItem(id, todo);
  } else {
    addTodoItem(todo);
  }

  onClose();
};

const handleRemoveTodos = () => {
  removeTodoItems(checkedIds.value);

  checkedState.value = {};
  isEdit.value = false;
};

const handleRemoveTodo = (id: Todo["id"]) => {
  removeTodoItem(id);

  checkedState.value = {};
  onClose();
};
</script>

<template>
  <div class="flex justify-center">
    <div class="flex flex-col max-w-96 w-full gap-4 mx-4">
      <Actions
        :is-edit="isEdit"
        :is-selected-some-todos="checkedIds.length > 0"
        @add-todo="onOpen"
        @edit-todos="handleEditTodos"
        @remove-todos="handleRemoveTodos"
      >
        <template #filter>
          <Filter v-model:search="search" v-model:status="status" />
        </template>
      </Actions>

      <Separator />

      <List
        v-if="filteredTodos.length > 0"
        v-model:checked="checkedState"
        :todos="filteredTodos"
        :is-edit="isEdit"
        @edit-todo="onOpen"
      />

      <span v-else class="flex justify-center">Not found todos</span>

      <EditTodo
        v-model="isOpen"
        :todo="todoToEdit"
        @submit="onModifyTodoItem"
        @remove="handleRemoveTodo"
        @close="onClose"
      />
    </div>
  </div>
</template>

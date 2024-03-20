<script setup lang="ts">
import { ref } from "vue";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Edit, Trash2 } from "lucide-vue-next";
import { Todo } from "../types";

const emit = defineEmits<{
  (e: "edit-todo"): void;
  (e: "remove-todo", id: Todo["id"]): void;
  (e: "select-todo", id: Todo["id"]): void;
  (e: "update:checked", value: Record<Todo["id"], boolean>): void;
}>();

// const props = defineProps(['modelValue'])
// const emit = defineEmits(['update:modelValue'])

// const checked = defineModel<Record<Todo["id"], boolean>>("checked", {
//   default: {},
// });

const props = defineProps<{
  checked: Record<Todo["id"], boolean>;
  todos: Todo[];
  isEdit?: boolean;
}>();

const handleClickButtonRemove = (id: Todo["id"]) => {
  emit("remove-todo", id);
};

const handleClickButtonEdit = () => {};

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
    <li
      v-for="todo in todos"
      :key="todo.id"
      @click="() => handleClickTodoItem(todo)"
      class="flex items-center gap-3 py-2 px-3 rounded-lg border border-slate-400"
    >
      <Checkbox v-if="isEdit" :checked="checked[todo.id]" />
      {{ todo.name }}

      <div class="ml-auto flex gap-2" @click="(e) => e.stopPropagation()">
        <Button
          variant="secondary"
          size="icon"
          :onclick="handleClickButtonEdit"
        >
          <Edit class="w-4 h-4" />
        </Button>

        <Button
          variant="destructive"
          size="icon"
          :onclick="() => handleClickButtonRemove(todo.id)"
        >
          <Trash2 class="w-4 h-4" />
        </Button>
      </div>
    </li>
  </ul>
</template>

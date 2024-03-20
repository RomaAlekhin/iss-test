import { ref } from "vue";
import { Todo } from "../types";

export function useModalEditTodo() {
  const isOpen = ref(false);
  const todoToEdit = ref<Todo>();

  const onOpen = (todo?: Todo) => {
    todoToEdit.value = todo;
    isOpen.value = true;
  };

  const onClose = () => {
    todoToEdit.value = undefined;
    isOpen.value = false;
  };

  return { isOpen, todoToEdit, onOpen, onClose };
}

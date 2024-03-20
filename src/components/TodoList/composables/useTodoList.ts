import { useStorage } from "@vueuse/core";
import { Todo, TodoAdd, TodoStatus } from "../types";
import { generateSuperUniqueIdentifierEver } from "@/utils";

export function useTodoList() {
  const todos = useStorage<Todo[]>("todo-list", []);

  const addTodoItem = (todo: TodoAdd) => {
    todos.value.push({
      id: generateSuperUniqueIdentifierEver(),
      status: TodoStatus.IN_PROGRESS,
      ...todo,
    });
  };

  const removeTodoItem = (id: Todo["id"]) => {
    todos.value = todos.value.filter((todo) => todo.id !== id);
  };

  const removeTodoItems = (ids: Todo["id"][]) => {
    todos.value = todos.value.filter((todo) => !ids.includes(todo.id));
  };

  return { todos, addTodoItem, removeTodoItem, removeTodoItems };
}

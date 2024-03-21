import { computed, ref } from "vue";
import { FilterStatus, Todo } from "../types";

const filterTodoByStatus = (todo: Todo, status?: FilterStatus): boolean => {
  if (status === "ALL") return true;
  return todo.status === status;
};

const filterTodoBySearch = (todo: Todo, search?: string): boolean => {
  const searchValue = search?.toLowerCase() ?? "";
  if (!searchValue) return true;

  const name = todo.name.toLowerCase();
  const description = todo.description?.toLowerCase() ?? "";

  return name.includes(searchValue) || description.includes(searchValue);
};

export function useSearchFilter(todos: Todo[]) {
  const search = ref<string>();
  const status = ref<FilterStatus>("ALL");

  const filteredTodos = computed(() => {
    return todos.filter(
      (todo) =>
        filterTodoByStatus(todo, status.value) &&
        filterTodoBySearch(todo, search.value)
    );
  });

  return { search, status, todos: filteredTodos };
}

export enum TodoStatus {
  DONE = "DONE",
  IN_PROGRESS = "IN_PROGRESS",
}

export interface Todo {
  id: string;
  name: string;
  status: TodoStatus;
  description?: string;
}

export type TodoAdd = Omit<Todo, "id" | "status">;

export type TodoSelected = Record<Todo["id"], boolean>;

import { TodoStatus } from "./types";

export const todoStatusLabel = {
  ALL: "All",
  [TodoStatus.DONE]: "Done",
  [TodoStatus.IN_PROGRESS]: "In progress",
};

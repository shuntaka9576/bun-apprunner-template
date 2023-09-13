import { Task } from "src/entity/task";
import Store from "src/store";

export const ListTask = async (): Promise<Task[]> => {
  const tasks = await Store.Task.ListTask();

  return tasks;
};

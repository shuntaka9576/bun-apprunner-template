import { Task } from "src/entity/task";
import Store from "src/store";

export const AddTask = async (title: string): Promise<Task> => {
  const task = await Store.Task.AddTask(title);

  return task;
};

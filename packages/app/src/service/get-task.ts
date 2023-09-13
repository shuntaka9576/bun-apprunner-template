import { Task } from "src/entity/task";
import Store from "src/store";

export const GetTask = async (taskId: string): Promise<Task | null> => {
  const task = await Store.Task.GetTask(taskId);

  return task;
};

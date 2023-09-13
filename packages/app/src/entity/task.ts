import { DateTime } from "luxon";

export type Task = {
  taskId: string;
  title: string;
  createAt: DateTime;
};

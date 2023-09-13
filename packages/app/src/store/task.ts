import { Task } from "src/entity/task";
import { Database } from "bun:sqlite";
import { v4 as uuid } from "uuid";
import { DateTime } from "luxon";

const db = new Database("./todo.db");

const insertTask = db.prepare(
  "INSERT INTO task (task_id, title) VALUES ($taskId, $title);",
);
const queryTask = db.query(
  "SELECT task_id, title, create_at FROM task WHERE task_id = $taskId;",
);
const queryTaskAll = db.query("SELECT task_id, title, create_at FROM task;");

export const AddTask = async (title: string): Promise<Task> => {
  const taskId = uuid();
  await insertTask.run({
    $taskId: taskId,
    $title: title,
  });

  const record = queryTask.get({
    $taskId: taskId,
  }) as
    | {
      task_id: string;
      title: string;
      create_at: string;
    }
    | undefined;

  if (record == null) {
    throw new Error("unexpect insert exception");
  }

  return {
    taskId: record.task_id,
    title: record.title,
    createAt: DateTime.fromSQL(record.create_at, { zone: "UTC" }),
  };
};

export const GetTask = async (taskId: string): Promise<Task | null> => {
  const record = queryTask.get({
    $taskId: taskId,
  }) as
    | {
      task_id: string;
      title: string;
      create_at: string;
    }
    | undefined;

  if (record == null) {
    return null;
  }

  return {
    taskId: record.task_id,
    title: record.title,
    createAt: DateTime.fromSQL(record.create_at, { zone: "UTC" }),
  };
};

export const ListTask = async (): Promise<Task[]> => {
  const records = queryTaskAll.all() as {
    task_id: string;
    title: string;
    create_at: string;
  }[];

  return records.map((record) => ({
    taskId: record.task_id,
    title: record.title,
    createAt: DateTime.fromSQL(record.create_at, { zone: "UTC" }),
  }));
};

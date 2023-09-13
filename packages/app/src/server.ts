import { Hono } from "hono";
import handler from "./handler";

export let app: Hono;

export const launchHono = () => {
  app = new Hono();

  app.get("/tasks", async () => {
    return await handler.ListTask();
  });

  app.get("/tasks/:task_id", async (c) => {
    return await handler.GetTask(c);
  });

  app.post("/tasks", async (c) => {
    return await handler.AddTask(c);
  });
};

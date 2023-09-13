import { Context } from "hono";
import { logger } from "src/logger";
import Service from "src/service";

export const AddTask = async (c: Context): Promise<Response> => {
  try {
    logger.info("AddTask");
    const body = await c.req.json();

    if (body.title == null || body.title === "") {
      return new Response(null, {
        status: 400,
      });
    }
    const task = await Service.AddTask(body.title);
    logger.info("AddTaskSuccess");

    return c.body(
      JSON.stringify({
        taskId: task.taskId,
        title: task.title,
        createAt: task.createAt
          .setZone("Asia/Tokyo")
          .toFormat("yyyy/MM/dd HH:MM:ss"),
      }),
      {
        status: 201,
      },
    );
  } catch (e) {
    logger.error(`AddTaskUnknwonError`, e);

    return new Response(null, {
      status: 500,
    });
  }
};

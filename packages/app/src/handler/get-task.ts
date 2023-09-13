import { Context } from "hono";
import { logger } from "src/logger";
import Service from "src/service";

export const GetTask = async (c: Context) => {
  try {
    logger.info("GetTask");

    const taskId = c.req.param("task_id");

    if (taskId === "") {
      return c.body("", {
        status: 400,
      });
    }

    const task = await Service.GetTask(taskId);
    logger.info("GetTaskSuccess");

    if (task == null) {
      return new Response(null, { status: 404 });
    }

    return new Response(
      JSON.stringify({
        taskId: task.taskId,
        title: task.title,
        createAt: task.createAt
          .setZone("Asia/Tokyo")
          .toFormat("yyyy/MM/dd HH:MM:ss"),
      }),
      {
        status: 200,
      },
    );
  } catch (e) {
    logger.error(`GetTaskUnknwonError`, e);

    return new Response(null, {
      status: 500,
    });
  }
};

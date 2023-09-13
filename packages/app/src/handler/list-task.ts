import { logger } from "src/logger";
import Service from "src/service";

export const ListTask = async () => {
  try {
    logger.info("ListTask");

    const listTask = await Service.ListTask();
    logger.info("ListTaskSuccess");

    const tasks = listTask.map((task) => ({
      taskId: task.taskId,
      title: task.title,
      createAt: task.createAt
        .setZone("Asia/Tokyo")
        .toFormat("yyyy/MM/dd HH:MM:ss"),
    }));

    return new Response(JSON.stringify({ tasks }), {
      status: 200,
    });
  } catch (e) {
    logger.error(`ListTaskUnknwonError`, e);

    return new Response(null, {
      status: 500,
    });
  }
};

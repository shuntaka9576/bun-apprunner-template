import Bun from "bun";
import { logger } from "./logger";
import { app, launchHono } from "./server";

const main = () => {
  logger.info(`bun version ${Bun.version}`);
  launchHono();
};

main();

export default {
  port: 3000,
  fetch: (req: Request) => app.fetch(req),
};

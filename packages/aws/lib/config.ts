export type StageName = "dev" | "stg" | "prd";

export type Config = {
  stageName: StageName;
  projectName: string;
  projectNameWithStageName: string;
};

const projectName = "bun-apprunner";

export const getConfig = (stageName: string): Config => {
  if (stageName === "dev") {
    return {
      stageName: stageName,
      projectName: projectName,
      projectNameWithStageName: `${stageName}-${projectName}`,
    };
  } else {
    throw new Error("no found environment");
  }
};

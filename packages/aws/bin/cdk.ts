import * as cdk from "aws-cdk-lib";
import { AppStack } from "../lib/app-stack";
import { getConfig, StageName } from "../lib/config";

const app = new cdk.App();

const stageName: StageName = app.node.tryGetContext("stageName");
const config = getConfig(stageName);

new AppStack(app, `${config.projectName}-app`, { config: config });

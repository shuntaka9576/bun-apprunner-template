import { Construct } from "constructs";
import { pascalCase } from "pascal-case";
import * as path from "path";

import { aws_iam as iam, aws_s3 as s3, CfnOutput } from "aws-cdk-lib";
import * as apprunner from "@aws-cdk/aws-apprunner-alpha";
import { Config } from "../config";
import { DockerImageAsset, Platform } from "aws-cdk-lib/aws-ecr-assets";

const DEFAULT_PORT = 3000;

type Props = {
  sqliteReplicateBucket: s3.Bucket;
  config: Config;
};

export class HostingConstruct extends Construct {
  constructor(scope: Construct, id: string, props: Props) {
    super(scope, id);

    const instanceRole = new iam.Role(
      this,
      `${pascalCase(props.config.projectName)}AppRunnerInstanceRole`,
      {
        assumedBy: new iam.ServicePrincipal("tasks.apprunner.amazonaws.com"),
      },
    );
    instanceRole.addToPolicy(
      new iam.PolicyStatement({
        actions: [
          "s3:GetBucketLocation",
          "s3:ListBucket",
          "s3:PutObject",
          "s3:DeleteObject",
          "s3:GetObject",
        ],
        effect: iam.Effect.ALLOW,
        resources: [
          `arn:aws:s3:::${props.sqliteReplicateBucket.bucketName}`,
          `arn:aws:s3:::${props.sqliteReplicateBucket.bucketName}/*`,
        ],
      }),
    );

    const asset = new DockerImageAsset(
      this,
      `${pascalCase(props.config.projectName)}Assets`,
      {
        directory: path.join(__dirname, "../../../../"),
        file: "Dockerfile.app",
        platform: Platform.custom("linux/x86_64"),
      },
    );

    const appRunnerService = new apprunner.Service(
      this,
      `${pascalCase(props.config.projectName)}AppRunnerService`,
      {
        source: apprunner.Source.fromAsset({
          asset: asset,
          imageConfiguration: {
            port: DEFAULT_PORT,
            environmentVariables: {
              PORT: DEFAULT_PORT.toString(),
              DB_PATH: "todo.db",
              REPLICATE_BUCKET_NAME: props.sqliteReplicateBucket.bucketName,
              REPLICATE_PATH: "dbs",
            },
          },
        }),
        instanceRole,
      },
    );
    new CfnOutput(this, "AppRunnerUri", {
      value: `https://${appRunnerService.serviceUrl}`,
    });
  }
}

import { Construct } from "constructs";

import { Config } from "../config";
import { aws_s3 as s3, RemovalPolicy } from "aws-cdk-lib";
import { pascalCase } from "pascal-case";

type Props = {
  config: Config;
  accountId: string;
};

export class DatastoreConstruct extends Construct {
  public sqliteReplicateBucket: s3.Bucket;

  constructor(scope: Construct, id: string, props: Props) {
    super(scope, id);

    this.sqliteReplicateBucket = new s3.Bucket(
      this,
      `${pascalCase(props.config.projectName)}SqliteReplicateBucket`,
      {
        bucketName:
          `${props.config.projectName}-sqlite-replicate-bucket-${props.accountId}`,
        removalPolicy: RemovalPolicy.DESTROY,
      },
    );
  }
}

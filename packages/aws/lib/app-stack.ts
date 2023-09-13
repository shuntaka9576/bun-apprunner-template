import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import { HostingConstruct } from "./constructs/hosting";
import { DatastoreConstruct } from "./constructs/datastore";
import { Config } from "./config";
import { pascalCase } from "pascal-case";

type Props = {
  config: Config;
} & cdk.StackProps;

export class AppStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: Props) {
    super(scope, id, props);

    const datastoreConstruct = new DatastoreConstruct(
      this,
      `${pascalCase(props.config.projectName)}DatastoreConstruct`,
      {
        config: props.config,
        accountId: this.account,
      },
    );

    new HostingConstruct(
      this,
      `${pascalCase(props.config.projectName)}HostingConstruct`,
      {
        config: props.config,
        sqliteReplicateBucket: datastoreConstruct.sqliteReplicateBucket,
      },
    );
  }
}

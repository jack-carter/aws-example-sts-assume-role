#!/usr/bin/env node
import 'source-map-support/register';
import * as CDK from '@aws-cdk/core';
import { CdkPlaygroundStack } from '../lib/cdk-playground-stack';

const app = new CDK.App();
new CdkPlaygroundStack(app, 'CdkPlaygroundStack',{
    env: {
        account: process.env.CDK_DEFAULT_ACCOUNT,
        region: process.env.CDK_DEFAULT_REGION
    }
});

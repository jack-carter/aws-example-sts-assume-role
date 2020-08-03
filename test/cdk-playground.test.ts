import * as CDK from '@aws-cdk/core';
import * as APIGW from '@aws-cdk/aws-apigatewayv2'
import * as Lambda from '@aws-cdk/aws-lambda'
import * as IAM from '@aws-cdk/aws-iam'

import { expect as expectCDK, matchTemplate, MatchStyle } from '@aws-cdk/assert';

import * as CdkPlayground from '../lib/cdk-playground-stack';

test('Empty Stack', () => {
});

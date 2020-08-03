import * as CDK from '@aws-cdk/core';
import * as ACM from '@aws-cdk/aws-certificatemanager'
import * as APIGW from '@aws-cdk/aws-apigatewayv2'
import * as Lambda from '@aws-cdk/aws-lambda'
import * as Route53 from '@aws-cdk/aws-route53'
import * as Targets from '@aws-cdk/aws-route53-targets'

const aws = {
  region: 'us-east-1'
}

// TODO: Setup a testable User Pool w/ custom attributes
let userPool = {
  id: 'us-east-1_3EtfaMeCQ',
  appClient: {
    id: '1kcs69p9ljmd59oirkls29jjiq'
  }
}

const project = {
  src: './src'
}

export class CdkPlaygroundStack extends CDK.Stack {
  constructor(scope: CDK.Construct, id: string, props?: CDK.StackProps) {
    super(scope, id, props);

    // TODO: Setup a testable FAAdmin user w/ 'custom:tenantBid' & 'role'
    // TODO: Setup a testable Student user w/ 'custom:userBid'
    
    // Create the API Gateway HTTP API for this service. 
    let api = new APIGW.HttpApi(this,'TokenService.HttpApi',{
      apiName: "TokenService.HTTP-API",
      corsPreflight: {
        allowOrigins: ['*'],
        allowMethods: [
          APIGW.HttpMethod.OPTIONS,
          APIGW.HttpMethod.GET],
      }
    })

    // Create the JWT Authorizer we'll use to authorize each request.
    let authorizer = new APIGW.CfnAuthorizer(this,'TokenService.Authorizer',{
      name: 'TokenService.Authorizer',
      apiId: api.httpApiId,
      authorizerType: 'JWT', 
      identitySource: ['$request.header.Authorization'],
      jwtConfiguration: {
        audience: [userPool.appClient.id],
        issuer: `https://cognito-idp.${aws.region}.amazonaws.com/${userPool.id}`
      }
    })

    // Route path to the Token Service
    let routes = api.addRoutes({
      path: '/tokens',
      methods: [APIGW.HttpMethod.GET],
      integration: new APIGW.LambdaProxyIntegration({
        handler: new Lambda.Function(this,'TokenService.LambdaFunction',{
          code: Lambda.Code.fromAsset(project.src),
          handler: 'tokens.handler',
          runtime: Lambda.Runtime.NODEJS_12_X
        })
      }),
    })

    // Attach our JWT Authorizer to each Route. 
    routes.forEach(route => { // TODO: use Ramda instead
      let cfn = route.node.defaultChild as APIGW.CfnRoute
      cfn.authorizationType = 'JWT'
      cfn.authorizerId = authorizer.ref
    })

    // Add Stages
    api.addStage(`TokenService.Stage.INT`,{
      stageName: `INT`,
    })  

    api.addStage(`TokenService.Stage.STG`,{
      stageName: `STG`,
    })

    api.addStage('TokenService.Stage.UAT',{
      stageName: 'UAT'
    })

    // API Mapping
    new APIGW.HttpApiMapping(this,'TokenService.HTTP-API.Mapping', {
      domainName: new APIGW.DomainName(this,'TokenService.CustomDomain', { 
        domainName: 'api.myshinobi.com',
        certificate: ACM.Certificate.fromCertificateArn(this,'TokenService.Certificate',
        'arn:aws:acm:us-east-1:662003365932:certificate/a931c525-91f6-4b26-a9c5-77e616a782dc'
      )
      }),
      apiMappingKey: 'tokens',
      api: api,
      stage: api.defaultStage,
    })

    /*
    new Route53.CnameRecord(this,'TokenService.LatencyRecord',{
      domainName: 'api.myshinobi.com',
      zone: Route53.HostedZone.fromLookup(this,'TokenService.HostedZone',{
        domainName: 'api.myshinobi.com'
      })
    })
    */
  }
}

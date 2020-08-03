# Prototyping the infrastructure through AWS CLI
This outlines the AWS CLI commands which are equivalent to the infrastructure configuration produced by the associated CDK code.

## Infrastructure Configuration
This is the order in which the inter-dependencies within this infrastructure require it to be constructed:

1. SSL Certificate
1. User Pool
1. API
1. JWT Authorizer
1. Route
1. Stage
1. Regional Domain Name
1. API Mapping
1. Domain Name
1. Hosted Zone
1. Latency Record
1. DNS CNAME Record

## Verifying the configuration through AWS CLI

### SSL Certificates
List available certificates:
```
aws acm list-certificates
```

### User Pools, Custom Attributes, and Users
List available User Pools:
```
aws cognito-idp list-user-pools --max-results 60
```

List Custom Attributes for a User Pool:
> *SPECIAL NOTE*:
>
> At the present time the AWS CLI does not provide a means to list the Custom Attributes configured for a User Pool. To verify those you must use the AWS Console.

List Users within the User Pool:
```
aws cognito-idp list-users --user-pool-id <user-pool-id>
```

List User information:
```
aws cognito-idp admin-get-user --user-pool-id <user-pool-id> --username <username>
```

### APIs, Authorizers, Routes, and Integrations
List the available APIs:
```
aws apigatewayv2 get-apis
```

List API information:
```
aws apigatewayv2 get-api --api-id <api-id>
```

List Authorizers for an API:
```
aws apigatewayv2 get-authorizers --api-id <api-id>
```

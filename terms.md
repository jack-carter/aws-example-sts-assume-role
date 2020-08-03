# Terms & Terminology

JwtAuthorizer.Type     = JWT
JwtAuthorizer.Audience = UserPool.AppClient.Id
JwtAuthorizer.Issuer   = https://cognito-idp.us-east-1.amazonaws.com/<UserPool.Id>
JwtAuthorizer.IdentitySource = $request.header.Authorization

## AWS CLI equivalents

```
aws apigatewayv2 create-authorizer
```
turns into
```
from '@aws-cdk/aws-apigatewayv2.CfnAuthorizer'

new CfnAuthorizer(this, 'id-string', {
    apiId: <api-id>,
    authorizerType: 
})
```


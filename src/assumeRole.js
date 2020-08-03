const AWS = require('aws-sdk')

function assumeRole(auth) {
    var params = {
        RoleArn: '',
        RoleSessionName: 'TokenVendingSession',
        DurationSeconds: 900,
        TransitiveTagKeys: [], // 'CostCenter', 'Project', ...
        Tags: [
            {Key:"tenantBid", Value: auth.claims["custom:tenantBid"]}
        ],
    }
    
    return new Promise((resolve,reject) => {
        const STS = new AWS.STS()
        STS.assumeRole(params, (err, data) => {
            console.log(err,err.stack)
            resolve(data)
        })
    })
}

async function sampleAssumedRole(auth) {
    // TODO: this is a test response
    // DEBUG: we'll use a special claim value of 'unauthorized:user'
    console.log(`TokenService: assuming role ...`)
    return ((auth||{}).claims||{})['token_use'] != 'id' ? null : Promise.resolve({
        Audience: "client.5498841531868486423.1548@apps.example.com", 
        PackedPolicySize: 123, 
        Provider: "www.amazon.com", 
        SubjectFromWebIdentityToken: "amzn1.account.AF6RHO7KZU5XRVQJGXK6HEXAMPLE",
        AssumedRoleUser: {
            Arn: "arn:aws:sts::123456789012:assumed-role/FederatedWebIdentityRole/app1", 
            AssumedRoleId: "AROACLKWSDQRAOEXAMPLE:app1"
        }, 
        Credentials: {
            AccessKeyId: "AKIAIOSFODNN7EXAMPLE", 
            Expiration: new Date(), 
            SecretAccessKey: "wJalrXUtnFEMI/K7MDENG/bPxRfiCYzEXAMPLEKEY", 
            SessionToken: "AQoDYXdzEE0a8ANXXXXXXXXNO1ewxE5TijQyp+IEXAMPLE"
        }, 
    })
}

module.exports = { assumeRole }


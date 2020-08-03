const { authorize } = require('./authorization')
const { assumeRole } = require('./assumeRole')

exports.handler = async (event,context) => {
    console.log(`TokenService: begins`)
    function returnToken(token) {
        return token // NOTE: relying on Format 2.0 to handle the translation
    }
    
    let LOG = heading => result => {
        console.log(`${heading}: ${JSON.stringify(result,null,4)}`)
        return result
    }

    let response = authorize(event,context)
        .then(LOG('auth'))
        .then(onFail(403))
        .then(assumeRole)
        .then(LOG('token'))
        .then(onFail(500))
        .then(returnToken)
        .then(LOG('response'))
        .catch(FAILURE)

    console.log(`TokenService: ends with ${JSON.stringify(response,null,4)}`)

    return response
}

function diagnose(event,context) {
    const { JwtAuthorization } = require('./authorization')
    let diagnostics = {
        event: event,
        context: context,
        env: process.env,
        authorizer: JwtAuthorization.of(event),
    }
    console.log(JSON.stringify(diagnostics,null,4))
    return diagnostics
}

function FAILURE(code) { 
    return {
        statusCode: code
    }
}

function onFail(code) {
    return item => {
        if (item) 
            return item; 
        throw code;
    }
}

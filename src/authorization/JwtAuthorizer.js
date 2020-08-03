const JwtAuthorization = require('./JwtAuthorization')

module.exports = class JwtAuthorizer /* implements Authorizer */ {
    constructor(event,context) {
        this.authorization = JwtAuthorization.of(event)
    }

    authorize() {
        return this.authorization
    }
}
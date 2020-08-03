module.exports = class CustomerAuthorizer /* : implements Authorizer */ {
    constructor(event,context) {
        this.event = event
        this.context = context
    }

    async isAuthorized() /* : Promise<boolean> */ {
        if (!this.validated) {
            this.authorized = await validateAuthorizationToken(this.event,this.getRoles())
            this.validated = true
        }

        return this.authorized
    }

    getRoles() /* : Role[] */ {
        return []
    }
}

// PLACEHOLDER: for a separate custom authorizer library.
async function validateAuthorizationToken(event,roles) {
    return false
}
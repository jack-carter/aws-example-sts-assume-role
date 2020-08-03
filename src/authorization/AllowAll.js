module.exports = class AllowAll /* implements Authorizer */ {
    constructor(event,context) {}

    async isAuthorized() /* : Promise<boolean> */ {
        return true;
    }
}

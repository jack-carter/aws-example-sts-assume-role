module.exports = class DenyAll /* implements Authorizer */ {
    constructor(event,context) {}

    async isAuthorized() /* : Promise<boolean> */ {
        return false;
    }
}
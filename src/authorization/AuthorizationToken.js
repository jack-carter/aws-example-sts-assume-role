module.exports = class AuthorizationToken {
    static of(event) {
        let header = event.headers.Authorization || event.headers.Authorization;
        return header.split(' ').slice(1);
    }
}

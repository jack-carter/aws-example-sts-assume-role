module.exports = class JwtAuthorization {
    static of(event) {
        let authorizer = ((event||{}).requestContext||{}).authorizer;
        return (authorizer||{}).jwt ? authorizer.jwt : authorizer;        
    }
}
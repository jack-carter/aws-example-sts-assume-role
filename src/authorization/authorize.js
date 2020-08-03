const JwtAuthorizer = require("./JwtAuthorizer")

module.exports = async function authorize(event,context) {
    /*
    process.env.AUTHORIZER = process.env.AUTHORIZER || "JwtAuthorizer"
    const AuthStrategy = require(`./${process.env.AUTHORIZER}`)
    */
    let authorizer = new JwtAuthorizer(event,context)
    return authorizer.authorize()
}

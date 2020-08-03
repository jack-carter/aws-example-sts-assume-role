export default class Configurator {
    constructor(token) {
        this.token = token
    }

    params() /* : AssumeRoleWithWebIdentityRequest */ {
        let params = {}

        this
            .RoleArn(params)
            .DurationSeconds(params)
            .RoleSessionName(params)
            .WebIdentityToken(params)
            .ProviderId(params)
            .PolicyArns(params)
            .InlinePolicy(params)

        return params
    }

    RoleArn(params) {
        params.RoleArn = `${process.env.TOKEN_SERVICE_ASSUMED_ROLE_ARN}`
        return this
    }

    PolicyArns(params) {
        params.PolicyArns = [process.evn.TOKEN_SERVICE_ASSUMED_ROLE_POLICY_ARN || 'arn:aws:INVALID_POLICY_ARN']
        return this
    }

    DurationSeconds(params) {
        params.DurationSeconds = +(process.env.TOKEN_SERVICE_ASSUME_ROLE_DURATION || 900)
        return this
    }

    RoleSessionName(params) {
        params.RoleSessionName = process.env.TOKEN_SERVICE_ASSUMED_ROLE_SESSION_NAME || "token-service-session"
        return this
    }

    WebIdentityToken(params) {
        if (this.token)
            params.WebIdentityToken = this.token
        return this
    }

    ProviderId(params) {
        // TODO: need to figure this out
        if (false)
            params.ProviderId = 'none'
        return this
    }

    InlinePolicy(params) {
        // TODO: need to figure this out
        if (false)
            params.Policy = 'none'
        return this
    }
}
import JwtAuthorization from '../JwtAuthorization'

test(`Null 'event' should return 'null' authorizer`,() => {
    let auth = JwtAuthorization.of(null)
    expect(auth).toBeNull()
})

test(`Null 'requestContext' should return 'null' authorizer`,() => {
    let auth = JwtAuthorization.of({})
    expect(auth).toBeNull()
})

test(`Null 'authorizer' should return 'null' authorizer`,() => {
    let auth = JwtAuthorization.of({ requestContext: {} })
    expect(auth).toBeNull()
})

test(`Non-null 'authorizer' should return the embedded authorizer`,() => {
    let authorizer = {}
    let auth = JwtAuthorization.of({
        requestContext: {
            authorizer: authorizer
        }
    })

    expect(auth === authorizer).toBe(true)
})

test(`Presence of 'jwt' should return embedded 'jwt'`,() => {
    let jwt = {}
    let auth = JwtAuthorization.of({
        requestContext: {
            authorizer: {
                jwt: jwt
            }
        }
    })

    expect(auth === jwt).toBe(true)
})

test(`Absence of 'jwt' should return 'authorizer' instead`,() => {
    let authorizer = {}
    let auth = JwtAuthorization.of({
        requestContext: {
            authorizer: authorizer
        }
    })

    expect(auth === authorizer).toBe(true)
})

test(`Presence of 'jwt' should return 'claims' from 'jwt`,() => {
    let authClaims = ['authorize']
    let jwtClaims = ['jwt']
    let auth = JwtAuthorization.of({
        requestContext: {
            authorizer: {
                claims: authClaims,
                jwt: {
                    claims: jwtClaims
                }
            }
        }
    })

    expect(auth.claims).toEqual(jwtClaims)
})

test(`Absence of 'jwt' should return 'claims' from 'jwt' and not 'authorize'`,() => {
    let authClaims = ['authorize']
    let auth = JwtAuthorization.of({
        requestContext: {
            authorizer: {
                claims: authClaims
            }
        }
    })

    expect(auth.claims).toEqual(authClaims)
})
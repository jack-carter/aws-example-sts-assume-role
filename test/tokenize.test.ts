describe('Tokenizing Logic',() => {
    const chain = (authorize,assumeRole) => {
        return authorize()
            .then(onFail(403))
            .then(assumeRole)
            .then(onFail(500))
            .then(returnToken)
            .catch(FAILURE)
    }

    function returnToken(token) {
        return {
            statusCode: 200,
            body: token    
        }
    }
    
    function onFail(code) {
        return item => {
            if (item) 
                return item; 
            throw code;
        }
    }
    function FAILURE(code) { 
        return {
            statusCode: code
        }
    }
    
    test(`should succeed when both authorize() and assumeRole() succeed`,() => {
        let authorize = token => Promise.resolve({ claims:[] })
        let assumeRole = auth => Promise.resolve({ value:'token' })

        expect(chain(authorize,assumeRole)).resolves.toStrictEqual({
            statusCode: 200,
            body: { value:'token' }
        })
    })

    test(`should respond with 403 when authorize() fails`,() => {
        let authorize = token => Promise.resolve(null)
        let assumeRole = auth => Promise.resolve({ value:'token' })

        expect(chain(authorize,assumeRole)).resolves.toStrictEqual({
            statusCode: 403,
        })
    })

    test(`should respond with 500 when assumeRole() fails`,() => {
        let authorize = token => Promise.resolve({ claims:[] })
        let assumeRole = auth => Promise.resolve(null)

        expect(chain(authorize,assumeRole)).resolves.toStrictEqual({
            statusCode: 500,
        })
    })
})


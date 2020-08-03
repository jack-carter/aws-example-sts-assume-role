describe('Promises',() => {

    // Basic Operation

    test(`should require one argument`,() => {
        new Promise(() => {})
    })

    test(`should return what's passed to resolve()`,() => {
        expect(Promise.resolve(1)).resolves.toEqual(1)
    })

    test(`should return what's passed to reject()`,() => {
        expect(Promise.reject(3)).rejects.toEqual(3)
    })

    // When using handlers

    test (`should invoke its handler immediately`,() => {
        let called = false
        new Promise((resolve,reject) => { called = true })
        expect(called).toBe(true)
    })

    test(`should pass 2 non-null arguments`,() => {
        new Promise((resolve,reject) => {
            expect(resolve).not.toBeNull()
            expect(reject).not.toBeNull()
        })
    })

    test(`'resolve' should resolve the Promise to the same`,() => {
        expect(new Promise(resolve => resolve(13))).resolves.toEqual(13)
    })

    test(`'reject' should reject the Promise to the same`,() => {
        expect(new Promise((resolve,reject) => reject(13))).rejects.toEqual(13)
    })

    // When using then() / catch()

    test(`resolve() should pass-thru its value directly`,() => {
        return Promise.resolve(1).then(value => expect(value).toEqual(1))
    })

    test(`reject() should pass it's value to catch()`,() => {
        return Promise.reject(1).catch(value => expect(value).toEqual(1))
    })

    test(`'resolve' should pass it's value to then()`,() => {
        return new Promise(resolve => resolve(3))
            .then(value => expect(value).toEqual(3))
    })

    test(`'reject' should pass it's value to catch()`,() => {
        return new Promise((resolve,reject) => reject(5))
            .catch(value => expect(value).toEqual(5))
    })

    // When using non-chained then() vs chained then()

    test(`should pass the same value to non-chained then() clauses`,() => {
        let promise = Promise.resolve(7)

        promise.then(value => expect(value).toEqual(7))
        promise.then(value => expect(value).toEqual(7))

        return promise
    })
    
    test(`chained then() clauses should be mutating`,async () => {
        await Promise.resolve(9)
            .then(value => { expect(value).toEqual(9); return 7; } )
            .then(value => expect(value).toEqual(7))
    })

    // When using finally()

    test(`should return value resolved when using finally()`,() => {
        let promise = Promise.resolve(11).finally(() => {})
        expect(promise).resolves.toEqual(11)
    })

    test(`should return value rejected when using finally()`,() => {
        let promise = Promise.reject(11).finally(() => {})
        expect(promise).rejects.toEqual(11)
    })
    
    test(`should call finally() when resolved`,async () => {
        let checker = jest.fn()
        await Promise.resolve(11).finally(checker)
        expect(checker).toHaveBeenCalled()
    })
    
    test(`should require catch() to use finally() when rejected`,async () => {
        let checker = jest.fn()
        await Promise.reject(11).catch(n => n).finally(checker)
        expect(checker).toHaveBeenCalled()
    })

    // When using catch()

    test(`should return value resolved when using catch()`,() => {
        let caught = jest.fn()
        let promise = Promise.resolve(7).catch(caught)
        expect(promise).resolves.toEqual(7)
        expect(caught).not.toHaveBeenCalled()
    })

    test(`should return result of catch() when rejected`,async () => {
        expect(await Promise.reject(9).catch(n => n+1)).toEqual(10)
    })

    // When handling rejections

    test(`should invoke only the nearest catch()`,async () => {
        let catcher = jest.fn()
        await Promise.reject(1)
            .catch(n => n)
            .catch(catcher)

        expect(catcher).not.toHaveBeenCalled()
    })

    test(`should invoke the first catch() to actually handle the rejection`,async () => {
        let catcher = jest.fn()
        await Promise.reject(1)
            .catch(n => { throw n })
            .catch(catcher)

        expect(catcher).toHaveBeenCalledTimes(1)
    })

    // When using catch() to smooth out control flow

    test(`should allow use of catch() to continue control flow`,async () => {
        let result = await Promise.reject(3)
            .catch(n => 5)
            .then(n => 7)
        expect(result).toEqual(7)
    })

    // When using complex Promise chains

    test(`should allow normalizing control flow`,() => {
        let authorize = () => Promise.resolve({ claims:[] })
        let assume = () => Promise.resolve({ assumed:true })

        expect(authorize().then(assume)).resolves.toStrictEqual({ assumed:true })
    })

    test(`should allow break out of then() chain upon rejection`,() => {
        let authorize = () => Promise.reject(403)
        let assume = () => Promise.resolve({ assumed:true })

        expect(authorize().then(assume)).rejects.toStrictEqual(403)
    })

    test(`should allow breaking out of then() chain at any poit`,() => {
        let authorize = () => Promise.resolve({ claims:[] })
        let assume = () => Promise.reject(500)

        expect(authorize().then(assume)).rejects.toStrictEqual(500)
    })

    test(`should call central catch() anywhere in a then() chain`,() => {
        let chain = Promise.reject(403)
            .then(code => 200)
            .catch(code => {return { statusCode:code }})

        expect(chain).resolves.toStrictEqual({ statusCode:403 })
    })

    test(`should allow a break anywhere in then() chain`,() => {
        let chain = Promise.resolve(null)
            .then(data => data)
            .then(data => { throw 500 })
            .catch(code => {return { statusCode:code }})

        expect(chain).resolves.toStrictEqual({ statusCode:500 })
    })

    test(`should allow a break anywhere in then() chain`,() => {
        let authorize = () => Promise.resolve({ claims:[] })
        let assume = auth => Promise.resolve({ role:'role' })
        let failauth = () => Promise.reject(403)
        let failassume = auth => { throw 500 }

        {
            let chain = authorize().then(assume)
                .catch(code => {return { statusCode:code }})

            expect(chain).resolves.toStrictEqual({ role:'role' })
        }
        {
            let chain = failauth().then(assume)
                .catch(code => {return { statusCode:code }})

            expect(chain).resolves.toStrictEqual({ statusCode:403 })
        }
        {
            let chain = authorize().then(failassume)
                .catch(code => {return { statusCode:code }})

            expect(chain).resolves.toStrictEqual({ statusCode:500 })
        }
    })

})
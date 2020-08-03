const DenyAll = require('../DenyAll')

test('isAuthorized() should be true',() => {
    let authorizer = new DenyAll(null,null)
    expect(authorizer.isAuthorized()).resolves.toBe(false)
})
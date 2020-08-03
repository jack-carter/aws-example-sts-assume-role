const AllowAll = require('../AllowAll')

test('isAuthorized() should be true',() => {
    let authorizer = new AllowAll(null,null)
    expect(authorizer.isAuthorized()).resolves.toBe(true)
})
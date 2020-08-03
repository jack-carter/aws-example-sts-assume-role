describe('Configurator class',() => {
    const ENV = process.env
    const LOAD = () => require('../Configurator').default

    beforeEach(() => {
        jest.resetModules()
        process.env = { ...ENV }
    })

    afterAll(() => {
        process.env = ENV
    })

    test('it should construct w/ no parameters',() => {
        let Configurator = LOAD()
        expect(new Configurator()).toBeDefined()
    })
})
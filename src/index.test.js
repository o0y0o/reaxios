import axios from 'axios'
import AxiosMockAdapter from 'axios-mock-adapter'

const Reaxios = require('./index').default

const testUrl = 'https://foo.bar'
const res = { data: { foo: 'bar' } }

const mock = new AxiosMockAdapter(axios)
mock.onGet(testUrl).reply(200, res)
mock.onPost(testUrl).reply(200, res)
mock.onPut(testUrl).reply(200, res)
mock.onDelete(testUrl).reply(200, res)

describe('Reaxios', () => {
  it('should send GET request', async () => {
    const successFn = jest.fn()
    await Reaxios.get(testUrl).then(successFn)
    expect(successFn).toBeCalledWith(res)
  })

  it('should send POST request', async () => {
    const successFn = jest.fn()
    await Reaxios.post(testUrl).then(successFn)
    expect(successFn).toBeCalledWith(res)
  })

  it('should send PUT request', async () => {
    const successFn = jest.fn()
    await Reaxios.put(testUrl).then(successFn)
    expect(successFn).toBeCalledWith(res)
  })

  it('should send DELETE request', async () => {
    const successFn = jest.fn()
    await Reaxios.delete(testUrl).then(successFn)
    expect(successFn).toBeCalledWith(res)
  })
})

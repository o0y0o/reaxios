import mockAxios from 'jest-mock-axios'

jest.mock('axios', () => mockAxios)
const Reaxios = require('./index').default

const testUrl = 'https://foo.bar'
const res = { data: { foo: 'bar' } }

describe('Reaxios', () => {
  afterEach(() => mockAxios.reset())

  it('should send GET request', async () => {
    const successFn = jest.fn()
    Reaxios.get(testUrl).then(successFn)
    mockAxios.mockResponseFor({ url: testUrl, method: 'GET' }, res)
    expect(successFn).toBeCalledWith(res.data)
  })

  it('should send POST request', async () => {
    const successFn = jest.fn()
    Reaxios.post(testUrl).then(successFn)
    mockAxios.mockResponseFor({ url: testUrl, method: 'POST' }, res)
    expect(successFn).toBeCalledWith(res.data)
  })

  it('should send PUT request', async () => {
    const successFn = jest.fn()
    Reaxios.put(testUrl).then(successFn)
    mockAxios.mockResponseFor({ url: testUrl, method: 'PUT' }, res)
    expect(successFn).toBeCalledWith(res.data)
  })

  it('should send DELETE request', async () => {
    const successFn = jest.fn()
    Reaxios.delete(testUrl).then(successFn)
    mockAxios.mockResponseFor({ url: testUrl, method: 'DELETE' }, res)
    expect(successFn).toBeCalledWith(res.data)
  })
})

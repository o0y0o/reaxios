import axios from 'axios'
import Repromise from './Repromise'

function notEmpty(v) {
  return v != null && v !== ''
}

function isFn(v) {
  return typeof v === 'function'
}

export default class Reaxios {
  static get = url => new Reaxios(url, 'GET')
  static post = url => new Reaxios(url, 'POST')
  static put = url => new Reaxios(url, 'PUT')
  static delete = url => new Reaxios(url, 'DELETE')

  #url
  #method
  #headers = {}
  #params = {}
  #body
  #abortController = new AbortController()
  #requestTransformers = []
  #responseTransformers = [response => response.data]

  constructor(url, method = 'GET') {
    if (!url) throw new TypeError('URL is required')
    this.#url = url
    this.#method = method
  }

  header(key, val) {
    if (notEmpty(val)) this.#headers[key] = val
    return this
  }

  auth(val) {
    return this.header('Authorization', val)
  }

  bearer(val) {
    return notEmpty(val) ? this.auth(`Bearer ${val}`) : this
  }

  param(key, val) {
    if (notEmpty(val)) this.#params[key] = val
    return this
  }

  params(val = {}) {
    return Object.entries(val).reduce((o, [k, v]) => o.param(k, v), this)
  }

  body(val) {
    if (notEmpty(val)) this.#body = val
    return this
  }

  transformRequest(...transformers) {
    if (transformers.length)
      this.#requestTransformers.push(...transformers.filter(isFn))
    else this.#requestTransformers = []
    return this
  }

  transformResponse(...transformers) {
    if (transformers.length)
      this.#responseTransformers.push(...transformers.filter(isFn))
    else this.#responseTransformers = []
    return this
  }

  cancel() {
    this.#abortController.abort()
  }

  async then(onFulfill, onReject) {
    const promise = (async () => {
      let data = this.#body
      for (const transformer of this.#requestTransformers)
        data = await transformer(data)

      let response = await axios({
        url: this.#url,
        method: this.#method,
        headers: this.#headers,
        params: this.#params,
        data,
        signal: this.#abortController.signal
      })
      for (const transformer of this.#responseTransformers)
        response = await transformer(response)

      return response
    })().then(onFulfill, onReject)

    return new Repromise(promise, () => this.cancel())
  }

  catch(onReject) {
    return this.then(undefined, onReject)
  }
}

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
  #abortController
  #requestTransformers = []
  #responseTransformers = []

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

  transformRequest(fn) {
    if (fn == null) this.#requestTransformers = []
    if (isFn(fn)) this.#requestTransformers.push(fn)
    if (Array.isArray(fn)) fn.forEach(f => this.transformRequest(f))
    return this
  }

  transformResponse(fn) {
    if (fn == null) this.#responseTransformers = []
    if (isFn(fn)) this.#responseTransformers.push(fn)
    if (Array.isArray(fn)) fn.forEach(f => this.transformResponse(f))
    return this
  }

  cancel() {
    this.#abortController?.abort()
  }

  then(onFulfill, onReject) {
    this.#abortController = new AbortController()
    const promise = axios({
      url: this.#url,
      method: this.#method,
      headers: this.#headers,
      params: this.#params,
      data: this.#body,
      transformRequest: this.#requestTransformers,
      transformResponse: this.#responseTransformers,
      signal: this.#abortController.signal
    })
      .then(response => response.data)
      .then(onFulfill, onReject)
    return new Repromise(promise, () => this.cancel())
  }

  catch(onReject) {
    return this.then(undefined, onReject)
  }
}

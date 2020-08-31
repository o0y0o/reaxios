export default class Repromise {
  #promise

  constructor(promsie, cancel) {
    this.#promise = promsie
    this.cancel = cancel
  }

  then(onFulfill, onReject) {
    const promise = this.#promise.then(onFulfill, onReject)
    return new Repromise(promise, this.cancel)
  }

  catch(onReject) {
    const promise = this.#promise.catch(onReject)
    return new Repromise(promise, this.cancel)
  }
}

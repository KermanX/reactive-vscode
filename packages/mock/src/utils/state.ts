import { EventEmitter } from '../class/EventEmitter'

export function createState<T>(initial: T) {
  const eventEmitter = new EventEmitter<T>()
  return {
    value: initial,
    eventEmitter,
    update(newVal: T) {
      this.value = newVal
      this.fire()
    },
    event: eventEmitter.event,
  }
}

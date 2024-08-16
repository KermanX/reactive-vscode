import { EventEmitter } from '../class/EventEmitter'

export function createState<T>(initial: T) {
  const eventEmitter = new EventEmitter<T>()
  return {
    value: initial,
    eventEmitter,
    update(newVal: T) {
      this.value = newVal
      eventEmitter.fire(newVal)
    },
    event: eventEmitter.event,
  }
}

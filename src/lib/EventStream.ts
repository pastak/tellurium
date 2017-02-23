import * as event from 'eventemitter2'
import * as Rx from 'rxjs/Rx'

export default class EventStream extends event.EventEmitter2 {
  private eventEmitter

  constructor () {
    super()
    this.eventEmitter = new event.EventEmitter2
    this.buildSubscribers()
  }

  push (event) {
    this.eventEmitter.emit(event.type, event)
  }

  private emitOperation (type, event) {
    this.emit('operation', { type, event })
  }

  private buildSubscribers () {
    const clicks = Rx.Observable.fromEvent(this.eventEmitter, 'click')
    const changes = Rx.Observable.fromEvent(this.eventEmitter, 'change')

    // clicks
    //   .buffer(clicks.debounceTime(300))
    //   .groupBy((clicks) => clicks.length)
    //   .subscribe((observable) => {
    //     const clicksCount = observable.key
    //     if (clicksCount === 1) {
    //       observable.map((clicks) => clicks[0]).subscribe((event) => {
    //         this.emitOperation('click', event)
    //       })
    //     } else {
    //       observable.map((clicks) => clicks[0]).subscribe((event) => {
    //         this.emitOperation('doubleClick', event)
    //       })
    //     }
    //   })

    clicks.subscribe((event) => {
      this.emitOperation('click', event)
    })
    changes.subscribe((event) => {
      this.emitOperation('fillIn', event)
    })
  }
}

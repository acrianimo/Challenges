class Observable {
  constructor(subscribe) {
    this._subscribe = subscribe;
  }

  subscribe(observer) {
    return this._subscribe(observer);
  }

  map(projector) {
    const self = this;
    return new Observable(function subscribe(observer) {
      const subscription = self.subscribe({
        next: e => observer.next(projector(e))
      });
      return subscription;
    });
  }

  filter(predicate) {
    const self = this;
    return new Observable(function subscribe(observer) {
      const subscription = self.subscribe({
        next: e => {
          if (predicate(e)) {
            observer.next(e);
          }
        }
      });
      return subscription;
    });
  }

  static on(value) {
    return new Observable(function subscribe(observer) {
      observer.next(value);
      observer.complete();
      return {
        unsubscribe: () => {}
      };
    });
  }

  observerOn(scheduler) {
    const self = this;
    return new Observable(function subscribe(observer) {
      const subscription = self.subscribe({
        next: e => scheduler(() => observer.next(e)),
        complete: e => scheduler(() => observer.complete(e)),
        error: e => scheduler(() => observer.error(e))
      });
      return subscription;
    });
  }

  static fromEvent(domElement, eventType) {
    return new Observable(function subscribe(observer) {
      const handleEvent = e => {
        observer.next(e);
      };
      domElement.addEventListener(eventType, handleEvent);
      return {
        unsubscribe: () =>
          domElement.removeEventListener(eventType, handleEvent)
      };
    });
  }

  share() {
    const subject = new Subject();
    this.subscribe(subject);
    return subject;
  }
}

class Subject extends Observable {
  constructor() {
    super(observer => {
      this.observers.add(observer);

      return {
        unsubscribe: () => this.observers.delete(observer)
      };
    });
    this.observers = new Set();
  }

  next(e) {
    for (const observer of [...this.observers]) {
      observer.next(e);
    }
  }

  error(e) {
    for (const observer of [...this.observers]) {
      observer.error(e);
    }
  }

  complete(e) {
    for (const observer of [...this.observers]) {
      observer.complete(e);
    }
  }
}

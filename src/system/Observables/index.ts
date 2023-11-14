import { Observable, from, Subject, multicast } from 'rxjs';

const observable = new Observable((subscriber) => {
    subscriber.next(1);
    subscriber.next(2);
    subscriber.next(3);
    setTimeout(() => {
        subscriber.next(4);
        subscriber.complete();
    }, 1000);
});

console.log('observable: just before subscribe');
const callbacks = {
    next(x) {
        console.log('observable: got value ' + x);
    },
    error(err) {
        console.error('observable: something wrong occurred: ' + err);
    },
    complete() {
        console.log('observable: done');
    },
}
console.log('observable: just after subscribe');


export function createObserver<T>(data: T) {
    return new Observable((subscriber) => {
        subscriber.next(data)
    })
}

class Obs{
    obs: any = null
    constructor() {
        this.obs = new Observable(subscriber => {
            subscriber.next("log")
        })
    }
}


export const testObserver = {
    next: (x) => console.log("Observer got a next value: ",  x),
    error: (err) => console.error("Observer got an error: " + err),
    complete: () => console.log("Observer got a complete notification"),
};

export const secodObserr = (x) => {
    console.log("Second Observer got value: ",  x)
    return x
}
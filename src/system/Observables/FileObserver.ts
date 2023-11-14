import {Subject, Observable, OperatorFunction, Subscriber} from "rxjs";

/**
 * A class to observe and manipulate data streams using RxJS.
 *
 * @template T The input type of data the observer handles.
 * @template R The output type of data after applying the operator.
 */
class FileObserver<T, R extends T> {
    private subject: Subject<R>;
    private observable: Observable<T>;

    /**
     * Constructs a FileObserver instance.
     *
     * @param {Subject<R>} subject The subject that observers will subscribe to.
     * @param {Observable<T>} observable The observable that emits data.
     */
    constructor(subject: Subject<R>, observable: Observable<T>) {
        this.subject = subject;
        this.observable = observable;
    }

    /**
     * Restarts the observer with new data.
     *
     * @param {T} data The new data to be emitted by the observable.
     */
    restart(data: T) {
        this.observable = new Observable<T>((subscriber: Subscriber<T>) => {
            subscriber.next(data);
            subscriber.complete();
        });
        this.observable.subscribe({
            next: (value: T) => this.subject.next(value as unknown as R),
            error: (err) => this.subject.error(err),
            complete: () => this.subject.complete(),
        });
    }

    /**
     * Attaches an operator function to the observable.
     *
     * @param {OperatorFunction<T, R>} method The operator function to apply to the observable.
     */
    attach(method: OperatorFunction<T, R>) {
        this.observable = this.observable.pipe(method);
    }

    /**
     * Subscribes an observer to the subject.
     *
     * @param {(value: R) => void} observer The observer function to receive emitted values.
     * @returns The subscription object.
     */
    subscribe(observer: (value: R) => void) {
        return this.subject.subscribe(observer);
    }

    /**
     * Initializes the observer by subscribing the subject to the observable.
     */
    init() {
        this.observable.subscribe({
            next: (value: T) => this.subject.next(value as unknown as R),
            error: (err) => this.subject.error(err),
            complete: () => this.subject.complete(),
        });
    }
}

export default FileObserver
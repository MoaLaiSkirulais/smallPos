
import { Observable, of, map, pipe, tap, Subject, BehaviorSubject } from 'rxjs';
type GreetingFunction = (a: string) => string;

export class MutableLiveData1<T> {

	private value: T;
	public observable;

	constructor(TCreator: { new(): T; }) {
		this.value = new TCreator();
		this.observable = new BehaviorSubject<T>(this.value);
	}

	public create(): Observable<T> {
		return this.observable;
	}

	//public observe(fn: GreetingFunction):Observable<string> {
	public observe(fn: (a: T) => any): Observable<T> {
		this.observable.subscribe(fn);
		return this.observable;
	}

	public getValue(): T {
		return this.value;
	}

	public postValue(value: T): any {
		this.value = value;
		this.observable.next(value);
	}

}

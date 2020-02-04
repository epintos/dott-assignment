import { Test } from './index';

export class TestsHandler {
    private _testsNumber: number | undefined
    readonly tests: Test[]

    public constructor() {
        this.tests = [];
    }

    public addTest(n: number, m: number): void {
       this.tests.push(new Test(n, m));
    }

    public testsComplete(): boolean {
        return this.testsNumber === this.tests.length && this.tests.every(test => test.isComplete());
    }

    get testsNumber(): number | undefined {
      	return this._testsNumber;
    }

    set testsNumber(value: number | undefined) {
		this._testsNumber = value;
    }

    public isLastComplete(): boolean {
        const lastTest = this.lastTest();
        if (lastTest === undefined) {
         	 return true;
        } else {
			return lastTest.isComplete();
        }
        
    }

    public lastTest(): Test | undefined {
		if (this.tests.length === 0) {
			return undefined;
		} else {
			return this.tests[this.tests.length - 1];
		}
    }

    public initializeSolutions(): void {
     	this.tests.forEach(test => test.initializeSolution());
    }
}
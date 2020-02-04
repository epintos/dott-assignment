import { Test } from './index';

export class Main {
    private testsNumber: number
    readonly tests: Test[]

    public constructor(testsNumber: number) {
      this.testsNumber = testsNumber;
      this.tests = [];
    }

    public addTest(newTest: Test) {
      this.tests.push(newTest);
    }

    testsComplete(): boolean {
        return this.testsNumber === this.tests.length && this.tests.every(test => test.isComplete());
    }

    isLastComplete(): boolean {
        const lastTest = this.lastTest();
        if (lastTest === undefined) {
          return true;
        } else {
          return lastTest.isComplete();
        }
        
    }

    lastTest(): Test | undefined {
      if (this.tests.length === 0) {
        return undefined;
      } else {
        return this.tests[this.tests.length - 1];
      }
    }
}
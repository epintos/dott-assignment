import { TestsHandler, Test } from './index';
import * as readline from 'readline';
import { readSync } from 'fs';

/*
    Solver class parses the standard input tests and outputs the results
*/

export class Solver {
    private _testsHandler: TestsHandler
	private _readInterface: readline.Interface
	private _finishedParsing: boolean

    public constructor() {
        this._testsHandler = new TestsHandler();
        this._readInterface = readline.createInterface({
          input: process.stdin,
          output: process.stdout,
		  terminal: true,
		});
		this._finishedParsing = false;
    }

    public run(): void {
		this.parse();
    }

    private parse(): void {
        this._readInterface.on('line', (line) => {
			if (!this._finishedParsing) {
				if (this._testsHandler.testsNumber === undefined) { // Parses first line
					this._testsHandler.testsNumber = parseInt(line, 10);
				} else {
					let newLine: string[] = line.split(' ');
					if(newLine.length === 1 && newLine[0] === '') { // Parses an Enter
						if (this._testsHandler.testsComplete()) { // Detects that the parsing finished
							this._finishedParsing = true;
							this.calculateDistances().then(() => this._readInterface.close());
						}
				} else {
						if (this._testsHandler.isLastComplete()) { // Detects a new test
							this._testsHandler.addTest(parseInt(newLine[0], 10), parseInt(newLine[1], 10));
						} else {
							newLine = line.split('');
							const lastTestParsed = this._testsHandler.lastTest();
							if (lastTestParsed !== undefined) {
								lastTestParsed.addColumn(newLine.map(element => parseInt(element, 10)));
							}
						}
					}
				}
			}
        });
    }

    private async calculateDistances(){
        const promises: Promise<Test>[] = [];
        this._testsHandler.tests.forEach(test => promises.push(this.calculateDistance(test)));
        const tests = await Promise.all(promises);
		tests.forEach(test => this.printSolution(test));
    }

    private printSolution(test: Test) {
        test.solution.forEach(element => {
            this._readInterface.write(element.join(' '));
            this._readInterface.write('\n');
        });
        this._readInterface.write('\n');
    }

    private calculateDistance(test: Test): Promise<Test> {
        return new Promise(resolve => {
            setTimeout(() => {
                for (let i = 0; i < test.n; i++) {
                    for (let j = 0; j < test.m; j++) {
                        for (let k = 0; k < test.n; k++) {
                            for (let l = 0; l < test.m; l++) {
                                if(test.data[k][l] === 1) {
                                    test.solution[i][j] = Math.min(test.solution[i][j], Math.abs(i - k) + Math.abs(j - l));
                                }
                            }
                        }
                    }
                }
                resolve(test)
            })
        })
    }
 }
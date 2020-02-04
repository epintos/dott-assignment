import { TestsHandler, Test } from './index';
import * as readline from 'readline';

export class Solver {
    private testsHandler: TestsHandler

    public constructor() {
        this.testsHandler = new TestsHandler();
    }

    public run(): void {
        this.parse();
    }

    private parse(): void {
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
            terminal: false,
        });

        rl.on('line', (line) => {
            if (this.testsHandler.testsNumber === undefined) {
              // console.log('Creating Main: ' + line);
              this.testsHandler.testsNumber = parseInt(line, 10);
            } else {
              let newLine: string[] = line.split(' ');
              if(newLine.length === 1 && newLine[0] === '') { // Just an Enter
                if (this.testsHandler.testsComplete()) {
                  // console.log('End of Parsing: ' + line);
                  // console.log(main.tests);
                  this.calculateDistances();
                rl.close();
                }
              } else {
                if (this.testsHandler.isLastComplete()) {
                  // console.log('Adding new Test: ' + line);
                  this.testsHandler.addTest(parseInt(newLine[0], 10), parseInt(newLine[1], 10));
                } else {
                  // console.log('Adding columns to last test: ' + line);
                  newLine = line.split('');
                  const lastTestParsed = this.testsHandler.lastTest();
                  if (lastTestParsed !== undefined) {
                    lastTestParsed.addColumn(newLine.map(element => parseInt(element, 10)));
                  }
                }
              }
            }
        });
    }

    private calculateDistances(): void {
        this.testsHandler.initializeSolutions();
        const promises: Promise<Test>[] = [];
        this.testsHandler.tests.forEach(test => promises.push(this.calculateDistance(test)));
        Promise.all(promises).then((tests) => {
          tests.forEach(test => test.printSolution());
        })
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
import { TestsHandler, Test } from './index';
import * as readline from 'readline';
import { readSync } from 'fs';

export class Solver {
    private testsHandler: TestsHandler
    private readInterface: readline.Interface

    public constructor() {
        this.testsHandler = new TestsHandler();
        this.readInterface = readline.createInterface({
          input: process.stdin,
          output: process.stdout,
          terminal: true,
        });
    }

    public run(): void {
        this.parse();
    }

    private parse(): void {
      this.readInterface.on('line', (line) => {
            if (this.testsHandler.testsNumber === undefined) {
              this.testsHandler.testsNumber = parseInt(line, 10);
            } else {
              let newLine: string[] = line.split(' ');
              if(newLine.length === 1 && newLine[0] === '') { // Just an Enter
                if (this.testsHandler.testsComplete()) {
                  this.calculateDistances().then(() => this.readInterface.close())
                  // rl.close();
                }
              } else {
                if (this.testsHandler.isLastComplete()) {
                  this.testsHandler.addTest(parseInt(newLine[0], 10), parseInt(newLine[1], 10));
                } else {
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

    private calculateDistances(){
        this.testsHandler.initializeSolutions();
        const promises: Promise<Test>[] = [];
        this.testsHandler.tests.forEach(test => promises.push(this.calculateDistance(test)));
        return Promise.all(promises).then((tests) => {
          tests.forEach(test => this.printSolution(test));
        })
    }

    private printSolution(test: Test) {
      test.solution.forEach(element => {
        this.readInterface.write(element.join(' '));
        this.readInterface.write('\n');
      });
      this.readInterface.write('\n');
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
import * as readline from 'readline';
import { Main, Test } from './classes/index';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false,
});

let main: Main;

rl.on('line', (line) => {
  if (main === undefined) {
    // console.log('Creating Main: ' + line);
    main = new Main(parseInt(line, 10));
  } else {
    let newLine: string[] = line.split(' ');
    if(newLine.length === 1 && newLine[0] === '') { // Just an Enter
      if (main.testsComplete()) {
        // console.log('End of Parsing: ' + line);
        // console.log(main.tests);
      }
    } else {
      if (main.isLastComplete()) {
        // console.log('Adding new Test: ' + line);
        main.addTest(new Test(parseInt(newLine[0], 10), parseInt(newLine[1], 10)));
      } else {
        // console.log('Adding columns to last test: ' + line);
        newLine = line.split('');
        const lastTestParsed = main.lastTest();
        if (lastTestParsed !== undefined) {
          lastTestParsed.addColumn(newLine.map(element => parseInt(element, 10)));
        }
      }
    }
  }
});
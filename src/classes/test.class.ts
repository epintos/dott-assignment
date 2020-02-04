/*
    Test represents a class that contains one input example.
    For example it might represent the following in the standard input:
        5 5
        00010
        00110
        01100
        00000
        00000
*/

const MAX_LENGTH = 182;

export class Test {
    readonly n: number
    readonly m: number
    readonly data: number[][]
    readonly solution: number[][]
  
    public constructor(n: number, m: number) {
        this.n = n;
        this.m = m;
        this.data = [];
        this.solution = [];
        this.initializeSolution();
    }
  
    // Returns true if the instance has m columns in data
    public isComplete(): boolean {
        return this.n === this.data.length;
    }

    // Adds a new column to data
    public addColumn(column: number[]): void | never {
        this.data.push(column);
    }

    private initializeSolution(): void {
		for (let i = 0; i < this.n; i++) {
			this.solution.push([]);
			for (let j = 0; j < this.m; j++) {
				this.solution[i].push(MAX_LENGTH + MAX_LENGTH);
			}
      	}
    }
  }
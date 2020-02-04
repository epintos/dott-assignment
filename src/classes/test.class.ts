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
    }
  
    public isComplete(): boolean {
        return this.n === this.data.length;
    }

    public addColumn(column: number[]) {
        // TODO: Raise error if column.length != this.m
        this.data.push(column);
    }

    public initializeSolution(): void {
      for (let i = 0; i < this.n; i++) {
        for (let j = 0; j < this.m; j++) {
          this.solution[i][j] = MAX_LENGTH * MAX_LENGTH;
        }
      }
    }

    public printSolution() {
      this.solution.forEach(element => {
        console.log(element);
      });
    }
  }
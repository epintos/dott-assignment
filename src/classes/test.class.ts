export class Test {
    private n: number
    private m: number
    private data: number[][]
  
    public constructor(n: number, m: number) {
      this.n = n;
      this.m = m;
      this.data = [];
    }
  
    isComplete(): boolean {
        return this.n === this.data.length;
    }

    addColumn(column: number[]) {
        // TODO: Raise error if column.length != this.m
        this.data.push(column);
    }
  }
import { Test } from '../src/classes/index';

test('My Greeter', () => {
    const test = new Test(2, 4);
    expect(test.isComplete()).toBe(false);
});
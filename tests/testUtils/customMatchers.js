expect.extend({
  toContainObjects(received, argument) {
    const pass = this.equals(received, expect.arrayContaining(argument.map(arg => expect.objectContaining(arg))));

    return {
      message: () =>
        `expected ${this.utils.printReceived(received)} ${
          pass ? 'not' : ''
        } to contain object ${this.utils.printExpected(argument)}`,
      pass
    };
  }
});

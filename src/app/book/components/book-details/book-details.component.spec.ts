describe('My first tests', () => {
  it('checks if true is really true', (done) => {
    setTimeout(() => {
      expect(true).toBeTruthy();
      console.log('Expect');
      done();
    }, 1000);
    console.log('End');
  });
});

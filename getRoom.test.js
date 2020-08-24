const getRoom = require('./app');

test('This function checks that the function getRoom throws an error when a negative index is fed', () => {
    function outOfRange() {
        getRoom(-1);
    }
    expect(outOfRange).toThrowError('invalid pointer');
});

test('function to chesk if game array has enough number of keys', () => {
  function tooBig() {
      getRoom(7);
  }
  expect(tooBig).toThrowError('not enough games');
});





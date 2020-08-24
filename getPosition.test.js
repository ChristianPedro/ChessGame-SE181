const getPosition = require('./app');

test('This function checks of input is split into x and y', () => {
    function noXY() {
        getPosition(0);
    }
    expect(noXY).toThrowError('invalid input');
});
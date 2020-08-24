const isWhitePiece = require('./app');

test('This function checks that the function getRoom throws an error when a negative index is fed', () => {
    function notWhite() {
        isWhitePiece(-1);
    }
    expect(notWhite).toThrowError('Black piece');
});


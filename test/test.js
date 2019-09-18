const assert = require('assert');
const { expect } = require('chai');

describe('Array', function(){
    describe('#indexOf()', function(){
        it('Should return -1 when the value is not present', function(){
            assert.equal([1, 2, 3].indexOf(4), -1);
        });

        it('Should return the index when present', function(){
            assert.equal(['a', 'b', 'c'].indexOf('b'), 1);
        });
    });
});

const name = 'Tim';

describe('The "name" variable', function(){
    it('should exist', function(){
        expect(name).to.not.be.undefined;
    });
    it('should be set to a string', function(){
        expect(name).to.be.a('string');
    });
});

const numbers = [1, 2, 3, 4, 5];

describe('The "numbers" variable', function(){
    it('should be an array', function(){
        expect(numbers).to.be.a('array');
    });
    it('should contain 5 items', function(){
        expect(numbers).to.have.a.lengthOf(5);
    });
    it('should contain the numbers: 1, 2, 3, 4, and 5', function(){
        expect(numbers).to.include.members([1, 2, 3, 4, 5]);
    });
});

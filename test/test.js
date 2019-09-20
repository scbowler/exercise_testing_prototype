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

// Create a function that takes a single argument, doubles it, then returns the result

function double(x){
    return x * 2;
}

describe('The "double" function', function(){
    it('should be a function', function(){
        expect(double).to.be.a('function');
    });
    it('should double a passed in argument and return the result', function(){
        expect(double(8)).to.equal(8 * 2);
    });
});

// Create a function named "triple" that takes a single argument, triples it, then returns the result

function triple(x) {
    return x * 3;
}

describe('The "triple" function', function () {
    it('should be a function', function () {
        expect(double).to.be.a('function');
    });
    it('should triple a passed in argument and return the result', function () {
        expect(double(5)).to.equal(5 * 3);
    });
});

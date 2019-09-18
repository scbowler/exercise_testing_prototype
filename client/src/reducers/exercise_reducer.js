import types from '../actions/types';

const DEFAULT_STATE = {
    current: null,
    list: [],
    results: []
};

export default (state = DEFAULT_STATE, {type, ...action}) => {
    switch(type){
        default:
            return state;
    }
}

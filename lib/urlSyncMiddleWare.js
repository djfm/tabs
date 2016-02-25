import {UPDATE_LOCATION, push} from "react-router-redux";

const getValueOf = dottedKey => object => {
    const pathParts = dottedKey.split("."), len = pathParts.length;
    let currentValue = object;
    for (let p = 0; p < len; ++p) {
        currentValue = currentValue[pathParts[p]];
        if (currentValue === undefined) {
            return undefined;
        }
    }
    return currentValue;
};

const urlSyncMiddleWare = mapping => store => next => action => {
    const state = store.getState();
    const result = next(action);
    const nextState = store.getState();

    /* global location */

    if (action.type === UPDATE_LOCATION) {
        console.log(action);
    }

    for (const key in mapping) {
        const [value, newValue] = [state, nextState].map(getValueOf(key));
        if (newValue !== value) {
            const query = {};
            query[mapping[key]] = newValue;
            store.dispatch(push({
                pathname: location.pathname,
                query
            }));
        }
    }

    return result;
};

export default urlSyncMiddleWare;

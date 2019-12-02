import { combineReducers } from 'redux';
import motoflash from './motoflash.reducer';
import workOrder from './workOrder.reducer';

const createReducer = (asyncReducers) =>
    combineReducers({
        motoflash,
        workOrder
    });

export default createReducer;

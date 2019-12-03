import { combineReducers } from 'redux';
import motoflash from './motoflash.reducer';
import workOrder from './workOrder.reducer';
import ui from './ui.reducer';

const createReducer = (asyncReducers) =>
    combineReducers({
        motoflash,
        workOrder,
        ui
    });

export default createReducer;

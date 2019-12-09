import { combineReducers } from 'redux';
import motoflash from './motoflash.reducer';
import ui from './ui.reducer';

const createReducer = (asyncReducers) =>
    combineReducers({
        motoflash,
        ui
    });

export default createReducer;

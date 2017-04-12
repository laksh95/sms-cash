import axios from 'axios'
import * as types from './../constants';
export function openModal(data){
    return {
        type: types.OPEN_MODAL,
        payload : data
    }
}
import * as types from './../constants';

const initialErrorState={
  errorMessage: ""
} 

const errorReducer= (state=initialErrorState, action) => {
	switch(action.type){
		case types.SET_ERROR_MESSAGE:
            state={
                ...state,
                errorMessage: action.payload
            }
        break;
	}
	return state;
}

export default errorReducer;
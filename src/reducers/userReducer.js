import { FETCH_USERS, SET_SELECT_USER, FETCH_SELECTEDUSERS } from '../actions/types';

const initialState = {
  candidates: [],
  selectedCandidates:[],
  isUpdate: false,
  candidate:{}
}

export default function (state = initialState, action ) {
  switch (action.type) {
    case FETCH_USERS:
      console.log('Fetch Users', action.payload);
      return {
        ...state,
        candidates: action.payload ? action.payload: state.candidates,
        selectedCandidates: action.payload ? action.payload.filter(user=> user.isSelected === true): state.selectedCandidates
      }
      break;
    case FETCH_SELECTEDUSERS:
      return {
        ...state,
        isUpdate: !state.isUpdate,
        selectedCandidates: state.candidates.filter(user=> user.isSelected === true)
      }
    case SET_SELECT_USER:
      console.log('Selecting User ', action.payload, state);
      //let candidates = Array.concat;
      state.candidates
        .filter(user=> user.id === action.payload)
        .map(user=> user.isSelected = !user.isSelected);
      console.log('After set ',state.isUpdate,state.candidates.filter(user=> user.id === action.payload));
      return {
        ...state,
        isUpdate: !state.isUpdate,
        candidates:state.candidates,
        selectedCandidates: state.candidates.filter(user=> user.isSelected === true)
      };

    default:
      return state;
  }
}

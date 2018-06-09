import { FETCH_USERS, SET_SELECT_USER, FETCH_SELECTEDUSERS } from './types';

export const fetchUsers = (fromAPI) => dispatch => {
  console.log('Fetching USERS' , fromAPI);
  //fromAPI=true;
  if(fromAPI) {
    fetch('/users')
      .then(users => users= users.json())
      .then(users => {
        console.log(users.length)
        dispatch({
          type: FETCH_USERS,
          payload: users
        });
      });
  } else {
    dispatch({
      type: FETCH_USERS,
      undefined
    });
  }
}
export const fetchSelectedUsers = () => dispatch => {
    dispatch({
      type: FETCH_SELECTEDUSERS,
      undefined
    })
}

export const setSelectedUser = (user) => dispatch => {
  console.log('Setting user as selected: ', user);
  dispatch({
    type:SET_SELECT_USER,
    payload: user
  })
}

export const updateCandidatesList = (userList) => dispatch => {
  console.log('updateCandidatesList', userList);
  fetch('/users', {
    method: 'POST',
    headers: {
      'content-type':'application/json'
    },
    body: JSON.stringify(userList)
  }).then(res => res.json())
  .then((data) => {
    console.log('Status', data)
    dispatch({
      type: FETCH_USERS,
      payload: userList
    });
  });
}
export const removeUserSelection = (userId) => dispatch => {
  console.log('removeUserSelection' , userId);
  fetch('/updateUser', {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify({userId})
  }).then(res=> res.json())
  .then(data => {
    console.log(data);
    dispatch({
      type: SET_SELECT_USER,
      payload: userId
    });
  });
}

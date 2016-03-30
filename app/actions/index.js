const CHECK_ID_REQUEST = 'CHECK_ID_REQUEST'
const CHECK_ID_SUCCESS = 'CHECK_ID_SUCCESS'
const CHECK_ID_FAILURE = 'CHECK_ID_FAILURE'


function checkId(){
  return {
    type: CHECK_ID_REQUEST
  }
}

function checkIdSuccess(){
  return {
    type: CHECK_ID_SUCCESS
  }
}

function checkIdFailure(){
  return {
    type: CHECK_ID_FAILURE
  }
}

function checkForToken(){
  return (dispatch) => {
    if (localStorage.getItem('id_token')){
      dispatch(checkId())
    }
  }
}

export const actionTypes = {
  CHECK_ID_REQUEST,
  CHECK_ID_SUCCESS,
  CHECK_ID_FAILURE
}

export const actionCreators = {
  checkForToken,
  checkId,
  checkIdSuccess,
  checkIdFailure
}

const GET_USER_BY_ID = 'user/getUserById'

const getUserById = (user) => {
    return {
        type: GET_USER_BY_ID,
        payload: user
    }
}

export const getUserByIdThunk = (userId) => async dispatch => {
    const res = await fetch(`/api/users/${userId}`);
    if (res.ok) {
        const data = await res.json()
        if (data.errors) {
            return;
        }

        dispatch(getUserById(data))
    } else {
        const error = await res.json()
        return error
    }
}

function userReducer(state = {}, action) {
    switch (action.type) {
        case GET_USER_BY_ID:
            return action.payload
        default:
            return state
    }
}

export default userReducer
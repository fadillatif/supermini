
// Reducers-Divisi
let init = {
    id : "",
    username : "",
}

export default (state=init, action) => {
    switch(action.type){
        case 'LOGIN_SUCCESS':
       
            return {...state, 
                id : action.payload.id, 
                username : action.payload.username, 
                // password : action.payload.password
            }

        case 'LOGOUT_SUCCESS':
            return {...state, id : "", username : ""}

        default:
            return state
    }
}

                                                            
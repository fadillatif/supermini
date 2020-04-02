// Action creator = customers

// user = {id,username,password}
export let onLoginUser = (user) => {
    
    // menyimpan data di set Localstorage
    let {id, username} = user
    localStorage.setItem(`userData`, JSON.stringify({id, username}))


    // mengirim data ke redux untuk kemudian disimpan di redux state
   return {
        type: "LOGIN_SUCCESS",
        payload: {
            id: user.id,
            username: user.username,
            // password: user.password (untuk cek password)
            
        }
    }

}

export let onLogoutUser = () => {

    localStorage.removeItem(`userData`)
    return {
         type: "LOGOUT_SUCCESS" 
    }
}
 
 
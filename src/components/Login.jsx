import React, { Component } from 'react'
import axios from '../config/axios'
import { connect } from 'react-redux'

import { onLoginUser } from '../actions/index'
import { Redirect } from 'react-router-dom'

class Login extends Component {

    onButtonLogin = () => {
            let username = this.username.value
            let password = this.password.value

            let link = '/users'
            let data = {username, password}
            axios.get(link, {params:data}).then((res) =>{

            if(res.data.length > 0 ){
                // res.data[0] = {id, username, password}
                // User ditemukan : info disimpan ke redux

                this.props.onLoginUser(res.data[0])
            }else {
                // user tidak ditemukan : munculkan notif
                
                alert('Username or Password is inncorrect')
            }
            
        })

    }
render() {
    if(!this.props.Username){
        return (
                <div className=" text-primary container-fluid bgLogin">
                    <div className="row">
                    <div className="col-5 mx-auto mt-5 card border-secondary login  ">
                        <div className="card-body">
                            <div className="border-bottom border-secondary-gray card-title text-center text-dark">
                                <h1>Login</h1>
                            </div>

                            <form className="form-group text-dark">
                                <div className="card-title ">
                                    <h4>Username</h4>
                                </div>
                                <input ref={(input) => {this.username = input}} type='text' className='form-control' />

                                <div className="card-title ">
                                    <h4>Password</h4>
                                </div>
                                <input ref={(input) => {this.password = input}} type='password' className='form-control'/>
                            </form>

                            <button className="loginBtn btn btn-warning btn-block" onKeyPress={this.onButtonLogin} onClick={this.onButtonLogin}>login</button>
                        </div>
                    </div>
                    </div>
                </div> 
        )
        

    } else {
        return<Redirect to="/"/>
    }
    }

}
let mapStateToProps = (state) => {
    return {
        Username : state.auth.username
    }
}


export default connect(mapStateToProps , {onLoginUser})(Login)

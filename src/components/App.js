import React, { Component } from 'react'
import {Route, BrowserRouter} from 'react-router-dom'

// components
import Header from './Header'
import Home from './Home'
import Register from './Register'
import Login from './Login'
import ManageProduct from './ManageProduct'
import DetailProduct from './DetailProduct'
import Cart from './Cart'

// Keep login
import {onLoginUser} from '../actions/index'
import {connect} from 'react-redux'

class App extends Component {

    state = {
        check: false
    }

    componentDidMount(){
        let userData = localStorage.getItem('userData')
        let user = JSON.parse(userData)

        if(user){
            this.props.onLoginUser(user)
        }

        this.setState({check:true})
    }
    
    render() {
        if(this.state.check){
            return (
                <BrowserRouter>
                    <div>
                        <Header/>
                        <Route path="/" exact component={Home} />
                        <Route path="/register" component={Register} />
                        <Route path="/login" component={Login} />
                        <Route path="/manageproduct" component={ManageProduct} />
                        <Route path="/cart" component={Cart} />
                        <Route path="/detailproduct/:id" component={DetailProduct} />
                    </div>
                </BrowserRouter>
            )
        }
        return <h1> Loading </h1>
    }
}

export default connect(null, {onLoginUser})(App) 
 
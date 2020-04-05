import React, { Component } from 'react'
import { Redirect, Link } from 'react-router-dom'
import {connect } from 'react-redux'
import Swal from 'sweetalert2';
import axios from '../config/axios'

class Cart extends Component {

    state={
        products: []
    }
            render() {
                if(this.props.Username){
                return (

                    <div className="container">
                        <h1 className="text-center display-4 ">Cart</h1>
                        <table className="table table-hover text-center mb-5">
                            <thead>
                                <tr>
                                    <th scope="col">NAME</th>
                                    <th scope="col">DESC</th>
                                    <th scope="col">PRICE</th>
                                    <th scope="col">QUANTITY</th>
                                    <th scope="col">PICTURE</th>
                                </tr>
                            </thead>
                            </table>

                    </div>
                )
            } else {
                Swal.fire({
                    icon: 'warning',
                    title: 'Oops...',
                    text: 'Anda Harus Login!',
                    // footer: '<a href>Why do I have this issue?</a>'
                  })
                return <Redirect to="/"/>
        }
    }
}
let mapStateToProps = (state) => {
    return {
        Username : state.auth.username
    }
}
export default connect(mapStateToProps)(Cart)
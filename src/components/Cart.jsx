import React, { Component } from 'react'
import { Redirect, Link } from 'react-router-dom'
import {connect } from 'react-redux'
import Swal from 'sweetalert2';
import axios from '../config/axios'

class Cart extends Component {

    state={
       Carts: []
    }

    componentDidMount(){
        this.getData()
    }

    getData = () => {
        axios.get("/Carts").then(res => {
            this.setState({Carts: res.data})
        })
    }

    onDeleteCart = (id) => {
     
        Swal.fire({
            title: 'Apakah Kamu Yakin?',
            text: "kamu tidak bisa mengembalikannya lagi!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Hapus!'
          }).then((res) => {
            if (res.value) {
                axios.delete(`/Carts/${id}`)
                .then((res) => {this.getData()}) 
              Swal.fire(
                'Terhapus!',
                'Pilihan berhasil dihapus.',
                'success'
              )
              this.getData()
            }
        })
    }

    renderList = () => {
        return this.state.Carts.map((Carts) => {
            Carts.price=Carts.price
            return(
                <tr>
                    <td>{Carts.name}</td>
                    <td>{Carts.desc}</td>
                    <td>Rp {Carts.price.toLocaleString('in')}</td>
                    <td>{Carts.qty}</td>
                    <td><img className="list"  src={Carts.src} alt=""/></td>
                    <td>
                        {/* <button onClick={ () => { this.onEditButton(Carts.id) } } className="btn btn-outline-secondary btn-block btn-sm"> Edit </button> */}
    
                        <button onClick={ () => { this.onDeleteCart(Carts.id) } } className="btn btn-outline-danger btn-block btn-sm" >Delete</button>
                    </td>
                </tr>
            )   
        }) 
    
    }   

    total = () => {
        var totalCart = 0

        let price = this.state.Carts.map((resCarts) => {
            let finalPrice = resCarts.price * resCarts.qty
            totalCart += finalPrice
            
            
            // return (
            //     <div className="row">
            //             <div class="card-body">
            //                 <h5 class="card-title">{resCarts.name}</h5>
            //                 <p class="card-text">Rp. {resCarts.price.toLocaleString('in')} x {resCarts.qty} = Rp. {finalPrice.toLocaleString('in')}</p>
            //         </div>
            //      </div>
            
            // )
        }) 
        return (
            <div className="row">
                <div >
                    {price}
                </div>
               
                    <div className="mx-auto card">
                    <div class="card-body text-center">
                        <h5 className="card-title ">Anda Membayar:</h5>
                        <h4 className="text-danger">Rp. {totalCart.toLocaleString('in')}</h4>
                        
                    </div>
                    </div>
                </div>
          
            )
    
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
                            <th scope="col">DESCRIPTION</th>
                            <th scope="col" >PRICE</th>
                            <th scope="col">QUANTITY</th>
                            <th scope="col">PICTURE</th>
                            <th scope="col">ACTION</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderList()}
                    </tbody>
                </table> 

                    <div className="container">
                        <div className="mt-3">
                                <div className="card">

                                    <div className=" border-bottom border-secondary card-title">
                                        <h1 className="text-center">Total Belanja</h1>
                                    </div>

                                    <div className="card-body">
                                        {this.total()}
                                    </div>

                                </div>
                        </div>
                    </div>
                </div>
            )
            
    
            
            
               
            
        } else {
            
            return <Redirect to="/Login"/>
        
        }
    }
}

let mapStateToProps = (state) => {
    return {
        Username : state.auth.username
    }
}
export default connect(mapStateToProps)(Cart)
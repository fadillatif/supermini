import React, { Component } from 'react'
import { Redirect, Link } from 'react-router-dom'
import {connect } from 'react-redux'
import Swal from 'sweetalert2';
import { UncontrolledCollapse, Button, CardBody, Card } from 'reactstrap'
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
            let result = res.data.filter((id)=>{
                return(id.Username==this.props.username)
            })
            this.setState({Carts: result})
            // this.setState({Carts: result})

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
            
            
            return (
                <div className="row ">
                        <div class="card-body">
                            <h5 class="card-title">{resCarts.name}</h5>
                            <h5 class="card-text text-black-50">Rp. {resCarts.price.toLocaleString('in')} x {resCarts.qty}  </h5>
                            
                        </div>
                 </div>
            
            )
        }) 
        return (
            <div className="row">
                <div >
                    {price}
                </div>
               
                    <div className="mx-auto ">
                    <div class="card-body text-center">
                        <h5 className="card-title ">Anda Membayar:</h5>
                        <h4 className="text-black-50">Rp. {totalCart.toLocaleString('in')}</h4>
                        
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
                        <div>
                        <div className=" border-bottom card-title">
                        <Button className="btn btn-primary btn-block w-50 mx-auto"color="success" id="toggler" style={{ marginBottom: '1rem' }}>
                            Checkout
                        </Button>
                        <UncontrolledCollapse toggler="#toggler">
                            <Card>
                                <CardBody>
                                <h1 className="text-center">Total Belanja</h1>
                                    {this.total()} 
                                </CardBody>
                            </Card>
                        </UncontrolledCollapse>
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
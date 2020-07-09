import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from '../config/axios'
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import Swal from 'sweetalert2';

class ProductItem extends Component {

    addToCart = (state) => {
        if(!this.props.Username == ""){
   
        // Produck Id
        let Product_Name = this.props.product.name
        let Product_Desc = this.props.product.desc
        let Product_Price = parseInt(this.props.product.price)
        let Product_Src = this.props.product.src   
        let Product_Qty = parseInt(this.qty.value)
        console.log(this.qty.value)

        // Post ke db.json
        let checkArr = []
        axios.post("/Carts", {
            name: Product_Name,
            desc: Product_Desc,
            price: Product_Price,
            src: Product_Src,
            qty: Product_Qty
        }).then(res => {})
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Stop...',
            text: 'Anda harus login!',
           
          })
        return <Redirect to="/Login"/>
    }
}    


    render() {
        return (
           
            <div key={this.props.product.id} className="card fit-img col-lg-5 col-xl-3 mx-auto mx-xl-4 my-3">
                {/* // <div key={this.props.product.id} className="card col-md- px-0 my-3"> */}
            <div style={{ height:290 }}>
            <img className="my-auto card-img" src={this.props.product.src} alt=""/>
            
            </div>
                <div className="card-body">
                    <h5 className="card-title"> {this.props.product.name} </h5>

                    <p className="card-text">{this.props.product.desc}</p>
                    <p className="card-text">Rp {this.props.product.price.toLocaleString('in')}</p>

                 <input ref={( input ) => { this.qty = input }} className="form-control" type="number" placeholder={this.props.product.stock}/>
                    
                    <Link to={`/DetailProduct/${this.props.product.id}`}>
                        <button className="btn btn-secondary btn-block my-2">Detail</button>
                    </Link>

                        <button onClick={this.addToCart} className="btn btn-dark btn-block">Add to cart</button>
                    
                </div>
            </div>
        ) 
    }
}
let mapStateToProps = (state) => {
    return {
        Username : state.auth.username
    }
}
export default connect(mapStateToProps)(ProductItem) 
    
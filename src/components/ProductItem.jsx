import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from '../config/axios'

export default class ProductItem extends Component {

    addToCart = () => {

        // Produck Id
        let Product_Name = this.props.product.name
        let Product_Desc = this.props.product.desc
        let Product_Price = parseInt(this.props.product.price)
        let Product_Stock = this.props.product.stock
        let Product_Src = this.props.product.src   
        let Product_Qty = parseInt(this.qty.value)
        console.log(this.qty.value)

        // Post ke sb.json
        axios.post("/Carts", {
            name: Product_Name,
            desc: Product_Desc,
            price: Product_Price,
            stock: Product_Stock,
            src: Product_Src,
            qty: Product_Qty
        }).then(res => {})
    }


    render() {
        return (
            <div key={this.props.product.id} className="card col-lg-5 col-xl-3 mx-auto mx-xl-4 my-3">
            <div style={{ height:320 }}>
            <img className="my-auto card-img-top gambar " src={this.props.product.src} alt=""/>

            </div>
                <div className="card-body">
                    <h5 className="card-title"> {this.props.product.name} </h5>

                    <p className="card-text">{this.props.product.desc}</p>
                    <p className="card-text">Rp {this.props.product.price.toLocaleString('in')}</p>

                    <input ref={( input ) => { this.qty = input }} className="form-control" type="text" placeholder="Jumlah Qty"/>
                    
                    <Link to={`/DetailProduct/${this.props.product.id}`}>
                        <button className="btn btn-secondary btn-block my-2">Detail</button>
                    </Link>

                        <button onClick={this.addToCart} className="btn btn-dark btn-block">Add to cart</button>
                    
                </div>
            </div>
        ) 
    }
}
    
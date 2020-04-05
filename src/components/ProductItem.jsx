import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class ProductItem extends Component {

    addToCart = () => {
        let quantity = this.qty.value
        console.log(this.qty.value)
    }

    render() {
        return (
            <div key={this.props.product.id} className="card col-lg-5 col-xl-3 mx-auto mx-xl-4 my-3">
                <img className="card-img-top" src={this.props.product.src} alt=""/>
                <div className="card-body">
                    <h5 className="card-title"> {this.props.product.name} </h5>

                    <p className="card-text">{this.props.product.desc}</p>
                    <p className="card-text">Rp {this.props.product.price}</p>

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
    
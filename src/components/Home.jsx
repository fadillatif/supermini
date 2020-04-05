import React, { Component } from 'react'
import axios from '../config/axios'

import ProductItem from './ProductItem'

class Home extends Component {

    state = {
        products: []
    }

    componentDidMount() {
        this.getProducts()
    }

    getProducts = () => {
        axios.get('/products')
        .then((res) => {
            this.setState({ products: res.data})
        })
    }

    renderProducts = () => {
        return this.state.products.map((product) => {

            // memisahkan 3 digit angka dengan titik
            // product.price = product.price.toLocaleString('in')

            return(     
                // <div className="card col-lg-5 col-xl-3 mx-auto mx-xl-4 my-3">
                //     <img className="card-img-top" src={product.src} alt=""/>
                //     <div className="card-body">
                //         <h5 className="card-title"> {product.name} </h5>

                //         <p className="card-text">{product.desc}</p>
                //         <p className="card-text">Rp {product.price}</p>

                //         <input className="form-control" type="text" placeholder="Jumlah Qty"/>
                        
                //         <Link to={`/DetailProduct/${product.id}`}>
                //             <button className="btn btn-secondary btn-block my-2">Detail</button>
                //         </Link>

                //         <button className="btn btn-dark btn-block">Add to cart</button>
                        
                //     </div>
                // </div>
                <ProductItem product={product} />
            )
        })
    }

    onButtonSrc = () => {
        axios.get('/products')
        .then((res) => {
            // SrcName

            let keyword = this.name.value
            let min = parseInt(this.min.value)
            let max = parseInt(this.max.value)
            let filterResult = []

            if(isNaN(min)&&isNaN(max)){
                filterResult = res.data.filter((data) => {
                    return (
                        data.name.toLowerCase().includes(keyword.toLowerCase())
                    )
                })

            } else if (isNaN(max)){
                filterResult = res.data.filter((data) => { // Search by Minimum and Name
                    return (
                        data.name.toLowerCase().includes(keyword.toLowerCase())&&
                        data.price >= min
                    )
                })
            } else if (isNaN(min)){
                filterResult = res.data.filter((data) => { // Search by Maximum and Name
                    return (
                        data.name.toLowerCase().includes(keyword.toLowerCase())&&
                        data.price <= max
                    )
                })
            } else {
                filterResult = res.data.filter((data) => { // Search by Name, Minimum, and Maximum
                    return ( 
                    data.name.toLowerCase().includes(keyword.toLowerCase()) &&
                    data.price >= min &&
                    data.price <= max
                )
            })
        }
        this.setState({ products: filterResult })
    })

 }


    render() {
        return (
            // bgHome
            <div className="container-fluid"> 
                <div className="row">

                    {/* search box */}
                    <div className="col-10 col-lg-3 col-xl-2 ">
                        <div className="mt-3">
                            <div className="card">
                                
                                <div className="card-title text-center border-bottom">
                                    <h1>Search</h1>
                                </div>

                                <div className="card-body">
                                    <h4>Name</h4>
                                    <input ref={(input) => { this.name = input}} placeholder="yellow jacket" className="form-control" type="text"/>

                                    <h4>Price</h4>
                                    <input ref={(input) => { this.min = input}} placeholder="Min" className="form-control mb-2" type="text"/>
                                    <input ref={(input) => { this.max = input}} placeholder="Max" className="form-control" type="text"/>
                                
                                    <button onClick={this.onButtonSrc} className="btn btn-outline-primary btn-block mt-5">Search</button>
                                    <button className="btn btn-outline-danger btn-block">Reset</button>
                                </div>
                            </div>
                        </div>
                    </div> 

                    {/* list product */}
                    <div className="row col-10 col-lg-9">
                        {this.renderProducts()}
                    </div>
                    
                </div>
            </div>
        )
    }
}

export default Home

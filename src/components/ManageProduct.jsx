import React, { Component } from 'react'
import axios from 'axios'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class ManageProduct extends Component{

    state = {
        products: [],
        modal: false,
        editProduct: {}
    }

    componentDidMount(){
        this.getData ()
    }

    // Ambil data
    getData = () => {
        axios.get(
            'http://localhost:2020/products'
        ).then((res) => {
            console.log(res);
            
            this.setState({ products: res.data, modal : false })
        })
    }

    // input data
    onAddProducts = () => {
        let name_source = this.name.value
        let desc_source = this.desc.value
        let price_source = parseInt(this.price.value)
        let src_source = this.src.value   

        axios.post(
        'http://localhost:2020/products',
            { 
                name: name_source, 
                desc: desc_source, 
                price: price_source, 
                src: src_source
            }
        )
        .then((res) => {

            this.getData()

        })
    }

    // delete data 
    onDeleteProduct = (id) => {
        axios.delete(`http://localhost:2020/products/${id}`).then((res) => {
            this.getData()
        })  
    }

    // Edit
    onEditButton = (id) => {
        axios.get(`http://localhost:2020/products/${id}`)
        .then((res) => {
            this.setState({modal:true, editProduct : res.data})
        })
    }

    // Save
    onSaveProduct = () => {
        let name = this.editName.value ? this.editName.value : this.state.editProduct.name
        let price = parseInt(this.editPrice.value ? this.editPrice.value : this.state.editProduct.price)
        let desc = this.editDesc.value ? this.editDesc.value : this.state.editProduct.desc
        let src = this.editSrc.value ? this.editSrc.value : this.state.editProduct.src

        axios.patch(
            `http://localhost:2020/products/${this.state.editProduct.id}`,
            {
                name,price,desc,src
            }
            ).then((res) => {
                this.getData()
            })
    }

    // Cancel
    onCancelButton = () => {
        this.setState({modal: false})
    }
    
    // Togle
    onCancelToggle = () => {
        this.setState({ modal : false })
    }


    // Tugas hari sabtu : Render Map
    renderList = () => {
    return this.state.products.map((product) => {
        product.price=product.price.toLocaleString('in')
        return(

            <tr>
                <td>{product.id}</td>
                <td>{product.name}</td>
                <td>{product.desc}</td>
                <td>Rp {product.price}</td>
                <td><img className="list"  src={product.src} alt=""/></td>
                <td>
                    <button onClick={ () => { this.onEditButton(product.id) } } className="btn btn-outline-secondary btn-block btn-sm"> Edit </button>

                    <button onClick={ () => { this.onDeleteProduct(product.id) } } className="btn btn-outline-danger btn-block btn-sm" >Delete</button>
                </td>
            </tr>
        )   
    }) 

}    



// List Product 
    render(){
        
        return (
            <div className="container">
                <h1 className="text-center display-4 ">Manage Product</h1>
                <table className="table table-hover text-center mb-5">
                    <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">NAME</th>
                            <th scope="col">DESC</th>
                            <th scope="col">PRICE</th>
                            <th scope="col">PICTURE</th>
                            <th scope="col">ACTION</th>
                        </tr>
                    </thead>

                    <tbody>
                        {this.renderList()}
                    </tbody>
                
                </table>

                {/* Input Product  */} 

                <h1 className="text-center display-4">Add Product</h1>
                <table className="table text-center mb-5">
                    <tbody>
                        <tr> 
                            <td scope="col"><input ref={(input) => {this.name = input}} placeholder="name" className="form-control" type="text"></input></td> 
                            <td scope="col"><input ref={(input) => {this.desc = input}} placeholder="description" className="form-control" type="text"></input></td> 
                            <td scope="col"><input ref={(input) => {this.price = input}} placeholder="price" className="form-control" type="text"></input></td> 
                            <td scope="col"><input ref={(input) => {this.src = input}} placeholder="picture" className="form-control" type="text"></input></td>
                            <td scope="col">
                                <button onClick={this.onAddProducts} className="btn btn-outline-warning "> Add </button>
                            </td> 
                        </tr>
                    </tbody>
                </table>

                {/* Modal edit */}

                {/* <Modal isOpen={this.state.modal} toggle = {this.onCancelToggle} > jika ingin klik sembarang menutup modal*/}
                <Modal isOpen={this.state.modal} >
                    <ModalHeader >Edit your product</ModalHeader>
                    <ModalBody>
                        Name : <input className="form-control" type="text" ref={(input) => { this.editName = input }} placeholder={this.state.editProduct.name}/>
                        Desc : <input className="form-control" type="text" ref={(input) => { this.editDesc = input }} placeholder={this.state.editProduct.desc}/>
                        Price : <input className="form-control" type="text" ref={(input) => { this.editPrice = input }} placeholder={this.state.editProduct.price}/>
                        Img : <input className="form-control" type="text" ref={(input) => { this.editSrc = input }} placeholder={this.state.editProduct.src}/>
                    </ModalBody>
                    <ModalFooter>
                        <Button outline color="warning" onClick={this.onCancelButton} >Cancel</Button>
                        <Button outline color="success"onClick={this.onSaveProduct} >Save</Button>
                    </ModalFooter>
                </Modal>
                
            </div>  
        )
    }      
}


export default ManageProduct
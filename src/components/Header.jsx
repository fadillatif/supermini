import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import {
    Alert,
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    NavbarText
  } from 'reactstrap';

  import { connect } from 'react-redux'
  import { onLogoutUser } from '../actions/index'

class Header extends Component {

    state = {
        isOpen : false
    }

    toggle = () => this.setState ({ isOpen : !this.state.isOpen })

// tidak menggunakan perulangan
    renderNav = () => {
        if(this.props.username == ""){
            return(
                <Nav className="ml-auto" navbar>
                    <NavItem >
                        <NavLink tag={Link} to="/register" className="text-white">register</NavLink>
                    </NavItem>

                    <NavItem>
                        <NavLink tag={Link} to="/login" className="text-white">login</NavLink>
                    </NavItem>
                </Nav>
            )
        } 
            return(
                <Nav className="ml-auto" navbar>
                    <UncontrolledDropdown nav inNavbar >
                        <DropdownToggle nav caret className="text-white" >
                            helo, {this.props.username} !
                        </DropdownToggle>

                        <DropdownMenu right >
                            <DropdownItem tag={Link} to="/ManageProduct">
                                Catalog
                            </DropdownItem>
                            <DropdownItem  tag={Link} to="/Cart">
                                Cart
                            </DropdownItem>
                            <DropdownItem divider />
                            <DropdownItem onClick={this.props.onLogoutUser} >
                                Logout
                            </DropdownItem>
                        </DropdownMenu>
                    </UncontrolledDropdown>
                                        
                </Nav>
            )

    }  

    render(){
            return(
                <div>
                    <Navbar className="bg-dark text-capitalize nav" light expand="md">
                    <NavbarBrand tag={Link} to="/" className="font-italic font-weight-bold text-warning">SuperMini</NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar></Collapse>
                    {this.renderNav()}
                    </Navbar>
                </div>
            )
        }
}

let mapStateToProps = (state) => {
    return {
        username : state.auth.username
    }
}

export default connect(mapStateToProps,{onLogoutUser})(Header)


/* menggunakan cara pe-rulangan


    render() { 
        if(this.props.username == "") {
            return (
                <div>
                    <Navbar className="bg-primary text-capitalize" light expand="md">
                        <NavbarBrand tag={Link} to="/" className="font-italic font-weight-bold text-warning">SuperMini</NavbarBrand>
                        <NavbarToggler onClick={this.toggle} />
                        <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto " navbar>
                                <NavItem>
                                    <NavLink tag={Link} to="/register">register</NavLink>
                                </NavItem>
    
                                <NavItem>
                                    <NavLink tag={Link} to="/login">login</NavLink>
                                </NavItem>   
                        </Nav>
                        </Collapse>
                    </Navbar>
                </div>
            )
        }
        return (
            <div>
                <Navbar className="bg-primary text-capitalize" light expand="md">
                    <NavbarBrand tag={Link} to="/" className="font-italic font-weight-bold text-warning">SuperMini</NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                    <Nav className="ml-auto " navbar>

                            <UncontrolledDropdown nav inNavbar >
                                <DropdownToggle nav caret >
                                    helo {this.props.username} 
                                </DropdownToggle>
                                <DropdownMenu right>
                                <DropdownItem>
                                    option 1
                                    </DropdownItem>
                                    <DropdownItem>
                                    option 2
                                    </DropdownItem>
                                    <DropdownItem divider />
                                    <DropdownItem>
                                    reset
                                    </DropdownItem>
                                </DropdownMenu>
                            </UncontrolledDropdown>
                                
                    </Nav>
                    </Collapse>
                </Navbar>
            </div>
        )
    }  
}

*/ 
import React, { Component } from 'react';
import Axios from 'axios';
import { Link } from 'react-router-dom';
import LinkAPI from './../supports/constants/LinkAPI';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes, faChevronRight, faChevronDown, faShoppingBag } from '@fortawesome/free-solid-svg-icons';
import HeaderLogo from './../supports/images/Logo-Header.png';
import LoginModal from './LoginModal.jsx';
 
export class Navbar extends Component {

    state = {
        data : null,
        loginStatus : false,
        loginErrorMessage : '',
        accountItemsToggle : false,
        totalCartUser : null,
        mobileItemsToggle : false
    }
    
    componentDidMount(){
        this.getIdUser()
        this.getTotalCartUser()
    }

    getIdUser = () => {
        // Step1. Ambil Id dari Local Storage
        // Step2. Kalo Id Ada, Maka Set "loginStatus : true"

        var idUser = localStorage.getItem('id')
        // console.log(idUser)
        
        if(idUser){
            this.setState({loginStatus : true})
            Axios.get(LinkAPI + 'users/' + idUser)
            .then((res) => {
                this.setState({data : res.data.username})
            })
            .catch((err) => {
                console.log(err)
                alert(err.message)
            })
        }else{
            this.setState({loginStatus : false})
        }
    }

    getTotalCartUser = () => {
        var idUser = localStorage.getItem('id')

        Axios.get(LinkAPI + 'carts?idUser=' + idUser)
        .then((res) => {
            // console.log(res)
            this.setState({totalCartUser : res.data.length})
        })
        .catch((err) => {
            console.log(err)
        })
    }

    onLogout = () => {
        if(window.confirm('Are You Sure Want To Logout?')){
            localStorage.removeItem('id')
            window.location = '/'
        }
    }

    render(){
        return(
            <div>
                {/* NAVBAR SECTION */}
                <div className="px-0 py-3 myfsid-bg-main-dark">
                    <div className="container">
                        <div className="row justify-content-between align-items-center px-3">
                            {/* Header Icon Bar Mobile */}
                            <div className="d-block d-md-none align-self-center myfsid-header-items-mobile">
                                <span onClick={() => this.setState({mobileItemsToggle : !this.state.mobileItemsToggle})} className="myfsid-clickable-element myfsid-light">
                                    <FontAwesomeIcon icon={this.state.mobileItemsToggle? faTimes : faBars} />
                                </span>
                            </div>

                           {/* Header Logo */}
                            <div className="d-none d-md-block myfsid-clickable-element myfsid-header-logo myfsid-light">
                                <Link to='/'>
                                    <img src={HeaderLogo} alt="Header Logo" width="250px" />
                                </Link>
                            </div>
                            <div className="d-block d-md-none myfsid-clickable-element myfsid-header-logo myfsid-light">
                                <Link to='/'>
                                    <img src={HeaderLogo} alt="Header Logo" width="250px" />
                                </Link>
                            </div>
                            
                            {/* Header Items */}
                            {
                                this.state.loginStatus?
                                    <div className="d-none d-md-block text-right myfsid-light">
                                        <span className="px-3 myfsid-clickable-element myfsid-font-size-16">
                                            <Link to='/' className="myfsid-link">
                                                Home
                                            </Link>
                                        </span>
                                        <span className="px-3 myfsid-clickable-element myfsid-font-size-16">
                                            <Link to='/catalog-products' className="myfsid-link">
                                                Products
                                            </Link>
                                        </span>
                                        <span className="px-3 myfsid-clickable-element myfsid-font-size-16">
                                            Promo
                                        </span>
                                        <span onClick={() => this.setState({accountItemsToggle : !this.state.accountItemsToggle})} className="px-3 myfsid-clickable-element myfsid-font-size-16">
                                            My Account <FontAwesomeIcon icon={this.state.accountItemsToggle? faChevronDown : faChevronRight} className="fa-xs ml-1" />
                                            {
                                                this.state.accountItemsToggle?
                                                    <div className="myfsid-header-account-items myfsid-font-size-15">
                                                        <p className="mx-3 my-3 text-left myfsid-dark">
                                                            Profile
                                                        </p>
                                                        <hr />
                                                        <p className="mx-3 my-3 text-left myfsid-dark">
                                                            Confirmation
                                                        </p>
                                                        <hr />
                                                        <Link to='/my-transaction' className="myfsid-link">
                                                            <p className="mx-3 my-3 text-left myfsid-dark">
                                                                My Order
                                                            </p>
                                                        </Link>
                                                        <hr />
                                                        <Link to='#' onClick={this.onLogout} className="myfsid-link">
                                                            <p className="mx-3 my-3 text-left myfsid-dark">
                                                                Logout
                                                            </p>
                                                        </Link>
                                                    </div>
                                                :
                                                    null
                                            }
                                        </span>
                                        <span className="px-3 myfsid-clickable-element myfsid-font-size-16">
                                            <Link to='/my-cart' className="myfsid-link">
                                                <FontAwesomeIcon icon={faShoppingBag} /> {this.state.totalCartUser? <span className="myfsid-total-carts-badge myfsid-bg-secondary text-center">{this.state.totalCartUser}</span> : null}
                                            </Link>
                                        </span>
                                    </div>
                                :
                                    <div className="d-none d-md-block text-right myfsid-light">
                                        <span className="px-3 myfsid-clickable-element myfsid-font-size-16">
                                            <Link to='/' className="myfsid-link">
                                                Home
                                            </Link>
                                        </span>
                                        <span className="px-3 myfsid-clickable-element myfsid-font-size-16">
                                            <Link to='/catalog-products' className="myfsid-link">
                                                Products
                                            </Link>
                                        </span>
                                        <span className="px-3 myfsid-clickable-element myfsid-font-size-16">
                                            Promo
                                        </span>
                                        <span className="px-3 myfsid-clickable-element myfsid-font-size-16">
                                            <LoginModal text="Login/Register" />
                                        </span>
                                    </div>
                            }

                            {/* Header Icon Cart Mobile */}
                            <div className="d-block d-md-none align-self-center">
                                <span className="mr-md-3 myfsid-clickable-element myfsid-light">
                                    <Link to='/my-cart' className="myfsid-link">
                                        <FontAwesomeIcon icon={faShoppingBag} /> {this.state.totalCartUser? <span className="myfsid-total-carts-badge myfsid-bg-secondary text-center">{this.state.totalCartUser}</span> : null}
                                    </Link>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Header Items Mobile */}
                {
                    this.state.mobileItemsToggle?
                        <div>
                            <div className="d-block d-md-none w-100 myfsid-header-items-lists-mobile">
                                <div className="px-3 py-2 border-top border-bottom myfsid-clickable-element myfsid-bg-light myfsid-font-size-16 myfsid-dark">
                                    <Link to='/' onClick={() => {this.setState({mobileItemsToggle : false})}} className="myfsid-link">
                                        Home
                                    </Link>
                                </div>
                                <div className="px-3 py-2 border-bottom myfsid-clickable-element myfsid-bg-light myfsid-font-size-16 myfsid-dark">
                                    <Link to='/catalog' onClick={() => {this.setState({mobileItemsToggle : false})}} className="myfsid-link">
                                        Catalog
                                    </Link>
                                </div>
                                <div className="px-3 py-2 border-bottom myfsid-clickable-element myfsid-bg-light myfsid-font-size-16 myfsid-dark">
                                    <Link to='/brands' onClick={() => {this.setState({mobileItemsToggle : false})}} className="myfsid-link">
                                        Brands
                                    </Link>
                                </div>
                                {
                                    this.state.loginStatus?
                                        <div>
                                            <div className="px-3 py-2 border-bottom myfsid-clickable-element myfsid-bg-light myfsid-font-size-16 myfsid-dark">
                                                <Link onClick={this.onLogout} className="myfsid-link">
                                                    My Account
                                                </Link>
                                            </div>
                                        </div>
                                    :
                                        <div>
                                            <div className="px-3 py-2 border-bottom myfsid-clickable-element myfsid-bg-light myfsid-font-size-16 myfsid-dark">
                                                <span className="myfsid-clickable-element mr-md-3">
                                                    <LoginModal text="Login/Register" />
                                                </span>
                                            </div>
                                        </div>
                                }
                            </div>
                        </div>
                    :
                        null
                }
            </div>
        )   
    }
}

export default Navbar
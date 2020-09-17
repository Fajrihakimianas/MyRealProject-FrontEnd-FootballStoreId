import React from 'react'
import Axios from 'axios'
import LinkAPI from '../supports/constants/LinkAPI'
import { UncontrolledAlert } from 'reactstrap';
import Loader from 'react-loader-spinner'

export class Cart extends React.Component{

    state = {
        dataCarts : null,
        dataProducts : null,
        alertMessage : ''
    }

    componentDidMount(){
        this.getDataCarts()
    }

    getDataCarts = () => {
        var idUser = localStorage.getItem('id')

        if(idUser){
            // Get Data Cart by Id User From Local Storage
            Axios.get(LinkAPI + 'carts?idUser=' + idUser)
            .then((res) => {
                var linkURL = 'products?'
                res.data.forEach((value) => {
                    linkURL += 'id=' + value.idProduct + '&'
                })
                res.data.sort((a, b) => {
                    return a.idProduct - b.idProduct
                })
                // console.log(res.data)
                this.setState({dataCarts : res.data})
                
                Axios.get(LinkAPI + linkURL)
                .then((res) => {
                    // console.log(res.data)
                    this.setState({dataProducts : res.data})
                })
                .catch((err) => {
                    console.log(err)
                })
            })
            .catch((err) => {
                console.log(err)
            })
        }
    }

    mapDataCarts = () => {
        return this.state.dataCarts.map((value, index) => {
            return(
                <div key={index} className="row justify-content-center align-items-center mt-0 mb-2 px-3 py-4 border">
                    {/* My Items Cart : Photo Product on Mobile */}
                    <div className="col-3 d-block d-md-none text-left"> 
                        <img src={this.state.dataProducts[index].image1} alt={'Photo product of' + this.state.dataProducts[index].name} width="150%" />
                    </div>
                    {/* My Items Cart : Photo Product on Desktop */}
                    <div className="col-3 d-none d-md-block text-left">
                        <img src={this.state.dataProducts[index].image1} alt={'Photo product of' + this.state.dataProducts[index].name} width="100%" />
                    </div>
                    {/* My Items Cart : Detail Product on Mobile */}
                    <div className="col-9 d-block d-md-none text-left">
                        <div className="px-4 pt-0">
                            <h6 className="myfsid-font-size-14">{this.state.dataProducts[index].name}</h6>
                        </div>
                        <div className="px-4 pt-0">
                            {
                                this.state.dataProducts[index].discount?
                                <div>
                                    <h5 className="mt-0 mb-1 myfsid-font-size-14 myfsid-secondary">Rp.{(this.state.dataProducts[index].price - (this.state.dataProducts[index].price * (this.state.dataProducts[index].discount/100))).toLocaleString('id-ID')} <span className="myfsid-font-size-14 myfsid-dark"><del>{this.state.dataProducts[index].price.toLocaleString('id-ID')}</del></span></h5>
                                </div>
                                :
                                <h5 className="mt-0 mb-1 myfsid-font-size-14 myfsid-dark">Rp.{this.state.dataProducts[index].price}</h5>
                            }
                        </div>
                        <div className="px-3 pt-3">
                            <input type="button" value="Delete Item" onClick={() => this.onDeleteProduct(value.id)} className="btn rounded-0 mr-3 px-2 pt-0 pb-1 myfsid-bg-secondary myfsid-light" />
                            {
                                value.quantity === 1?
                                        <input type="button" disabled value="-" className="btn rounded-0 px-2 pt-0 pb-1 font-weight-bold myfsid-bg-grey myfsid-light-grey" />     
                                    :
                                        <input type="button" value="-" onClick={() => this.onChangeQuantity('Min', index)} className="btn rounded-0 px-2 pt-0 pb-1 font-weight-bold myfsid-bg-main-light myfsid-light" /> 
                            }
                                <input type="text" value={value.quantity} className="rounded-0 border-0 mx-2 text-center myfsid-input" style={{width:"10%"}} />
                            {
                                value.quantity === this.state.dataProducts[index].stock?
                                    <input type="button" disabled value="+" className="btn rounded-0 px-2 pt-0 pb-1 font-weight-bold myfsid-bg-grey myfsid-light-grey" />     
                                :
                                    <input type="button" value="+" onClick={() => this.onChangeQuantity('Plus', index)} className="btn rounded-0 px-2 pt-0 pb-1 font-weight-bold myfsid-bg-main-light myfsid-light" /> 
                            }
                        </div>
                    </div>
                    {/* My Items Cart : Detail Product on Desktop */}
                    <div className="col-9 d-none d-md-block text-left">
                        <div className="px-3 pt-0">
                            <h5 className="mt-0 mb-1 myfsid-font-size-20">{this.state.dataProducts[index].name}</h5>
                            <h5 className="mt-0 mb-0 font-weight-normal myfsid-font-size-14">Stock : {this.state.dataProducts[index].stock}</h5>
                        </div>
                        <div className="px-3 pt-2">
                            {
                                this.state.dataProducts[index].discount?
                                    <div>
                                        <h5 className="mt-0 mb-1 myfsid-font-size-15 myfsid-secondary">Rp.{(this.state.dataProducts[index].price - (this.state.dataProducts[index].price * (this.state.dataProducts[index].discount/100))).toLocaleString('id-ID')} <span className="myfsid-font-size-14 myfsid-dark"><del>{this.state.dataProducts[index].price.toLocaleString('id-ID')}</del></span></h5>
                                    </div>
                                :
                                    <h5 className="mt-0 mb-1 myfsid-font-size-15 myfsid-dark">Rp.{this.state.dataProducts[index].price.toLocaleString('id-ID')}</h5>
                            }
                        </div>
                        <div className="px-3 pt-3">
                            <input type="button" value="Delete Item" onClick={() => this.onDeleteProduct(value.id)} className="btn rounded-0 mr-3 px-2 pt-0 pb-1 myfsid-bg-secondary myfsid-light" />
                            {
                                value.quantity === 1?
                                        <input type="button" disabled value="-" className="btn rounded-0 px-2 pt-0 pb-1 font-weight-bold myfsid-bg-grey myfsid-light-grey" />     
                                    :
                                        <input type="button" value="-" onClick={() => this.onChangeQuantity('Min', index)} className="btn rounded-0 px-2 pt-0 pb-1 font-weight-bold myfsid-bg-main-light myfsid-light" /> 
                            }
                                <input type="text"  value={value.quantity} className="rounded-0 border-0 mx-2 text-center myfsid-input" style={{width:"10%"}} />
                            {
                                value.quantity === this.state.dataProducts[index].stock?
                                    <input type="button" disabled value="+" className="btn rounded-0 px-2 pt-0 pb-1 font-weight-bold myfsid-bg-grey myfsid-light-grey" />     
                                :
                                    <input type="button" value="+" onClick={() => this.onChangeQuantity('Plus', index)} className="btn rounded-0 px-2 pt-0 pb-1 font-weight-bold myfsid-bg-main-light myfsid-light" /> 
                            }
                        </div>
                    </div>
                </div>
            )
        })
    }

    onDeleteProduct = (idProduct) => {
        if(window.confirm('Are You Sure Want To Delete This Item?')){
            Axios.delete(LinkAPI + 'carts/' + idProduct)
            .then((res) => {
                console.log(res)
                if(res.status === 200){
                    window.location = '/my-cart'
                    this.setState({alertMessage : 'The Product Deleted From Cart'})
                }
            })
            .catch((err) => {
                console.log(err)
            })
        }
    }

    onChangeQuantity = (button, index) => {
        var quantity = this.state.dataCarts[index].quantity
        var idCart = this.state.dataCarts[index].id

        if(button === 'Plus'){
            quantity = Number(quantity + 1)
        }else if(button === 'Min'){
            quantity = Number(quantity - 1)
        }

        Axios.patch(LinkAPI + 'carts/' + idCart, {quantity : quantity})
        .then((res) => {
            console.log(res)
            if(res.status === 200){
                var data = this.state.dataCarts
                data[index].quantity = quantity
                this.setState({dataCarts : data})
            }
        })
        .catch((err) => {
            console.log(err)
        })
    }

    getSummaryDataCart = () => {
        var totalItem = 0
        var totalPrice = 0

        this.state.dataCarts.forEach((value, index) => {
            this.state.dataProducts[index].discount?
                    totalPrice += value.quantity * (this.state.dataProducts[index].price - (this.state.dataProducts[index].price * (this.state.dataProducts[index].discount / 100)))
                :
                    totalPrice += value.quantity * this.state.dataProducts[index].price

            totalItem += value.quantity
        })

        return(
            <div className="mx-0 my-3 px-5 py-5 px-md-5 py-md-5 border myfsid-bg-light-grey">
                <div>
                    <h5>Cart Summary ({totalItem} Items)</h5>
                </div>
                <hr />
                <div className="row justify-content-center px-3">
                    <div className="col-6">
                        <span className="myfsid-font-size-14 myfsid-dark">Sub-Total</span>
                    </div>
                    <div className="col-6 text-right">
                        <span className="font-weight-bold myfsid-font-size-14 myfsid-dark">Rp.{totalPrice? totalPrice.toLocaleString('id-ID') : 0}</span>
                    </div>
                    <hr className="w-100" />
                    <div className="col-6">
                        <span className="myfsid-font-size-14 myfsid-dark">Unique Digit</span>
                    </div>
                    <div className="col-6 text-right">
                        <span className="font-weight-bold myfsid-font-size-14 myfsid-dark">Rp.{totalPrice? 495 : 0}</span>
                    </div>
                    <hr className="w-100" />
                    <div className="col-6">
                        <span className="myfsid-font-size-14 myfsid-dark">Total</span>
                    </div>
                    <div className="col-6 text-right">
                        <span ref="totalPrice" className="font-weight-bold myfsid-font-size-14 myfsid-secondary">Rp.{totalPrice? (totalPrice + 495).toLocaleString('id-ID') : 0}</span>
                    </div>
                    <div className="col-12">
                        {
                            totalItem?
                                <input type="button" value="Checkout" onClick={this.sendCartToCheckout} className="btn rounded-0 w-100 mt-5 mb-0 px-0 py-2 myfsid-bg-secondary myfsid-light"/>
                            :
                                <input type="button" disabled value="Checkout" className="btn rounded-0 w-100 mt-5 mb-0 px-0 py-2 myfsid-bg-secondary myfsid-light"/>
                        }
                    </div>
                </div>
            </div>
        )
    }

    sendCartToCheckout = () => {
        
        var getDate = new Date()
        getDate = getDate.getDate() + '-' + (getDate.getMonth() + 1) + '-' + getDate.getFullYear()
        var getTime = new Date()
        getTime = getTime.getHours() + ':' + getTime.getMinutes()
        var getTransactionDate = getDate + ' ' + getTime
        console.log(getTransactionDate)

        const detail = this.state.dataCarts.map((value, index) => {
            return{
                productName : this.state.dataProducts[index].name,
                productPrice : this.state.dataProducts[index].price,
                productDiscount : this.state.dataProducts[index].discount,
                productImage1 : this.state.dataProducts[index].image1,
                productQuantity : value.quantity
            }
        })

        const data = {
            idUser : Number(localStorage.getItem('id')),
            totalPrice : Number(this.refs.totalPrice.innerHTML.split('Rp.')[1].split('.').join('')),
            status : 'Unpaid',
            createdAt : getTransactionDate,
            detail : detail
        }

        Axios.post(LinkAPI + 'transactions', data)
        .then((res) =>{ 
            if(res.status === 201){
                var idTransaction = res.data.id

                this.state.dataCarts.forEach((value, index) => {
                    Axios.delete(LinkAPI + 'carts/' + value.id)
                    .then((res) => {
                        console.log(res)
                        if(index === this.state.dataCarts.length-1){
                            console.log(res)
                            window.location = '/checkout/' + idTransaction
                        }
                    })
                    .catch((err) => {
                        console.log(err)
                    })
                })
            }
        })
        .catch((err) => {
            console.log(err)
        })
    }

    render(){
        return(
            <div>
                {/* CART SECTION */}
                <div className="container-fluid my-5 px-5">
                    <div className="row justify-content-center">
                        {/* Page Title */}
                        <div className="col-12">
                            <h2 className="mx-3 text-center text-md-left font-weight-bold">Cart Page</h2>
                        </div>

                        {/* My Items Cart */}
                        <div className="col-12 col-md-8 px-3 py-5 px-md-5 py-md-3">
                        {
                                this.state.alertMessage?
                                <UncontrolledAlert color="info" className="mx-2 border-0 rounded-0 myfsid-bg-dark myfsid-light">
                                    {this.state.alertMessage}
                                </UncontrolledAlert>
                                :
                                    null
                            }
                            {
                                !(this.state.dataProducts === null || this.state.dataCarts === null)?
                                    this.state.dataProducts.length === 0 || this.state.dataCarts.length === 0?
                                        <div className="row justify-content-center align-items-center mt-0 mb-2 px-3 py-4 text-center border">
                                            <h5>Your Shopping Cart Still Empty!</h5>
                                        </div>
                                    :
                                        this.mapDataCarts()
                                :
                                    <div className="row justify-content-center align-items-center mt-0 mb-2 px-3 py-4 border">
                                        <Loader type="ThreeDots" color="#005eb8" height={50} width={50} />
                                    </div>
                            }
                            <div>
                            </div>
                        </div>

                        {/* Cart Summary */}
                        <div className="col-12 col-md-4 px-0 py-0 px-md-3 py-md-0">
                            {
                                !(this.state.dataProducts === null || this.state.dataCarts === null)?
                                    this.getSummaryDataCart()
                                :
                                    <div className="mx-0 my-3 px-5 py-5 px-md-5 py-md-5 border text-center myfsid-bg-light-grey">
                                        <Loader type="ThreeDots" color="#005eb8" height={50} width={50} />
                                    </div>
                            }
                            <div>
                                <div>
                                    <h5>Your Coupon</h5>
                                </div>
                                <div className="px-3">
                                    <div className="row justify-content-center px-0 pt-0 pb-3">
                                        <div className="col-8 px-0 py-0">
                                            <input type="text" placeholder="Enter your promo code" className="form-control rounded-0 py-0" />
                                        </div>
                                        <div className="col-4 px-0 py-0 text-center">
                                            <input type="button" value="Apply" className="btn rounded-0 w-100 h-100 myfsid-bg-secondary myfsid-light" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Cart
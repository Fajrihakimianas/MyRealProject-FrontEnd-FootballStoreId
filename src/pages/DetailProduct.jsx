import React, { Component } from 'react';
import Axios from 'axios';
import LinkAPI from '../supports/constants/LinkAPI';
import Loader from 'react-loader-spinner';
import { UncontrolledAlert } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationCircle, faHeart } from '@fortawesome/free-solid-svg-icons';
import LoginModal from './../components/LoginModal.jsx';

class DetailProduct extends Component {

    state = {
        data : null,
        loginStatus : false,
        onClickImage : '',
        onClickSize : '',
        alertMessage : false,
        errorMessage : ''
    }

    componentDidMount(){
        window.scrollTo(0,0)
        this.getIdUser()
        this.getDataProductById()
        this.getDataSimiliarProduct()
    }

    componentWillUnmount(){
        localStorage.removeItem('idProduct')
    }

    getIdUser = () => {
        var idUser = localStorage.getItem('id')
        // console.log(idUser)

        if(idUser){
            this.setState({loginStatus : true})
        }
    }

    getDataProductById = () => {
        var idProduct = this.props.location.pathname.split('/')[2]

        Axios.get(LinkAPI + 'products/' + idProduct)
        
        .then((res) => {
            // console.log(res.data)
            this.setState({data : res.data})
        })
        .catch((err) => {
            console.log(err)
            alert(err.message)
        })
    }

    getDataSimiliarProduct = () => {
        var idProduct = this.props.location.pathname.split('/')[2]

        Axios.get(LinkAPI + 'products/' + idProduct)
        .then((res) => {
            // console.log(res)

            var categoryProduct = res.data.category
            Axios.get(LinkAPI + 'products?category=' + categoryProduct)
            .then((res) => {
                // console.log(res.data)
                this.setState({dataSimiliar : res.data.slice(0, 4)})
            })
            .catch((err) => {
                console.log(err)
            })
        })
        .catch((err) => {
            console.log(err)
        })
    }

    sendProductToCart = () => {
        var idUser = Number(localStorage.getItem('id'))
        var idProduct = Number(this.props.location.pathname.split('/')[2])
        var size = Number(this.state.onClickSize)

            if(size){
                Axios.get(LinkAPI + 'carts?idProduct=' + idProduct)
                .then((res) => {
                    // console.log(res.data)

                    if(res.data.length === 0){
                        Axios.post(LinkAPI + 'carts', {idUser, idProduct, quantity : 1})
                        .then((res) => {
                            // console.log(res.data)
                            window.scrollTo(0,0)
                            this.setState({alertMessage : true})
                            setTimeout(function(){window.location = '/my-cart'}, 3000)
                        })
                        .catch((err) => {
                            console.log(err)
                        })
                        
                        this.setState({errorMessage : ''})
                    }else{
                        var id = res.data[0].id
                        var addQuantity = res.data[0].quantity + 1

                        Axios.patch(LinkAPI + 'carts/' + id, {quantity : addQuantity })
                        .then((res) => {
                            // console.log(res)
                            window.scrollTo(0,0)
                            this.setState({alertMessage : true})
                            setTimeout(function(){window.location = '/my-cart'}, 3000)
                        })
                        .catch((err) => {
                            console.log(err)
                        })
                        this.setState({errorMessage : ''})
                    }
                })
                .catch((err) => {
                    console.log(err)
                })
            }else{
                this.setState({errorMessage : 
                    <span>
                        <FontAwesomeIcon icon={faExclamationCircle} /> Select your size
                    </span>
                })
        }
    }

    render(){
        if(this.state.data === null){
            return(
                <div>
                    {/* LOAD DATA */}
                    <div>
                        {/* DETAIL PRODUCT SECTION */}
                        <div className="container my-5">
                            <div className="row justify-content-center">
                                <div className="col-md-6">
                                    <div className="row justify-content-center px-3 py-3">
                                        <div className="col-12 py-3 text-center">
                                            <Loader type="TailSpin" color="#005eb8" height={100} width={100} />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6 pt-4">
                                    <div>
                                        <Loader type="ThreeDots" color="#005eb8" height={30} width={30} />
                                    </div>
                                    <hr className="mt-3" />
                                    <div>
                                        <Loader type="ThreeDots" color="#005eb8" height={30} width={30} />
                                    </div>
                                    <hr className="mt-3" />
                                    <div>
                                        <Loader type="ThreeDots" color="#005eb8" height={30} width={30} />
                                    </div>
                                    <div className="row justify-content-center py-3">
                                        <Loader type="ThreeDots" color="#005eb8" height={30} width={30} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                </div>
            )
        }
        return(
            <div>
                {/* DETAIL PRODUCT SECTION */}
                <div className="container my-5">
                    <div className="row justify-content-center">
                        <div className="col-md-6">
                            <div className="row justify-content-center px-3 py-3">
                                {
                                    this.state.alertMessage?
                                        <UncontrolledAlert className="d-block d-md-none border border-0 rounded-0 myfsid-bg-secondary myfsid-light">
                                            The Product Added To Cart! You Will Directed To Your Cart.
                                        </UncontrolledAlert>
                                    :
                                        null
                                }
                                <div className="col-12 py-3 text-center">
                                    {
                                        this.state.data.stock?
                                            this.state.data.discount?
                                                <h6 className="py-2 font-weight-normal myfsid-detail-product-discount-badge myfsid-bg-secondary myfsid-light">Save <span className="font-weight-bold">{this.state.data.discount}%</span></h6>
                                            :
                                                null
                                        :
                                            <h6 className="py-2 font-weight-bold myfsid-detail-product-discount-badge myfsid-bg-secondary myfsid-light">SOLD <span className="font-weight-bold">OUT!</span></h6>
                                    }
                                    <img src={this.state.onClickImage? this.state.onClickImage : this.state.data.image1} alt={"Photo product of " + this.state.data.name} width="75%" />
                                </div>
                                <div onClick={() => this.setState({onClickImage : this.state.data.image1})} className="col-3 w-100 text-center myfsid-clickable-element">
                                    <img src={this.state.data.image1} alt={"Photo product of " + this.state.data.name} width="100%" className={this.state.onClickImage===this.state.data.image1? "p-2 border border-dark" : "p-2 border"} />
                                </div>
                                <div onClick={() => this.setState({onClickImage : this.state.data.image2})} className="col-3 w-100 text-center myfsid-clickable-element">
                                    <img src={this.state.data.image2} alt={"Photo product of " + this.state.data.name} width="100%" className={this.state.onClickImage===this.state.data.image2? "p-2 border border-dark" : "p-2 border"} />
                                </div>
                                <div onClick={() => this.setState({onClickImage : this.state.data.image3})} className="col-3 w-100 text-center myfsid-clickable-element">
                                    <img src={this.state.data.image3} alt={"Photo product of " + this.state.data.name} width="100%" className={this.state.onClickImage===this.state.data.image3? "p-2 border border-dark" : "p-2 border"} />
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 pt-4">
                            {
                                this.state.alertMessage?
                                    <UncontrolledAlert className="d-none d-md-block border border-0 rounded-0 myfsid-bg-secondary myfsid-light">
                                        The Product Added To Cart! You Will Directed To Your Cart.
                                    </UncontrolledAlert>
                                :
                                    null
                            }
                            <div>
                                <h4>{this.state.data.name}</h4>
                                <span>Sold : {this.state.data.sold} Products</span>
                                {
                                    this.state.data.stock?
                                        this.state.data.discount?
                                            <span>
                                                <h3 className="pt-3 myfsid-font-size-20 myfsid-secondary">Rp.{(this.state.data.price - (this.state.data.price * (this.state.data.discount/100))).toLocaleString('id-ID')} <span className="myfsid-font-size-14 myfsid-dark"><del>{this.state.data.price.toLocaleString('id-ID')}</del></span></h3>
                                            </span>
                                        :
                                            <h3 className="pt-3 myfsid-font-size-20">Rp.{this.state.data.price.toLocaleString('id-ID')}</h3>
                                    :
                                        <h4 className="pt-3 myfsid-secondary">Out Of Stock!</h4>
                                }
                            </div>
                            <hr className="mt-3" />
                            <div>
                                <h6 className="font-weight-bold">Stock</h6>
                                <h6 className="font-weight-light">{this.state.data.stock} Pcs</h6>
                                <h6 className="font-weight-bold">Weight</h6>
                                <h6 className="font-weight-light">200 Gram</h6>
                                <h6 className="font-weight-bold">Size</h6>
                                {
                                    this.state.data.category === 'Football Boots' || this.state.data.category === 'Futsal Boots'?
                                        <div className="row px-1 py-3">
                                            <div onClick={() => this.setState({onClickSize : '41'})} className={this.state.onClickSize === '41'?"col-1 mx-2 px-1 py-2 text-center font-weight-bold myfsid-clickable-element myfsid-bg-main-light myfsid-light" : "col-1 mx-2 px-1 py-2 text-center border myfsid-clickable-element"}>
                                                41
                                            </div>
                                            <div onClick={() => this.setState({onClickSize : '42'})} className={this.state.onClickSize === '42'?"col-1 mx-2 px-1 py-2 text-center font-weight-bold myfsid-clickable-element myfsid-bg-main-light myfsid-light" : "col-1 mx-2 px-1 py-2 text-center border myfsid-clickable-element"}>
                                                42
                                            </div>
                                            <div onClick={() => this.setState({onClickSize : '43'})} className={this.state.onClickSize === '43'?"col-1 mx-2 px-1 py-2 text-center font-weight-bold myfsid-clickable-element myfsid-bg-main-light myfsid-light" : "col-1 mx-2 px-1 py-2 text-center border myfsid-clickable-element"}>
                                                43
                                            </div>
                                        </div>
                                    :
                                        this.state.data.category === 'Jersey Shirts'?
                                            <div className="row px-1 py-3">
                                                <div onClick={() => this.setState({onClickSize : 'S'})} className={this.state.onClickSize === 'S'?"col-1 mx-2 px-1 py-2 text-center font-weight-bold myfsid-clickable-element myfsid-bg-main-light myfsid-light" : "col-1 mx-2 px-1 py-2 text-center border myfsid-clickable-element"}>
                                                    S
                                                </div>
                                                <div onClick={() => this.setState({onClickSize : 'M'})} className={this.state.onClickSize === 'M'?"col-1 mx-2 px-1 py-2 text-center font-weight-bold myfsid-clickable-element myfsid-bg-main-light myfsid-light" : "col-1 mx-2 px-1 py-2 text-center border myfsid-clickable-element"}>
                                                    M
                                                </div>
                                                <div onClick={() => this.setState({onClickSize : 'L'})} className={this.state.onClickSize === 'L'?"col-1 mx-2 px-1 py-2 text-center font-weight-bold myfsid-clickable-element myfsid-bg-main-light myfsid-light" : "col-1 mx-2 px-1 py-2 text-center border myfsid-clickable-element"}>
                                                    L
                                                </div>
                                            </div>
                                        :
                                        <div className="row px-1 py-3">
                                            <div onClick={() => this.setState({onClickSize : '8'})} className={this.state.onClickSize === '8'?"col-1 mx-2 px-1 py-2 text-center font-weight-bold myfsid-clickable-element myfsid-bg-main-light myfsid-light" : "col-1 mx-2 px-1 py-2 text-center border myfsid-clickable-element"}>
                                                8
                                            </div>
                                            <div onClick={() => this.setState({onClickSize : '9'})} className={this.state.onClickSize === '9'?"col-1 mx-2 px-1 py-2 text-center font-weight-bold myfsid-clickable-element myfsid-bg-main-light myfsid-light" : "col-1 mx-2 px-1 py-2 text-center border myfsid-clickable-element"}>
                                                9
                                            </div>
                                            <div onClick={() => this.setState({onClickSize : '10'})} className={this.state.onClickSize === '10'?"col-1 mx-2 px-1 py-2 text-center font-weight-bold myfsid-clickable-element myfsid-bg-main-light myfsid-light" : "col-1 mx-2 px-1 py-2 text-center border myfsid-clickable-element"}>
                                                10
                                            </div>
                                        </div>
                                }
                                <span className="myfsid-secondary">{this.state.errorMessage}</span>
                            </div>
                            <hr className="mt-3" />
                            <div>
                                <h6 className="font-weight-bold">Deskripsi : </h6>
                                <h6 className="font-weight-light">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Reiciendis, vero ipsum fuga delectus quasi, voluptates eos aut fugiat impedit praesentium rerum exercitationem eaque quidem? Ipsam fuga similique magnam blanditiis est?</h6>
                            </div>
                            <div className="row justify-content-center py-3">
                                <div className="col-10 col-md-10 mx-1 px-0">
                                    {
                                        this.state.loginStatus?
                                            this.state.data.stock?
                                                <input type="button" value="Add To Cart" onClick={this.sendProductToCart} className="btn rounded-0 w-100 py-2 myfsid-bg-main-light myfsid-light"/>
                                            :
                                                <input type="button" disabled value="Out Of Stock" onClick={this.sendProductToCart} className="btn rounded-0 w-100 py-2 myfsid-bg-main-light myfsid-light"/>
                                        :
                                            <LoginModal text="Add To Cart" onClick={localStorage.setItem('idProduct', this.state.data.id)} className="btn rounded-0 w-100 py-2 myfsid-bg-main-light myfsid-light" />
                                    }
                                </div>
                                {
                                    this.state.loginStatus?
                                        <div className="col-1 col-md-1 px-0 py-2 text-center border border-dark myfsid-clickable-element myfsid-dark">
                                            <FontAwesomeIcon icon={faHeart} className="fa-lg" />
                                        </div>
                                    :
                                        <div className="col-1 col-md-1 px-0 py-2 text-center border border-dark myfsid-clickable-element myfsid-dark">
                                            <LoginModal text={<FontAwesomeIcon icon={faHeart} className="fa-lg" />} />
                                        </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>

                {/*SIMILIAR PRODUCT CATEGORY SECTION */}
                <div className="container my-5">
                    <hr style={{width : "97%"}}></hr>
                    <div className="px-3 py-2 text-center text-md-left">
                        <h4>Similiar Products</h4>
                    </div>
                    <div>
                        <div className="row px-3">
                        {
                            this.state.dataSimiliar?
                                this.state.dataSimiliar.map((value, id) => {
                                    return(
                                        <div key={id} className="col-6 col-md-3 px-3 py-3">
                                            <div className="myfsid-detail-product-similiar-items">
                                                {
                                                    value.discount?
                                                        <span className="text-center myfsid-detail-product-similiar-items-discount-badge myfsid-bg-secondary myfsid-font-size-14 myfsid-light">
                                                            -{value.discount}%
                                                        </span>
                                                    :
                                                        null
                                                }
                                                <img src={value.image1} alt={"Photo product of " + value.name} width='100%' className="myfsid-detail-product-similiar-items-images" />
                                                <div onClick={() => window.location = '/detail-product/' + value.id} className="myfsid-clickable-element myfsid-detail-product-similiar-items-button">
                                                    <div className="myfsid-detail-product-similiar-items-button-text">Details</div>
                                                </div>
                                            </div>
                                            <div className="text-center">
                                                <h6 onClick={() => window.location = '/detail-product/' + value.id} className="mt-3 mb-0 myfsid-clickable-element myfsid-font-size-16">{value.name.slice(0,26) + '...'}</h6>
                                            </div>
                                            <div className="text-center">
                                                {
                                                    value.discount?
                                                        <span className="mt-3 mb-0 font-weight-bold myfsid-font-size-14 myfsid-secondary">Rp.{(value.price - (value.price * (value.discount / 100))).toLocaleString('id-ID')} <span className="mt-3 mb-0 font-weight-normal myfsid-font-size-14 myfsid-dark"><del>Rp.{value.price.toLocaleString('id-ID')}</del></span></span>
                                                    :
                                                        <span className="mt-3 mb-0 font-weight-bold myfsid-font-size-14">Rp.{value.price.toLocaleString('id-ID')}</span>
                                                }
                                            </div>
                                        </div>
                                        )
                                    })
                                :
                                    'Loading'
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default DetailProduct
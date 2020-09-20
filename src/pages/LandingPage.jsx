import React, { Component } from 'react';
import Axios from 'axios';
import { Link } from 'react-router-dom';
import LinkAPI from './../supports/constants/LinkAPI';
import Loader from 'react-loader-spinner';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faCube } from '@fortawesome/free-solid-svg-icons';
import './../supports/stylesheets/LandingPage.css';

export class LandingPage extends Component {
    state = {
        data : null,
        dataBestSeller : null
    }

    componentDidMount(){
        this.onGetData()
    }

    onGetData = () => {
        Axios.get(LinkAPI + 'products')

        .then((res) => {
            // console.log(res)
            this.setState({data : res.data})
        })
        .catch((err) => {
            console.log(err)
        })
    }

    mapDataDiscount = () => {
        return this.state.data.map((value, id) => {
            return(
                <span key={id}>
                    {
                        value.discount?
                            <div className="d-inline-block mr-3" style={{width:'250px'}}>
                                <div className="mb-3 px-1 py-1"> 
                                    <div className="myfsid-promo-items">
                                        <span className="text-center myfsid-promo-items-discount-badge myfsid-bg-secondary myfsid-font-size-14 myfsid-light">
                                            -{value.discount}%
                                        </span>
                                        <img src={value.image1} alt={"Photo product of " + value.name} width='100%' className="myfsid-promo-items-images" />
                                        <Link to={'/detail-product/' + value.id} className="myfsid-link">
                                            <div className="myfsid-clickable-element myfsid-promo-items-button">
                                                <div className="myfsid-promo-items-button-text">Details</div>
                                            </div>
                                        </Link>
                                    </div>
                                    <div className="text-center">
                                        <Link to={'/detail-product/' + value.id} className="myfsid-link">
                                            <h6 className="mt-3 mb-0 myfsid-font-size-16">{value.name.slice(0,26) + '...'}</h6>
                                        </Link>
                                    </div>
                                    <div className="text-center">
                                        <span className="mt-3 mb-0 font-weight-bold myfsid-font-size-16 myfsid-secondary">Rp.{(value.price - (value.price * (value.discount / 100))).toLocaleString('id-ID')}</span> <span className="mt-3 mb-0 myfsid-font-size-14"><del>Rp.{value.price.toLocaleString('id-ID')}</del></span>
                                    </div>
                                </div>
                            </div>
                        :
                            null
                    }
                </span>
            )
        })
    }
    render(){
        return(
            <div>
                {/* JUMBOTRON SECTION */}
                <div>    
                    <div className="px-0 py-3 text-center myfsid-bg-grey">
                        <marquee><FontAwesomeIcon icon={faClock} /> FREE RETURNS WITHIN 30 DAYS - <FontAwesomeIcon icon={faCube} className="mx-1" /> FREE DELIVERY FEE (CODE: 20PX12)</marquee>
                    </div>
                    <div className="myfsid-jumbotron">
                        <div className="container h-100">
                            <div className="row justify-content-center align-items-end align-items-md-center h-100">
                                <div className="col-12 myfsid-light">
                                    <h1 className="text-center text-md-left myfsid-jumbotron-title-campaign">
                                        Encrypted Pack :<br />Save 45%
                                    </h1>
                                    <h1 className="text-center text-md-left myfsid-jumbotron-terms-campaign">
                                        Limited Time Only!
                                    </h1>
                                    <div className="text-center text-md-left mb-5 mb-md-0">
                                        <input type="button" value="Shop Now" className="btn btn-light rounded-0 px-5 px-md-3" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>  
                </div>

                {/* PROMO SECTION */}
                <div className="container-fluid px-5 py-5">
                    <div className="mb-5 text-center">
                        <h1 className="m-0 p-0 font-weight-bold">- Flash Sale For Selected Items -</h1> 
                        <p className="m-0 p-0 font-weight-normal myfsid-font-size-20">Limited Time Only, Get It Now!</p>
                    </div>
                    <div>
                        {
                            this.state.data?
                                <div style={{overflow:'auto', whiteSpace:'nowrap'}} className="mb-3">
                                    {
                                        this.mapDataDiscount()
                                    } 
                                </div>
                            :
                                <div style={{overflow:'auto', whiteSpace:'nowrap'}} className="mt-5 p-0 text-center">
                                    <Loader type="ThreeDots" color="#005eb8" height={50} width={50} />
                                </div>
                        }
                    </div>
                </div>

                {/* NEWSLETTER SECTION */}
                <div className="container-fluid px-5 pt-0 pb-3 d-none d-md-block">
                    <div className="myfsid-newsletter">
                            <div className="row justify-content-center align-items-center h-100">
                                <h6 className="pt-3 pb-0 font-weight-bold myfsid-font-size-30 myfsid-light">SUBSCRIBE OUR NEWSLETTER!</h6>
                            </div>
                    </div>
                </div>

                {/* SHOP BY CATEGORY SECTION */}
                <div className="container-fluid px-5 pt-0 pb-0 pt-md-3 pb-md-0">
                    <div className="text-center text-md-left pb-3 pt-3 pb-md-0">
                        <h3 className="font-weight-bold">Our Catalog</h3> 
                    </div>
                    <div className="row justify-content-center px-0 py-0 px-md-0 py-md-3">
                        <div className="col-12 col-md-3 px-3 pt-0 pb-5 px-md-3 pt-md-0 pb-md-0">
                            <div className="myfsid-catalog">
                                <div className="myfsid-catalog-images myfsid-catalog-football">

                                </div>
                                <div className="myfsid-catalog-button">
                                    <div className="font-weight-bold myfsid-catalog-button-text">Shop Now</div>
                                </div>
                            </div>
                            <div className="mx-0 px-0 text-left">
                                <h5 className="mt-2 mb-1 mt-md-3 mb-md-1 font-weight-bold">Football Boots</h5>
                                <h6 className="font-weight-normal myfsid-font-size-14">The summer is coming! Get our new line-up from many brands and get the greatest offers from us.</h6>
                            </div>
                        </div>
                        <div className="col-12 col-md-3 px-3 pt-0 pb-5 px-md-3 pt-md-0 pb-md-0">
                            <div className="myfsid-catalog">
                                <div className="myfsid-catalog-images myfsid-catalog-gloves">

                                </div>
                                <div className="myfsid-catalog-button">
                                    <div className="font-weight-bold myfsid-catalog-button-text">Shop Now</div>
                                </div>
                            </div>
                            <div className="mx-0 px-0 text-left">
                                <h5 className="mt-2 mb-1 mt-md-3 mb-md-1 font-weight-bold">Goalkeepers</h5>
                                <h6 className="font-weight-normal myfsid-font-size-14">Ready to take off. The latest gloves packs from our brands. Choose ones into fit on your hands now!</h6>
                            </div>
                        </div>
                        <div className="col-12 col-md-3 px-3 pt-0 pb-5 px-md-3 pt-md-0 pb-md-0">
                            <div className="myfsid-catalog">
                                <div className="myfsid-catalog-images myfsid-catalog-jersey-shirt">

                                </div>
                                <div className="myfsid-catalog-button">
                                    <div className="font-weight-bold myfsid-catalog-button-text">Shop Now</div>
                                </div>
                            </div>
                            <div className="mx-0 px-0 text-left">
                                <h5 className="mt-2 mb-1 mt-md-3 mb-md-1 font-weight-bold">Jersey Shirts</h5>
                                <h6 className="font-weight-normal myfsid-font-size-14">The new season in just a few days. The jersey shirts of your favourite team ready to fit in yours. Grab it now!</h6>
                            </div>
                        </div>
                        <div className="col-12 col-md-3 px-3 pt-0 pb-5 px-md-3 pt-md-0 pb-md-0">
                            <div className="myfsid-catalog">
                                <div className="myfsid-catalog-images myfsid-catalog-futsal">

                                </div>
                                <div className="myfsid-catalog-button">
                                    <div className="font-weight-bold myfsid-catalog-button-text">Shop Now</div>
                                </div>
                            </div>
                            <div className="mx-0 px-0 text-left">
                                <h5 className="mt-2 mb-1 mt-md-3 mb-md-1 font-weight-bold">Futsal Equipments</h5>
                                <h6 className="font-weight-normal myfsid-font-size-14">The summer is coming! Get our new futsal equipment from many brands and get the greatest offers from us.</h6>
                            </div>
                        </div>
                    </div>
                </div>

                {/* SHOP BY BRANDS SECTION */}
                <div className="container-fluid px-5 pt-0 pb-0 pt-md-3 pb-md-0">
                    <div className="text-center text-md-left">
                        <h3 className="font-weight-bold">Shop By Brands</h3> 
                    </div>
                    <div className="row justify-content-center mx-0 my-0 px-0 pt-3 pb-5">
                        <div className="col-6 col-md-3 text-center">
                            <img src="https://content.nike.com/content/dam/one-nike/globalAssets/social_media_images/nike_swoosh_logo_black.png" alt="Brand Logo1" width="50%"/>
                        </div>
                        <div className="col-6 col-md-3 text-center">
                            <img src="https://cdn.freebiesupply.com/logos/large/2x/uhlsport-1-logo-black-and-white.png" alt="Brand Logo2" width="50%"/>
                        </div>
                        <div className="col-6 col-md-3 text-center">
                            <img src="https://content.nike.com/content/dam/one-nike/globalAssets/social_media_images/nike_swoosh_logo_black.png" alt="Brand Logo3" width="50%"/>
                        </div>
                        <div className="col-6 col-md-3 text-center">
                            <img src="https://cdn.freebiesupply.com/logos/large/2x/uhlsport-1-logo-black-and-white.png" alt="Brand Logo4" width="50%"/>
                        </div>
                        <div className="col-6 col-md-3 text-center">
                            <img src="https://cdn.freebiesupply.com/logos/large/2x/uhlsport-1-logo-black-and-white.png" alt="Brand Logo5" width="50%"/>
                        </div>
                        <div className="col-6 col-md-3 text-center">
                            <img src="https://content.nike.com/content/dam/one-nike/globalAssets/social_media_images/nike_swoosh_logo_black.png" alt="Brand Logo6" width="50%"/>
                        </div>
                        <div className="col-6 col-md-3 text-center">
                            <img src="https://cdn.freebiesupply.com/logos/large/2x/uhlsport-1-logo-black-and-white.png" alt="Brand Logo7" width="50%"/>
                        </div>
                        <div className="col-6 col-md-3 text-center">
                            <img src="https://content.nike.com/content/dam/one-nike/globalAssets/social_media_images/nike_swoosh_logo_black.png" alt="Brand Logo8" width="50%"/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
} 

export default LandingPage
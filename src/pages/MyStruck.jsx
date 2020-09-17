import React from 'react'
import Axios from 'axios'
import { Link } from 'react-router-dom';
import LinkAPI from '../supports/constants/LinkAPI';
import Moment from 'moment'

export class Checkout extends React.Component{

    state = {
        data : null
    }

    componentDidMount(){
        this.getDataStruck()
    }

    getDataStruck = () => {
        var idStruck = this.props.match.params.idStruck

        Axios.get(LinkAPI + 'transactions?id=' + idStruck)
        .then((res) => {
            // console.log(res.data)
            this.setState({data : res.data})
        })
        .catch((err) => {
            console.log(err)
        })
    }
    render(){
        return(
            <div>
                {/* TRANSACTION HISTORY SECTION */}
                <div className="container my-5">
                    {/* Transaction History */}
                    <div className="pt-0 pb-4">
                        <h3 className="text-center">My Struck</h3>
                    </div>
                    <div className="row justify-content-center">
                        <div className="col-10 col-md-4">
                        {
                            this.state.data?
                            this.state.data.map((value, index) => {
                                return(
                                    <div key={index} className="px-3 py-2 border myfsid-bg-light-grey">
                                        <div className="text-center">
                                            <span className="font-weight-bold">FOOTBALL<span className="font-weight-normal">STOREID</span></span>
                                        </div>
                                        <hr />
                                        <div>
                                            {
                                                this.state.data[index].detail?
                                                this.state.data[index].detail.map((value, index) => {
                                                    return(
                                                        <div key={index} className="row mx-0">
                                                            <div className="col-6">
                                                                <h6 className="myfsid-font-size-12 font-weight-normal">{value.productName} <b>( x{value.productQuantity} )</b></h6>
                                                            </div>
                                                            <div className="col-6 text-right">
                                                                <h6 className="myfsid-font-size-12 font-weight-bold">{value.productDiscount? <span>Rp.{(value.productPrice - (value.productPrice * (value.productDiscount / 100))).toLocaleString('id-ID')} <span className="font-weight-normal"><del>Rp.{value.productPrice.toLocaleString('id-ID')}</del></span></span> : <span>Rp.{value.productPrice.toLocaleString('id-ID')}</span>}</h6>
                                                            </div>
                                                        </div>
                                                    )
                                                })
                                                :
                                                    null
                                            }
                                        </div>
                                        <hr />
                                        <div>
                                            <div className="row mx-0">
                                                <div className="col-6">
                                                    <h6 className="myfsid-font-size-12 font-weight-normal">Sub-Total</h6>
                                                </div>
                                                <div className="col-6 text-right">
                                                    <h6 className="myfsid-font-size-12 font-weight-bold">Rp.{(value.totalPrice - 495).toLocaleString('id-ID')}</h6>
                                                </div>
                                                <div className="col-6">
                                                    <h6 className="myfsid-font-size-12 font-weight-normal">Unique Digit</h6>
                                                </div>
                                                <div className="col-6 text-right">
                                                    <h6 className="myfsid-font-size-12 font-weight-bold">Rp.495</h6>
                                                </div>
                                                <div className="col-6">
                                                    <h6 className="myfsid-font-size-12 font-weight-normal">Shipping Rates</h6>
                                                </div>
                                                <div className="col-6 text-right">
                                                    <h6 className="myfsid-font-size-12 font-weight-bold">Rp.20.000</h6>
                                                </div>
                                            </div>
                                        </div>
                                        <hr />
                                        <div>
                                            <div className="row mx-0">
                                                <div className="col-6">
                                                    <h6 className="myfsid-font-size-12 font-weight-normal">Total</h6>
                                                </div>
                                                <div className="col-6 text-right">
                                                    <h6 className="myfsid-font-size-12 font-weight-bold">Rp.{(value.totalPrice + 20000).toLocaleString('id-ID')}</h6>
                                                </div>
                                            </div>
                                        </div>
                                        <hr />
                                        <div>
                                            <h6 className="myfsid-font-size-12 font-weight-bold text-center">Paid : {Moment(value.createdAt).format('D MMMM YYYY, h:mm:ss A')}</h6>
                                        </div>
                                    </div>
                                )
                            })
                            :
                                null
                        }
                        </div>
                    </div>
                    <div>
                        <div className="row justify-content-center my-3">
                            <div className="col-10 col-md-4">
                                <Link to='/my-transaction' className="myfsid-link">
                                    <input type="button" value="Back To History Transaction" className="btn rounded-0 w-100 py-2 myfsid-bg-main-light myfsid-light"/>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

export default Checkout
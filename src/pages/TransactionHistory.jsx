import React from 'react'
import Axios from 'axios'
import { Link } from 'react-router-dom';
import LinkAPI from '../supports/constants/LinkAPI';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faReceipt } from '@fortawesome/free-solid-svg-icons';

export class Checkout extends React.Component{

    state = {
        data : null,
        dataStruck : null,
        timeOut : false
    }

    componentDidMount(){
        this.getDataTransaction()
    }

    getDataTransaction = () => {
        var idUser = localStorage.getItem('id')

        Axios.get(LinkAPI + 'transactions?idUser=' + idUser)
        .then((res) => {
            // console.log(res.data)
            this.setState({data : res.data})
        })
        .catch((err) => {
            console.log(err)
        })
    }

    getExpiredItems = () => {
        console.log(this.state.data)
    }
    render(){
        return(
            <div>
                {/* TRANSACTION HISTORY SECTION */}
                <div className="container my-5">
                    {/* Transaction History */}
                    <div className="pt-0 pb-4">
                        <h3 className="text-center">My Transactions</h3>
                    </div>
                    <div className="row justify-content-center">
                        <div className="col-12 col-md-12">
                            <div className="row pt-1">
                                <div className="col-6 col-md-5 py-2 border border-right-0 text-center font-weight-bold myfsid-bg-light-grey">
                                    Items
                                </div>
                                <div className="col-md-2 d-none d-md-block py-2 border border-right-0 text-center font-weight-bold myfsid-bg-light-grey">
                                    Total Price
                                </div>
                                <div className="col-6 col-md-5 py-2 border text-center font-weight-bold myfsid-bg-light-grey">
                                    Status
                                </div>
                                    {
                                        this.state.data?
                                        this.state.data.map((value, index) => {
                                            return(
                                                <div key={index} className="col-12 row mx-0 px-0">
                                                    <div className="col-6 col-md-5 py-2 border border-top-0 border-right-0">
                                                        {
                                                            this.state.data[index].detail?
                                                            this.state.data[index].detail.map((value, index) => {
                                                                return(
                                                                    <div key={index} className="myfsid-font-size-14">
                                                                        <span className="font-weight-bold">-</span> {value.productName} <span className="font-weight-bold">{'( x' + value.productQuantity + ' )'}</span>
                                                                    </div>
                                                                )
                                                            })
                                                            :
                                                                null
                                                        }
                                                    </div>
                                                    <div className="col-md-2 d-none d-md-block py-2 border border-top-0 border-right-0 text-center">
                                                        <span className="myfsid-font-size-14">Rp.{(value.totalPrice + 20000).toLocaleString('id-ID')}</span>
                                                    </div>
                                                    <div className="col-6 col-md-5 py-2 border border-top-0 text-center">
                                                        {
                                                            value.status === 'Unpaid'?
                                                                <span>
                                                                    <span className="myfsid-dark font-weight-bold">{value.status} - </span> <Link to={'/checkout/' + value.id } className="myfsid-clickable-element myfsid-secondary font-weight-bold">Pay Here!</Link>
                                                                </span>
                                                            :
                                                                <span>
                                                                    <span className="myfsid-dark font-weight-bold">{value.status} - </span> <Link to={'/my-struck/' + value.id } className="myfsid-clickable-element myfsid-main-light font-weight-bold"><FontAwesomeIcon icon={faReceipt} /> My Struck</Link>
                                                                </span>
                                                        }
                                                    </div>
                                                </div>
                                            )
                                        })
                                        :
                                            <div className="col-12 row mx-0 px-0">
                                                <div className="col-6 col-md-5 py-2 border border-top-0 border-right-0">
                                                    No Transaction History
                                                </div>
                                                <div className="col-md-2 d-none d-md-block py-2 border border-top-0 border-right-0 text-center">
                                                    -
                                                </div>
                                                <div className="col-6 col-md-5 py-2 border border-top-0 text-center">
                                                    -
                                                </div>
                                            </div>
                                    }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

export default Checkout
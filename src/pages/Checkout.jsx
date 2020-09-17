import React from 'react'
import Axios from 'axios'
import LinkAPI from '../supports/constants/LinkAPI';
import { UncontrolledAlert } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import Loader from 'react-loader-spinner'

export class Checkout extends React.Component{

    state = {
        data : null,
        alertMessage : false,
        paymentMethods1Toggle : false,
        paymentMethods2Toggle : false,
        paymentMethods3Toggle : false
    }

    componentDidMount(){
        this.getDataUnpaid()
    }

    getDataUnpaid = () => {
        // Cek Apakah Status Transaksi Paid / Unpaid
        // Apabila "Paid", Maka Akan Dialihkan ke Halaman Lain
        // Apabila "Unpaid", Maka Bisa Melakukan Pembayaran
        // Notes : User Juga Tidak Bisa Iseng Membuka Halamam Checkout User Lainnya

        var idUser = Number(localStorage.getItem('id'))
        var idTransaction = this.props.match.params.idTransactions
        // console.log(idTransaction)
        
        Axios.get(LinkAPI + 'transactions/' + idTransaction)
        .then((res) => {
            if(res.data.idUser !== idUser || res.data.status === 'Paid'){
                window.location = '/my-transaction'
            }else{
                // console.log(res.data)
                this.setState({data : res.data})
            }
        })
        .catch((err) => {
            console.log(err)
        })
    }

    onPayment = () => {
        var idUser = localStorage.getItem('id')
        var idTransaction = this.props.match.params.idTransactions

        this.state.data.detail.forEach((value, index) => {

            Axios.get(LinkAPI + 'products?name=' + value.productName)
            .then((res) => {
                console.log(res.data[0].id)

                Axios.patch(LinkAPI + 'products/' + res.data[0].id, {stock : res.data[0].stock - value.productQuantity, sold : res.data[0].sold + value.productQuantity})
                .then((res) => {
                    console.log(res)

                    Axios.get(LinkAPI + 'transactions?idUser=' + idUser)
                    .then((res) => {
                        console.log(res.data)

                        Axios.patch(LinkAPI + 'transactions/' + idTransaction, {status : 'Paid', createdAt : new Date()})
                        .then((res) => {
                            console.log(res.data)
                            window.scrollTo(0,0)
                            this.setState({alertMessage : true})
                            setTimeout(function(){window.location = '/my-transaction'}, 1000)
                        })
                        .catch((err) => {
                            console.log(err)
                        })
                    })
                    .catch((err) => {
                        console.log(err)
                    })
                })
                .catch((err) => {
                    console.log(err)
                })
            })
            .catch((err) => {
                console.log(err)
            })
        })
    }

    render(){
        return(
            <div>
                {/* CHECKOUT SECTION */}
                <div className="container-fluid my-5 px-5">
                    <div className="row justify-content-center">
                        {/* Page Title */}
                        <div className="col-12">
                            <h2 className="mx-3 text-center text-md-left font-weight-bold">Checkout Page</h2>
                        </div>

                        {/* Shipping Address */}
                        <div className="col-12 col-md-6 py-3">
                            <div className="px-3 pt-3 pb-1">
                                <h4>Shipping Address</h4>
                            </div>
                            <div className="px-4 py-1 border myfsid-bg-light-grey">
                                <p className="mt-3 mb-0 font-weight-bold">
                                    M. Defryan Tridya Isfandy (081214186000)
                                </p>
                                <p className="mt-0 mb-0">
                                    Kemantren RT 06/RW 01, Desa Kemantren, Kecamatan Tulangan, Kabupaten Sidoarjo, Jawa Timur, 61273.
                                    (Mushollah Baitulmuttaqin)
                                </p>
                                <p className="mt-3 mb-0 font-weight-bold myfsid-secondary">
                                    Notes :
                                </p>
                                <p>
                                    Titipkan Ke Rumah Sebelah Apabila Tidak Ada Orang di Rumah
                                </p>
                            </div>
                            
                            <div className="pt-3 pb-3">
                                <input type="button" value="Change Shipping Address" className="btn rounded-0 w-100 py-2 myfsid-bg-main-light myfsid-light"/>
                            </div>
                        </div>

                        {/* My Orders & Payment Methods */}
                        <div className="col-12 col-md-6 py-3">
                            <div className="px-3 pt-3 pb-1">
                                <h4>My Orders</h4>
                                <div className="row pt-1">
                                    {
                                        this.state.alertMessage?
                                            <UncontrolledAlert className="w-100 border border-0 rounded-0 myfsid-bg-secondary myfsid-light">
                                                Your Payment Is Success! You Will Directed To Transaction History.
                                            </UncontrolledAlert>
                                        :
                                            null
                                    }
                                    <div className="col-8 py-2 border border-right-0 font-weight-bold myfsid-bg-light-grey">
                                        Items
                                    </div>
                                    <div className="col-4 py-2 border font-weight-bold myfsid-bg-light-grey">
                                        Sub-Total
                                    </div>
                                    {
                                        this.state.data? 
                                        this.state.data.detail.map((value,index) => {
                                            return(
                                                <div key={index} className="col-12 row mx-0 px-0">
                                                    <div className="col-8 py-2 border border-top-0 border-right-0">
                                                        <span>{value.productName}<span className="font-weight-bold"> ( x{value.productQuantity} )</span></span>
                                                    </div>
                                                    <div className="col-4 ml-0 py-2 border border-top-0">
                                                        {
                                                            value.productDiscount?
                                                                <span>Rp.{(value.productPrice - (value.productPrice * (value.productDiscount / 100))).toLocaleString('id-ID')} <span className="myfsid-font-size-14"><del>{value.productPrice.toLocaleString('id-ID')}</del></span></span>
                                                            :
                                                                <span>{value.productPrice.toLocaleString('id-ID')}</span>
                                                        }
                                                    </div>
                                                </div>
                                            )
                                        })
                                        :
                                        <div className="col-12 row mx-0 px-0">
                                            <div className="col-8 py-2 border border-top-0 border-right-0">
                                                <Loader type="ThreeDots" color="#005eb8" height={30} width={30} />
                                            </div>
                                            <div className="col-4 ml-0 py-2 border border-top-0">
                                                <Loader type="ThreeDots" color="#005eb8" height={30} width={30} />
                                            </div>
                                        </div>
                                    }
                                    <div className="col-8 py-2 border border-top-0 border-right-0">
                                        <span className="font-weight-bold">Sub-Total</span>
                                    </div>
                                    <div className="col-4 py-2 border border-top-0">
                                        {this.state.data? 'Rp.' + (this.state.data.totalPrice - 495).toLocaleString('id-ID') : <Loader type="ThreeDots" color="#005eb8" height={30} width={30} />}
                                    </div>
                                    <div className="col-8 py-2 border border-top-0 border-right-0">
                                        <span className="font-weight-bold">Shipping Rates</span>
                                    </div>
                                    <div className="col-4 py-2 border border-top-0">
                                        Rp.20.000
                                    </div>
                                    <div className="col-8 py-2 border border-top-0 border-right-0">
                                        <span className="font-weight-bold">Unique Digit</span>
                                    </div>
                                    <div className="col-4 py-2 border border-top-0">
                                        Rp.495
                                    </div>
                                    <div className="col-8 py-2 border border-top-0 border-right-0">
                                        <span className="myfsid-secondary font-weight-bold">Total</span>
                                    </div>
                                    <div className="col-4 py-2 border border-top-0">
                                        {this.state.data? 'Rp.' + (this.state.data.totalPrice + 20000).toLocaleString('id-ID') : <Loader type="ThreeDots" color="#005eb8" height={30} width={30} />}
                                    </div>
                                </div>
                            </div>
                            <div className="px-3 pt-5 pb-1">
                                <h4>Payment Methods</h4>
                                <div className="row pt-1">
                                    <div className="col-2 py-2 border border-right-0 text-center font-weight-bold myfsid-bg-light-grey">
                                        <img src="https://3.bp.blogspot.com/-e1fOq9uUk8M/V15O0WHiIMI/AAAAAAAAAJA/IpxPlLevxLsjisy2I625Yvz-eNzgc6xfgCKgB/s640/Logo%2BBank%2BBNI%2BPNG.png" alt="Bank BNI" width="100%" />
                                    </div>
                                    <div className="col-8 py-2 border border-left-0 border-right-0 font-weight-bold myfsid-bg-light-grey">
                                        BNI Bank Transfer
                                    </div>
                                    <div onClick={() => this.setState({ paymentMethods1Toggle : !this.state.paymentMethods1Toggle })} className="col-2 py-2 border border-left-0 text-right myfsid-clickable-element myfsid-bg-light-grey">
                                        {
                                            this.state.paymentMethods1Toggle?
                                                <FontAwesomeIcon icon={faChevronDown} className="fa-xs" />
                                            :
                                                <FontAwesomeIcon icon={faChevronRight} className="fa-xs" />
                                        }
                                    </div>
                                    {
                                        this.state.paymentMethods1Toggle?
                                            <div className="col-12 py-2 border border-top-0">
                                                2468 - 10121418 - 3000 ( A/N PT. Football Store Indonesia )
                                            </div>
                                        :
                                            null
                                    }
                                    <div className="col-2 py-2 border border-top-0 border-right-0 text-center font-weight-bold myfsid-bg-light-grey">
                                        <img src="https://1.bp.blogspot.com/-ftTB8bnkTPA/XUJbw4V3afI/AAAAAAAABto/F_-6eIBe7iMuS_5AJodNooYTtBuCaMZ6gCEwYBhgL/s1600/Logo%2BGopay%2BBaru.png" alt="Gopay" width="100%" />
                                    </div>
                                    <div className="col-8 py-2 border border-top-0 border-left-0 border-right-0 font-weight-bold myfsid-bg-light-grey">
                                        Gopay Account
                                    </div>
                                    <div onClick={() => this.setState({ paymentMethods2Toggle : !this.state.paymentMethods2Toggle })} className="col-2 py-2 border border-top-0 border-left-0 text-right myfsid-clickable-element myfsid-bg-light-grey">
                                        {
                                            this.state.paymentMethods2Toggle?
                                                <FontAwesomeIcon icon={faChevronDown} className="fa-xs" />
                                            :
                                                <FontAwesomeIcon icon={faChevronRight} className="fa-xs" />
                                        }
                                    </div>
                                    {
                                        this.state.paymentMethods2Toggle?
                                            <div className="col-12 py-2 border border-top-0">
                                                0812-1418-6000 ( A/N PT. Football Store Indonesia )
                                            </div>
                                        :
                                            null
                                    }
                                    <div className="col-2 py-2 border border-top-0 border-right-0 text-center font-weight-bold myfsid-bg-light-grey">
                                        <img src="https://1.bp.blogspot.com/-Le-OjhRx8lM/XmMnhn40y9I/AAAAAAAABr0/bOQ8PWjEjQ0QBuh3s4L_13jJHUj4O47qwCLcBGAsYHQ/s1600/Logo%2BIndomaret.png" alt="Indomaret" width="100%" />
                                    </div>
                                    <div className="col-8 py-2 border border-top-0 border-left-0 border-right-0 font-weight-bold myfsid-bg-light-grey">
                                        Indomaret
                                    </div>
                                    <div onClick={() => this.setState({ paymentMethods3Toggle : !this.state.paymentMethods3Toggle })} className="col-2 py-2 border border-top-0 border-left-0 text-right myfsid-clickable-element myfsid-bg-light-grey">
                                        {
                                            this.state.paymentMethods3Toggle?
                                                <FontAwesomeIcon icon={faChevronDown} className="fa-xs" />
                                            :
                                                <FontAwesomeIcon icon={faChevronRight} className="fa-xs" />
                                        }
                                    </div>
                                    {
                                        this.state.paymentMethods3Toggle?
                                            <div className="col-12 py-2 border border-top-0">
                                                "495" + 0812-1418-6000
                                            </div>
                                        :
                                            null
                                    }
                                    <div className="col-12 px-0 py-0 mx-0 my-3">
                                        {
                                            this.state.data?
                                                <input type="button" value="Pay My Orders" onClick={this.onPayment} className="btn rounded-0 w-100 py-2 myfsid-bg-secondary myfsid-light"/>
                                            :
                                                <input type="button" disabled value="Pay My Orders" onClick={this.onPayment} className="btn rounded-0 w-100 py-2 myfsid-bg-secondary myfsid-light"/>
                                        }
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

export default Checkout
import React, { Component } from 'react';
import Axios from 'axios';
import { Link } from 'react-router-dom';
import LinkAPI from './../supports/constants/LinkAPI';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faCube, faChevronDown, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import Loader from 'react-loader-spinner';

export class CatalogProducts extends Component {

    state = {
        data : null,
        dataBackup : null,
        allBrands : null,
        allDiscounts : null,
        allCategories : null,
        jumbotronTitle : 'All Products',
        contentTitle : 'All Products', 
        openFilterToggle : true,
        openFilter1Toggle : true,
        onClickFilter1ToggleValue : '',
        openFilter2Toggle : true,
        onClickFilter2ToggleValue : '',
        openSortToggle : false
    }

    componentDidMount(){
        window.scrollTo(0,0)
        this.onGetData()
        this.getFilterData()
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

    getFilterData = () => {
        Axios.get(LinkAPI + 'products')
        .then((res) => {
            // console.log(res.data)
            var allBrands = []
            var allCategories = []
            var allDiscounts = []
            res.data.forEach((value) => {
                if(!allBrands.includes(value.brand)){
                    allBrands.push(value.brand)
                }
                if(!allCategories.includes(value.category)){
                    allCategories.push(value.category)
                }
                if(!allDiscounts.includes(value.discount)){
                    allDiscounts.push(value.discount)
                }
            })
            this.setState({data : res.data, dataBackup : res.data, allBrands : allBrands, allCategories : allCategories, allDiscounts : allDiscounts})
        })
        .catch((err) => {
            console.log(err)
        })
    }

    onFilterBy = (filterBy, filterByValue) => {
        //  1. Apabila User Meng-klik 1 Filter :
        //      - Ambil Value Brand / Category yang di Klik
        //      - Filter Data Sesuai Value Tersebut
        //      - Dan Simpan Value Tersebut ke State (onClickFilter1ToggleValue ---> Menyimpan Value Brand /
        //        onClickFilter2ToggleValue ---> Menyimpan Value Category)
        //
        //  2. Apabila User Telah Meng-klik 1 Filter, dan Akan Meng-klik Filter Lainnya :
        //      - Ambil Value Brand / Category yang Ingin di Klik
        //      - Ambil Value Brand / Category yang Sebelumnya Telah di Klik yang Tersimpan di Dalam State ()
        //        (onClickFilter1ToggleValue ---> Menyimpan Value Brand / onClickFilter2ToggleValue ---> Menyimpan Value Category)
        //      - Filter Data Sesuai dengan Beberapa Value Diatas 
        
        var filteredData = this.state.dataBackup
        var lastClickFilter1ByValue = this.state.onClickFilter1ToggleValue // Mengambil Value Filter Brand yang Sudah di Klik
        var lastClickFilter2ByValue = this.state.onClickFilter2ToggleValue // Mengambil Value Filter Category yang Sudah di Klik
        
        filteredData = this.state.data.filter((value) => {
            // KLIK 2 FILTER (TERMASUK FILTER ALL)
            // Apabila : All Filter Brand (Clicked) ---> Lalu Akan Meng-klik All Filter Category
            if(filterBy === 'Category' && filterByValue === 'All' && lastClickFilter1ByValue === ''){
                this.setState({onClickFilter2ToggleValue : ''})
                return value.brand !== null && value.category !== null
            }
            // Apabila : All Filter Category (Clicked) ---> Lalu Akan Meng-klik All Filter Brand
            if(filterBy === 'Brand' && filterByValue === 'All' && lastClickFilter2ByValue === ''){
                this.setState({onClickFilter1ToggleValue : ''})
                return value.category !== null && value.brand !== null
            }
            // Apabila : Filter Brand (Clicked) ---> Lalu Akan Meng-klik All Filter Category
            if(filterBy === 'Category' && filterByValue === 'All' && lastClickFilter1ByValue){
                this.setState({onClickFilter2ToggleValue : ''})
                return value.brand === lastClickFilter1ByValue && value.category !== null
            }
            // Apabila : Filter Category (Clicked) ---> Lalu Akan Meng-klik ALL Filter Brand
            if(filterBy === 'Brand' && filterByValue === 'All' && lastClickFilter2ByValue){
                this.setState({onClickFilter1ToggleValue : ''})
                return value.category === lastClickFilter2ByValue && value.brand !== null
            }


            // KLIK 2 FILTER (SELAIN FILTER ALL)
            // Apabila : Filter Brand (Clicked) ---> Lalu Akan Meng-klik Filter Category
            if(filterBy === 'Category' && lastClickFilter1ByValue){
                this.setState({onClickFilter2ToggleValue : filterByValue})
                return value.brand === lastClickFilter1ByValue && value.category === filterByValue
            }
            // Apabila : Filter Category (Clicked) ---> Lalu Akan Meng-klik Filter Brand 
            if(filterBy === 'Brand' && lastClickFilter2ByValue){
                this.setState({onClickFilter1ToggleValue : filterByValue})
                return value.category === lastClickFilter2ByValue && value.brand === filterByValue
            }

            // KLIK SALAH 1 FILTER (SELAIN FILTER ALL)
            // Apabila Salah 1 Filter Saja yang di Klik
            if(filterBy === 'Brand'){
                this.setState({onClickFilter1ToggleValue : filterByValue})
                return value.brand === filterByValue
            }
            if(filterBy === 'Category'){
                this.setState({onClickFilter2ToggleValue : filterByValue})
                return value.category === filterByValue
            }
        })

        this.setState({dataBackup : filteredData})
    }

    onSortProducts = (sortBy) => {
        var dataSort = this.state.dataBackup
        
        if(sortBy === 'High Price To Low'){
            dataSort.sort((a, b) => {
                return b.price - a.price
            })
        }else if(sortBy === 'Low Price To High'){
            dataSort.sort((a, b) => {
                return a.price - b.price
            })
        }else if(sortBy === 'Discount Products'){
            dataSort.sort((a, b) => {
                return b.discount - a.discount
            })
        }else if(sortBy === 'Default'){
            dataSort.sort((a, b) => {
                return a.id - b.id
            })
        }

        this.setState({dataBackup : dataSort})
        this.setState({openSortToggle : false})
    }

    mapDataProducts = () => {
        return this.state.dataBackup.map((value, id) => {
            return(
                <div key={id} className="col-6 col-md-3 px-4 pb-4 pb-md-4">
                    <div className="row h-100 pt-0 pb-3">
                        <div className="col-md-12">
                            <div className="myfsid-list-products-items">
                                {
                                    value.discount?
                                        <span className="text-center myfsid-list-products-items-discount-badge myfsid-bg-secondary myfsid-font-size-14 myfsid-light">
                                            -{value.discount}%
                                        </span>
                                    :
                                        null
                                }
                                <img src={value.image1} alt={"Photo product of " + value.name} width='100%' className="myfsid-list-products-items-images" />
                                <Link to={'/detail-product/' + value.id} className="myfsid-link">
                                    <div className="myfsid-clickable-element myfsid-list-products-items-button">
                                        <div className="myfsid-list-products-items-button-text">Details</div>
                                    </div>
                                </Link>
                            </div>
                            <div className="text-left">
                                <Link to={'/detail-product/' + value.id} className="myfsid-link">
                                    <h6 className="mt-3 mb-0 myfsid-font-size-14">{value.name.slice(0, 45) + '...'}</h6>
                                </Link>
                            </div>
                            <div className="text-left">
                                {
                                    value.discount?
                                        <span className="mt-3 mb-0 font-weight-bold myfsid-font-size-14 myfsid-secondary">Rp.{(value.price - (value.price * (value.discount / 100))).toLocaleString('id-ID')} <span className="mt-3 mb-0 font-weight-normal myfsid-font-size-14 myfsid-dark"><del>Rp.{value.price.toLocaleString('id-ID')}</del></span></span>
                                    :
                                        <span className="mt-3 mb-0 font-weight-bold myfsid-font-size-14">Rp.{value.price.toLocaleString('id-ID')}</span>
                                }
                            </div>
                        </div>
                    </div>
                </div>
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
                    <div className="myfsid-list-products-jumbotron">
                        <div className="container h-100">
                            <div className="row align-items-center h-100">
                                <div className="col-md-12 text-center text-md-left myfsid-light">
                                    <h1 className="myfsid-list-products-jumbotron-title">{this.state.jumbotronTitle}</h1>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* CONTENT SECTION */}
                <div className="container mt-4">
                    {/* Pages Title */}
                    <div className="row justify-content-center align-items-center">
                        {
                            this.state.openFilterToggle?  
                                <div className="col-md-1 pl-0 d-none d-md-block">
                                    <span onClick={() => this.setState({openFilterToggle : false})} className="myfsid-clickable-element font-weight-bold">Filters <FontAwesomeIcon icon={faChevronDown} className="fa-xs" /></span>
                                </div>
                            :
                                <div className="col-md-1 pl-0 d-none d-md-block">
                                    <span onClick={() => this.setState({openFilterToggle : true})} className="myfsid-clickable-element">Filter <FontAwesomeIcon icon={faChevronRight} className="fa-xs" /></span>
                                </div>
                        
                        }
                        
                        <div className="col-md-1 pl-0 d-none d-md-block">
                            <span onClick={() => this.setState({openSortToggle : true})} className="myfsid-clickable-element">Sort <FontAwesomeIcon icon={faChevronRight} className="fa-xs" /></span>
                            {
                                this.state.openSortToggle?
                                    <span className="px-3 py-2 d-none d-md-block myfsid-list-products-sort-toggle myfsid-bg-dark myfsid-font-size-15 myfsid-light">
                                        <span onClick={() => this.setState({openSortToggle : false})} className="font-weight-bold myfsid-clickable-element">Sort <FontAwesomeIcon icon={faChevronDown} className="fa-xs" /></span>
                                        <p onClick={() => this.onSortProducts('High Price To Low')} className="my-3 myfsid-clickable-element">Price High To Low</p>
                                        <p onClick={() => this.onSortProducts('Low Price To High')} className="my-3 myfsid-clickable-element">Price Low To High</p>
                                        <p onClick={() => this.onSortProducts('Discount Products')} className="my-3 myfsid-clickable-element">Discount Items</p>
                                        <p onClick={() => this.onSortProducts('Default')} className="my-3 myfsid-clickable-element">Default</p>
                                    </span>
                                :
                                    null
                            }
                        </div>
                        <div className="col-10 col-md-10 text-center">
                            <h4 className="font-weight-bold">{this.state.contentTitle}</h4>
                        </div>
                    </div>

                    {/* List Products */}
                    {
                        this.state.openFilterToggle?
                            <div className="row justify-content-center py-3">
                                {/* Filter List Products */}
                                <div className="col-md-2 d-none d-md-block">
                                    <div className="row justify-content-center">
                                        {/* Filter List Products : Brands */}
                                        <div className="col-md-9 py-1 pl-3 text-left myfsid-bg-main-light">
                                            <span className="font-weight-bold myfsid-light">Brands</span>
                                        </div>
                                        <div onClick={() => this.setState({openFilter1Toggle : !this.state.openFilter1Toggle})} className="col-md-3 pr-3 py-1 text-right myfsid-clickable-element myfsid-bg-main-light">
                                                {
                                                    this.state.openFilter1Toggle?
                                                        <FontAwesomeIcon icon={faChevronDown} className="fa-xs myfsid-light" />
                                                    :
                                                        <FontAwesomeIcon icon={faChevronRight} className="fa-xs myfsid-light" />
                                                }
                                            </div>
                                            {
                                                this.state.openFilter1Toggle?
                                                    <div className="col-md-12 border">
                                                        <div onClick={() => this.onFilterBy('Brand', 'All')} className={this.state.onClickFilter1ToggleValue === ''? 'row align-items-center px-4 pt-2 pb-2 border-bottom myfsid-clickable-element myfsid-bg-light-grey' : 'row align-items-center px-4 pt-2 pb-2 border-bottom myfsid-clickable-element'}>
                                                            <span className="font-weight-bold myfsid-font-size-14">All</span>
                                                        </div>
                                                    {
                                                        this.state.allBrands?
                                                            this.state.allBrands.map((value, id) => {
                                                                return(
                                                                    <div key={id} onClick={() => this.onFilterBy('Brand', value)} className={this.state.onClickFilter1ToggleValue === value? 'row align-items-center px-4 pt-2 pb-2 border-bottom myfsid-clickable-element myfsid-bg-light-grey' : 'row align-items-center px-4 pt-2 pb-2 border-bottom myfsid-clickable-element'}>
                                                                        <span className="myfsid-font-size-14">{value}</span>
                                                                    </div>
                                                                )
                                                            })
                                                        :
                                                            <div className="row justify-content-center align-items-center px-4 pt-2 pb-2 border-bottom myfsid-clickable-element myfsid-bg-light-grey">
                                                                <Loader type="ThreeDots" color="#005eb8" height={30} width={30} />
                                                            </div>
                                                    }
                                                    </div>
                                                :
                                                    null
                                            }

                                        {/* Filter List Products : Color */}
                                        <div className="col-md-9 pl-3 py-1 text-left myfsid-bg-main-light">
                                            <span className="font-weight-bold myfsid-light">Category</span>
                                        </div>
                                        <div onClick={() => this.setState({openFilter2Toggle : !this.state.openFilter2Toggle})} className="col-md-3 pr-3 py-1 text-right myfsid-clickable-element myfsid-bg-main-light">
                                            {
                                                this.state.openFilter2Toggle?
                                                    <FontAwesomeIcon icon={faChevronDown} className="fa-xs myfsid-light" />
                                                :
                                                    <FontAwesomeIcon icon={faChevronRight} className="fa-xs myfsid-light" />
                                            }
                                        </div>
                                        {
                                            this.state.openFilter2Toggle?
                                                <div className="col-md-12 border">
                                                    <div onClick={() => this.onFilterBy('Category', 'All')} className={this.state.onClickFilter2ToggleValue === ''? 'row align-items-center px-4 pt-2 pb-2 border-bottom myfsid-clickable-element myfsid-bg-light-grey' : 'row align-items-center px-4 pt-2 pb-2 border-bottom myfsid-clickable-element'}>
                                                        <span className="font-weight-bold myfsid-font-size-14">All</span>
                                                    </div>
                                                    {
                                                        this.state.allCategories?
                                                            this.state.allCategories.map((value, id) => {
                                                                return(
                                                                    <div key={id} onClick={() => this.onFilterBy('Category', value)} className={this.state.onClickFilter2ToggleValue === value? 'row align-items-center px-4 pt-2 pb-2 border-bottom myfsid-clickable-element myfsid-bg-light-grey' : 'row align-items-center px-4 pt-2 pb-2 border-bottom myfsid-clickable-element'}>
                                                                        <span className="myfsid-font-size-14">{value}</span>
                                                                    </div>
                                                                )
                                                            })
                                                        :
                                                            <div className="row justify-content-center align-items-center px-4 pt-2 pb-2 border-bottom myfsid-clickable-element myfsid-bg-light-grey">
                                                                <Loader type="ThreeDots" color="#005eb8" height={30} width={30} />
                                                            </div>
                                                    }
                                                </div>
                                            :
                                                null
                                        }
                                        <div className="col-md-12 my-3">
                                            <div className="row align-items-center px-0 py-1">
                                                <select className="form-control rounded-0">
                                                    <option value="">Filter Discount</option>
                                                </select>
                                            </div>
                                        </div>
                                        <hr className="w-100 my-0" />
                                        <div className="col-md-12 my-3">
                                            <div className="row align-items-center px-0 py-1">
                                                <select className="form-control rounded-0">
                                                    <option value="">Filter Color</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* List Products */}
                                <div className="col-md-10 px-4 text-center">
                                    {
                                        this.state.dataBackup?
                                            <div className="row justify-content-start">
                                                {this.mapDataProducts()}
                                            </div>
                                        :
                                            <div className="row justify-content-center align-items-center h-100">
                                                <Loader type="ThreeDots" color="#005eb8" height={50} width={50} />
                                            </div>
                                    }
                                </div>
                            </div>
                        :
                            <div className="row justify-content-center py-3">
                                {/* List Products */}
                                <div className="col-md-12 text-center">
                                    {
                                        this.state.dataBackup?
                                            <div className="row justify-content-start">
                                                {this.mapDataProducts()}
                                            </div>
                                        :
                                            <div className="row justify-content-center align-items-center h-100 py-5">
                                                <Loader type="ThreeDots" color="#005eb8" height={50} width={50} />
                                            </div>
                                    }
                                </div>
                            </div>
                    }
                </div>
            </div>
        )
    }
}

export default CatalogProducts
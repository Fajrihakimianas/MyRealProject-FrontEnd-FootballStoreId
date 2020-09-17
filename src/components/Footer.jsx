import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faEnvelopeOpenText } from '@fortawesome/free-solid-svg-icons';

export class Footer extends React.Component{
    render(){
        return(
            <div>
                {/* FOOTER SECTION */}
                <div className="container-fluid border border-top myfsid-bg-grey">
                    <div className="row justify-content-center py-5">
                        <div className="col-md-5 px-5">
                            <p className="mb-1 font-weight-bold myfsid-dark"> TENTANG FOOTBALL STORE ID </p>
                            <p className="mt-0 mb-0"> 
                                Football Store Id adalah Toko Perlengkapan Olahraga Termurah di Indonesia yang Telah Berpengalaman Lebih Dari 10 Tahun.
                                Kami Telah Melayani Jutaan Customer di Indonesia.
                            </p>
                            <p className="mt-3 mb-0"> 
                                <FontAwesomeIcon icon={faMapMarkerAlt} className="myfsid-secondary fa-md" /> Address 1 : Sidoarjo, Jawa Timur, 61273.
                            </p>
                            <p className="mt-0 mb-0"> 
                                <FontAwesomeIcon icon={faMapMarkerAlt} className="myfsid-secondary fa-md" /> Address 2 : Kota Bandung, Jawa Barat, 40125.
                            </p>
                            <p className="mt-3 mb-0"> 
                                <FontAwesomeIcon icon={faEnvelopeOpenText} className="fa-md" /> footballstoreid@fsid.com
                            </p>
                        </div>
                        <div className="col-md-2 d-none d-md-block">
                            <p className="mb-1 font-weight-bold myfsid-dark"> OUR PRODUCTS </p>
                            <p className="mt-3 mb-0"> 
                                Football Boots
                            </p>
                            <p className="mt-3 mb-0"> 
                                Futsal Boots
                            </p>
                            <p className="mt-3 mb-0"> 
                                Gloves
                            </p>
                            <p className="mt-3 mb-0"> 
                                Balls
                            </p>
                            <p className="mt-3 mb-0"> 
                                Jersey Shirts
                            </p>
                            <p className="mt-3 mb-0"> 
                                Accecories
                            </p>
                        </div>
                        <div className="col-md-2 d-none d-md-block">
                            <p className="mb-1 font-weight-bold myfsid-dark"> SITEMAP </p>
                            <p className="mt-3 mb-0"> 
                                Products
                            </p>
                            <p className="mt-3 mb-0"> 
                                Brands
                            </p>
                            <p className="mt-3 mb-0"> 
                                Careers
                            </p>
                            <p className="mt-3 mb-0"> 
                                Privacy
                            </p>
                        </div>
                        <div className="col-11 col-md-3 mt-5 mt-md-0 px-4 px-md-5">
                            <p className="mb-1 font-weight-bold myfsid-dark"> FOLLOW US! </p>
                            <p><input type="button" value="Twitter" className="w-100 mt-3 border border-dark"/></p>
                            <p><input type="button" value="Instagram" className="w-100 mt-3 border border-dark"/></p>
                            <p><input type="button" value="Facebook" className="w-100 mt-3 border border-dark"/></p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Footer
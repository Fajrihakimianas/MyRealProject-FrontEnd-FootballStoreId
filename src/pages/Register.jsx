import React, { Component } from 'react';
import Axios from 'axios';
import LinkAPI from './../supports/constants/LinkAPI';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import LoginModal from './../components/LoginModal.jsx';
import PhoneNumberValidator from './../supports/functions/phoneNumberValidator.js';
import EmailValidator from './../supports/functions/emailValidator.js';

class Register extends Component{

    state = {
        loginStatus : false,
        errorMessage : ''
    }

    componentDidMount(){
        this.getIdUser()
    }

    getIdUser = () => {
        // Step1. Ambil Id dari Local Storage
        // Step2. Kalo Id Ada, Maka Set "loginStatus : true"

        var idUser = localStorage.getItem('id')
        
        if(idUser){
            window.location = '/'
        }
    }

    onSubmitRegister = () => {
        // Step1. Ambil Value dari Inputan
        var inputRegister = this.refs.phoneNumberOrEmailRegister.value

        // Step2. Memvalidasi Apakah Inputan Kosong atau Tidak
        if(inputRegister !== ''){
            // Apabila Inputan Berupa Bilangan, Maka Akan Divalidasi Oleh "Phone Number Validator"
            if(Number(inputRegister[0] >= 0)){
                var phoneValidatorResult = PhoneNumberValidator(inputRegister)
                if(phoneValidatorResult === true){
                    this.sendDataToAPI({phone : inputRegister, email : ""})
                }else{
                    this.setState({errorMessage : 
                        <div className="myfsid-font-size-14 myfsid-secondary"> 
                            <FontAwesomeIcon icon={faTimesCircle} /> {phoneValidatorResult}
                        </div>
                    })
                }

            // Apabila Inputan Berupa Huruf, Makan Akan Divalidasi Oleh "Email Validator"
            }else{
                if(EmailValidator(inputRegister) === true){
                    this.sendDataToAPI({email : inputRegister, phone : "" })
                }else{
                    this.setState({errorMessage : 
                        <div className="myfsid-font-size-14 myfsid-secondary"> 
                            <FontAwesomeIcon icon={faTimesCircle} />  Your Email Format Is Wrong
                        </div>
                    })
                }
            }
        }else{
            this.setState({errorMessage :
                <div className="myfsid-font-size-14 myfsid-secondary"> 
                    <FontAwesomeIcon icon={faTimesCircle} /> Input Must Be Filled
                </div>
            })
        }
    }

    sendDataToAPI = (data) => {
        var dataToSend = data
        dataToSend.username = ""
        dataToSend.password = ""
        dataToSend.role = "user"

        var dataType = data.phone? 'phone' : 'email'
        var dataValue = data.phone? data.phone : data.email 

        Axios.get(LinkAPI + 'users?' + dataType + '=' + dataValue)
        .then((res) => {
            if(res.data.length === 0){
                Axios.post(LinkAPI + 'users', dataToSend)
                .then((res) => {
                    console.log(res)
                    window.location = '/create-account/' + res.data.id
                })
                .catch((err) => {
                    console.log(err)
                })
            }else{
                this.setState({errorMessage : 
                    <div className="myfsid-font-size-14 myfsid-secondary"> 
                        <FontAwesomeIcon icon={faTimesCircle} /> This {dataType === 'phone'? 'Phone Number' : 'Email'} Already Exist
                    </div>
                })
            }
        })
        .catch((err) => {
            this.setState({errorMessage : err.message})
        })
    }

    render(){
        return(
            <div>
                {/* REGISTER SECTION */}
                <div className="container-fluid mx-0 my-5">
                    <div className="row justify-content-center align-items-center px-0 py-5">
                        <div className="col-10 col-md-5 py-3 border">
                            <h5 className="pt-0 pb-2 myfsid-main-light">Register Your Account</h5>
                            {/* Register Phone Number / Email */}
                            <div className="form-group mt-0 mb-0">
                                <input type="text" ref="phoneNumberOrEmailRegister" placeholder="Enter Your Phone Number / Email" className="form-control rounded-0" required />
                            </div>       
                            {
                                this.state.errorMessage? 
                                    this.state.errorMessage
                                :
                                    null
                            }
                            <div>
                                <input type="button" value="Submit" onClick={this.onSubmitRegister} className="btn rounded-0 w-100 mx-0 mt-3 mb-3 myfsid-bg-main-light myfsid-light" />
                            </div>
                            <div className="px-0 py-3 text-center">
                                <span>Already Have Account?</span> <span className="myfsid-clickable-element font-weight-bold"><LoginModal text="Login Here." /></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Register
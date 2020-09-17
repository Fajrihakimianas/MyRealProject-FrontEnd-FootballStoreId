import React, { Component } from 'react'
import Axios from 'axios';
import { Link } from 'react-router-dom'
import LinkAPI from './../supports/constants/LinkAPI';
import { Modal, ModalBody } from 'reactstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';

export class LoginModal extends Component {
    state = {
        modalOpen : false
    }

    onLoginToAccount = () => {
        var inputLogin = this.refs.phoneNumberOrEmailLogin.value
        var inputPassword = this.refs.password.value
        var dataType = ''

        if(inputLogin !== ''){
            if(inputLogin[0] >= 0){
                dataType = 'phone'
            }else{
                dataType = 'email'
            }

            Axios.get(LinkAPI + 'users?' + dataType + '=' + inputLogin + '&password=' + inputPassword)
            .then((res) => {
                console.log(res)
                localStorage.setItem('id', res.data[0].id)
                window.location = '/'
            })
            .catch((err) => {
                console.log(err)
                this.setState({loginErrorMessage : 
                    <div>
                        <FontAwesomeIcon icon={faTimesCircle} /> Phone Number/Email/Password Does Not Match
                    </div>
                })
            })
        }else{
            this.setState({loginErrorMessage :
                <div>
                    <FontAwesomeIcon icon={faTimesCircle} /> Input Must Be Filled
                </div>
            })
        }
    }

    render(){
        return(
            <span>
                {/* 
                    ############### Props ###############
                    Transfer Data dari Parent ke Child
                    Parentnya di Halaman Pages, Childnya LoginModal.jsx
                */}
                <span onClick={() => this.setState({modalOpen : true})} className={this.props.className}>{this.props.text}</span> 
                {/* Login Modal */}
                <Modal toggle={() => this.setState({modalOpen : false})} isOpen={this.state.modalOpen}>
                    <ModalBody className="border border-white">
                        <div onClick={() => this.setState({modalOpen : false})} className="myfsid-clickable-element text-right">
                            <FontAwesomeIcon icon={faTimesCircle} className="fa-lg" />
                        </div>
                        <div className="px-5 py-0">
                            <div className="pt-5 pb-3 text-center myfsid-main-light">
                                <h3>Login Account</h3>
                            </div>
                            <div className="pt-3 pb-3">
                                <input type="text" ref="phoneNumberOrEmailLogin" className="form-control rounded-0" placeholder="Phone Number/Email" />
                            </div>
                            <div className="pt-1 pb-3">
                                <input type="password" ref="password" className="form-control rounded-0" placeholder="Password" />
                                <span className="myfsid-secondary">{this.state.loginErrorMessage}</span>
                            </div>
                            <div className="pt-3 pb-3">
                                <input type="button" value="Login" onClick={this.onLoginToAccount} className="btn rounded-0 w-100 mx-0 my-3 myfsid-bg-main-light myfsid-light" />
                            </div>
                            <div className="pt-3 pb-5 text-center">
                                <span className="myfsid-font-size-14">Don't Have Account? <Link to ='/register' onClick={() => this.setState({modalOpen : false})} className="myfsid-link"><span className="font-weight-bold">Register Here</span></Link></span> 
                            </div>
                        </div>
                    </ModalBody>
                </Modal>
            </span>
        )
    }
}

export default LoginModal
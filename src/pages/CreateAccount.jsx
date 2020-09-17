import React, { Component } from 'react';
import Axios from 'axios';
import LinkAPI from '../supports/constants/LinkAPI';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faTimesCircle, faUser, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

export class CreateAccount extends Component {

    state = {
        loginStatus : false,
        seePassword : false,
        seeConfirmPassword : false,
        errorUsernameMessage : false,
        usernameAvailable : false,
        errorPasswordMessage1 : false,
        errorPasswordMessage2 : false,
    }

    componentDidMount(){
        // this.getIdUser()
        // this.getAccountUser()
    }

    getIdUser = () => {
        // 1. Ambil Id dari Local Storage
        // 2. Apabila Id Ada, Maka Set "loginStatus : true"

        var idUser = localStorage.getItem('id')
        
        if(idUser){
            window.location = '/'
        }
    }

    getAccountUser = () => {
        // 1. Ambil Id dari Pathname
        // 2. Cek Apakah Id Tersebut Telah Memiliki Username
        // 3. Apabila Telah Memiliki Username, Maka Account dengan Id Tersebut Telah Ada dan Halaman "Create Account" Tidak Dapat Diakses

        let idUser = this.props.location.pathname.split('/')[2]

        Axios.get(LinkAPI + 'users?id=' + idUser)
        
        .then((res) => {
            console.log(res)
            if(res.data[0].username){
                window.location = '/'
            }
        })
        .catch((err) => {
            console.log(err)
            window.location = '/'
        })
    }

    onUsernameValidation = () => {
        let username = this.refs.username.value
        let usernameLength = 10

        if(username !== ''){
            if(username[0] >= 0){
                this.setState({errorUsernameMessage : 
                    <div className="container">
                        <div className="row align-items-center myfsid-secondary">
                            <FontAwesomeIcon icon={faTimesCircle} className="fa-xs" /> First Character Must Be Alphabet
                        </div>
                    </div>
                })
            }else if(username.length > usernameLength){
                this.setState({errorUsernameMessage :
                    <div className="container">
                        <div className="row align-items-center myfsid-secondary">
                            <FontAwesomeIcon icon={faTimesCircle} className="fa-xs" /> Max {usernameLength} Characters
                        </div>
                    </div>
                })
            }else{
                Axios.get(LinkAPI + 'users?username=' + username)
                .then((res) => {
                    if(res.data.length === 0){
                        this.setState({errorUsernameMessage :
                            <div className="container">
                                <div className="row align-items-center text-success">
                                    <FontAwesomeIcon icon={faCheckCircle} className="fa-xs" /> Username Available
                                </div>
                            </div>
                        })
                        this.setState({usernameAvailable : true})
                    }else{
                        this.setState({errorUsernameMessage :
                            <div className="container">
                                <div className="row align-items-center myfsid-secondary">
                                    <FontAwesomeIcon icon={faTimesCircle} className="fa-xs" /> Username Already Exist
                                </div>
                            </div>
                        })
                    }
                })
                .catch((err) => {
                    this.setState({errorUsernameMessage : err.message})
                })
            }
        }else{
            this.setState({errorUsernameMessage : 
                <div className="container">
                    <div className="row align-items-center myfsid-secondary">
                        <FontAwesomeIcon icon={faTimesCircle} className="fa-xs" /> Username Must Be Filled
                    </div>
                </div>
            })
        }
    }

    onPasswordValidation = () => {
        // Ambil Value Inputan
        let password = this.refs.password.value
        let confirmPassword = this.refs.confirmPassword.value

        if(password && confirmPassword !== ''){
            this.setState({errorPasswordMessage1 : true})
            // Validasi Inputan Password dan Confirm Password
            if(password !== confirmPassword){
                // Apabila Password dan Confirm Password TIDAK SAMA
                this.setState({errorPasswordMessage2 : 
                    <div className="container">
                        <div className="row align-items-center myfsid-secondary">
                            <FontAwesomeIcon icon={faTimesCircle} className="fa-xs" /> Password Does Not Match
                        </div>
                        <div className="py-2">
                        
                        </div>
                    </div>
                })
            }else{
                // Apabila Password dan Confirm Password SAMA
                this.setState({errorPasswordMessage2 : true})
            }
        }else{
            this.setState({errorPasswordMessage1 : 
                <div className="container">
                    <div className="row align-items-center myfsid-secondary">
                        <FontAwesomeIcon icon={faTimesCircle} className="fa-xs" /> Password Must Be filled
                    </div>
                </div>
            })
        }

    }

    onCreateAccount = () => {
        if((this.state.usernameAvailable === true) && (this.state.errorPasswordMessage1 === true) && (this.state.errorPasswordMessage2 === true)){
            let username = this.refs.username.value
            let password = this.refs.password.value
            let id = this.props.location.pathname.split('/')[2]
            
            Axios.patch(LinkAPI + 'users/' + id, {username : username, password : password})
            .then((res) => {
                console.log(res)
                window.location = '/'
                localStorage.setItem('id', id)
            })
            .catch((err) => {
                console.log(err)
                alert(err.message)
            })
        }else{
            this.setState({errorPasswordMessage1 : 
                <div className="container">
                    <div className="row align-items-center myfsid-secondary">
                        <FontAwesomeIcon icon={faTimesCircle} className="fa-xs" />Input Must Be Filled
                    </div>
                </div>
            })
        }
    }

    render(){
        return(
            <div>
                {/* CREATE PASSWORD SECTION */}
                <div className="container-fluid mx-0 my-5">
                    <div className="row justify-content-center align-items-center px-0 py-5">
                        <div className="col-10 col-md-5 px-0 py-3 border myfsid-main-light">
                            <h5 className="pb-2">Create Account</h5>
                            {/* Username */}
                            <div className="form-group mt-0 mb-3">
                                <div className="input-group">
                                    <input type="text" ref="username" onChange={this.onUsernameValidation} placeholder="Username" className="form-control rounded-0 border-right-0" required />
                                    <div className="input-group-prepend">
                                        <span className="input-group-text border-left-0 myfsid-dark myfsid-clickable-element myfsid-bg-light">
                                            <i><FontAwesomeIcon icon={faUser} className="fa-xs" /></i>   
                                        </span>
                                    </div>
                                </div>
                                {this.state.errorUsernameMessage}
                            </div>

                            {/* Password */}
                            <div className="form-group mt-0 mb-3">
                                <div className="input-group">
                                    <input type={this.state.seePassword? "text" : "password"} ref="password" onChange={this.onPasswordValidation} placeholder="Password" className="form-control rounded-0 border-right-0" required />
                                    <div className="input-group-prepend">
                                        <span onClick={() => {this.state.seePassword? this.setState({seePassword : false}) : this.setState({seePassword : true})}} className="input-group-text border-left-0 myfsid-clickable-element myfsid-bg-light myfsid-dark">
                                            {   
                                                this.state.seePassword?
                                                    <i><FontAwesomeIcon icon={faEye} className="fa-xs" /></i>
                                                :
                                                    <i><FontAwesomeIcon icon={faEyeSlash} className="fa-xs" /></i>
                                            }   
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Confirm Password */}
                            <div className="form-group mt-0 mb-0">
                                <div className="input-group">
                                    <input type={this.state.seeConfirmPassword? "text" : "password"} ref="confirmPassword" onChange={this.onPasswordValidation} placeholder="Confirm Password" className="form-control rounded-0 border-right-0" required />
                                    <div className="input-group-prepend">
                                        <span onClick={() => {this.state.seeConfirmPassword? this.setState({seeConfirmPassword : false}) : this.setState({seeConfirmPassword : true})}} className="input-group-text border-left-0 myfsid-clickable-element myfsid-bg-light myfsid-dark">
                                                {   
                                                    this.state.seeConfirmPassword?
                                                        <i><FontAwesomeIcon icon={faEye} className="fa-xs" /></i>
                                                    :
                                                        <i><FontAwesomeIcon icon={faEyeSlash} className="fa-xs" /></i>
                                                }   
                                            </span>
                                    </div>
                                </div>
                            </div>

                            {/* Error Password Message */}
                            {this.state.errorPasswordMessage1}
                            {this.state.errorPasswordMessage2}
                            
                            <input type="button" value="Create Account" onClick={this.onCreateAccount} className="btn rounded-0 w-100 mx-0 my-3 myfsid-bg-main-light myfsid-light" />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default CreateAccount
import React, { Component } from 'react'
import { Register } from '../view'
import { connect } from 'react-redux'
import actions from '../../actions'

class Account extends Component {

	componentDidMount(){
		this.props.checkCurrentUser()
	}

	register(registration){
		// console.log('REGISTER: ' + JSON.stringify(registration))
		this.props.signup(registration)
	}

	login(credentials){
		console.log('LOGIN: ' + JSON.stringify(credentials))
		this.props.login(credentials)
	}

	render(){
		const currentUser = this.props.account.user

		return(
			<div>
				<div>
					Account Container 
					{
						( currentUser == null) ? <Register onRegister={this.register.bind(this)} onLogin={this.login.bind(this)} /> : 
						<h2>{currentUser.username}</h2>
					}
				</div>
			</div>
		)
	}
}

const stateToProps = (state) => {
	return {
		account: state.account
	}
}

const dispatchToProps = (dispatch) => {
	return {
		signup: (params) => dispatch(actions.signup(params)),
		login: (params) => dispatch(actions.login(params)),
		checkCurrentUser: () => dispatch(actions.checkCurrentUser())
	}
}

export default connect(stateToProps, dispatchToProps)(Account)
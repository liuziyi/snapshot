import React, { Component } from 'react'

class Register extends Component {
	constructor(){
		super()
		this.state = {
			registration: {
				username: '',
				password: ''
			} 
		}
	}

	updateRegistration(event){
		let updated = Object.assign({}, this.state.registration)
		updated[event.target.id] = event.target.value
		this.setState({
			registration: updated
		})
	}

	submitRegistration(event){
		event.preventDefault()
		// console.log('registration')
		// console.log(JSON.stringify(this.state.registration))
		console.log(this.state.registration.username.length == 0)
		if(this.state.registration.username.length == 0){
			alert('Please add your username')
			return
		}
		if(this.state.registration.password.length == 0){
			alert('Please add your password')
			return
		}
		this.props.onRegister(this.state.registration)
	}

	submitLoginCredentials(event){
		event.preventDefault()

		if(this.state.registration.username.length == 0){
			alert('Please add your username')
			return
		}
		if(this.state.registration.password.length == 0){
			alert('Please add your password')
			return
		}
		this.props.onLogin(this.state.registration)
	}

	render(){
		return(
			<div>
				<h2>Sign Up</h2>
				<input onChange={this.updateRegistration.bind(this)} id="username" type="text" placeholder="Username" /> <br/>
				<input onChange={this.updateRegistration.bind(this)} id="password" type="text" placeholder="Password" /> <br/>
				<div className="row">
					<div className="6u 12u$(small)">
						<button className="button special small" onClick={this.submitRegistration.bind(this)}>Join</button>
					</div>
					<div className="6u 12u$(small)">
						<button className="button special small" onClick={this.submitLoginCredentials.bind(this)}>Sign In</button>
					</div>
				</div>
			</div>
		)
	}
}

export default Register
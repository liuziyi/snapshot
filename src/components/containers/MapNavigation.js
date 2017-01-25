 import React, { Component } from 'react'
 import { Map } from '../view'
 import { connect } from 'react-redux'
 import actions from '../../actions'

 class MapNavigation extends Component {

 	setNewLocation(location){
 		console.log('setNewLocation' + JSON.stringify(location))
 		this.props.updateCurrentLocation(location)
 	}

 	render() {
 		return (
 			<div>
 				MapNavigation
 				<Map 
 					center={this.props.posts.currentLocation} 
 					zoom={14}
 					mapMoved={this.setNewLocation.bind(this)} />
 			</div>
 		)
 	}
 }

 const stateToProps = (state) => {
 	return {
 		posts: state.post
 	}
 }

 const dispatchToProps = (dispatch) => {
 	return {
 		updateCurrentLocation: (location) => dispatch(actions.updateCurrentLocation(location))
 	}
 }

 export default connect(stateToProps, dispatchToProps)(MapNavigation)
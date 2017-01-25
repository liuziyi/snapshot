import React, { Component } from 'react'
import { APIManager } from '../../utils'
import { connect } from 'react-redux'
import actions from '../../actions'
import { CreatePost } from '../view'

class Posts extends Component {

	componentDidMount(){
		const currentLocation = this.props.posts.currentLocation
		this.props.fetchPosts(currentLocation)
	}

	componentDidUpdate(){
		console.log('componentDidUpdate')
		if(this.props.posts.list == null){
			const currentLocation = this.props.posts.currentLocation
			this.props.fetchPosts(currentLocation)
		}
	}

	submitPost(post){
		const user = this.props.account.user 
		if(user == null){
			alert('Please sign up or login to submit')
			return 
		}
		post['profile'] = {
			id: user.id,
			username: user.username
		}
		const currentLocation = this.props.posts.currentLocation
		post['geo'] = [
			currentLocation.lat,
			currentLocation.lng
		]
		console.log('submitedPost: ' + JSON.stringify(post))
		this.props.createPost(post)
	}

	render() {
		const list = this.props.posts.list // can be null 

		return (
			<div>
				<CreatePost onCreate={this.submitPost.bind(this)} />

				<div className="table-wrapper">
					<table className="alt">
						<thead>
							<tr>
								<th>Image</th>
								<th>Caption</th>
								<th>From</th>
							</tr>
						</thead>
						<tbody>
							{ (list == null) ? null :
								list.map((post,i) => {
									return (
										<tr key={post.id}>
											<td><img style={{width:72}} src={post.image} /></td>
											<td>{post.caption}</td>
											<td>{post.profile.username}</td>
										</tr>
									)
								})
							}
						</tbody>
					</table>
				</div>
			</div>
		)
	}
}

const stateToProps = (state) => {
	return {
		posts: state.post,
		account: state.account
	}
}

const dispatchToProps = (dispatch) => {
	return {
		createPost: (params) => dispatch(actions.createPost(params)),
		fetchPosts: (params) => dispatch(actions.fetchPosts(params))
	}
}

export default connect(stateToProps, dispatchToProps)(Posts)
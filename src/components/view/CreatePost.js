import React, { Component } from 'react'
import Dropzone from 'react-dropzone'
import sha1 from 'sha1'
import { APIManager } from '../../utils'

class CreatePost extends Component {

	constructor(){
		super()
		this.state = {
			post: {
				image: '',
				caption: ''
			}
		}
	}

	updatePost(event){
		event.preventDefault()
		let updated = Object.assign({}, this.state.post)
		updated[event.target.id] = event.target.value
		this.setState({
			post: updated
		})
	}

	submitPost(event){
		event.preventDefault()
		// console.log('submitPost: ' + JSON.stringify(this.state.post))
		if(this.state.post.image.length == 0){
			alert('Please add an image first')
			return
		}
		if(this.state.post.caption.length == 0){
			alert('Please add a caption first')
			return
		}
		let updated = Object.assign({}, this.state.post)
		this.props.onCreate(updated)
	}

	imageSelected(files){
		console.log('imageSelected: ')
		const image = files[0]

		const cloudName = 'dntxyxml7'
		const url = 'https://api.cloudinary.com/v1_1/'+cloudName+'/image/upload'

		const timestamp = Date.now()/1000
		const uploadPreset = 'ysojrpsa'

		const paramsStr = 'timestamp='+timestamp+'&upload_preset='+uploadPreset+'keLzOXZE9fV5Rs4KqV45oagSVnw'

		const signature = sha1(paramsStr)
		const params = {
			'api_key': '956536171851642',
			'timestamp': timestamp,
			'upload_preset': uploadPreset,
			'signature': signature
		}

		APIManager.uploadFile(url,image,params)
		.then((uploaded) => {
			console.log('Upload Complete: ' + JSON.stringify(uploaded))
			let updated = Object.assign({}, this.state.post)
			updated['image'] = uploaded['secure_url']
			this.setState({
				post: updated
			})

			//Cloudinary returns this:
			//{"public_id":"jdgqp0fpffnof3kailru","version":1485242914,
			//"signature":"1085c5c6e4cdafa4ef823c986ee3cc4ebc6a1f05",
			//"width":970,"height":714,"format":"png","resource_type":"image",
			//"created_at":"2017-01-24T07:28:34Z","tags":[],"bytes":136521,"type":"upload",
			//"etag":"1ff860148c143a3eba3a683682214372",
			//"url":"http://res.cloudinary.com/dntxyxml7/image/upload/v1485242914/jdgqp0fpffnof3kailru.png",
			//"secure_url":"https://res.cloudinary.com/dntxyxml7/image/upload/v1485242914/jdgqp0fpffnof3kailru.png",
			//"original_filename":"email"}
		})
		.catch((err) => {
			alert(err)
		})
	}

	render() {
		return (
			<div>
				<h2>CreatePost</h2>
				<input id="caption" onChange={this.updatePost.bind(this)} type="text" placeholder="Caption" />
				<div className="row">
					<div className="3u 12u$(small)">
						<Dropzone onDrop={this.imageSelected.bind(this)} style={{border:'none', marginTop:12}}>
							<button className="button special">Upload Image</button> 
						</Dropzone>
					</div>
					<div className="3u 12u$(small)">
						<button style={{marginTop:12, marginLeft:12}} className="button special" onClick={this.submitPost.bind(this)}>Submit</button>
					</div>
					<div className="6u 12u$(small)">
						<img style={{width:120, marginTop:12}} src={this.state.post.image} />
					</div>
				</div>
				
				<hr />
			</div>
		)
	}
}

export default CreatePost
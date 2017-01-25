import superagent from 'superagent'
import Promise from 'bluebird'

export default {

	get: (url,params) => {
		return new Promise((resolve,reject) => {
			superagent
			.get(url)
			.query(params)
			.set('Accept', 'application/json')
			.end((err,response) => {
				if(err){
					reject(err)
					return
				}
				if(response.body.confirmation != 'success'){
					reject({message: response.body.message})
					return
				}
				resolve(response.body)
			})
		})
	},
	post: (url,params) => {
		return new Promise((resolve,reject) => {
			superagent
			.post(url)
			.send(params)
			.set('Accept', 'application/json')
			.end((err,response) => {
				if(err){
					reject(err)
					return
				}
				if(response.body.confirmation != 'success'){
					reject({message: response.body.message})
					return
				}
				resolve(response.body)
			})
		})
	},
	uploadFile: (url,file,params) => {
		return new Promise((resolve,reject) => {
			let uploadRequest = superagent.post(url)
			uploadRequest.attach('file',file)
			if(params != null){
				Object.keys(params).forEach((key) => {
					uploadRequest.field(key, params[key])
				})
			}
			uploadRequest.end((err,resp) => {
				if(err){
					reject(err)
					return
				}
				const uploaded = resp.body
				console.log('UPLOAD COMPLETE: ' + JSON.stringify(uploaded))
				resolve(uploaded)
			})
		})
	}

}
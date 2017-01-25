import React, { Component } from 'react'
import { Posts, MapNavigation, Account } from '../containers'
import { Sidebar, Footer } from '../view'

class Home extends Component {
	render() {
		return (
			<div>
				<header id="header" style={{padding:0}}>
					<div className="inner">
						<MapNavigation/>
					</div>
				</header>
				<div id="main">
					<section id="one">
						<div className="row">
							<div className="8u 12u$(small)">
								<Posts/>
							</div>
							<div className="4u 12u$(small)">
								<Account/>
							</div>
						</div>
					</section>
				</div>
			</div>
		)
	}
}

export default Home
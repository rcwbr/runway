import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route } from 'react-router-dom'
import { Runway } from 'runway'
import galleryConfig from './testGalleryConfig.js'

class Site extends React.Component {
	render () {
		return (
			<div>
				<Route
					exact path='/'
					component={() => (
						<div>
							<Runway config={galleryConfig}>
								Test
							</Runway>
						</div>
					)}
				/>
			</div>
		)
	}
}

ReactDOM.render(
	<BrowserRouter>
		<Site />
	</BrowserRouter>,
	document.getElementById('app')
)

import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route } from 'react-router-dom'
import Runway from 'runway-react'
import runwayConfig from 'runway-webpack-loader!./testGallery.runwayconf.json'
import { Placeholder, LoadableImage } from 'react-image-placeholder'

class Site extends React.Component {
	render () {
		return (
			<div>
				<Route
					exact path='/'
					component={() => (
						<div>
							<Runway
								lightbox={true}
								config={runwayConfig}
							/>
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

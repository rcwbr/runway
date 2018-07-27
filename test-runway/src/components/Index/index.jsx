import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route } from 'react-router-dom'
import Runway from 'runway-react'
import test from 'runway-webpack-loader!./testGallery.runwayconf.json'

class Site extends React.Component {
	render () {
		return (
			<div>
				<Route
					exact path='/'
					component={() => (
						<div>
							<Runway config={test} />
							<pre>{JSON.stringify(test, null, 2)}</pre>
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

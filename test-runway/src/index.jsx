import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route } from 'react-router-dom'
import Runway from 'runway-react'
import test from './testGallery.runwayconf.json'

class Site extends React.Component {
	render () {
		return (
			<div>
				<Route
					exact path='/'
					component={() => (
						<div>
							{JSON.stringify(test, null, 2)}
							<Runway config={test}>
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

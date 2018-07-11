import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route } from 'react-router-dom'

class Site extends React.Component {
	render () {
		return (
			<div>
				<Route
					exact path='/'
					component={() => (
						<div>
							<h1>Test</h1>
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

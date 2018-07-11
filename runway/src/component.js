import React from 'react'

export default class Runway extends React.Component {
	render () {
		return (
			<div>
				<p>This is STILL a Runway gallery</p>
					{this.props.children}
				<p>Done with the Runway gallery</p>
			</div>
		)
	}
}

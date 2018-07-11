import React from 'react'

export default class Gallery extends React.Component {
	render () {
		return (
			<div>
				<p>This is a Runway gallery called {this.props.config.name}</p>
				{this.props.children}
				<img src={this.props.config.gallery.rows[0].images[0].sourcePath} />
				<p>Done with the Runway gallery</p>
			</div>
		)
	}
}

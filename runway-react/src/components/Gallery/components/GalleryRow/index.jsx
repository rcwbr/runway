import React from 'react'

export default class GalleryRow extends React.Component {
	render () {
		return (
			<div>
				<p>This is a Runway gallery</p>
					{this.props.children}
				<p>Done with the Runway gallery</p>
			</div>
		)
	}
}

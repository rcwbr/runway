import React from 'react'
import GalleryRow from './components/GalleryRow/index.jsx'

export default class Gallery extends React.Component {
	render () {
		var galleryConfig = {}
		galleryConfig.name = this.props.config.name
		galleryConfig.imagesFolder = this.props.config.imagesFolder
		galleryConfig.thumbsFolder = this.props.config.thumbsFolder
		galleryConfig.width = this.props.config.width
		galleryConfig.imagesPerRow = this.props.config.imagesPerRow
		galleryConfig.imageMargins = this.props.config.imageMargins
		const galleryRows = this.props.config.gallery.rows.map((row, index) =>
			<GalleryRow key={index} row={row} galleryConfig={galleryConfig} />
		)
		return (
			<div>
				<p>This is a Runway gallery called {this.props.config.name}</p>
				{galleryRows}
				<p style={{clear: 'both'}}>Done with the Runway gallery</p>
			</div>
		)
	}
}

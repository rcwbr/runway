import React from 'react'
import GalleryImage from './components/GalleryImage/index.jsx'
import styles from './styles.js'

export default class GalleryRow extends React.Component {
	render () {
		const galleryConfig = this.props.galleryConfig
		const rowImages = this.props.row.images.map((image, index) =>
			<GalleryImage key={index} image={image} galleryConfig={galleryConfig} />
		)
		return (
			<div style={styles.rowDiv}>
				<p>This is a Runway gallery row with {this.props.row.images.length} images</p>
				{rowImages}
			</div>
		)
	}
}

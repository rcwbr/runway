import React from 'react'
import styles from './styles.js'

export default class GalleryImage extends React.Component {
	render () {
		const imagesFolder = this.props.galleryConfig.imagesFolder
		const thumbsFolder = this.props.galleryConfig.thumbsFolder
		const src = thumbsFolder + '/' + this.props.image.filename
		return (
			<div style={styles.imageDiv}>
				<img src={src} />
			</div>
		)
	}
}

import React from 'react'
import GalleryImage from './components/GalleryImage/index.jsx'
import styles from './styles.js'

export default class GalleryRow extends React.Component {
	render () {
		const galleryConfig = this.props.galleryConfig
		const rowImages = this.props.row.images.map((image, index) => {
			const last = (index === this.props.row.images.length - 1)
			return (
				<GalleryImage
					key = {index}
					image = {image}
					galleryConfig = {galleryConfig}
					last = {last}
				/>
			)
		})
		return (
			<div style = {
				styles.rowDiv(this.props.last, this.props.galleryConfig.imageMargins)
			}>
				{rowImages}
			</div>
		)
	}
}

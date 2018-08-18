import React from 'react'
import GalleryRow from './components/GalleryRow/index.jsx'
import Lightbox from 'react-images'

export default class Gallery extends React.Component {
	constructor (props) {
		super(props)
		this.state = {
			overlay: {
				open: false,
				current: 0
			}
		}
		this.overlayImage = this.overlayImage.bind(this)
		this.overlayImageTemp = this.overlayImageTemp.bind(this)
	}
	overlayImageTemp (image) {
		const index = 3
		this.overlayImage(index)
	}
	overlayImage (image) {
		this.setState({
			overlay: {
				open: true,
				current: image
			}
		})
	}
	render () {
		this.images = []
		this.props.config.gallery.rows.forEach(row => {
			row.images.forEach(image => {
				image.src = this.props.config.imagesFolder + '/' + image.filename
				this.images.push(image)
			})
		})
		var galleryConfig = {}
		galleryConfig.name = this.props.config.name
		galleryConfig.imagesFolder = this.props.config.imagesFolder
		galleryConfig.thumbsFolder = this.props.config.thumbsFolder
		galleryConfig.width = this.props.config.width
		galleryConfig.imagesPerRow = this.props.config.imagesPerRow
		galleryConfig.imageMargins = this.props.config.imageMargins
		const galleryRows = this.props.config.gallery.rows.map((row, index) => {
			const last = (index === this.props.config.gallery.rows.length - 1)
			return (
				<GalleryRow
					key = {index}
					row = {row}
					galleryConfig = {galleryConfig}
					overlayImage = {this.overlayImageTemp}
					last = {last}
				/>
			)
		})
		return (
			<div>
				<p>This is a Runway gallery called {this.props.config.name}</p>
				{galleryRows}
				<Lightbox
					currentImage={this.state.overlay.current}
					images={this.images}
					isOpen={this.state.overlay.open}
					onClickNext={
						() => (this.overlayImage(this.state.overlay.current + 1)).bind(this)
					}
					onClickPrev={
						() => (this.overlayImage(this.state.overlay.current - 1)).bind(this)
					}
					onClose={() => (
						this.setState({
							overlay: {
								open: false
							}
						})
					)}
				/>
				<pre>{JSON.stringify(this.images, null, 2)}</pre>
				<p style={{clear: 'both'}}>Done with the Runway gallery</p>
			</div>
		)
	}
}

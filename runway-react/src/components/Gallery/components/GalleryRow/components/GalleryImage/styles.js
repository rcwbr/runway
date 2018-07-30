const imageDiv = (last, imageMargins) => {
	const allImageDivs = {
		float: 'left'
	}
	const imageDivsExceptLast = {
		marginRight: imageMargins.horiz + 'px'
	}
	return last ?
		allImageDivs
		: {...imageDivsExceptLast, ...allImageDivs}
}

export default {
	imageDiv: imageDiv
}

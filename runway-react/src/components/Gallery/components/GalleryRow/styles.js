const rowDiv = (last, imageMargins) => {
	const allRowDivs = {
		clear: 'both',
		overflow: 'auto'
	}
	const rowDivsExceptLast = {
		marginBottom: imageMargins.vert + 'px'
	}
	return last ?
		allRowDivs
		: {...rowDivsExceptLast, ...allRowDivs}
}

export default {
	rowDiv: rowDiv
}

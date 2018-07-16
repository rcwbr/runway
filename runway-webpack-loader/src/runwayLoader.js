import buildRunway from 'runway-gallery'
buildRunway({name: 'neweeeRRRTest'}).then(gallery => {
	console.log(JSON.stringify(gallery, null, 2))
})

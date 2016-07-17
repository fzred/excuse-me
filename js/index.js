(()=> {
    const imageDispose = new ImageDispose()

    const elResultImg = document.querySelector('#resultImg')

    function generateImgSrc({ file, img, isGif }) {
        return new Promise(resolve => {
            if (isGif) {
                gifDecode(file).then(canvasData => {
                    var gif = new GIF({
                        workers: 2,
                        workerScript: 'js/lib/gif.worker.js',
                        quality: 10
                    })
                    canvasData.forEach(item => {
                        new ImageDispose(item.canvas).draw()
                        gif.addFrame(item.canvas, {
                            delay: item.delay,
                            copy: true
                        })
                    })
                    gif.on('finished', function (blob) {
                        resolve(window.URL.createObjectURL(blob))
                    })
                    gif.render()
                })
            } else {
                imageDispose.displayImage(img)
                resolve(imageDispose.getDataURL())
            }
        })
    }

    new ImgUpload(({ file, img, isGif }) => {
        generateImgSrc({ file, img, isGif }).then(src => {
            elResultImg.src = src
        })
    })
})()

(()=> {
    const elResultImg = document.querySelector('#resultImg')
    const elOriginalImg = document.querySelector('#originalImg')
    const imgSource = {}

    function loadResource(sourceSrc) {
        return new Promise(resolve => {
            let loaded = 0
            const keys = Object.keys(sourceSrc)
            keys.forEach(key => {
                const img = new Image()
                img.onload = () => {
                    loaded++
                    imgSource[key] = img
                    if (loaded === keys.length) resolve()
                }
                img.src = sourceSrc[key]
            })
        })
    }

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
                        new ImageDispose({ iconImg: imgSource.vip, canvas: item.canvas }).draw()
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
                const imageDispose = new ImageDispose({ iconImg: imgSource.vip })
                imageDispose.displayImage(img)
                resolve(imageDispose.getDataURL())
            }
        })
    }

    loadResource({
        vip: './img/vip8.png',
        testimg: './img/testimg.jpg',
    }).then(() => {
        generateImgSrc({ img: imgSource.testimg }).then(src => {
            elOriginalImg.src = imgSource.testimg.src
            elResultImg.src = src
        })
        new ImgUpload(({ file, img, isGif }) => {
            generateImgSrc({ file, img, isGif }).then(src => {
                elOriginalImg.src = img.src
                elResultImg.src = src
            })
        })
    })
})()

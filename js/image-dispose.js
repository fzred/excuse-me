const _imgSource = {}
class ImageDispose {
    constructor(canvas = document.createElement('canvas')) {
        this.canvas = canvas
        this.ctx = this.canvas.getContext("2d")
        this.loadResource({
            vip: './img/vip8.png',
        })
    }

    displayImage(img) {
        this.canvas.width = img.width
        this.canvas.height = img.height
        this.ctx.drawImage(img, 0, 0)
        this.draw()
    }

    draw() {
        this.getColorData()
        this.drawIcon()
    }

    getDataURL() {
        return this.canvas.toDataURL("image/png")
    }

    loadResource(sourceSrc) {
        return new Promise(resolve => {
            let loaded = 0
            const keys = Object.keys(sourceSrc)
            keys.forEach(key => {
                const img = new Image()

                img.onload = () => {
                    loaded++
                    _imgSource[key] = img
                    if (loaded === keys.length) resolve()
                }
                img.src = sourceSrc[key]
            })

        })
    }

    getColorData() {
        const img = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height)
        const imgData = img.data
        for (let i = 0; i < imgData.length; i += 4) {
            imgData[i] = 250
        }
        this.ctx.putImageData(img, 0, 0)
    }

    drawIcon() {
        this.ctx.drawImage(_imgSource.vip, 0, 0);
    }

    generateImgSrc({ file, img, isGif }) {
        return new Promise(resolve => {
            if (isGif) {
                gifDecode(file).then(canvasData => {
                    var gif = new GIF({
                        workers: 2,
                        workerScript: 'js/lib/gif.worker.js',
                        quality: 10
                    })
                    canvasData.forEach(item => {
                        const imgd = new ImageDispose(item.canvas)
                        imgd.draw()

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
            }
            else {
                this.displayImage(img)
                resolve(this.getDataURL())
            }
        })
    }
}

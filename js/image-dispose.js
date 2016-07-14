class ImageDispose {
    constructor() {
        this.canvas = document.createElement('canvas')
        this.ctx = this.canvas.getContext("2d")
        this.source = {}
        this.loadResource({
            vip: './img/vip8.png',
        }).then(() => {
            this.displayImage(this.source.testImg)
        })
    }

    displayImage(img) {
        this.canvas.width = img.width
        this.canvas.height = img.height
        this.ctx.drawImage(img, 0, 0)
        this.getColorData()
        this.drawIcon()
    }

    loadResource(sourceSrc) {
        return new Promise(resolve => {
            let loaded = 0
            const keys = Object.keys(sourceSrc)
            keys.forEach(key => {
                const img = new Image()

                img.onload = () => {
                    loaded++
                    this.source[key] = img
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
            imgData[i] = 255
        }
        this.ctx.putImageData(img, 0, 0)
    }

    drawIcon() {
        this.ctx.drawImage(this.source.vip, 0, 0);
    }

    setImg({ file, img, isGif }) {
        console.log('isGif', isGif)
        if (isGif) {
            document.querySelector('.gif-container').innerHTML = ''
            var reader = new FileReader;
            reader.onload = function (e) {
                debugger
                gifDecode(this.result, document.querySelector('.gif-container'))
                setTimeout(function () {
                    var gif = new GIF({
                        workers: 2,
                        workerScript: 'js/lib/gif.worker.js',
                        quality: 10
                    })
                    Array.prototype.forEach.call(document.querySelectorAll('.gif-container canvas'), item => {
                        gif.addFrame(item, {
                            delay: 200,
                            copy: true
                        })
                    })
                    gif.on('finished', function (blob) {
                        window.open(URL.createObjectURL(blob))
                    })
                    gif.render()

                }, 1000)
            }
            reader.readAsArrayBuffer(file)
        } else {
            this.displayImage(img)
        }
    }

    setFile({ file, isGif }) {
        if (isGif) {
            gifDecode(file, document.querySelector('.gif-container'))
            setTimeout(function () {
                var gif = new GIF({
                    workers: 2,
                    workerScript: 'js/lib/gif.worker.js',
                    quality: 10
                })
                Array.prototype.forEach.call(document.querySelectorAll('.gif-container canvas'), item => {
                    gif.addFrame(item, {
                        delay: 200,
                        copy: true
                    })
                })
                gif.on('finished', function (blob) {
                    window.open(URL.createObjectURL(blob))
                })
                gif.render()
            }, 1000)
        }
    }
}

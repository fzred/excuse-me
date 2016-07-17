class ImageDispose {
    constructor({ iconImg, canvas = document.createElement('canvas') }) {
        this.canvas = canvas
        this.ctx = this.canvas.getContext("2d")
        this.iconImg = iconImg
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

    getColorData() {
        const img = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height)
        const imgData = img.data
        for (let i = 0; i < imgData.length; i += 4) {
            imgData[i] = 250
        }
        this.ctx.putImageData(img, 0, 0)
    }

    drawIcon() {
        this.ctx.drawImage(this.iconImg, 0, 0);
    }
}

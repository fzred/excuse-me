class ImgUpload {
    constructor() {
        document.addEventListener('paste', e => {
            const file = Array.from(e.clipboardData.items).find(item => item.type.indexOf('image') !== -1)
            if (!file) return

            this.setFile(file.getAsFile())
        })
        document.querySelector('#inputFile').addEventListener('change', e => {
            this.setFile(e.target.files[0])
        })

        document.addEventListener("dragover", e => e.preventDefault())
        document.addEventListener('drop', e => {
            e.preventDefault()
            this.setFile(e.dataTransfer.files[0])
        })
    }

    setFile(file) {
        const blobUrl = window.URL.createObjectURL(file)
        const img = new Image()
        img.src = blobUrl
        img.onload = () => {
            imageDispose.setImg(img)
        }
    }
}
new ImgUpload()

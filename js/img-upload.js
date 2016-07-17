class ImgUpload {
    constructor(cb) {
        this.cb = cb
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
            const file = e.dataTransfer.files[0]
            if (file) this.setFile(file)
        })
    }

    setFile(file, isGif = false) {
        if (file.name) {
            isGif = file.name.toLowerCase().indexOf('gif') !== -1
        }
        const blobUrl = window.URL.createObjectURL(file)
        const img = new Image()
        img.src = blobUrl
        img.onload = () => {
            this.cb({ file, img, isGif })
        }
    }
}

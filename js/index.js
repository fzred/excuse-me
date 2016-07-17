const imageDispose = new ImageDispose()
const elResultImg = document.querySelector('#resultImg')
new ImgUpload(({ file, img, isGif }) => {
    imageDispose.generateImgSrc({ file, img, isGif }).then(src => {
        elResultImg.src = src
    })
})

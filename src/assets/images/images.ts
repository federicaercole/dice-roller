interface imagesInt {
    [key: string]: string
}

export const images: imagesInt = {
    image1: new URL('./dice1.jpg', import.meta.url).href,
    image2: new URL('./dice2.jpg', import.meta.url).href,
    image3: new URL('./dice3.jpg', import.meta.url).href,
}
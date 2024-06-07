import { images } from "../assets/images/images"

function Image({ src, caption, alt = "" }: { [key: string]: string }) {

    return (<figure>
        <img src={images[src]} alt={alt} />
        <figcaption>{caption}</figcaption>
    </figure>)
}

export default Image
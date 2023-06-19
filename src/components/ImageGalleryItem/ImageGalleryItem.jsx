import { GalleryItem, ImageGallery } from "./ImageGalleryItem.styled";


const ImageGalleryItem = ({ id, webformatURL, tags }) => {
    return <GalleryItem key={id}>
                <ImageGallery src={webformatURL} alt={tags} />
            </GalleryItem>
}

export default ImageGalleryItem;
import Button from "components/Button";
import ImageGalleryItem from "components/ImageGalleryItem";
import Loader from "components/Loader";
import { Component } from "react";
import { toast } from "react-toastify";

import { GalleryList } from "./ImageGallery.styled";

class ImageGallery extends Component {
  state = {
    images: [],
    page: 1,
    loading: false,
    error: null,
    status: 'idle',
  };
  
  handleLoadMore = () => {
    this.setState(prevState => {
      return {
        page: prevState.page + 1,
      };
    }, () => {
      this.fetchImages();
    });
  }

  fetchImages = () => {
    this.setState({ loading: true });
  
    const KEY = '35944916-0a227103958c105cd60c29ad2';
    const { page } = this.state;
  
    fetch(`https://pixabay.com/api/?q=${this.props.imagesName}&page=${page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
  
        return Promise.reject(
          new Error(`There are no images with the name ${this.props.imagesName}`),
        );
      })
      .then(data => {
        const hits = data.hits;
        if(hits.length === 0) {
          toast.error('No images found for this request! Try again')
        }
        this.setState(prevState => ({ images: [...prevState.images, ...hits], loading: false }));
      })
      .catch(error => this.setState({ error, loading: false }));
  };
  
  componentDidUpdate(prevProps) {
    if (prevProps.imagesName !== this.props.imagesName) {
      this.setState({ images: [], page: 1 }, () => {
        this.fetchImages();
      });
    }
  }

  render() {
    const { images, loading } = this.state;
  
    return (
      <GalleryList>
        {images.map(({ id, webformatURL, tags }) => (
          <ImageGalleryItem
            key={id}
            webformatURL={webformatURL}
            data-tags={tags}
          />
        ))}
        {loading ? (
          <Loader />
        ) : (
          images.length > 11 && <Button onClick={this.handleLoadMore} />
        )}
      </GalleryList>
    );
  }  
}

export default ImageGallery; 
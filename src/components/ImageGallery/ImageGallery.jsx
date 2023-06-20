import Button from "components/Button";
import ImageGalleryItem from "components/ImageGalleryItem";
import Loader from "components/Loader";
import { Component } from "react";
import { toast } from "react-toastify";
import axios from 'axios';
import { GalleryList } from "./ImageGallery.styled";

class ImageGallery extends Component {
  state = {
    images: [],
    page: 1,
    loading: false,
    error: null,
    totalHits: 0,
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
    const perPage = 12;
  
    axios
      .get(`https://pixabay.com/api/`, {
        params: {
          q: this.props.imagesName,
          page: page,
          key: KEY,
          image_type: 'photo',
          orientation: 'horizontal',
          per_page: perPage,
        },
      })
      .then(response => {
        const data = response.data;
        const hits = data.hits;
        const totalHits = data.totalHits;
  
        if (hits.length === 0) {
          toast.error('No images found for this request! Try again');
        }
  
        this.setState(prevState => ({
          images: [...prevState.images, ...hits],
          loading: false,
          totalHits: totalHits,
        }));
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
    const { images, loading, totalHits } = this.state;

    if (totalHits === 0) {
      return null;
    }
  
    return (
      <>
        <GalleryList>
          {images.map(({ id, webformatURL, tags, largeImageURL }) => (
            <ImageGalleryItem
              key={id}
              webformatURL={webformatURL}
              largeImageURL={largeImageURL}
              data-tags={tags}
            />
          ))}
        </GalleryList>
        {loading ? (
          <Loader />
        ) : (
          images.length < totalHits && <Button onClick={this.handleLoadMore} />
        )}
      </>
    );
  }  
}

export default ImageGallery;
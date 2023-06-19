import React, { Component } from "react";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SearchBar from "components/SearchBar";
import { Container } from './App.styled';
import ImageGallery from "components/ImageGallery";

class App extends Component {
  state = {
    imageName: '',
  }

  handleSearchNameSubmit = (imageName) => {
    this.setState({ imageName });
  }

  render () {
    return (
      <Container>
        <SearchBar onSubmit={this.handleSearchNameSubmit} />
        <ImageGallery imagesName={this.state.imageName}/>
        <ToastContainer autoClose={3000} theme="dark" />
      </Container>
    );
  }
};

export default App;
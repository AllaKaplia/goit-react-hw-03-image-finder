import React, { Component } from 'react';
import { toast } from 'react-toastify';
import { MdOutlineImageSearch } from 'react-icons/md';
import { Header, FormBox, ButtonForm, LabelButton, Input } from './SearchBar.styled';

class SearchBar extends Component {
  state = {
    imageName: '',
  }

  handleImagesNameChange = (evt) => {
    this.setState({
      imageName: evt.currentTarget.value.toLowerCase()
    })
  }

  handleFormSubmit = (evt) => {
    evt.preventDefault();

    if(this.state.imageName.trim() === ''){
      toast.error('Enter a name for the images!')
      return;
    }

    this.props.onSubmit(this.state.imageName);
    this.setState({ imageName: ''});
  }

  render () {
    return (
      <Header>
        <FormBox onSubmit={this.handleFormSubmit}>
          <ButtonForm type="submit">
            <MdOutlineImageSearch />
            <LabelButton>Search</LabelButton>
          </ButtonForm>
  
          <Input
            type="text"
            value={this.state.imageName}
            onChange={this.handleImagesNameChange}
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </FormBox>
      </Header>
    );
  }
};

export default SearchBar;
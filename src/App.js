import React, { Component } from 'react';
import { VscChromeClose } from 'react-icons/vsc';

import s from './App.module.css';
import Searchbar from './Components/Searchbar/Searchbar.jsx';
import ImageGallery from './Components/ImageGallery/ImageGallery.jsx';
import Modal from './Components/Modal/Modal.jsx';

import './App.css';

class App extends Component {
  state = {
    searchValue: '',
    showModal: false,
    srsModalImage: '',
  };

  formSubmit = searchData => {
    this.setState({
      searchValue: searchData,
    });
  };

  toggleModal = () => {
    this.setState(state => ({
      showModal: !state.showModal,
    }));
  };

  modalImage = dataImage => {
    this.setState({ srsModalImage: dataImage, showModal: true });
  };

  render() {
    return (
      <div className={s.App}>
        <Searchbar onSubmit={this.formSubmit} />
        <main>
          <ImageGallery search={this.state.searchValue} modalImage={this.modalImage} />
        </main>
        {this.state.showModal && (
          <Modal onClose={this.toggleModal}>
            <img src={this.state.srsModalImage} alt="" />
            <button type="button" className={s.closeBtn} onClick={this.toggleModal}>
              <VscChromeClose />
            </button>
          </Modal>
        )}
      </div>
    );
  }
}

export default App;

import React, { useState } from 'react';
import { VscChromeClose } from 'react-icons/vsc';

import s from './App.module.css';
import { Searchbar } from './Components/Searchbar/Searchbar.jsx';
import ImageGallery from './Components/ImageGallery/ImageGallery.jsx';
import { Modal } from './Components/Modal/Modal.jsx';

import './App.css';

export function App() {
  const [searchValue, setSearchValue] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [srsModalImage, setSrsModalImage] = useState('');

  const formSubmit = searchData => {
    setSearchValue(searchData);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const modalImage = dataImage => {
    setSrsModalImage(dataImage);
    setShowModal(true);
  };

  return (
    <div className={s.App}>
      <Searchbar onSubmit={formSubmit} />
      <main>
        <ImageGallery search={searchValue} modalImage={modalImage} />
      </main>
      {showModal && (
        <Modal onClose={closeModal}>
          <img src={srsModalImage} alt="" />
          <button type="button" className={s.closeBtn} onClick={closeModal}>
            <VscChromeClose />
          </button>
        </Modal>
      )}
    </div>
  );
}

// class App1 extends Component {
//   state = {
//     searchValue: '',
//     showModal: false,
//     srsModalImage: '',
//   };

//   formSubmit = searchData => {
//     this.setState({
//       searchValue: searchData,
//     });
//   };

//   toggleModal = () => {
//     this.setState(state => ({
//       showModal: !state.showModal,
//     }));
//   };

//   modalImage = dataImage => {
//     this.setState({ srsModalImage: dataImage, showModal: true });
//   };

//   render() {
//     return (
//       <div className={s.App}>
//         <Searchbar onSubmit={this.formSubmit} />
//         <main>
//           <ImageGallery search={this.state.searchValue} modalImage={this.modalImage} />
//         </main>
//         {this.state.showModal && (
//           <Modal onClose={this.toggleModal}>
//             <img src={this.state.srsModalImage} alt="" />
//             <button type="button" className={s.closeBtn} onClick={this.toggleModal}>
//               <VscChromeClose />
//             </button>
//           </Modal>
//         )}
//       </div>
//     );
//   }
// }

// export default App1;

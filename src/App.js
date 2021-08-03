import { Component } from "react";
import axios from "axios";

import getAPI from "./Components/API/API";
import Modal from "./Components/Modal";
import Searchbar from "./Components/Searchbar";
import Loader from "./Components/Loader";
import ImageGallery from "./Components/ImageGallery/ImageGallery";
import Button from "./Components/Button";

class App extends Component {
  state = {
    images: [],
    currPage: 1,
    search: "",
    showModal: false,
    bigImageUrl: "",
    imageStatus: "loading",
  };

  onSearchHandle = (query) => {
    this.setState({
      search: query,
      currentPage: 1,
      images: [],
    });
    // console.log(this.state);
  };

  fetchImages = () => {
    const { currPage, search } = this.state;

    this.setState({ isLoading: true });

    getAPI(search, currPage)
      .then((response) => {
        const filteredData = response.data.hits.map((hit) => {
          return {
            id: hit.id,
            webformatURL: hit.webformatURL,
            largeImageURL: hit.largeImageURL,
          };
        });

        this.setState((prevState) => ({
          images: [...prevState.images, ...filteredData],
          currPage: prevState.currPage + 1,
        }));
      })
      .finally(() => {
        if (this.state.currPage > 2) {
          window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: "smooth",
          });
        }
        return this.setState({ isLoading: false });
      });
  };

  onImageClick = (url) => {
    this.setState({ bigImageUrl: url });
    this.toggleModal();
    this.setState({ imageStatus: "loading" });
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  onImageLoaded = () => {
    this.setState({ imageStatus: "loaded" });
  };

  // componentDidMount() {
  //   this.fetchImages();
  // }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.search !== this.state.search) {
      this.fetchImages();
    }
  }

  render() {
    const { images, showModal, isLoading, bigImageUrl, imageStatus } =
      this.state;

    const showButton = images.length > 0 && !isLoading;

    return (
      <>
        {showModal && (
          <Modal onClose={this.toggleModal}>
            {imageStatus === "loading" && <Loader />}
            <img src={bigImageUrl} alt="" onLoad={this.onImageLoaded} />
          </Modal>
        )}

        <Searchbar onSubmit={this.onSearchHandle} />
        <ImageGallery images={images} onClick={this.onImageClick} />
        {showButton && (
          <div className="container">
            <Button onClick={this.fetchImages} isLoading={isLoading} />
          </div>
        )}
      </>
    );
  }
}

export default App;

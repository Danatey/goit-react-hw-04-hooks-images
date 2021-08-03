import { useState, useEffect } from "react";

import getAPI from "./Components/API/API";
import Modal from "./Components/Modal";
import Searchbar from "./Components/Searchbar";
import Loader from "./Components/Loader";
import ImageGallery from "./Components/ImageGallery/ImageGallery";
import Button from "./Components/Button";

const App = () => {
  const [images, setImages] = useState([]);
  const [currPage, setCurrPage] = useState(1);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [bigImageUrl, setBigImageUrl] = useState("");
  const [imageStatus, setImageStatus] = useState("loading");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (search === "") {
      return;
    }
    getAPI(search, currPage)
      .then((response) => {
        const filteredData = response.data.hits.map((hit) => {
          return {
            id: hit.id,
            webformatURL: hit.webformatURL,
            largeImageURL: hit.largeImageURL,
          };
        });

        setImages((prevState) => [...prevState, ...filteredData]);
      })
      .finally(() => {
        if (currPage > 2) {
          window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: "smooth",
          });
        }
        return setIsLoading(false);
      });
  }, [currPage, search]);

  const onSearchHandle = (query) => {
    setSearch(query);
    setCurrPage(1);
    setImages([]);
  };

  const getLoading = () => {
    setIsLoading(true);
    setCurrPage((prevState) => prevState + 1);
  };

  const onImageClick = (url) => {
    setBigImageUrl(url);
    toggleModal();
    setImageStatus("loading");
  };

  const toggleModal = () => {
    return setShowModal(!showModal);
  };

  const onImageLoaded = () => {
    return setImageStatus("loaded");
  };

  const showButton = images.length > 0 && !isLoading;

  return (
    <>
      {showModal && (
        <Modal onCloseModal={toggleModal}>
          {imageStatus === "loading" && <Loader />}
          <img src={bigImageUrl} alt="" onLoad={onImageLoaded} />
        </Modal>
      )}

      <Searchbar onSearch={onSearchHandle} />
      <ImageGallery images={images} onClick={onImageClick} />
      {showButton && (
        <div className="container">
          <Button onClick={getLoading} isLoading={isLoading} />
        </div>
      )}
    </>
  );
};

export default App;

// class OldApp extends Component {
//   state = {
//     images: [],
//     currPage: 1,
//     search: "",
//     showModal: false,
//     bigImageUrl: "",
//     imageStatus: "loading",
//     isLoading: 'false',
//   };

//   onSearchHandle = (query) => {
//     this.setState({
//       search: query,
//       currentPage: 1,
//       images: [],
//     });
//   };

// fetchImages = () => {
//   const { currPage, search } = this.state;

//   this.setState({ isLoading: true });

//   getAPI(search, currPage)
//     .then((response) => {
//       const filteredData = response.data.hits.map((hit) => {
//         return {
//           id: hit.id,
//           webformatURL: hit.webformatURL,
//           largeImageURL: hit.largeImageURL,
//         };
//       });

//       this.setState((prevState) => ({
//         images: [...prevState.images, ...filteredData],
//         currPage: prevState.currPage + 1,
//       }));
//     })
//     .finally(() => {
//       if (this.state.currPage > 2) {
//         window.scrollTo({
//           top: document.documentElement.scrollHeight,
//           behavior: "smooth",
//         });
//       }
//       return this.setState({ isLoading: false });
//     });
// };

//   onImageClick = (url) => {
//     this.setState({ bigImageUrl: url });
//     this.toggleModal();
//     this.setState({ imageStatus: "loading" });
//   };

//   toggleModal = () => {
//     this.setState(({ showModal }) => ({
//       showModal: !showModal,
//     }));
//   };

//   onImageLoaded = () => {
//     this.setState({ imageStatus: "loaded" });
//   };

//   componentDidUpdate(prevProps, prevState) {
//     if (prevState.search !== this.state.search) {
//       this.fetchImages();
//     }
//   }

//   render() {
//     const { images, showModal, isLoading, bigImageUrl, imageStatus } =
//       this.state;

//     const showButton = images.length > 0 && !isLoading;

//     return (
//       <>
//         {showModal && (
//           <Modal onClose={this.toggleModal}>
//             {imageStatus === "loading" && <Loader />}
//             <img src={bigImageUrl} alt="" onLoad={this.onImageLoaded} />
//           </Modal>
//         )}

//         <Searchbar onSubmit={this.onSearchHandle} />
//         <ImageGallery images={images} onClick={this.onImageClick} />
//         {showButton && (
//           <div className="container">
//             <Button onClick={this.fetchImages} isLoading={isLoading} />
//           </div>
//         )}
//       </>
//     );
//   }
// }

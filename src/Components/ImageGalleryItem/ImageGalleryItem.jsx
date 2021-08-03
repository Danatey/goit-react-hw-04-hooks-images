const ImageGalleryItem = ({ images, onClick }) => {
    return <>
    {images.map(({ id, webformatURL, largeImageURL }) => {
      return (
        <li key={id} className="ImageGalleryItem">
          <img
            onClick={() => onClick(largeImageURL)}
            src={webformatURL}
            alt=""
            className="ImageGalleryItem-image"
          />
        </li>
      );
    })}
  </>
}

export default ImageGalleryItem
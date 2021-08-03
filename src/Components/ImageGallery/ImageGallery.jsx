import PropTypes from 'prop-types';

import ImageGalleryItem from "../ImageGalleryItem"

const ImageGallery = ({images, onClick}) => {
    return <ul className="ImageGallery">
        <ImageGalleryItem images={images} onClick={onClick}/>
    </ul>
}

ImageGallery.propTypes = {
  children: PropTypes.node,
};

export default ImageGallery
import { GalleryItem, ImageGalleryItemImage } from "./imageItem.styled";
import propTypes from "prop-types";
import noImage from "../Images/template.png";

const ImageGalleryItem = ({
  altText = "no description",
  webformat = noImage,
  largeImage = noImage,
  onClick,
}) => {
  const giveLargeImage = () => {
    onClick(largeImage);
  };

  return (
    <GalleryItem>
      <ImageGalleryItemImage
        src={webformat}
        alt={altText}
        loading="lazy"
        onClick={giveLargeImage}
      />
    </GalleryItem>
  );
};

ImageGalleryItem.propTypes = {
  webformat: propTypes.string.isRequired,
  largeImage: propTypes.string.isRequired,
  altText: propTypes.oneOfType([
    propTypes.arrayOf(propTypes.string),
    propTypes.string,
  ]).isRequired,
  onClick: propTypes.func,
};

export default ImageGalleryItem;

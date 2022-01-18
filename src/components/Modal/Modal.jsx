import { useEffect } from "react";
import { Overlay, Modall } from "./modal.styled";
import propTypes from "prop-types";

const Modal = ({ src, onClick }) => {
  useEffect(() => {
    window.addEventListener("keydown", close);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", close);
      document.body.style.overflow = "visible";
    };
  });

  const close = (e) => {
    if (e.target === e.currentTarget || e.code === "Escape") onClick();
  };

  return (
    <Overlay onClick={close}>
      <Modall>
        <img width={"100%"} src={src} alt={src} />
      </Modall>
    </Overlay>
  );
};

Modal.propTypes = {
  src: propTypes.string.isRequired,
  onClick: propTypes.func.isRequired,
};
export default Modal;

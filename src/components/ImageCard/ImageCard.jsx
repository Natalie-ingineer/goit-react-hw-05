import css from "./ImageCard.module.css";
import { ImageModal } from "../ImageModal/ImageModal";
import { useState } from "react";

export const ImageCard = ({ photo, description, modalPhoto }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  return (
    <div className={css.wraperImg}>
      <img
        width={300}
        height={300}
        className={css.imageCard}
        src={photo}
        alt={description}
        onClick={() => setModalIsOpen(true)}
      />
      {modalIsOpen && (
        <ImageModal
          isOpen={modalIsOpen}
          onClose={() => setModalIsOpen(false)}
          photoModal={modalPhoto}
          description={description}
        ></ImageModal>
      )}
    </div>
  );
};

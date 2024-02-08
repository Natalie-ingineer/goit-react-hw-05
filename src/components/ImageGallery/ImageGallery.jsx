import css from "./ImageGallery.module.css";
import { ImageCard } from "../ImageCard/ImageCard";

export const ImageGallery = ({ items }) => {
  return (
    <ul className={css.imageList}>
      {items.map((item) => (
        <li key={item.id}>
          <ImageCard
            photo={item.urls.small}
            description={item.alt_description}
            modalPhoto={item.urls.regular}
          ></ImageCard>
        </li>
      ))}
    </ul>
  );
};

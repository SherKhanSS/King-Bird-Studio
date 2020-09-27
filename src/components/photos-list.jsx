import React, {useState} from 'react';

const MAX_PHOTOS_CURRENT = 25;
const SHOW_PHOTO = 3;

const PhotosList = (props) => {
  const {photos, setIsFullscreen, setIndexFullscreenPhoto} = props;

  const [shownPhoto, setShownPhoto] = useState(SHOW_PHOTO);

  return (
    <section className="photos">
      <ul className="photos__list">
        {photos.slice(0, shownPhoto).map((photo, index) => (
          <li 
            className="photos__item"
            key={photo.id}>
            <img 
              src={photo.img_src}
              className="photos__image" 
              alt={`from the rover`}
              onClick={() => {
                setIsFullscreen(true);
                setIndexFullscreenPhoto(index);
              }}
            />
            {shownPhoto < MAX_PHOTOS_CURRENT && shownPhoto === (index + 1)
              ? (
                <button
                className="photos__more"
                onClick={() =>{
                  setShownPhoto(shownPhoto + SHOW_PHOTO);
                }}
                type="button">         
                  +  
                </button>
              )
              : null}
          </li>
        ))}
      </ul>
    </section>     
  );
}

export default PhotosList;

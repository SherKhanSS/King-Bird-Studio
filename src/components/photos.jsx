import React, {useState, useEffect} from 'react';
import Loader from "./loader";
import Image from "./image";
import PhotosList from "./photos-list";

const API_KEY = `iI2vXvmQju2oC91B2uYbxPEfiVcO6L8YweqIAbCy`;
const MAX_PHOTOS_CURRENT = 25;

const getPrevDate = (current) => {
  return new Date(new Date().setDate(new Date().getDate() - current));
};

const formatDate = (date) => {
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
};

const getPhotos = async () => {
  let accumulator = [];
  let prevDayCurrent = 0;

  while (accumulator.length < MAX_PHOTOS_CURRENT) {
    const response = await fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=${formatDate(getPrevDate(prevDayCurrent))}&api_key=${API_KEY}`);
    const responseJson = await response.json();
    const photos = responseJson.photos;
    accumulator = [...accumulator, ...photos];
    prevDayCurrent ++;
  }

  return accumulator.slice(0, MAX_PHOTOS_CURRENT);
}

const Photos = () => {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [photos, setPhotos] = useState([]);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [indexFullscreenPhoto, setIndexFullscreenPhoto] = useState(null);

  useEffect(() => {
    getPhotos()
      .then(
        (result) => {
          setIsLoaded(true);
          setPhotos(result);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }, [])

  if (error) {
    return (<div className="error">
             There should have been a photo from Mars, but an error occurred: {error.message}
           </div>);
  } else if (!isLoaded) {
    return <Loader />;
  } else if (isFullscreen) {
    return <Image
            photos={photos}
            indexFullscreenPhoto={indexFullscreenPhoto}
            onCloseButtonClick={setIsFullscreen}
            onPrevNextButtonClick={setIndexFullscreenPhoto} 
          />;         
  } else {
    return <PhotosList
            photos={photos} 
            setIsFullscreen={setIsFullscreen}
            setIndexFullscreenPhoto={setIndexFullscreenPhoto} 
          />;
  }
}

export default Photos;

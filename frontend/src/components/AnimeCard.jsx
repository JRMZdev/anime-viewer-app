import '../styles/AnimeCard.css';
import { toPng } from 'html-to-image';
import { Link } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useRef, useEffect, useState } from 'react';


const AnimeCard = ({ title, images, recommendation, url }) => {

  const cardRef = useRef();
  const recommendationRef = useRef()
  const [userHover, setUserHover] = useState(false)
  const { large_image_url, image_url } = images.jpg
  const [generatedImage, setGeneratedImage] = useState(null)


  const chooseAnimeImage = () => {
    if (window.innerWidth >= 1280) {
      return large_image_url;
    } else if (window.innerWidth >= 601) {
      return image_url
    } else {
      return image_url
    }
  };

  const generateRecommendationImage = async () => {
    try {
      recommendationRef.current.style.color = 'black'

      const dataUrl = await toPng(recommendationRef.current)
      setGeneratedImage(dataUrl)
    } catch (error) {
      console.error('Error generating PNG:', error);
    }
  };

  useEffect(() => {
    generateRecommendationImage()
  }, []);

  return (

    <div
      className="anime-card"
      ref={cardRef}
      onMouseEnter={() => setUserHover(true)}
      onMouseLeave={() => setUserHover(false)}
    >
      <Link to={url} target="_blank">
      <div className={`image-title-container ${userHover ? 'hover' : ''}`}>
        <img src={chooseAnimeImage()} alt={title} />
        <p>{title}</p>
      </div>
      </Link>
      <div className="card-content" ref={recommendationRef}>
        {generatedImage ? (
          <img
            src={generatedImage}
            alt="Anime Recommendation"
          />
        ) : (
          <p>{recommendation.message}</p>
        )}
      </div>
    </div>
  );
};

export default AnimeCard
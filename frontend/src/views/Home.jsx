import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css'; 
import '../styles/Home.css';
import AnimeCard from '../components/AnimeCard';
import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';


const Home = () => {
  const [animeData, setAnimeData] = useState([]);
  const [searchWord, setSearchWord] = useState('');
  const [recommendation, setRecommendation] = useState([]);

  const recommendationEndpoint = 'http://localhost:3001/api/anime/recommendation';

  const fetchRecommendation = async () => {
    try {
      const response = await fetch(`${recommendationEndpoint}?q=${encodeURIComponent(searchWord)}`)
      const data = await response.json()

      const animeData = Array.isArray(data) ? data : []

      setAnimeData(animeData);
    } catch (error) {
      console.error('Error fetching recommendation data:', error)
    }
  };

  const startSearch = (word) => {
    setSearchWord(word)
    fetchRecommendation();
  };

  const clearSearch = () => {
    setSearchWord('');
    setAnimeData([])
    setRecommendation(null);
    fetchRecommendation()
  }

  useEffect(() => {
      fetchRecommendation()
  }, []);

  const responsiveSlides = {
    desktop: { breakpoint: { max: 4000, min: 1199 }, items: 5, slidesToSlide: 1 },
    tablet: { breakpoint: { max: 1200, min: 601 }, items: 3, slidesToSlide: 1 },
    mobile: { breakpoint: { max: 600, min: 0 }, items: 1, slidesToSlide: 1 },
  };


  return (
    <main className="slider-carousel">
      <div className="container mt-3">
        <div className="row justify-content-center">
          <div className="col-md-8">
                <div className="input-group mb-3">
                  <input
                    className="form-control"
                    minLength={0}
                    value={searchWord}
                    onChange={(e) => setSearchWord(e.target.value.trim())}
                    placeholder="Search Anime"
                  />
                  <div className="button-container">
                    <button
                      className="btn btn-info"
                      onClick={() => startSearch(searchWord)}
                    >
                      Search
                    </button>
                    <button className="btn btn-secondary" onClick={clearSearch}>
                      Clear
                    </button>
                  </div>
                </div>
          </div>
        </div>

        <section className="mt-3">
          <div className="row justify-content-center">
            <div className="col-md-8">
              <Carousel
                responsive={responsiveSlides}
                infinite={true}
                partialVisible={true}
                itemClass="anime-card"
                containerClass="carousel-container"
                swipeable={true}
                draggable={true}
                autoPlay={false}
                renderDotsOutside={true}
                arrows={true}
              >
                {animeData ? (
                  animeData.map((item, index) => (
                    <AnimeCard
                      key={`${item.mal_id}-${index}`}
                      title={item.title}
                      images={item.images}
                      url={item.url}
                      recommendation={item.recommendation}
                    />
                  ))
                ) : (
                  <p>Loading Anime Data...</p>
                )}
              </Carousel>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

export default Home;

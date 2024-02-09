const express = require('express')
const fetch = require('node-fetch')
const router = express.Router()
const animeApi = 'https://api.jikan.moe/v4/anime'

const fetchAnimeData = async (searchTerm = '') => {
  try {
    const url = searchTerm ? `${animeApi}?q=${encodeURIComponent(searchTerm)}` : animeApi;
    const response = await fetch(url, { method: 'GET' })

    if (!response.ok) {
      throw new Error(`Error fetching data. ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching anime data:', error.message)
    throw error;
  }
};

const calculateRecommendation = (score) => {
  if (score == null || isNaN(score)) {
    return {
      message: 'No recommendation available.',
    };
  } else if (score >= 1 && score <= 4.99) {
    return {
      message: 'I do not recommend it.',
    };
  } else if (score >= 5 && score <= 7.99) {
    return {
      message: 'You may have fun.',
    };
  } else if (score > 8) {
    return {
      message: 'Great, this is one of the best anime.',
    };
  } else{
    return {
      message: `Score data is insufficient to provide a recommendation. Score is: ${score}`,
    };
  }

}
router.get('/api/anime/recommendation', async (req, res) => {
  try {
    const searchTerm = req.query.q || ''
    const animeData = await fetchAnimeData(searchTerm)

    const animeArray = animeData.data

    if (Array.isArray(animeArray)) {
      const mappedAnimeArray = animeArray.map((anime) => ({
        key: anime.mal_id,
        title: anime.title,
        images: anime.images,
        url: anime.url,
        recommendation: calculateRecommendation(anime.score),
      }));

      res.json(mappedAnimeArray);
    } else {
      res.status(500).json({ error: 'Invalid data format from Jikan-Anime API' });
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' })
  }
});

router.get('/', (req, res) => {
  res.send('Anime Recommendation API')
});

module.exports = router;

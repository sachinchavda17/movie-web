const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

export const fetchIndianMovies = async (category) => {
  let url = `${BASE_URL}/discover/movie?api_key=${API_KEY}&region=IN`;

  switch (category) {
    case "bollywood":
      // Bollywood movies (Hindi) + Movies released in Hindi
      url +=
        "&with_original_language=hi&with_release_type=3&sort_by=popularity.desc";
      break;

    case "south":
      url +=
        "&with_original_language=ta&with_original_language=te&with_original_language=ml&with_original_language=kn&sort_by=popularity.desc";
      break;

    case "hollywood":
      url += "&with_original_language=en&sort_by=popularity.desc";
      break;

    case "trendings":
      url = `${BASE_URL}/trending/movie/week?api_key=${API_KEY}&region=IN`;
      break;

    case "upcoming":
      url = `${BASE_URL}/movie/upcoming?api_key=${API_KEY}&region=IN&sort_by=popularity.desc`;
      break;

    default:
      url += "&sort_by=popularity.desc";
  }

  try {
    const response = await fetch(url);
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error("Error fetching movies:", error);
    return [];
  }
};

// Fetch Detailed Movie Information
export async function fetchMovieDetails(id) {
  try {
    const res = await fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}`);
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching movie details:", error);
  }
}

export async function fetchGenres() {
  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`
    );
    const data = await res.json();
    return data.genres || [];
  } catch (error) {
    console.error("Error fetching genres:", error);
  }
}


export  async function fetchMoviesByGenre(id) {
  try {
    // Fetch genre name
    const genreRes = await fetch(`${BASE_URL}/genre/movie/list?api_key=${API_KEY}`);
    const genreData = await genreRes.json();
    const genre = genreData.genres.find((g) => g.id === parseInt(id));
    const genreName = genre?.name || "Unknown";

    // Fetch movies by genre
    const movieRes = await fetch(
      `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=${id}&sort_by=popularity.desc`
    );
    const movies = await movieRes.json();
    return {genreName,movies}
  } catch (error) {
    console.error("Error fetching movies:", error);
  }
}

export const fetchTopWebSeries = async () => {
  try {
    // Hindi first
    const hindiRes = await fetch(
      `${BASE_URL}/discover/tv?api_key=${API_KEY}&sort_by=popularity.desc&with_original_language=hi`
    );
    const hindiData = await hindiRes.json();

    // English next
    const englishRes = await fetch(
      `${BASE_URL}/discover/tv?api_key=${API_KEY}&sort_by=popularity.desc&with_original_language=en`
    );
    const englishData = await englishRes.json();

    // Combine Hindi first, then English
    return [...hindiData.results, ...englishData.results];
  } catch (error) {
    console.error("Error fetching top web series:", error);
    return [];
  }
};

export const searchMoviesAndSeries = async (query) => {
  if (!query) return [];

  try {
    const response = await fetch(
      `${BASE_URL}/search/multi?api_key=${API_KEY}&query=${encodeURIComponent(query)}`
    );
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error("Error searching:", error);
    return [];
  }
};
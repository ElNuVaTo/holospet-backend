import axios from "axios";

// Necesario un archivo csv  de la misma empresa  sera estatico
// pero sera de una fecha exacta
// Google bussines

const getGoogleReviews = async (req, res) => {
  try {
    const apiKey = "AIzaSyCXA1XjDkDaQMBxGE8toddzBfCI8MUyO1U";
    const placeId = "ChIJRZq6j0fLkZYRmZD3b4a_5Mk";

    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=${apiKey}`
    );

    const reviews = response.data.result.reviews;
    res.json(reviews);
  } catch (error) {
    console.error("Error al obtener las reseñas:", error);
    res.status(500).json({ error: "Error al obtener las reseñas" });
  }
};

export { getGoogleReviews };

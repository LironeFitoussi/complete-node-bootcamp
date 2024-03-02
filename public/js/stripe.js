/* eslint-disable*/
import axios from "axios";
import { showAlert } from "./alerts.js";

const stripe = Stripe(
  "pk_test_51Opx9pAjqUE4YDqZLf6fzME4KZrAIVx7okss6myVeXzPumAwublVuyil1BNC5u1YtIQWw6clj6N68LzZUwkqgX5l00CUtanAlg"
);
export const bookTour = async (tourId) => {
  try {
    const session = await axios(
      `http://localhost:3000/api/v1/bookings/checkout-session/${tourId}`
    );
    console.log(session);

    await stripe.redirectToCheckout({
      sessionId: session.data.session.id,
    });
  } catch (err) {
    showAlert("error", err);
  }
};

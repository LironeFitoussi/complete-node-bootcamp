/* eslint-disable */
import axios from "axios";
import { showAlert } from "./alerts.js";

export const updateData = async (name, email) => {
  try {
    const res = await axios({
      method: "PATCH",
      url: "http://localhost:3000/api/v1/users/updateMe",
      data: {
        name,
        email,
      },
    });

    if (res.data.status === "success") {
      console.log(res.data);
      showAlert("success", "Data updated successfully");
    } else {
      showAlert("error", "There was an error updating");
    }
  } catch (err) {
    showAlert("error", err.response.data.message);
  }
};

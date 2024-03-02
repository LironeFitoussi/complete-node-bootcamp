/* eslint-disable */
import axios from "axios";
import { showAlert } from "./alerts.js";

// Type is either 'password' or 'data'
export const updateSettings = async (data, type) => {
  try {
    const endPoint = type === "password" ? "updateMyPassword" : "updateMe";
    const res = await axios({
      method: "PATCH",
      url: `/api/v1/users/${endPoint}`,
      data,
    });

    if (res.data.status === "success") {
      // console.log(res.data);
      showAlert("success", `${type.toUpperCase()} updated successfully`);
    } else {
      showAlert("error", "There was an error updating");
    }
  } catch (err) {
    showAlert("error", err.response.data.message);
  }
};

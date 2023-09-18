import axios from "axios";

const API_BASE_URL = "https://orderit-backend.ssu.today/";
const makeHeaders = async (authRequired) => {
  if (authRequired) {
    let accessToken = await localStorage.getItem("accessToken");

    if (!accessToken) {
      accessToken = "";
    }

    return {
      Authorization: "Bearer " + accessToken,
    };
  } else {
    return {};
  }
};

const post = async (uri, body, authRequired) => {
  try {
    let headers = await makeHeaders(authRequired);

    let response = await axios.post(API_BASE_URL + uri, body, {
      headers: headers,
      timeout: 5000,
    });

    return response.data;
  } catch (e) {
    if (e.response?.status) {
      if (e.response?.status == 521) {
        return {
          statusCode: "SSU0000",
          data: null,
          message: "Failed to connect to server",
        };
      }
    }

    if (e.response?.data) {
      return e.response.data;
    }

    return {
      statusCode: "SSU0000",
      data: null,
      message: "Failed to connect to server",
    };
  }
};

export { post };

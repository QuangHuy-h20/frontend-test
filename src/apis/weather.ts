import { Response } from "../types/response";

const apiUrl = import.meta.env.VITE_API_URL;
const weatherAppId = import.meta.env.VITE_APP_ID;

export const getWeather = async (
  keyword?: string
): Promise<Response | null> => {
  try {
    const keywordEncoded = keyword ? encodeURIComponent(keyword) : "";
    const promise = await fetch(
      apiUrl +
        `find?q=${keywordEncoded}&appid=${weatherAppId}&units=metric
        `,
      {
        headers: {
          Accept: "application/json",
        },
      }
    );
    const res = await promise.json();

    return res;
  } catch (error) {
    console.log(error);
    return null;
  }
};

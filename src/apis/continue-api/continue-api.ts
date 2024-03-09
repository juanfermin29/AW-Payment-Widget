import { ContinueApiBody } from "../../models";

export const fetchContinue = async ({
  bankId,
  country,
  currency,
  widgetToken,
}: ContinueApiBody) => {
  try {
    const continueResponse = await fetch(
      "https://dog.ceo/api/breeds/image/random",
      {
        method: "GET",
        cache: "no-cache",
    /*     headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${widgetToken}`,
        },
        body: JSON.stringify({ bankId, currency, country }), */
      }
    );
    if(continueResponse.ok){
      return await continueResponse.json()
    }
    
  } catch (error) {
    console.log(error);
    
  }
};

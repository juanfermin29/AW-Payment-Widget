import { $dataContext } from "../../context";

export const fetchRunner = async () => {
  try {
    const { widgetToken, selectedBank, amount, currency, country,clientId } =
      $dataContext.get();
    const runnerResponse = await fetch(
      "http://localhost:3000/api/v1/scrapper-runner/widget",
      {
        method: "POST",
        cache: "no-cache",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${widgetToken}`,
        },
        body: JSON.stringify({
          bankId: selectedBank,
          amount,
          country,
          currency,
          clientId
        }),
      }
    );
    if (runnerResponse.ok) {
      return await runnerResponse.json();
    }
  } catch (error) {
    throw new Error(`${error}`);
  }
};
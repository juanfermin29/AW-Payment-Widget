import { $dataContext } from "../../context";
import { ContinueApiResponse } from "../../interfaces";
import { RUNNER_API_URL_BASE } from "../../utils";

export const fetchContinue = async (): Promise<string> => {
  try {
    const { selectedBank, country, currency, widgetToken } = $dataContext.get();
    const continueResponse = await fetch(
      `${RUNNER_API_URL_BASE}/scrapper-runner/continue`,
      {
        method: "POST",
        cache: "no-cache",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${widgetToken}`,
        },
        body: JSON.stringify({ bankId: selectedBank, currency, country }),
      }
    );
    if (continueResponse.ok) {
      const { clientId, currency, amount } =
        (await continueResponse.json()) as ContinueApiResponse;
      $dataContext.set({
        ...$dataContext.get(),
        currency: currency,
        amount: amount,
        clientId: clientId,
      });
      return clientId;
    }

    throw new Error(await continueResponse.text());
  } catch (error) {
    throw new Error(`${error}`);
  }
};

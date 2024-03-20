import { $dataContext, $scrappingContext } from "@/context";
import { ScrapperResponse } from "@/interfaces";
import { RUNNER_API_URL_BASE } from "@/utils";

export const fetchRunner = async () => {
  try {
    const {
      widgetToken,
      selectedBank,
      amount,
      currency,
      country,
      clientId,
      url,
    } = $dataContext.get();
    
    const runnerResponse = await fetch(
      `${RUNNER_API_URL_BASE}/scrapper-runner/${url}`,
      {
        method: "POST",
        cache: "no-cache",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${widgetToken}`,
        },
        body: JSON.stringify({
          bankId: selectedBank!._id,
          amount,
          country,
          currency,
          clientId,
        }),
      }
    );

    const data: ScrapperResponse = await runnerResponse.json();
    handleResponse(data);
  } catch (error) {
    throw new Error(`${error}`);
  }
};

const handleResponse = (data: ScrapperResponse) => {
  const { status, dataStack, error } = data;
  $scrappingContext.set({
    ...$scrappingContext.get(),
    error,
    state: status,
    dataStack,
  });
};

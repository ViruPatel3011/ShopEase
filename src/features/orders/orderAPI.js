import { baseUrl } from "../../app/constant";

export function createOrder(order) {
  return new Promise(async (resolve) => {
    const response = await fetch(`${baseUrl}/orders`, {
      method: 'POST',
      body: JSON.stringify(order),
      headers: { 'content-type': 'application/json' },
    });
    const data = await response.json();
    resolve({ data })
  }
  );
}

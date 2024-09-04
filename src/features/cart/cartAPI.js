import { baseUrl } from "../../app/constant";

export function addToCart(item) {
  return new Promise(async (resolve) => {
    const response = await fetch(`${baseUrl}/cart`, {
      method: 'POST',
      body: JSON.stringify(item),
      headers: { 'content-type': 'application/json' },
    });
    const data = await response.json();
    resolve({ data })
  }
  );
}

export function fetchItemsByUserId(userId) {
  return new Promise(async (resolve) => {
    const response = await fetch(`${baseUrl}/cart?user=` + userId)
    const data = await response.json();
    resolve({ data })
  })
}
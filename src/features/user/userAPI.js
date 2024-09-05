import { baseUrl } from "../../app/constant";

export function fetchLoggedInUserOrders(userId) {
  return new Promise(async (resolve) => {
    const response = await fetch(`${baseUrl}/orders/?user.id=` + userId);
    const data = await response.json();
    resolve({ data })
  }
  );
}
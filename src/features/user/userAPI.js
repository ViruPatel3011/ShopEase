import { baseUrl } from "../../app/constant";

export function fetchLoggedInUserOrders(userId) {
  return new Promise(async (resolve) => {
    const response = await fetch(`${baseUrl}/orders/?user=` + userId);
    const data = await response.json();
    resolve({ data })
  }
  );
}


export function updateUser(updatedData) {
  return new Promise(async (resolve, reject) => {
    const response = await fetch(`${baseUrl}/users/` + updatedData.id, {
      method: 'PATCH',
      body: JSON.stringify(updatedData),
      headers: { 'content-type': 'application/json' },
    });
    const data = await response.json();
    resolve({ data });
  });
}

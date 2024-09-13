export const ITEMS_PER_PAGE = 10
export const baseUrl = process.env.REACT_APP_API_BASE_URL;

export function discountedPrice(item) {
    console.log("Item:", item)
    return Math.round(item?.price * (1 - item?.discountPercentage / 100), 2)
}

export const ToasterType = {
    Success: "success",
    Error: "error",
    Loading: "loading",
};

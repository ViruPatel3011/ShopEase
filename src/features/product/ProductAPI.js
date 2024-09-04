const baseUrl = process.env.REACT_APP_API_BASE_URL;

export function fetchAllProducts() {
  return new Promise(async (resolve) => {
    const response = await fetch(`${baseUrl}/products`);
    const data = await response.json();
    resolve({ data })
  }
  );
}


export function fetchProductsByFilters(filter, sort, pagination) {
  // filter = {"category":["smartphone","laptops"]}
  // sort = {_sort:"price",_order="desc"}
  // pagination={_page=1&_per_page=10} //_page=1&_per_page=10
  // TODO : on server we will support multi values in filter
  let queryString = '';
  for (let key in filter) {
    const categoryValues = filter[key];
    if (categoryValues.length) {
      const lastCategoryValue = categoryValues[categoryValues.length - 1]
      queryString += `${key}=${lastCategoryValue}&`
    }
  }
  for (let key in sort) {
    queryString += `${key}=${sort[key]}&`
  }

  for (let key in pagination) {
    queryString += `${key}=${pagination[key]}&`
  }

  return new Promise(async (resolve) => {
    //TODO: we will not hard-code server URL here
    const response = await fetch(`${baseUrl}/products?` + queryString)
    const data = await response.json()
    resolve({ data })
  }
  );
}

export function fetchProductById(id) {
  return new Promise(async (resolve) => {
    const response = await fetch(`${baseUrl}/products/` + id);
    const data = await response.json();
    resolve({ data })
  }
  );
}


export function fetchCategories() {
  return new Promise(async (resolve) => {
    const response = await fetch(`${baseUrl}/categories`);
    const data = await response.json();
    resolve({ data })
  }
  );
}

export function fetchBrands() {
  return new Promise(async (resolve) => {
    const response = await fetch(`${baseUrl}/brands`);
    const data = await response.json();
    resolve({ data })
  }
  );
}
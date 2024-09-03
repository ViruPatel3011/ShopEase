export function fetchAllProducts() {
  return new Promise(async (resolve) => {
    const response = await fetch('http://localhost:8080/products');
    const data = await response.json();
    resolve({ data })
  }
  );
}


export function fetchProductsByFilters(filter, sort) {
  console.log(`Filter:${filter} , sort:${sort}`);
  // filter = {"category":["smartphone","laptops"]}
  // sort = {_sort:"price",_order="desc"}

  // TODO : on server we will support multi values in filter
  let queryString = '';
  for (let key in filter) {
    // console.log("Filter::::",filter);
    const categoryValues = filter[key];
    // console.log("categoryValues::::", categoryValues);
    if (categoryValues.length) {
      const lastCategoryValue = categoryValues[categoryValues.length - 1]
      queryString += `${key}=${lastCategoryValue}&`
    }
  }
  for (let key in sort) {
    console.log("sort:", sort)
    queryString += `${key}=${sort[key]}&`
    console.log("queryString:", queryString)
  }

  return new Promise(async (resolve) => {
    //TODO: we will not hard-code server URL here
    const response = await fetch('http://localhost:8080/products?' + queryString)
    const data = await response.json()
    resolve({ data })
  }
  );
}
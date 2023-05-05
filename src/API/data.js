export const getOrders = () => {
    return fetch("https://dummyjson.com/carts/1").then((res) => res.json());
  };
  
  export const getRevenue = () => {
    return fetch("https://dummyjson.com/carts").then((res) => res.json());
  };
  
  export const getTransaction = () => {
    const apiKey = "AIzaSyDOg5KRfp0TBq2sFi4G9Sp-C_EYNPVK7mo";
    return fetch("https://loyalty-web-app-dbc8e-default-rtdb.firebaseio.com/invoices.json?auth"+apiKey)
      .then((res) => res.json());
  };
  
  export const getCustomers = () => {
  const apiKey = "AIzaSyDOg5KRfp0TBq2sFi4G9Sp-C_EYNPVK7mo";
  return fetch("https://loyalty-web-app-dbc8e-default-rtdb.firebaseio.com/userform.json?auth=" + apiKey)
    .then((res) => res.json());
};
  export const getComments = () => {
    return fetch("https://dummyjson.com/comments").then((res) => res.json());
  };
  
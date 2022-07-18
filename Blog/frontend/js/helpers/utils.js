export const parseRequestURL = () => {
  const url = location.hash.slice(2),
    request = {};

  [request.resource, request.slug] = url.split("/");

  return request;
};

export const getUserToken = () => {
  return localStorage.getItem("userData") ? JSON.parse(localStorage.getItem("userData")).token : false;
};

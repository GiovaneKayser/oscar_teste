import axios from "axios";

const externalApi = axios.create({
  baseURL: "https://oscar-app-back.herokuapp.com",
});

async function getUrlTenant(url) {
  return url;
}

externalApi.tenantGet = async function () {
  arguments[0] = await getUrlTenant(arguments[0]);
  return externalApi.get.apply(null, arguments);
};

externalApi.tenantPost = async function () {
  arguments[0] = await getUrlTenant(arguments[0]);
  return externalApi.post.apply(null, arguments);
};

externalApi.tenantPut = async function () {
  arguments[0] = await getUrlTenant(arguments[0]);
  return externalApi.put.apply(null, arguments);
};

externalApi.tenantDelete = async function () {
  arguments[0] = await getUrlTenant(arguments[0]);
  return externalApi.delete.apply(null, arguments);
};

// externalApi.interceptors.response.use(function (config) {
//   if (config.status === 401 && window.location.pathname !== "/login") {
//     window.location.href = "/login" + history.location.search;
//   }
//   if (config.status === 403) {
//       console.log("Erro 403");
//   }
//   if (config.status !== 200)
//     if (config.status !== 204) {
//     }
//   return config;
// });

export default externalApi;

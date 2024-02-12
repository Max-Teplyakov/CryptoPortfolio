import { cryptoAssets, cryptoData } from "./data";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    "X-API-KEY": "ZwEuAe0oUaI5g/FtT5IC9b1fDZ76a+RDL9ORiXh1poA=",
  },
};

export function fakeFetchCrypto() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(cryptoData);
    }, 10);
  });
}

// export function fakeFetchCrypto() {
//   return fetch("https://openapiv1.coinstats.app/coins", options)
//     .then((response) => response.json())
//     .then((response) => response)
//     .catch((err) => console.error(err));
// }

export function FetchAssets() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(cryptoAssets);
    }, 10);
  });
}

// export const result = fetch("https://openapiv1.coinstats.app/coins", options)
//   .then((response) => response.json())
//   .then((response) => console.log(response))
//   .catch((err) => console.error(err));

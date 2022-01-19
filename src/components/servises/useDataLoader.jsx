import api from "./getData";
import { useState } from "react";

const useDataLoader = ({ value, page, array, arrayPushFn, toasterFn }) => {
  api
    .getData(value, page)
    .then((data) => {
      if (data.total === 0) {
        toasterFn(`There is no pictures-'${value}'`);
        return;
      }
      page === 1
        ? arrayPushFn(data.hits)
        : arrayPushFn([...array, ...data.hits]);
      toasterFn(`We are find ${array.length} images from ${data.total}`);
    })
    .catch((error) => console.log(error));
};

export default useDataLoader;

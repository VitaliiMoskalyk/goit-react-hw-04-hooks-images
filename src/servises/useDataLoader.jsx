import api from "./getData";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const useDataLoader = (value, page) => {
  const [pictures, setPictures] = useState([]);
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (value === "") return;
    else {
      setLoader(true);
      setError(null);
      api
        .getData(value, page)
        .then((data) => {
          if (data.total === 0) {
            toast(`There is no pictures-'${value}'`);
            return;
          }

          page === 1
            ? setPictures(data.hits)
            : setPictures((prevState) => [...prevState, ...data.hits]);
          toast(`We are find ${data.hits.length} images from ${data.total}`);
        })
        .catch((error) => setError(error))
        .finally(() => setLoader(false));
    }
  }, [value, page]);

  return [pictures, loader, error];
};

export default useDataLoader;

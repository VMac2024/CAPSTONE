import { useState, useEffect } from "react";

export function useData(url, defaultValue = {}) {
  const [data, setData] = useState({
    loading: true,
    data: defaultValue,
    error: "",
  });

  useEffect(() => {
    if (url) {
      let ignore = false;
      fetch(url)
        .then((response) => response.json())
        .then((json) => {
          if (!ignore) {
            setData({ loading: false, data: json, error: "" });
          }
        })
        .catch((error) => {
          setData({ loading: false, data: defaultValue, error: error.message });
        });
      //include cleanup function:
      return () => {
        ignore = true;
      };
    }
  }, [url]);

  return [data, setData];
}

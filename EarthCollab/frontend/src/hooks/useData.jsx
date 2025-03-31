import { useState, useEffect } from "react";

export function useData(url) {
  const [data, setData] = useState([]);

  useEffect(() => {
    if (url) {
      let ignore = false;
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          if (!ignore) {
            setData(data);
          }
        });
      //include cleanup function:
      return () => {
        ignore = true;
      };
    }
  }, [url]);

  return data;
}

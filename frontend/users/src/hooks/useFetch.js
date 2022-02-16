import { useState, useEffect, useCallback } from "react";
import axios from "axios";

export const useFetch = ({ url }) => {
  const [data, setData] = useState(null);
  const fetchRequest = useCallback(async () => {
    try {
      const res = await axios.get(url);
      if (res.status === 200) {
        const data = res.data;
        setData(data);
      }
    } catch (err) {
      setData(err);
    }
  }, [url]);
  useEffect(() => {
    fetchRequest();
  }, []);
  return data;
};

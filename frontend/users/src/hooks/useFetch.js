import { useState, useEffect, useCallback } from "react";
import axios from "axios";

export const useFetch = ({ url }) => {
  const [data, setData] = useState(null);
  const [, setError] = useState(null);
  const [, setLoading] = useState(false);
  const fetchRequest = useCallback(async () => {
    try {
      setLoading(true);
      const res = await axios.get(url);
      if (res.status === 200) {
        const data = res.data;
        setData(data);
      }
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [url]);
  useEffect(() => {
    fetchRequest();
  }, []);
  return data;
};

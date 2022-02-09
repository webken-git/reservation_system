import { useEffect, useCallback } from "react";
import axios from "axios";
import useUnmountRef from "./useUnmountRef";
import useSafeState from "./useSafeState";

export const useFetch = ({ url }) => {
  const unmountRef = useUnmountRef();
  const [data, setData] = useSafeState(unmountRef, null);
  const [, setError] = useSafeState(unmountRef, null);
  const [, setLoading] = useSafeState(unmountRef, false);
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

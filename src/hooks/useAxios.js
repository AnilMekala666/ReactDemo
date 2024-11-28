import { useState, useEffect, useCallback } from "react";
import axios from "axios";

const useAxios = (initialConfig = {}, autoFetch = false) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async (config = initialConfig) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios(config);
      setData(response.data);
    } catch (err) {
      setError(err.response?.data || err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }, [initialConfig]);

  // Fetch data automatically if autoFetch is true
  useEffect(() => {
    if (autoFetch) {
      fetchData();
    }
  }, [fetchData, autoFetch]);

  return { data, loading, error, fetchData };
};

export default useAxios;

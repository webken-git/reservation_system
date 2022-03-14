import { useState, useEffect, useCallback } from "react";

export const usePlaceName = (tab) => {
  const [placeName, setPlaceName] = useState("");
  const createPlaceName = useCallback((tab) => {
    if (tab === 1) {
      return setPlaceName("カーリング場");
    }
    if (tab === 2) {
      return setPlaceName("大会議室");
    }
    if (tab === 3) {
      return setPlaceName("中会議室");
    }
    if (tab === 4) {
      return setPlaceName("小会議室");
    }
    if (tab === 5) {
      return setPlaceName("アーチェリー場");
    }
    if (tab === 6) {
      return setPlaceName("武道場");
    }
    if (tab === 7) {
      return setPlaceName("多目的体育館");
    }
  }, []);
  useEffect(() => {
    createPlaceName(tab);
  }, [tab]);
  return placeName;
};

const useSearch = (allData, setSearchData) => {
  const searchBy = (keys, kw) => {
    let searchItems = [...allData];

    if (keys === "place" && kw !== "") {
      const filteredItems = searchItems.filter((item) => {
        return item.reservation.place.id.toString() === kw;
      });
      setSearchData(filteredItems);
    } else if (keys === "start" && kw !== "") {
      const filteredItems = searchItems.filter((item) => {
        return item.reservation.start.toString().indexOf(kw) !== -1;
      });
      setSearchData(filteredItems);
    } else if (kw === "" || kw === undefined || kw === null) {
      // 全データを表示する
      setSearchData(allData);
    }
  };

  const searchReset = () => {
    setSearchData(allData);
  };
  return [searchBy, searchReset];
};

export default useSearch;

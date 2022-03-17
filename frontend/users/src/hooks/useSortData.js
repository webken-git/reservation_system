import { useState } from "react";

export const useSortPlace = (sortData, setSortData) => {
  const [order, setOrder] = useState("asc");
  let sortItems = [...sortData];
  const sortBy = () => {
    sortItems.sort((a, b) => {
      if (a.reservation.place.name > b.reservation.place.name) {
        return order === "asc" ? 1 : -1;
      }
      if (a.reservation.place.name < b.reservation.place.name) {
        return order === "asc" ? -1 : 1;
      }
      return 0;
    });
    setSortData(sortItems);
    setOrder(order === "asc" ? "desc" : "asc");
  };
  return [sortBy, order];
};

export const useSortStartDate = (sortData, setSortData) => {
  const [order, setOrder] = useState("asc");
  let sortItems = [...sortData];
  const sortBy = () => {
    sortItems.sort((a, b) => {
      if (a.reservation.start > b.reservation.start) {
        return order === "asc" ? 1 : -1;
      }
      if (a.reservation.start < b.reservation.start) {
        return order === "asc" ? -1 : 1;
      }
      return 0;
    });
    setSortData(sortItems);
    setOrder(order === "asc" ? "desc" : "asc");
  };
  return [sortBy, order];
};

export const useSortEndDate = (sortData, setSortData) => {
  const [order, setOrder] = useState("asc");
  let sortItems = [...sortData];
  const sortBy = () => {
    sortItems.sort((a, b) => {
      if (a.reservation.end > b.reservation.end) {
        return order === "asc" ? 1 : -1;
      }
      if (a.reservation.end < b.reservation.end) {
        return order === "asc" ? -1 : 1;
      }
      return 0;
    });
    setSortData(sortItems);
    setOrder(order === "asc" ? "desc" : "asc");
  };
  return [sortBy, order];
};

export const useSortStatus = (sortData, setSortData) => {
  const [order, setOrder] = useState("asc");
  let sortItems = [...sortData];
  const sortBy = () => {
    sortItems.sort((a, b) => {
      if (a.approval.id > b.approval.id) {
        return order === "asc" ? 1 : -1;
      }
      if (a.approval.id < b.approval.id) {
        return order === "asc" ? -1 : 1;
      }
      return 0;
    });
    setSortData(sortItems);
    setOrder(order === "asc" ? "desc" : "asc");
  };
  return [sortBy, order];
};

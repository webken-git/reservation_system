import { useState } from "react";

export const useSortedPlaces = (sortData, setSortData) => {
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

export const useSortedStartDate = (sortData, setSortData) => {
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

export const useSortedEndDate = (sortData, setSortData) => {
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

export const useSortedGroupName = (sortData, setSortData) => {
  const [order, setOrder] = useState("asc");
  let sortItems = [...sortData];
  const sortBy = () => {
    sortItems.sort((a, b) => {
      if (a.reservation.group_name > b.reservation.group_name) {
        return order === "asc" ? 1 : -1;
      }
      if (a.reservation.group_name < b.reservation.group_name) {
        return order === "asc" ? -1 : 1;
      }
      return 0;
    });
    setSortData(sortItems);
    setOrder(order === "asc" ? "desc" : "asc");
  };
  return [sortBy, order];
};

export const useSortedLeaderName = (sortData, setSortData) => {
  const [order, setOrder] = useState("asc");
  let sortItems = [...sortData];
  const sortBy = () => {
    sortItems.sort((a, b) => {
      if (a.reservation.leader_name > b.reservation.leader_name) {
        return order === "asc" ? 1 : -1;
      }
      if (a.reservation.leader_name < b.reservation.leader_name) {
        return order === "asc" ? -1 : 1;
      }
      return 0;
    });
    setSortData(sortItems);
    setOrder(order === "asc" ? "desc" : "asc");
  };
  return [sortBy, order];
};

export const useSortData = (sortData, setSortData) => {
  const [order, setOrder] = useState("asc");
  let sortItems = [...sortData];
  const sortBy = (key) => {
    sortItems.sort((a, b) => {
      if (a[key] > b[key]) {
        return order === "asc" ? 1 : -1;
      }
      if (a[key] < b[key]) {
        return order === "asc" ? -1 : 1;
      }
      return 0;
    });
    setSortData(sortItems);
    setOrder(order === "asc" ? "desc" : "asc");
  };
  return [sortBy, order];
};

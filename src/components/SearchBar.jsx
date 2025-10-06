import React, { useEffect, useState } from "react";
import { cn } from "../utils/cn";
import { useNavigate } from "react-router";
import useAppStore from "../store/useAppStore";
import { SearchIcon, SendIcon } from "./icons/Icons";
import useSummaryPageStore from "../store/useSummaryPageStore";
import axios from "axios";

const SearchBar = () => {
  const { selectedMode, setRelatedPapers } = useAppStore();
  const { setSearchActive, searchActive, searchQuery, setSearchQuery } =
    useAppStore();
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState(searchQuery);
  const { setDataAcademic, setDataDiscover } = useSummaryPageStore();

  const handleSearch = () => {
    setSearchActive(true);
    setSearchQuery(searchValue);
    handleSearchDiscover();
    handleSearchAcademic();

    if (selectedMode === "discover") {
      navigate("/summary/discover");
    } else {
      navigate("/summary/academic");
    }
  };

  const handleSearchAcademic = async () => {
    try {
      const res = await axios.get("http://localhost:3000/summaryAcademic", {
        params: { searchTerm: searchQuery },
      });
      console.log("res.data academic", res.data);
      setDataAcademic(res.data);
      setRelatedPapers(res.data.relatedPapers);
    } catch (error) {
      console.error("Error en academic:", error);
    }
  };

  const handleSearchDiscover = async () => {
    try {
      const res = await axios.get("http://localhost:3000/summaryDiscover", {
        params: { searchTerm: searchQuery },
      });
      console.log("res.data discover", res.data);
      setDataDiscover(res.data);
    } catch (error) {
      console.error("Error en discover:", error);
    }
  };

  return (
    <div
      className={cn(
        "gap-lg pl-xl pr-lg py-md flex w-full items-center justify-between rounded-lg shadow-lg",
        searchActive === true
          ? "bg-white"
          : selectedMode === "discover"
            ? "bg-green-50"
            : "bg-blue-50",
      )}
    >
      <input
        type="text"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        placeholder="Search for a topic"
        className="h-[32px] w-full focus:outline-none"
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSearch();
          }
        }}
      />

      {searchValue.trim() !== "" ? (
        <button
          onClick={handleSearch}
          className="flex h-[30px] w-[30px] cursor-pointer items-center justify-center rounded-full bg-gray-900 p-[4px] transition-colors"
        >
          <SendIcon className="text-white" />
        </button>
      ) : (
        <button className="flex h-[30px] w-[30px] items-center justify-center rounded-full p-[4px]">
          <SearchIcon />
        </button>
      )}
    </div>
  );
};

export default SearchBar;

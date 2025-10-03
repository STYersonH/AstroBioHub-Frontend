import React, { useEffect, useState } from "react";
import { cn } from "../utils/cn";
import { useNavigate } from "react-router";
import useAppStore from "../store/useAppStore";
import { SearchIcon, SendIcon } from "./icons/Icons";

const SearchBar = () => {
  const { selectedMode } = useAppStore();
  const { setSearchActive, searchActive, searchQuery, setSearchQuery } =
    useAppStore();
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState(searchQuery);

  const handleSearch = () => {
    setSearchActive(true);
    if (selectedMode === "discover") {
      setSearchQuery(searchValue);
      navigate("/summary/discover");
    } else {
      setSearchQuery(searchValue);
      navigate("/summary/academic");
    }
  };

  useEffect(() => {
    console.log("searchQuery ->", searchValue);
  }, [searchValue]);

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

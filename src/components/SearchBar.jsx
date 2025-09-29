import React from "react";
import { cn } from "../utils/cn";
import { useNavigate } from "react-router";
import useAppStore from "../store/useAppStore";

const SearchBar = () => {
  const { selectedMode } = useAppStore();
  const { setSearchActive, searchActive } = useAppStore();
  console.log("searchActive", searchActive);
  const navigate = useNavigate();

  return (
    <div
      className={cn(
        "gap-lg px-xl py-md flex w-full items-center justify-between rounded-lg shadow-lg",
        searchActive === true
          ? "bg-white"
          : selectedMode === "discover"
            ? "bg-green-50"
            : "bg-blue-50",
      )}
    >
      <input
        type="text"
        placeholder="Search for a topic"
        className="h-[32px] w-full focus:outline-none"
      />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        className="cursor-pointer"
        onClick={() => {
          setSearchActive(true);
          if (selectedMode === "discover") {
            navigate("/summary/discover");
          } else {
            navigate("/summary/academic");
          }
        }}
      >
        <path
          d="M10 2.75C14.0041 2.75 17.25 5.99594 17.25 10C17.25 11.7319 16.6427 13.3219 15.6295 14.5688L20.5303 19.4697C20.8232 19.7626 20.8232 20.2374 20.5303 20.5303C20.2641 20.7966 19.8474 20.8208 19.5538 20.6029L19.4697 20.5303L14.5688 15.6295C13.3219 16.6427 11.7319 17.25 10 17.25C5.99594 17.25 2.75 14.0041 2.75 10C2.75 5.99594 5.99594 2.75 10 2.75ZM10 4.25C6.82436 4.25 4.25 6.82436 4.25 10C4.25 13.1756 6.82436 15.75 10 15.75C13.1756 15.75 15.75 13.1756 15.75 10C15.75 6.82436 13.1756 4.25 10 4.25Z"
          fill="#04071E"
        />
      </svg>
    </div>
  );
};

export default SearchBar;

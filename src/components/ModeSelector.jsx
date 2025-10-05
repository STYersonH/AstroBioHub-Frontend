// src/components/ModeSelector.jsx
import { cn } from "../utils/cn";
import useAppStore from "../store/useAppStore";
import { useNavigate } from "react-router";

function ModeSelector({ changeToPage = false }) {
  const { selectedMode, setMode, searchActive } = useAppStore();

  const navigate = useNavigate();

  return (
    <div
      className={cn(
        "flex gap-[24px] rounded-lg p-[10px]",
        selectedMode === "discover" && "bg-green-50",
        selectedMode === "academic" && "bg-blue-50",
        selectedMode === "interactive" && "bg-orange-50",
      )}
    >
      <button
        className={cn(
          "text-ui-lg-r flex h-full flex-1 cursor-pointer items-center justify-center rounded-md p-[10px]",
          selectedMode === "interactive" && "text-ui-lg-sb bg-orange-100",
        )}
        onClick={() => {
          if (searchActive && selectedMode !== "discover" && changeToPage) {
            navigate("/summary/discover");
          }
          setMode("interactive");
        }}
      >
        Interactive mode
      </button>
      <button
        className={cn(
          "text-ui-lg-r flex h-full flex-1 cursor-pointer items-center justify-center rounded-md p-[10px]",
          selectedMode === "discover" && "text-ui-lg-sb bg-green-100",
        )}
        onClick={() => {
          if (searchActive && selectedMode !== "discover" && changeToPage) {
            navigate("/summary/discover");
          }
          setMode("discover");
        }}
      >
        Discover mode
      </button>
      <button
        className={cn(
          "text-ui-lg-r flex h-full flex-1 cursor-pointer items-center justify-center rounded-md p-[10px]",
          selectedMode === "academic" && "text-ui-lg-sb bg-blue-100",
        )}
        onClick={() => {
          if (searchActive && selectedMode !== "academic" && changeToPage) {
            navigate("/summary/academic");
          }
          setMode("academic");
        }}
      >
        Academic mode
      </button>
    </div>
  );
}

export default ModeSelector;

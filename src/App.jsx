import { useState } from "react";
import useAppStore from "./store/useAppStore";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, Link } from "react-router";
import ModeSelector from "./components/ModeSelector";
import SearchBar from "./components/SearchBar";

function App() {
  const { selectedMode } = useAppStore();
  const navigate = useNavigate();
  return (
    <>
      <motion.div
        className="flex h-screen w-screen items-center justify-center bg-white"
        animate={{
          background:
            selectedMode === "discover"
              ? "linear-gradient(180deg, #66FF9E 0%, #FFF 100%)"
              : selectedMode === "academic"
                ? "linear-gradient(180deg, #60A5FA 0%, #FFF 100%)"
                : "linear-gradient(180deg, #FFA500 0%, #FFF 100%)",
        }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
      >
        <div className="gap-2xl flex flex-col text-center">
          <h1 className="font-merriweather text-8xl font-[500] text-black">
            AstroBioHub
          </h1>
          <div className="gap-4xl flex w-[665px] flex-col items-center justify-center">
            <div className="gap-lg flex w-full flex-col">
              <ModeSelector />
              {selectedMode === "discover" && (
                <p className="text-ui-md-r w-full text-center text-gray-600">
                  Explore the findings of space science in clear language. Get
                  accessible summaries and easy-to-understand connections.
                </p>
              )}
              {selectedMode === "academic" && (
                <p className="text-ui-md-r w-full text-center text-gray-600">
                  Access detailed scientific summaries, graphs, complete papers
                  and knowledge maps for a rigorous analysis.
                </p>
              )}
              {selectedMode === "interactive" && (
                <p className="text-ui-md-r w-full text-center text-gray-600">
                  Explore the most relevant papers in space biology in a virtual
                  library and interact with them
                </p>
              )}
            </div>

            {/* Search bar */}
            {selectedMode === "discover" || selectedMode === "academic" ? (
              <SearchBar />
            ) : (
              <Link
                to="/juego"
                className="text-ui-md-r px-6xl py-lg rounded-full bg-white text-center text-gray-600 transition-all duration-300 hover:bg-orange-500 hover:text-white"
              >
                Go to Virtual Library
              </Link>
            )}
          </div>
        </div>
      </motion.div>
    </>
  );
}

export default App;

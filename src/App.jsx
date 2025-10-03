import { useState } from "react";
import useAppStore from "./store/useAppStore";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router";
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
              : "linear-gradient(180deg, #60A5FA 0%, #FFF 100%)",
        }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
      >
        <div className="gap-2xl flex flex-col text-center">
          <h1 className="font-merriweather text-8xl font-[500] text-black">
            AstroBioHub
          </h1>
          <div className="gap-4xl flex flex-col items-center justify-center">
            <div className="gap-lg flex flex-col">
              <ModeSelector />
              {selectedMode === "discover" ? (
                <p className="text-ui-md-r w-[565px] text-center text-gray-600">
                  Explora los hallazgos de la ciencia espacial en un lenguaje
                  claro. Obtén resúmenes accesibles y conexiones fáciles de
                  entender.
                </p>
              ) : (
                <p className="text-ui-md-r w-[565px] text-center text-gray-600">
                  Accede a resúmenes científicos detallados, gráficos, papers
                  completos y mapas de conocimiento para un análisis riguroso.
                </p>
              )}
            </div>

            {/* Search bar */}
            <SearchBar />
          </div>
        </div>
      </motion.div>
    </>
  );
}

export default App;

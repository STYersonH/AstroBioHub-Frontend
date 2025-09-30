import React, { useState } from "react";
import { ChevronDownIcon } from "./icons/Icons";
import { motion } from "framer-motion";
import Button from "./Button";
import useSummaryPageStore from "../store/useSummaryPageStore";

const Toggle = ({ title, children, button }) => {
  const [toggleOpened, setToggleOpened] = useState(false);
  const { setShowPaperSummary } = useSummaryPageStore();

  return (
    <article className="pr-md py-sm flex w-full flex-col rounded-sm">
      <div
        className="gap-lg pr-md flex cursor-pointer flex-row items-start justify-between"
        onClick={() => setToggleOpened(!toggleOpened)}
      >
        <div className="flex flex-row">
          {/* circle */}
          <div className="flex h-[32px] w-[38px] flex-shrink-0 flex-col items-center justify-center">
            <div className="h-[5px] w-[5px] rounded-full bg-gray-800"></div>
          </div>
          {/* title paper */}
          <p className="text-c-body-md-r">{title}</p>
        </div>

        {/* icon toggle */}
        <motion.div
          animate={{
            rotate: toggleOpened ? 180 : 0,
          }}
          transition={{
            duration: 0.2,
            ease: "easeInOut",
          }}
          className="pt-xs"
        >
          <ChevronDownIcon />
        </motion.div>
      </div>

      {/* content */}
      {toggleOpened && (
        <div className="px-3xl py-lg gap-2xl flex flex-col">
          {children}
          {/* button */}
          <div className="flex w-full justify-end">{button}</div>
        </div>
      )}
    </article>
  );
};

export default Toggle;

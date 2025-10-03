import React, { useState } from "react";
import { ChatIcon, CloseIcon, SendIcon } from "./icons/Icons";
import { InterrogationIcon, HighlightIcon } from "./icons/ChatIcons";
import { cn } from "../utils/cn";
import useChatStore from "../store/useChatStore";
import TextSelectionMenu from "./TextSelectionMenu";
import { useTextSelection } from "../hooks/useTextSelection";

const HowToUse = () => {
  return (
    <div className="gap-3xl px-md flex flex-col text-gray-900">
      {/* icon */}
      <div className="p-md w-fit rounded-full border-3 border-gray-100">
        <ChatIcon className="h-[32px]" />
      </div>
      {/* title and description */}
      <div className="gap-sm flex flex-col">
        <h2 className="text-ui-lg-sb">AstroBioHub Chat</h2>
        <h3 className="text-ui-sm-r">
          You can understand better the topic you searched doing these things
        </h3>
      </div>
      {/* How to use */}
      <div className="text-ui-sm-r gap-sm flex flex-col text-gray-700">
        <div className="gap-md flex">
          <div className="flex w-[12px] items-center justify-center">
            <InterrogationIcon />
          </div>
          <p>Ask anything about the topic you searched for</p>
        </div>
        <div className="gap-md flex">
          <div className="flex w-[12px] items-center justify-center">
            <HighlightIcon />
          </div>
          <p>Select a piece of text and ask for clarification</p>
        </div>
      </div>
    </div>
  );
};

const ChatMessages = ({ chatMessages, setChatMessages, isCrafting }) => {
  return (
    <div className="text-ui-sm-r gap-xl pb-lg flex flex-col">
      {chatMessages.map((message) => (
        <div key={message.id}>
          {message.role === "user" ? (
            <div className="flex w-full justify-end">
              <div className="px-md ml-[100px] rounded-lg bg-gray-100 py-[6px]">
                {message.message}
              </div>
            </div>
          ) : (
            <div className="px-md rounded-lg py-[6px]">{message.message}</div>
          )}
        </div>
      ))}
      {isCrafting && (
        <div className="px-md rounded-lg py-[6px]">
          <div className="flex items-center gap-2">
            <span className="text-gray-900">Crafting</span>
            <div className="flex space-x-1">
              <div className="h-1 w-1 animate-bounce rounded-full bg-gray-700 [animation-delay:-0.3s]"></div>
              <div className="h-1 w-1 animate-bounce rounded-full bg-gray-700 [animation-delay:-0.15s]"></div>
              <div className="h-1 w-1 animate-bounce rounded-full bg-gray-700"></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const Chat = () => {
  const [chatOpened, setChatOpened] = useState(false);
  const [chatMessages, setChatMessages] = useState([]); // {message: string, role: "user" | "assistant"}
  const [chatInput, setChatInput] = useState("");
  const [chatLoading, setChatLoading] = useState(false);
  const [isCrafting, setIsCrafting] = useState(false);

  const { selectedText, menuPosition, showMenu, clearSelection } =
    useTextSelection();

  const { addPromptFromSelection, openChat } = useChatStore();

  const handleExplainText = (text) => {
    addPromptFromSelection(text);
    setChatOpened(true);
    setChatInput(`Explicar: "${text}"`);
  };

  const simulatedResponses = [
    "Based on the research data, this topic shows significant implications for space medicine and bone density studies in microgravity environments.",
    "The findings suggest that long-term space exposure affects cellular mechanisms in ways that require further investigation.",
    "This research demonstrates the importance of ground-based experiments before conducting space flight studies.",
    "The data indicates that bone mineral density changes occur within the first year after returning to Earth.",
    "These results highlight the need for improved countermeasures to prevent bone loss during space missions.",
    "The study provides valuable insights into the effects of radiation exposure on biological systems in space.",
    "Understanding these mechanisms is crucial for developing effective treatments for astronauts on long-duration missions.",
  ];

  const handleSendPromt = async () => {
    if (chatInput.trim() === "") return;

    const userMessage = {
      id: Date.now(),
      message: chatInput,
      role: "user",
    };

    setChatMessages((prev) => [...prev, userMessage]);
    setChatInput("");
    setIsCrafting(true);

    // Simular delay del backend (3 segundos)
    setTimeout(() => {
      const randomResponse =
        simulatedResponses[
          Math.floor(Math.random() * simulatedResponses.length)
        ];
      const assistantMessage = {
        id: Date.now() + 1,
        message: randomResponse,
        role: "assistant",
      };

      setChatMessages((prev) => [...prev, assistantMessage]);
      setIsCrafting(false);
    }, 4000);
  };

  return (
    <div className="right-2xl bottom-2xl fixed z-90 bg-white">
      {/* close button */}
      {chatOpened && (
        <button
          className="top-lg right-lg absolute cursor-pointer"
          onClick={() => setChatOpened(false)}
        >
          <CloseIcon />
        </button>
      )}

      {chatOpened ? (
        <div className="px-lg pt-3xl pb-lg flex h-[500px] w-[420px] flex-col rounded-xl border border-gray-200 bg-white">
          <div className="ultra-minimal-scrollbar flex h-full flex-col overflow-y-scroll">
            {chatMessages.length > 0 ? (
              <ChatMessages
                chatMessages={chatMessages}
                setChatMessages={setChatMessages}
                isCrafting={isCrafting}
              />
            ) : (
              <HowToUse />
            )}
          </div>
          {/* ask something input */}
          <div className="p-md gap-lg flex w-full rounded-lg border border-gray-200">
            <input
              type="text"
              className="w-full focus:outline-none"
              placeholder="Ask anything"
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter" && !isCrafting && chatInput.trim()) {
                  handleSendPromt();
                }
              }}
              disabled={isCrafting}
            />
            <button
              onClick={() => handleSendPromt()}
              disabled={isCrafting || chatInput.trim() === ""}
              className={cn(
                "cursor-pointer rounded-full p-[4px] transition-colors",
                isCrafting
                  ? "cursor-not-allowed bg-gray-300"
                  : chatInput.length > 0
                    ? "bg-gray-900"
                    : "bg-gray-200",
              )}
            >
              <SendIcon className="text-white" />
            </button>
          </div>
        </div>
      ) : (
        <div
          className="cursor-pointer items-center justify-center rounded-full border border-gray-100 p-[12px] shadow-lg shadow-gray-200 transition-all duration-100 hover:scale-105"
          onClick={() => setChatOpened(true)}
        >
          <ChatIcon />
        </div>
      )}

      {/* Menú de selección de texto */}
      <TextSelectionMenu
        position={menuPosition}
        isVisible={showMenu}
        onExplain={handleExplainText}
        onClose={clearSelection}
        selectedText={selectedText}
      />
    </div>
  );
};

export default Chat;

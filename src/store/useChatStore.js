import { create } from "zustand";

const useChatStore = create((set, get) => ({
  isOpen: false,
  messages: [],
  isLoading: false,
  savedPrompts: [],

  openChat: () => set({ isOpen: true }),
  closeChat: () => set({ isOpen: false }),
  addMessage: (message) =>
    set((state) => ({
      messages: [...state.messages, message],
    })),
  addPromptFromSelection: (selectedText) => {
    const prompt = {
      id: Date.now(),
      text: selectedText,
      timestamp: new Date().toISOString(),
      type: "text_selection",
    };

    set((state) => ({
      savedPrompts: [...state.savedPrompts, prompt],
      messages: [
        ...state.messages,
        {
          id: Date.now(),
          type: "user",
          content: `Explicar: "${selectedText}"`,
          timestamp: new Date().toISOString(),
        },
      ],
    }));
  },

  clearMessages: () => set({ messages: [] }),
  removePrompt: (promptId) =>
    set((state) => ({
      savedPrompts: state.savedPrompts.filter((p) => p.id !== promptId),
    })),
  getRecentPrompts: (limit = 5) => {
    const { savedPrompts } = get();
    return savedPrompts
      .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
      .slice(0, limit);
  },
}));

export default useChatStore;

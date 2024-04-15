import React from "react";
import { ChatProvider } from "../Context/ChatProvider.jsx";
import ChatsPage from "./Chat/ChatsPage.jsx";

export default function Chat() {
  return (
    <ChatProvider>
      <ChatsPage />
    </ChatProvider>
  );
}

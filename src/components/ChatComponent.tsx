import * as React from "react";
import { LuBot, LuSendHorizontal} from "react-icons/lu";
import useChatbot from "../hooks/useChatbot";
import Markdown from "react-markdown";
import useChatScroll from "../hooks/useChatScroll";

const ChatComponent: React.FunctionComponent = () => {
   const [input, setInput] = React.useState("");
   const [mode, setMode] = React.useState<"chat" | "video">("chat");

   const { messages, sendMessage } = useChatbot();
   const ref = useChatScroll(messages);

   const handleSend = () => {
     if (!input.trim()) return;

     if (mode === "video") {
       sendMessage(`Summarize this video content:\n${input}`);
     } else {
       sendMessage(input);
     }

     setInput("");
   };


  return (
    <div className="flex flex-col h-[80vh] bg-white shadow-lg rounded-lg overflow-hidden max-w-lg mx-auto mt-10 border border-gray-200">
      <h2 className="p-4 font-bold text-xl text-center bg-blue-600 text-white flex justify-center items-center gap-2 shadow-sm">
        OpenAI Chatbot <LuBot size={28} />
      </h2>

      <div ref={ref} className="flex-1 overflow-y-auto p-4 space-y-2">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`p-3 rounded-lg max-w-xs ${
              msg.sender === "user"
                ? "bg-blue-500 text-white ml-auto"
                : "bg-gray-300 text-gray-800"
            }`}
          >
            <Markdown>{msg.text}</Markdown>
          </div>
        ))}
      </div>
      <div className="flex flex-col p-4 bg-gray-50">
        <div className="flex gap-2 justify-center mb-2">
          <button
            onClick={() => setMode("chat")}
            className={`px-3 py-1 rounded ${mode === "chat" ? "bg-blue-500 text-white" : "bg-blue-200"}`}
          >
            Chat
          </button>
          <button
            onClick={() => setMode("video")}
            className={`px-3 py-1 rounded ${mode === "video" ? "bg-green-500 text-white" : "bg-green-200"}`}
          >
            Video Summary
          </button>
        </div>

        <div className="flex items-center w-full">
          <input
            type="text"
            className="flex-1 min-w-0 p-2 border border-gray-300 rounded-lg mr-2"
            placeholder={
              mode === "video"
                ? "Paste YouTube URL or transcript..."
                : "Your message here"
            }
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />

          <button onClick={handleSend} className="p-2">
            <LuSendHorizontal size={25} />
          </button>
        </div>
      </div>
    </div>
  );

  
};

export default ChatComponent;
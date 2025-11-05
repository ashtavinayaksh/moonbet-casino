import { useEffect } from "react";

const TidioChatButton = () => {
  useEffect(() => {
    const onTidioChatApiReady = () => {
      // Hide the chat widget initially
      window.tidioChatApi.hide();

      // Re-hide it after chat closes
      window.tidioChatApi.on("close", () => {
        window.tidioChatApi.hide();
      });
    };

    // Case 1: API already loaded
    if (window.tidioChatApi) {
      window.tidioChatApi.on("ready", onTidioChatApiReady);
    } else {
      // Case 2: Wait for Tidio to finish loading
      document.addEventListener("tidioChat-ready", onTidioChatApiReady);
    }

    // Cleanup on unmount
    return () => {
      document.removeEventListener("tidioChat-ready", onTidioChatApiReady);
    };
  }, []);

  const handleChatOpen = () => {
    if (window.tidioChatApi) {
      window.tidioChatApi.show();
      window.tidioChatApi.open();
    }
  };

  return (
    <button
      className="chat-button"
      onClick={handleChatOpen}
      style={{
        position: "fixed",
        bottom: "24px",
        right: "24px",

        color: "#fff",
        padding: "12px 20px",
        borderRadius: "50px",
        border: "none",
        boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
        cursor: "pointer",
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        gap: "8px",
      }}
    >
      {/* ✅ Chat Icon */}
      <img
        src="/icons/chat-icon.svg"
        alt="Chat Icon"
        style={{ width: "20px", height: "20px", display: "block" }}
      />
    </button>
  );
};

export default TidioChatButton;

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
      onClick={handleChatOpen}
      style={{
        position: "fixed",
        bottom: "24px",
        right: "24px",
        border: "none",
        background: "transparent",
        padding: 0,
        cursor: "pointer",
        zIndex: 9999,
      }}
    >
      <div
        style={{
          position: "relative",
          width: "60px",
          height: "60px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* ⭐ Glow Behind Icon */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "50%",
            background: "#E5EAF2",
            filter: "blur(20px)",
            opacity: 0.7,
            pointerEvents: "none",
          }}
        />

        {/* ⭐ Chat Icon */}
        <img
          src="/icons/chat-icon.svg"
          alt="Chat Icon"
          style={{
            width: "60px",
            height: "60px",
            display: "block",
            position: "relative",
            zIndex: 10,
          }}
        />
      </div>
    </button>
  );
};

export default TidioChatButton;

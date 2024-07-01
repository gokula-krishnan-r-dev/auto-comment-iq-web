import { useChat } from "@/components/provider/ChatProvider";
import React, { useState, useEffect, useRef } from "react";

const MouseScroll = () => {
  const { MessagecontainerRef: containerRef } = useChat();
  const [showButton, setShowButton] = useState(false);
  const prevScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY < prevScrollY.current) {
        // User is scrolling up
        setShowButton(true);
        // Check if container is not fully visible
        if (containerRef.current) {
          const containerRect = containerRef.current.getBoundingClientRect();
          if (containerRect.top < 0) {
            // Container is not fully visible, scroll to reveal it
            window.scrollTo({
              top: window.scrollY + containerRect.top,
              behavior: "smooth",
            });
          }
        }
      } else {
        // User is scrolling down
        setShowButton(false);
      }

      prevScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    if (containerRef.current) {
      containerRef.current.scrollTop = 0;
    }
  };

  return (
    <section>
      {showButton && (
        <button
          className="cursor-pointer absolute bg-white right-1/2 bottom-24 rounded-full bg-clip-padding border text-token-text-secondary border-token-border-light"
          onClick={scrollToTop}
        >
          <svg
            width={24}
            height={24}
            viewBox="0 0 24 24"
            fill="none"
            className="m-1 text-token-text-primary"
          >
            <path
              d="M17 13L12 18L7 13M12 6L12 17"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      )}
    </section>
  );
};

export default MouseScroll;

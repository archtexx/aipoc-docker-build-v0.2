import React, { useRef, useEffect } from "react";

const AnimatedBackground = () => {
  const leftRef = useRef(null);

  useEffect(() => {
    const handleMove = (e) => {
      leftRef.current.style.width = `${(e.clientX / window.innerWidth) * 100}%`;
    };

    document.addEventListener("mousemove", handleMove);
    document.addEventListener("touchmove", handleMove);

    return () => {
      document.removeEventListener("mousemove", handleMove);
      document.removeEventListener("touchmove", handleMove);
    };
  }, []);

  return (
    <div>
      <div ref={leftRef} id="left-side" className="side">
        <h2 className="title">Ola AMigo</h2>
      </div>
      <div id="right-side" className="side">
        <h2 className="title">Ola Migos</h2>
      </div>
    </div>
  );
};

export default AnimatedBackground;

import React from "react";

function useResizeWindow() {
  const [size, setSize] = React.useState(0);
  React.useEffect(() => {
    function updateSize() {
      setSize(window.innerWidth);
    }

    window.addEventListener("resize", () => setTimeout(updateSize, 3000));
    updateSize();
  }, []);
  return size;
}

export default useResizeWindow;

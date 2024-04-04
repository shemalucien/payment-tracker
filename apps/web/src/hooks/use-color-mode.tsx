// import { useEffect } from "react";
// import useLocalStorage from "./use-local-storage";

// const useColorMode = () => {
//   const [colorMode, setColorMode] = useLocalStorage("color-theme", "light");

//   useEffect(() => {
//     const className = "dark";
//     const bodyClass = window.document.body.classList;

//     colorMode === "dark"
//       ? bodyClass.add(className)
//       : bodyClass.remove(className);
//   }, [colorMode]);

//   return [colorMode, setColorMode];
// };

// export default useColorMode;

import { useEffect } from "react";
import useLocalStorage from "./use-local-storage";

// Define a type for the return value of useColorMode
type ColorModeReturnType = [string, React.Dispatch<React.SetStateAction<string>>];

const useColorMode = (): ColorModeReturnType => {
 const [colorMode, setColorMode] = useLocalStorage("color-theme", "light");

 useEffect(() => {
    const className = "dark";
    const bodyClass = window.document.body.classList;

    colorMode === "dark"
      ? bodyClass.add(className)
      : bodyClass.remove(className);
 }, [colorMode]);

 return [colorMode, setColorMode];
};

export default useColorMode;

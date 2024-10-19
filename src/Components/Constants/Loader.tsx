import React from "react";
import styles from "./Loader.module.css";

interface LoaderProps {
  text?: string;
}

const Loader: React.FC<LoaderProps> = ({ text }) => {
  return (
    <div className="flex justify-center items-center w-full h-full">
      <div className="flex flex-col items-center">
        <div className={styles.loader}></div>
        <p className="mt-[1vw] text-dark-0 font-medium text-[1.1vw]">{text}</p>
      </div>
    </div>
  );
};

export default Loader;

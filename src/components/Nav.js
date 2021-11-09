import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMusic,
  faArrowRight,
  faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";
import { faMoon } from "@fortawesome/free-regular-svg-icons";
const Nav = ({ libraryStatus, setLibraryStatus,annotationStatus,setAnnotationStatus }) => {
  return (
    <nav>
      <button
        onClick={() => {
          setAnnotationStatus(!annotationStatus);
        }}
      >
        <FontAwesomeIcon icon={faArrowLeft} />
        <span> </span>标注
      </button>
      <button
        onClick={() => {
          setLibraryStatus(!libraryStatus);
        }}
      >
        任务<span> </span>
        <FontAwesomeIcon icon={faArrowRight} />
      </button>
    </nav>
  );
};
export default Nav;

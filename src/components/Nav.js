import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";

const Nav = ({ annotationStatus,setAnnotationStatus }) => {
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
    </nav>
  );
};
export default Nav;

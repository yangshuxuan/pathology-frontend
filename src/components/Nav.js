import React, { useState } from "react";
import { Modal } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { faMoon } from "@fortawesome/free-regular-svg-icons";
import CollectionCreateForm from "./CollectionCreateForm";

const Nav = ({  libraryStatus, setLibraryStatus,annotationStatus, setAnnotationStatus }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [visible, setVisible] = useState(false);

  const onCreate = (values) => {
    console.log("Received values of form: ", values);
    setVisible(false);
  };

  const showModal = () => {
    // setIsModalVisible(true);
    setVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
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
      {/* <button onClick={showModal}>
        <FontAwesomeIcon icon={faArrowRight} />
        <span> </span>报告
      </button> */}
      <button
        onClick={() => {
          setLibraryStatus(!libraryStatus);
        }}
      >
        诊断<span> </span>
        <FontAwesomeIcon icon={faArrowRight} />
      </button>
      <Modal
        title="Basic Modal"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
      <CollectionCreateForm
        visible={visible}
        onCreate={onCreate}
        onCancel={() => {
          setVisible(false);
        }}
      />
    </nav>
  );
};
export default Nav;

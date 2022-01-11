/* eslint-disable */
import React, { useState, useEffect } from "react";
import AnnotationTable from "./components/AnnotationTable";
import TaskList from "./components/TaskList";
import { OpenSeaDragonViewer } from "./OpenSeaDragonViewer";
import { largeimageURL, largeimageLabelitemsURL, diagnosesURL } from "./api";
import axios from "axios";
import Nav from "./components/Nav";
import "./styles/app.scss";
function App() {
  const [annotationStatus, setAnnotationStatus] = useState(false); //控制页面显示
  const [libraryStatus, setLibraryStatus] = useState(false);
  const [fromDatabase, setFromDatabase] = useState(false);
  const [anno, setAnno] = useState(); //大图标注插件
  const [annotable, setAnnotable] = useState([]); //标注结果列表
  const [diagnoses, setDiagnoses] = useState([]); //待诊断列表
  const [viewer, setViewer] = useState(null); //大图浏览插件
  const [image, setImage] = useState(); //大图
  const [curDiagnosisItem, setCurDiagnosisItem] = useState();

  useEffect(() => {
    curDiagnosisItem &&
      getImage(curDiagnosisItem) &&
      getAnnotable(curDiagnosisItem);
  }, [curDiagnosisItem]);
  useEffect(() => {
    // getImage();
    // getAnnotable();
    getDiagnoses();
  }, []);
  const getDiagnoses = async () => {
    const diagnoses = await axios.get(diagnosesURL());
    setDiagnoses(diagnoses.data);
  };
  const getImage = async (pathId) => {
    // const pathId = window.location.href.split("/")[3];
    const image = await axios.get(largeimageURL(pathId));
    setImage(image.data);
  };
  const getAnnotable = async (pathId) => {
    // const pathId = window.location.href.split("/")[3];
    const image = await axios.get(largeimageLabelitemsURL(pathId));
    setFromDatabase(true);
    setAnnotable(image.data);
    // console.log(annotable);
  };

  return (
    <div
      className={`App ${libraryStatus ? "library-active" : ""} ${
        annotationStatus ? "annotaglist-active" : ""
      }`}
    >
      <Nav
        annotationStatus={annotationStatus}
        setAnnotationStatus={setAnnotationStatus}
        libraryStatus={libraryStatus}
        setLibraryStatus={setLibraryStatus}
      />
      <OpenSeaDragonViewer
        viewer={viewer}
        setViewer={setViewer}
        anno={anno}
        setAnno={setAnno}
        image={image}
        setAnnotable={setAnnotable}
        annotable={annotable}
        fromDatabase={fromDatabase}
        setFromDatabase={setFromDatabase}
        curDiagnosisItem = {curDiagnosisItem}
      />
      <AnnotationTable
        annotable={annotable}
        anno={anno}
        viewer={viewer}
        annotationStatus={annotationStatus}
      />

      <TaskList
        diagnoses={diagnoses}
        libraryStatus={libraryStatus}
        setCurDiagnosisItem={setCurDiagnosisItem}
        
      />
    </div>
  );
}

export default App;

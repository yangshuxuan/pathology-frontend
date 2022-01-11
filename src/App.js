import React, { useState, useEffect } from "react";
import AnnotationTable from "./components/AnnotationTable";
import TaskList from "./components/TaskList";
import { OpenSeaDragonViewer } from "./OpenSeaDragonViewer";
import { largeimageURL, largeimageLabelitemsURL, diagnosesURL } from "./api";
import axios from "axios";
import Nav from "./components/Nav";
import Demo from "./components/Login/Login2";
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

  const [token, setToken] = useState();

  useEffect(() => {
    curDiagnosisItem &&
      getImage(curDiagnosisItem) &&
      getAnnotable(curDiagnosisItem);
  }, [curDiagnosisItem]);
  useEffect(() => {
    // getImage();
    // getAnnotable();
    if (token) {
      getDiagnoses();
    }
  }, [token]);
  const getDiagnoses = async () => {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `JWT ${token.access}`,
    };
    const diagnoses = await axios.get(diagnosesURL(), { headers: headers });
    setDiagnoses(diagnoses.data);
  };
  const getImage = async (pathId) => {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `JWT ${token.access}`,
    };
    const image = await axios.get(largeimageURL(pathId), { headers: headers });
    setImage(image.data);
  };
  const getAnnotable = async (pathId) => {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `JWT ${token.access}`,
    };
    const image = await axios.get(largeimageLabelitemsURL(pathId), {
      headers: headers,
    });
    setFromDatabase(true);
    setAnnotable(image.data);
    // console.log(annotable);
  };
  if (!token) {
    return <Demo setToken={setToken} />;
  }

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
        token={token}
        viewer={viewer}
        setViewer={setViewer}
        anno={anno}
        setAnno={setAnno}
        image={image}
        setAnnotable={setAnnotable}
        annotable={annotable}
        fromDatabase={fromDatabase}
        setFromDatabase={setFromDatabase}
        curDiagnosisItem={curDiagnosisItem}
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

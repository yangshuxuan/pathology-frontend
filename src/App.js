import React, { useState, useEffect } from "react";
import AnnotationTable from "./components/AnnotationTable";
import { OpenSeaDragonViewer } from "./OpenSeaDragonViewer";
import { largeimageURL,largeimageLabelitemsURL } from "./api";
import axios from "axios";
import Nav from "./components/Nav";
import "./styles/app.scss";
function App() {


  const [annotationStatus, setAnnotationStatus] = useState(false); //控制页面显示
  const [fromDatabase,setFromDatabase] = useState(false);
  const [anno, setAnno] = useState(); //大图标注插件
  const [annotable, setAnnotable] = useState([]); //标注结果列表
  const [viewer, setViewer] = useState(null); //大图浏览插件
  const [image, setImage] = useState(); //大图

  useEffect(() => {
    getImage();
    getAnnotable();
  }, []);
  const getImage = async () => {
    const pathId = window.location.href.split("/")[3]
    const image = await axios.get(largeimageURL(pathId));
    setImage(image.data);

  };
  const getAnnotable = async () => {
    const pathId = window.location.href.split("/")[3]
    const image = await axios.get(largeimageLabelitemsURL(pathId));
    setFromDatabase(true);
    setAnnotable([...annotable,...image.data]);
    // console.log(annotable);
    

  };

  return (
    <div className={`App ${annotationStatus ? "annotaglist-active" : ""}`}>
      <Nav
        annotationStatus={annotationStatus}
        setAnnotationStatus={setAnnotationStatus}
      />
      <OpenSeaDragonViewer
        viewer={viewer}
        setViewer={setViewer}
        anno={anno}
        setAnno={setAnno}
        image={image}
        setAnnotable={setAnnotable}
        annotable={annotable}
        fromDatabase = {fromDatabase}
        setFromDatabase = {setFromDatabase}
        
      />
      <AnnotationTable
        annotable={annotable}
        anno={anno}
        viewer={viewer}
        annotationStatus={annotationStatus}
      />
    </div>
  );
}

export default App;

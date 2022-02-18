/* eslint-disable */
import React, { useState, useEffect } from "react";
import { Layout, Menu, Breadcrumb } from "antd";

const { Header, Content, Footer } = Layout;
import AnnotationTable from "./components/AnnotationTable";
import ToDoList from "./components/ToDoList";
import TaskList from "./components/TaskList";
import { OpenSeaDragonViewer } from "./components/OpenSeaDragonViewer";
import { largeimageURL, largeimageLabelitemsURL, diagnosesURL } from "./api";
import axios from "axios";
import Nav from "./components/Nav";
import Demo from "./components/Login/Login2";
import "./styles/app.scss";
import CompletedList from "./components/CompletedList";
import { Switch, Route, useLocation } from "react-router-dom";
import Diagnose from "./pages/Diagnose";
function App() {
  const [annotationStatus, setAnnotationStatus] = useState(false); //控制页面显示
  const [libraryStatus, setLibraryStatus] = useState(false);
  const [fromDatabase, setFromDatabase] = useState(false);
  const [anno, setAnno] = useState(); //大图标注插件
  const [annotable, setAnnotable] = useState([]); //标注结果列表
  const [historyannotable, setHistoryannotable] = useState([]); //历史标注结果列表
  const [diagnoses, setDiagnoses] = useState([]); //待诊断列表
  const [viewer, setViewer] = useState(null); //大图浏览插件
  const [image, setImage] = useState(); //大图
  const [curDiagnosisItem, setCurDiagnosisItem] = useState();
  const [curDiagnosis, setCurDiagnosis] = useState();

  const [token, setToken] = useState();

  useEffect(() => {
    curDiagnosisItem &&
      getImage(curDiagnosisItem) &&
      getAnnotable(curDiagnosisItem);
  }, [curDiagnosisItem]);
  useEffect(() => {
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
    const historyimage = await axios.get(
      largeimageLabelitemsURL(pathId, true),
      {
        headers: headers,
      }
    );
    setFromDatabase(true);
    setHistoryannotable(historyimage.data);
    setAnnotable(image.data);
  };

  if (!token) {
    return <Demo setToken={setToken} />;
  }
  console.log(token);

  return (
    <Layout className="layout">
      <Header>
        <div className="logo" />
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["2"]}>
          {new Array(15).fill(null).map((_, index) => {
            const key = index + 1;
            return <Menu.Item key={key}>{`nav ${key}`}</Menu.Item>;
          })}
        </Menu>
      </Header>

      <Switch location={location} key={location.pathname}>
        <Route path="/" exact>
          <div className="content-container">
            <ToDoList token={token} />
            <CompletedList />
          </div>
        </Route>
        <Route path="/work/:id">
          {/* <OpenSeaDragonViewer
            token={token}
            viewer={viewer}
            setViewer={setViewer}
            anno={anno}
            setAnno={setAnno}
            image={image}
            setAnnotable={setAnnotable}
            annotable={annotable}
            historyannotable={historyannotable}
            fromDatabase={fromDatabase}
            setFromDatabase={setFromDatabase}
            curDiagnosisItem={curDiagnosisItem}
          /> */}
          <Diagnose
            token={token}
            viewer={viewer}
            setViewer={setViewer}
            anno={anno}
            setAnno={setAnno}
            image={image}
            setAnnotable={setAnnotable}
            annotable={annotable}
            historyannotable={historyannotable}
            fromDatabase={fromDatabase}
            setFromDatabase={setFromDatabase}
            curDiagnosisItem={curDiagnosisItem}
          />
        </Route>
        {/* <Route path="/work/:id">
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
              historyannotable={historyannotable}
              fromDatabase={fromDatabase}
              setFromDatabase={setFromDatabase}
              curDiagnosisItem={curDiagnosisItem}
            />
            <AnnotationTable
              annotable={annotable}
              historyannotable={historyannotable}
              anno={anno}
              viewer={viewer}
              annotationStatus={annotationStatus}
              token={token}
              curDiagnosis={curDiagnosis}
            />

            <TaskList
              diagnoses={diagnoses}
              setCurDiagnosis={setCurDiagnosis}
              libraryStatus={libraryStatus}
              setCurDiagnosisItem={setCurDiagnosisItem}
              token={token}
            />
          </div>
        </Route> */}
        {/* <Route path="/work/:id">
          <MovieDetail />
        </Route>
        <Route path="/contact">
          <ContactUs />
        </Route> */}
      </Switch>

      <Footer style={{ textAlign: "center" }}>
        Ant Design ©2018 Created by Ant UED
      </Footer>
    </Layout>
  );
}

export default App;

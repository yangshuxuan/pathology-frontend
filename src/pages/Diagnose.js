/* eslint-disable */
import React, { useState, useEffect } from "react";
import { Layout, Menu, Breadcrumb } from "antd";
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { OpenSeaDragonViewer } from "../components/OpenSeaDragonViewer";
import AnnotationTableSimple from "../components/AnnotationTableSimple";
const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;
const Diagnose = ({ token }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [fromDatabase, setFromDatabase] = useState(false);

  const [annotable, setAnnotable] = useState([]); //标注结果列表
  const [historyannotable, setHistoryannotable] = useState([]); //历史标注结果列表

  const [viewer, setViewer] = useState(null); //大图浏览插件
  const [anno, setAnno] = useState(); //大图标注插件

  const onCollapse = (collapsed) => {
    console.log(collapsed);
    setCollapsed(collapsed);
  };
  return (
    <Layout style={{ minHeight: "90vh" }}>
      <Sider width="30vw" theme="light" collapsedWidth="0" collapsible collapsed={collapsed} onCollapse={onCollapse}>
        <AnnotationTableSimple
          token={token}
          viewer={viewer}
          anno={anno}
          setAnnotable={setAnnotable}
          annotable={annotable}
          historyannotable={historyannotable}
          setHistoryannotable={setHistoryannotable}
          fromDatabase={fromDatabase}
          setFromDatabase={setFromDatabase}
        />
      </Sider>
      <Layout  className="site-layout">
        <OpenSeaDragonViewer
          token={token}
          viewer={viewer}
          setViewer={setViewer}
          anno={anno}
          setAnno={setAnno}
          setAnnotable={setAnnotable}
          annotable={annotable}
          historyannotable={historyannotable}
          fromDatabase={fromDatabase}
          setFromDatabase={setFromDatabase}
        />
      </Layout>
    </Layout>
  );
};
export default Diagnose;

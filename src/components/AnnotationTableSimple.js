/* eslint-disable */
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Tabs } from "antd";
import { reportOneURL, reportSetURL,largeimageLabelitemsURL } from "../api";
import "antd/dist/antd.css";
import Report from "./Report";
const { TabPane } = Tabs;

const AnnotationTableSimple = ({
  annotable,
  setAnnotable,
  historyannotable,
  setHistoryannotable,
  setFromDatabase,
  anno,
  viewer,
  token,
}) => {
  const [oneSelectedRowKeys, setOneSelectedRowKeys] = useState([]);
  const [twoSelectedRowKeys, setTwoSelectedRowKeys] = useState([]);
  const [reportID, setReportID] = useState(0);
  const curDiagnosis = location.pathname.split("/")[2];
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
  useEffect(() => {
    getAnnotable(curDiagnosis)

  }, []);
  useEffect(() => {
    async function fetchData() {
      if (curDiagnosis) {
        const headers = {
          "Content-Type": "application/json",
          Authorization: `JWT ${token.access}`,
        };
        const reportSet = await axios.get(reportSetURL(curDiagnosis), {
          headers: headers,
        });
        const annotableID = annotable.map((v) => v.id);
        console.log(annotableID);
        console.log(reportSet.data[0].labelitems);
        console.log(reportSet.data[0].labelitems.filter((v) => annotableID.some((p) =>v == p)));
        setOneSelectedRowKeys(
          reportSet.data[0].labelitems.filter((v) => annotableID.some((p) =>v == p))
        );
        const historyannotableID = historyannotable.map((v) => v.id);
        setTwoSelectedRowKeys(
          reportSet.data[0].labelitems.filter((v) => historyannotableID.some((p) =>v == p))
        );
        setReportID(reportSet.data[0].id);
        console.log(reportSet.data[0].id);
        console.log(curDiagnosis);
        console.log(reportSet.data);
      }
    }
    fetchData();
  }, [annotable,historyannotable]);
  useEffect(() => {
    async function patchData() {
      if (reportID) {
        const headers = {
          "Content-Type": "application/json",
          Authorization: `JWT ${token.access}`,
        };
        await axios.patch(
          reportOneURL(reportID),
          { labelitems: [...oneSelectedRowKeys, ...twoSelectedRowKeys] },
          {
            headers: headers,
          }
        );
      }
    }
    patchData();
  }, [reportID,oneSelectedRowKeys, twoSelectedRowKeys]);
  const dataSource = annotable.map((v) => ({
    category: v.category,
    id: v.id.split("-")[0],
    key: v.id,
    doctor: v.doctor.username,
    confidence: v.confidence,
  }));
  const historyDataSource = historyannotable.map((v) => ({
    category: v.category,
    id: v.id.split("-")[0],
    key: v.id,
    doctor: v.doctor.username,
    confidence: v.confidence,
  }));
  const rowSelection = {
    selectedRowKeys: oneSelectedRowKeys,
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        "selectedRows: ",
        selectedRows
      );
      setOneSelectedRowKeys(selectedRowKeys);
    },
    getCheckboxProps: (record) => ({
      name: record.id,
    }),
  };
  const historyrowSelection = {
    selectedRowKeys: twoSelectedRowKeys,
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        "selectedRows: ",
        selectedRows
      );
      setTwoSelectedRowKeys(selectedRowKeys);
    },
    getCheckboxProps: (record) => ({
      name: record.id,
    }),
  };

  const columns = [
    {
      title: "标识",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "分类",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "置信度",
      dataIndex: "confidence",
      key: "confidence",
    },
    {
      title: "医生",
      dataIndex: "doctor",
      key: "doctor",
    },
  ];
  return (
    
      <Tabs defaultActiveKey="1" style={{height:"90vh",overflow:"scroll"}}>
        <TabPane tab="当前标注" key="1">
          <Table
            rowSelection={{
              type: "checkbox",
              ...rowSelection,
            }}
            onRow={(record, rowIndex) => {
              return {
                onClick: (event) => {
                  anno.panTo(`#${record.key}`, false);
                  const p = annotable.find((v) => v.id === record.key);
                  viewer.viewport.zoomTo(p.zoomLevel);
                },
                onDoubleClick: (event) => {}, // double click row
                onContextMenu: (event) => {}, // right button click row
                onMouseEnter: (event) => {}, // mouse enter row
                onMouseLeave: (event) => {}, // mouse leave row
              };
            }}
            dataSource={dataSource}
            columns={columns}
          />
        </TabPane>
        <TabPane tab="历史标注" key="2">
        <Table
            rowSelection={{
              type: "checkbox",
              ...historyrowSelection,
            }}
            onRow={(record, rowIndex) => {
              return {
                onClick: (event) => {
                  anno.panTo(`#${record.key}`, false);
                  const p = historyannotable.find((v) => v.id === record.key);
                  viewer.viewport.zoomTo(p.zoomLevel);
                },
                onDoubleClick: (event) => {}, // double click row
                onContextMenu: (event) => {}, // right button click row
                onMouseEnter: (event) => {}, // mouse enter row
                onMouseLeave: (event) => {}, // mouse leave row
              };
            }}
            dataSource={historyDataSource}
            columns={columns}
          />
        </TabPane>
        <TabPane tab="病理报告" key="3">
          <Report token = {token}/>

        </TabPane>
      </Tabs>
  );
};
export default AnnotationTableSimple;

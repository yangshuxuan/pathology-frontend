import React, { useState, useEffect } from "react";
import { Table } from "antd";
import "antd/dist/antd.css";
// const a = {
//     type: "Annotation",
//     body: [
//       {
//         value: "2",
//         purpose: "category",
//       },
//       {
//         type: "TextualBody",
//         value: "afas",
//         purpose: "tagging",
//       },
//       {
//         value: "green",
//         purpose: "highlighting",
//       },
//     ],
//     target: {
//       source: "http://localhost:3001/undefined",
//       selector: {
//         type: "FragmentSelector",
//         conformsTo: "http://www.w3.org/TR/media-frags/",
//         value: "xywh=pixel:18005,6586,3835,4680",
//       },
//     },
//     "@context": "http://www.w3.org/ns/anno.jsonld",
//     id: "#36bb0d9b-29a7-4147-b75f-c5c26f37477b",
//   };
const AnnotationTable = ({ annotable, anno, viewer ,annotationStatus}) => {
  const dataSource = annotable.map((v) => ({
    category: v.body.find((t) => t.purpose === "category").value,
    id: v.id,
  }));

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
  ];
  return (
    <div className= {`annotaglist ${annotationStatus ? "activate-annotaglist" : ""}`} >
      <h2>标注列表</h2>
      <Table
        onRow={(record, rowIndex) => {
          return {
            onClick: (event) => {
              anno.panTo(record.id, false);
              const p = annotable.find(v => v.id === record.id)
              console.log(p);
              viewer.viewport.zoomTo(p.zoom);
              console.log(record);
            }, // click row
            onDoubleClick: (event) => {}, // double click row
            onContextMenu: (event) => {}, // right button click row
            onMouseEnter: (event) => {}, // mouse enter row
            onMouseLeave: (event) => {}, // mouse leave row
          };
        }}
        dataSource={dataSource}
        columns={columns}
      />
      ;
    </div>
  );
};
export default AnnotationTable;

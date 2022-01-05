import React from "react";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";
import MyDocument from "./MyDocument";
import { PDFViewer, PDFDownloadLink } from "@react-pdf/renderer";
import { Tree, Modal } from "antd";
import ReactPDF from "@react-pdf/renderer";
// const treeData = [
//   {
//     title: 'parent 1',
//     key: '0-0',
//     children: [
//       {
//         title: 'parent 1-0',
//         key: '0-0-0',
//         disabled: true,
//         children: [
//           {
//             title: 'leaf',
//             key: '0-0-0-0',
//             disableCheckbox: true,
//           },
//           {
//             title: 'leaf',
//             key: '0-0-0-1',
//           },
//         ],
//       },
//       {
//         title: 'parent 1-1',
//         key: '0-0-1',
//         children: [
//           {
//             title: (
//               <span
//                 style={{
//                   color: '#1890ff',
//                 }}
//               >
//                 sss
//               </span>
//             ),
//             key: '0-0-1-0',
//           },
//         ],
//       },
//     ],
//   },
// ];
const TaskList = ({ libraryStatus, diagnoses, setCurDiagnosisItem }) => {
  const [visible, setVisible] = React.useState(false);
  const [confirmLoading, setConfirmLoading] = React.useState(false);
  const [modalText, setModalText] = React.useState("Content of the modal");
  console.log(diagnoses);

  const treeData2 = diagnoses.map((g) => ({
    title: `诊断：${g.patient.name}`,
    key: g.id,

    children: g.items.map((s) => ({
      title: `图片:${s.pathologyPicture.description}`,
      key: `${g.id}-${s.id}`,
      isLeaf: true,
    })),
  }));
  console.log(treeData2);

  const showModal = () => {
    setVisible(true);
  };

  const handleOk = () => {
    setModalText("The modal will be closed after two seconds");
    setConfirmLoading(true);
    setTimeout(() => {
      setVisible(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setVisible(false);
  };
  const onSelect = (selectedKeys, info) => {
    if (info.node.isLeaf) {
      console.log(info.node.key.split("-")[1]);
      setCurDiagnosisItem(info.node.key.split("-")[1]);
    }
    // setCurDiagnosisItem(2)
    console.log("selected", selectedKeys, info);
  };

  const onCheck = (checkedKeys, info) => {
    console.log("onCheck", checkedKeys, info);
  };

  return (
    <div className={`library ${libraryStatus ? "activate-library" : ""}`}>
      <h2>诊断列表</h2>
      <Tree
        // checkable
        // defaultExpandedKeys={['0-0-0', '0-0-1']}
        // defaultSelectedKeys={['0-0-0', '0-0-1']}
        // defaultCheckedKeys={['0-0-0', '0-0-1']}
        onSelect={onSelect}
        onCheck={onCheck}
        treeData={treeData2}
      />
      <Modal
        title="Title"
        visible={visible}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        width={1000}
      >
        {/* <p>{modalText}</p> */}
        {/* <PDFDownloadLink document={<MyDocument />} fileName="somename.pdf">
          {({ blob, url, loading, error }) =>
            loading ? "Loading document..." : "Download now!"
          }
        </PDFDownloadLink> */}
        <PDFViewer width={"100%"} showToolbar={true}>
          <MyDocument />
        </PDFViewer>
      </Modal>
    </div>
  );
};
export default TaskList;

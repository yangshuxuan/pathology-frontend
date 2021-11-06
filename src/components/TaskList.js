import React from "react";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";
// import './index.css';
import { Tree } from "antd";
const treeData = [
  {
    title: "parent 1",
    key: "0-0",
    children: [
      {
        title: "parent 1-0",
        key: "0-0-0",
        disabled: true,
        children: [
          {
            title: "leaf",
            key: "0-0-0-0",
            disableCheckbox: true,
          },
          {
            title: "leaf",
            key: "0-0-0-1",
          },
        ],
      },
      {
        title: "parent 1-1",
        key: "0-0-1",
        children: [
          {
            title: (
              <span
                style={{
                  color: "#1890ff",
                }}
              >
                sss
              </span>
            ),
            key: "0-0-1-0",
          },
        ],
      },
    ],
  },
  {
    title: "parent 1",
    key: "0-0",
    children: [
      {
        title: "parent 1-0",
        key: "0-0-0",
        disabled: true,
        children: [
          {
            title: "leaf",
            key: "0-0-0-0",
            disableCheckbox: true,
          },
          {
            title: "leaf",
            key: "0-0-0-1",
          },
        ],
      },
      {
        title: "parent 1-1",
        key: "0-0-1",
        children: [
          {
            title: (
              <span
                style={{
                  color: "#1890ff",
                }}
              >
                sss
              </span>
            ),
            key: "0-0-1-0",
          },
        ],
      },
    ],
  },
];

const TaskList = ({
  taskListInfo,
  tasksInfo,
  annotable,
  manifest,
  setManifest,
  setAnnotable,
}) => {
  console.log(tasksInfo);
  const searchSlide = (id) => {
    for (const g of tasksInfo) {
      for (const slide of g.slides) {
        if (slide.id === id) {
          return slide;
        }
      }
    }
  };

  const onSelect = (selectedKeys, info) => {
    console.log(selectedKeys);
    console.log("selected", selectedKeys, info);
    if (manifest) {
      manifest.annotation = annotable; //将新的标注信息更新到图像中
    }
    const slide = searchSlide(selectedKeys[0]);
    console.log(slide);

    setManifest(slide);
    setAnnotable(slide.annotation);
  };

  const onCheck = (checkedKeys, info) => {
    console.log("onCheck", checkedKeys, info);
  };

  return (
    <Tree
      //   checkable
      //   defaultExpandedKeys={['0-0-0', '0-0-1']}
      //   defaultSelectedKeys={['0-0-0', '0-0-1']}
      //   defaultCheckedKeys={['0-0-0', '0-0-1']}
      onSelect={onSelect}
      onCheck={onCheck}
      treeData={taskListInfo}
    />
  );
};
export default TaskList;

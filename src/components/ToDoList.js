import React, { useState, useEffect } from "react";
import { Table, Tag, Space } from "antd";
import { Link } from "react-router-dom";
import axios from "axios";
import { diagnosesURL } from "../api";
// const columns = [
//   {
//     title: "Name",
//     dataIndex: "name",
//     key: "name",
//     render: (text) => <a>{text}</a>,
//   },
//   {
//     title: "Age",
//     dataIndex: "age",
//     key: "age",
//   },
//   {
//     title: "Address",
//     dataIndex: "address",
//     key: "address",
//   },
//   {
//     title: "Tags",
//     key: "tags",
//     dataIndex: "tags",
//     render: (tags) => (
//       <>
//         {tags.map((tag) => {
//           let color = tag.length > 5 ? "geekblue" : "green";
//           if (tag === "loser") {
//             color = "volcano";
//           }
//           return (
//             <Tag color={color} key={tag}>
//               {tag.toUpperCase()}
//             </Tag>
//           );
//         })}
//       </>
//     ),
//   },
//   {
//     title: "Action",
//     key: "action",
//     render: (text, record) => (
//       <Space size="middle">
//         <Link to="/work/1">2. Our Work</Link>
//         <a>Invite {record.name}</a>
//         <a>Delete</a>
//       </Space>
//     ),
//   },
// ];
const columns = [
  {
    title: "诊断标识",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "患者姓名",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "患者年龄",
    dataIndex: "age",
    key: "age",
  },
  {
    title: "患者性别",
    dataIndex: "sex",
    key: "sex",
  },
  {
    title: "图片描述",
    dataIndex: "description",
    key: "description",
  },
  {
    title: "诊断项",
    key: "itemid",
    dataIndex: "itemid",
    render: (itemid) => (
      <Space size="middle">
        <Link to={`/label/work/${itemid}`}>2. Our Work</Link>
      </Space>
    ),
  },
];
const ToDoList = ({ token }) => {
  console.log(token);
  const [diagnoses, setDiagnoses] = useState([]); //待诊断列表
  useEffect(() => {
    console.log(token);
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
    const data = diagnoses.data.map((v) => ({
      id: v.id, //诊断ID
      key: v.id,
      name: v.patient.name,
      age: v.patient.age,
      sex: v.patient.sex,
      itemid: v.items[0].id,
      description: v.items[0].pathologyPicture.description,
    }));
    console.log(data);
    setDiagnoses(data);
  };

  //   const data = [
  //     {
  //       key: "1",
  //       name: "John Brown",
  //       age: 32,
  //       address: "New York No. 1 Lake Park",
  //       tags: ["nice", "developer"],
  //     },
  //     {
  //       key: "2",
  //       name: "Jim Green",
  //       age: 42,
  //       address: "London No. 1 Lake Park",
  //       tags: ["loser"],
  //     },
  //     {
  //       key: "3",
  //       name: "Joe Black",
  //       age: 32,
  //       address: "Sidney No. 1 Lake Park",
  //       tags: ["cool", "teacher"],
  //     },
  //     {
  //       key: "4",
  //       name: "Joe Black",
  //       age: 32,
  //       address: "Sidney No. 1 Lake Park",
  //       tags: ["cool", "teacher"],
  //     },
  //     {
  //       key: "5",
  //       name: "Joe Black",
  //       age: 32,
  //       address: "Sidney No. 1 Lake Park",
  //       tags: ["cool", "teacher"],
  //     },
  //   ];
  return (
    <Table
      className="todolist-container"
      dataSource={diagnoses}
      columns={columns}
      title={() => "待诊断列表"}
    />
  );
};
export default ToDoList;

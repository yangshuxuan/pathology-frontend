import React, { useState, useEffect } from "react";
import { Table, Tag, Space } from "antd";
import { Link } from "react-router-dom";
import { Button } from "antd";
import axios from "axios";
import { diagnosesURL, eachDiagnoseURL } from "../api";
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

const ToDoList = ({
  token,
  syncBetween,
  setSyncBetween,
  setOtherSyncBetween,
}) => {
  const [diagnoses, setDiagnoses] = useState([]); //待诊断列表
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 4,
  });
  const [loading, setLoading] = useState(false);

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
      render: (itemid, id) => (
        <Space size="small">
          <Link to={`/label/work/${itemid}`}>诊断</Link>
        </Space>
      ),
    },
    {
      title: "Action",
      key: "id-2",
      dataIndex: "id",
      render: (id) => (
        <Space size="small">
          <Button type="link" onClick={handleDiagnoseFinished(id)}>
            完成
          </Button>
        </Space>
      ),
    },
  ];
  useEffect(() => {
    if (token) {
      getDiagnoses(pagination);
    }
  }, [token]);
  useEffect(() => {
    if (syncBetween) {
      getDiagnoses(pagination);
      setSyncBetween(false);
    }
  }, [syncBetween]);

  const handleDiagnoseFinished = (id) => {
    return () => {
      async function patchData() {
        const headers = {
          "Content-Type": "application/json",
          Authorization: `JWT ${token.access}`,
        };
        await axios.patch(
          eachDiagnoseURL(id),
          { isFinished: true },
          {
            headers: headers,
          }
        );
        getDiagnoses(pagination);
        setOtherSyncBetween(true);
      }
      patchData();
    };
  };
  const handleTableChange = (pagination, filters, sorter) => {
    console.log(pagination);
    getDiagnoses(pagination);
  };
  const getDiagnoses = async (pagination, isFinished = false) => {
    setLoading(true);
    const headers = {
      "Content-Type": "application/json",
      Authorization: `JWT ${token.access}`,
    };
    const diagnoses = await axios.get(diagnosesURL(pagination, isFinished), {
      headers: headers,
    });
    const data = diagnoses.data.results.map((v) => ({
      id: v.id, //诊断ID
      key: v.id,
      name: v.patient.name,
      age: v.patient.age,
      sex: v.patient.sex,
      itemid: v.items[0].id,
      description: v.items[0].pathologyPicture.description,
    }));

    setDiagnoses(data);

    setPagination({
      ...pagination,
      total: diagnoses.data.count,
    });
    setLoading(false);
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
      pagination={pagination}
      loading={loading}
      onChange={handleTableChange}
      title={() => "待诊断列表"}
    />
  );
};
export default ToDoList;

import React, { useState, useEffect } from "react";
import { Table, Tag, Space } from "antd";
import { Link } from "react-router-dom";
import { Button } from "antd";
import axios from "axios";
import { diagnosesURL, eachDiagnoseURL } from "../api";


const CompletedList = ({ token, setSyncBetween,othersyncBetween, setOtherSyncBetween }) => {
  const [diagnoses, setDiagnoses] = useState([]); //待诊断列表
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 2,
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
      title: "Action",
      key: "id-2",
      dataIndex: "id",
      render: (id) => (
        <Space size="small">
          <Button type="link" onClick={handleDiagnoseFinished(id)}>
            重新诊断
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
    if (othersyncBetween) {
      getDiagnoses(pagination);
      setOtherSyncBetween(false);
    }
  }, [othersyncBetween]);

  const handleDiagnoseFinished = (id) => {
    return () => {
      async function patchData() {
        const headers = {
          "Content-Type": "application/json",
          Authorization: `JWT ${token.access}`,
        };
        await axios.patch(
          eachDiagnoseURL(id),
          { isFinished: false },
          {
            headers: headers,
          }
        );
        getDiagnoses(pagination);
        setSyncBetween(true);
      }
      patchData();
    };
  };
  const handleTableChange = (pagination, filters, sorter) => {
    console.log(pagination);
    getDiagnoses(pagination);
  };
  const getDiagnoses = async (pagination, isFinished = true) => {
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


  return (
    <Table
      className="todolist-container"
      dataSource={diagnoses}
      columns={columns}
      pagination={pagination}
      loading={loading}
      onChange={handleTableChange}
      title={() => "已完成诊断列表"}
    />
  );
};
export default CompletedList;

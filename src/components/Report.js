/* eslint-disable */
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Checkbox, Row, Col, Card, Input, Space } from "antd";
import { diagnosesURL } from "../api";
import { reportOneURL, reportSetURL,reportDocURL } from "../api";
const { TextArea } = Input;

const Report = ({ token }) => {
  const biaoben = [
    "manyi",
    "jinguanxibao",
    "huashengxibao",
    "bumanyi",
    "TR",
    "M",
    "AM",
    "CL",
    "CMV",
    "HSV",
    "IM",
    "S",
    "ASC_US",
    "ASC_H",
    "AGC_NSL_CC",
    "AGC_NSL_E",
    "AGC_NSL_US",
    "LSIL",
    "AGC_FN_CC",
    "AGC_FN_US",
    "HSIL",
    "AIS",
    "SCC",
    "GC_CC",
    "GC_E",
    "GC_OT",
    "OTHER",
  ];

  const [oneSelectedRowKeys, setOneSelectedRowKeys] = useState([]);
  const [twoSelectedRowKeys, setTwoSelectedRowKeys] = useState([]);
  const [realbiaoben, setrealbiaoben] = useState([]);
  const [advice, setAdvice] = useState("");
  const [reportID, setReportID] = useState(0);
  const curDiagnosis = location.pathname.split("/")[3];
  const onChange = (checkedValues) => {
    setrealbiaoben(checkedValues);
  };
  const onChangeAdvice = (e) => {
    
    setAdvice(e.target.value);
  };

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
        console.log(biaoben.filter((v) => reportSet.data[0][v]));
        setrealbiaoben(biaoben.filter((v) => reportSet.data[0][v]));

        setReportID(reportSet.data[0].id);
        setAdvice(reportSet.data[0].advice);
      }
    }
    fetchData();
  }, []);
  useEffect(() => {
    async function patchData() {
      if (reportID) {
        const headers = {
          "Content-Type": "application/json",
          Authorization: `JWT ${token.access}`,
        };
        await axios.patch(
          reportOneURL(reportID),
          Object.assign(
            {},
            ...biaoben.map((v) => ({
              [v]: realbiaoben.includes(v) ? true : false,
            }))
          ),
          {
            headers: headers,
          }
        );
      }
    }
    patchData();
  }, [realbiaoben]);
  useEffect(() => {
    async function patchData() {
      if (reportID) {
        const headers = {
          "Content-Type": "application/json",
          Authorization: `JWT ${token.access}`,
        };
        await axios.patch(
          reportOneURL(reportID),
          {advice:advice},
          {
            headers: headers,
          }
        );
      }
    }
    patchData();
  }, [advice]);

  return (
    <>
      <Checkbox.Group
        value={realbiaoben}
        style={{ width: "100%" }}
        onChange={onChange}
      >
        <Card title="标本满意度" size="small">
          <Row>
            <Col span={6}>
              <Checkbox value={biaoben[0]}>满意</Checkbox>
            </Col>
            <Col span={6}>
              <Checkbox value={biaoben[1]}>颈管细胞</Checkbox>
            </Col>
            <Col span={6}>
              <Checkbox value={biaoben[2]}>化生细胞</Checkbox>
            </Col>
            <Col span={6}>
              <Checkbox value={biaoben[3]}>不满意</Checkbox>
            </Col>
          </Row>
        </Card>

        <Card title="未见上皮内病变及癌细胞" size="small">
          <Card title="病原体分析" size="small" bordered={false}>
            <Row>
              <Col span={6}>
                <Checkbox value={biaoben[5]}>阴道滴虫</Checkbox>
              </Col>
              <Col span={6}>
                <Checkbox value={biaoben[4]}>真菌</Checkbox>
              </Col>
              <Col span={6}>
                <Checkbox value={biaoben[6]}>放线菌</Checkbox>
              </Col>
              <Col span={6}>
                <Checkbox value={biaoben[7]}>线索细胞</Checkbox>
              </Col>
              <Col span={6}>
                <Checkbox value={biaoben[8]}>巨细胞病毒</Checkbox>
              </Col>
              <Col span={6}>
                <Checkbox value={biaoben[9]}>疱疹病毒</Checkbox>
              </Col>
            </Row>
          </Card>
          <Card title="反应性细胞改变" size="small" bordered={false}>
            <Row>
              <Col span={6}>
                <Checkbox value={biaoben[10]}>炎症</Checkbox>
              </Col>
              <Col span={6}>
                <Checkbox value={biaoben[11]}>萎缩</Checkbox>
              </Col>
            </Row>
          </Card>
        </Card>
        <Row>
          <Col span={11}>
            <Card title="鳞状上皮细胞分析" size="small" bordered={false}>
              <Card title="非典型鳞状细胞" size="small" bordered={false}>
                <Row>
                  <Col span={16}>
                    <Checkbox value={biaoben[12]}>意义不明</Checkbox>
                  </Col>
                  <Col span={16}>
                    <Checkbox value={biaoben[13]}>不除外上皮高度病</Checkbox>
                  </Col>
                </Row>
              </Card>

              <Row>
                <Col span={16}>
                  <Checkbox value={biaoben[17]}>鳞状上皮内低度病变</Checkbox>
                </Col>
                <Col span={16}>
                  <Checkbox value={biaoben[20]}>鳞状上皮内高度病变</Checkbox>
                </Col>

                <Col span={16}>
                  <Checkbox value={biaoben[22]}>鳞状细胞癌</Checkbox>
                </Col>
              </Row>
            </Card>
          </Col>
          <Col span={12}>
            <Card title="腺上皮细胞分析" size="small" bordered={false}>
              <Card
                title="非典型腺细胞(无具体指向)"
                size="small"
                bordered={false}
              >
                <Row>
                  <Col span={8}>
                    <Checkbox value={biaoben[14]}>宫颈管</Checkbox>
                  </Col>
                  <Col span={8}>
                    <Checkbox value={biaoben[15]}>宫内膜</Checkbox>
                  </Col>
                  <Col span={12}>
                    <Checkbox value={biaoben[16]}>不能确定来源</Checkbox>
                  </Col>
                </Row>
              </Card>
              <Card
                title="非典型腺细胞(倾向瘤变)"
                size="small"
                bordered={false}
              >
                <Row>
                  <Col span={8}>
                    <Checkbox value={biaoben[18]}>宫颈管</Checkbox>
                  </Col>
                  <Col span={16}>
                    <Checkbox value={biaoben[19]}>不能确定来源</Checkbox>
                  </Col>
                </Row>
              </Card>
              <Card title="腺癌" size="small" bordered={false}>
                <Row>
                  <Col span={8}>
                    <Checkbox value={biaoben[23]}>宫颈管</Checkbox>
                  </Col>
                  <Col span={8}>
                    <Checkbox value={biaoben[24]}>宫内膜</Checkbox>
                  </Col>
                  <Col span={8}>
                    <Checkbox value={biaoben[25]}>其他</Checkbox>
                  </Col>
                </Row>
              </Card>

              <Row>
                <Col span={16}>
                  <Checkbox value={biaoben[21]}>颈管原位癌</Checkbox>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>

        <Row>
          <Col span={6}>
            <Checkbox value={biaoben[26]}>其他恶性肿瘤</Checkbox>
          </Col>
        </Row>
      </Checkbox.Group>
      <Card title="细胞病理判读意见" bordered={false}>
        <TextArea
          showCount
          maxLength={100}
          value={advice}
          onChange={onChangeAdvice}
        />
      </Card>
      <Space size="middle">
        <a href={reportDocURL(reportID)}>生成报告</a>
      </Space>
    </>
  );
};
export default Report;

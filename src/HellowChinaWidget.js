/* eslint-disable */
import React from "preact/compat";
import { Button } from "antd";
import "./HelloWorldWidget.css";
import "antd/dist/antd.css";
const HellowChinaWidget = (props) => {
  const options = [
    { id: "TR", name: "阴道滴虫" },
    { id: "M", name: "真菌" },
    { id: "AM", name: "放线菌" },
    { id: "CL", name: "线索细胞" },
    { id: "CMV", name: "巨细胞病毒" },
    { id: "HSV", name: "疱疹病毒" },
    { id: "IM", name: "炎症" },
    { id: "S", name: "萎缩" },
    { id: "ASC-US", name: "非典型鳞状细胞意义不明" },
    { id: "ASC-H", name: "非典型鳞状细胞不除外上皮高度病" },
    { id: "AGC(NSL)-CC", name: "非典型腺细胞(无具体指向)宫颈管" },
    { id: "AGC(NSL)-E", name: "非典型腺细胞(无具体指向)宫内膜" },
    { id: "AGC(NSL)-US", name: "非典型腺细胞(无具体指向)不能确定来源" },
    { id: "LSIL", name: "鳞状上皮内低度病变" },
    { id: "AGC(FN)-CC", name: "非典型腺细胞(倾向瘤变)宫颈管" },
    { id: "AGC(FN)-US", name: "非典型腺细胞(倾向瘤变)不能确定来源" },
    { id: "HSIL", name: "鳞状上皮内高度病变" },
    { id: "AIS", name: "颈管原位癌" },
    { id: "SCC", name: "鳞状细胞癌" },
    { id: "GC-CC", name: "腺癌宫颈管" },
    { id: "GC-E", name: "腺癌宫内膜" },
    { id: "GC-OT", name: "腺癌其他" },
  ];
  const purpose = "category";
  const currentCategory = props.annotation
    ? props.annotation.bodies.find((b) => b.purpose === purpose)
    : null;

  // This function handles body updates as the user presses buttons
  const setCategory = (evt) => {
    const value = evt.target.value;
    props.onUpsertBody(currentCategory, { value, purpose: purpose });
  };

  return (
    <div>
      <label for="cars">请选择分类:</label>
      <select
        name="cars"
        id="cars"
        onChange={setCategory}
        value={(currentCategory && currentCategory.value) || -1}
      >
        {options.map((e) => {
          return <option value={e.id}>{e.name}</option>;
        })}
      </select>
    </div>
  );
};

export default HellowChinaWidget;

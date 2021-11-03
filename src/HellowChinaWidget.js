import React from "preact/compat";
import { Button } from "antd";
import "./HelloWorldWidget.css";
import "antd/dist/antd.css";
const HellowChinaWidget = (props) => {
  const options = [
    { id: 1, name: "Volvo" },
    { id: 2, name: "Saab" },
    { id: 3, name: "Opel" },
    { id: 4, name: "Audi" },
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
      <label for="cars">Choose a car:</label>
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

/* eslint-disable */
import React, { useState } from "react";
import { Button, Modal, Form, Input, Radio } from "antd";
import {
  Select,
  InputNumber,
  Switch,
  Slider,
  Upload,
  Rate,
  Checkbox,
  Row,
  Col,
} from "antd";
const CollectionCreateForm = ({ visible, onCreate, onCancel }) => {
  const [form] = Form.useForm();
  return (
    <Modal
      visible={visible}
      title="Create a new collection"
      okText="Create"
      cancelText="Cancel"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            onCreate(values);
          })
          .catch((info) => {
            console.log("Validate Failed:", info);
          });
      }}
    >
      <Form
        form={form}
        layout="vertical"
        name="form_in_modal"
        initialValues={{
          modifier: "public",
        }}
      >
        <Form.Item
          name="title"
          label="Title"
          rules={[
            {
              required: true,
              message: "Please input the title of collection!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="description" label="Description">
          <Input type="textarea" />
        </Form.Item>
        <Form.Item
          name="modifier"
          className="collection-create-form_last-form-item"
        >
          <Radio.Group>
            <Radio value="public">Public</Radio>
            <Radio value="private">Private</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item name="checkbox-group" label="标本满意度">
          <Checkbox.Group>
            <Row>
              <Col span={8}>
                <Checkbox
                  value="s"
                  style={{
                    lineHeight: "32px",
                  }}
                >
                  满意
                </Checkbox>
              </Col>
              <Col span={8}>
                <Checkbox
                  value="neck"
                  style={{
                    lineHeight: "32px",
                  }}
                >
                  颈管细胞
                </Checkbox>
              </Col>
              <Col span={8}>
                <Checkbox
                  value="metaplastic"
                  style={{
                    lineHeight: "32px",
                  }}
                >
                  化生细胞
                </Checkbox>
              </Col>
              <Col span={8}>
                <Checkbox
                  value="u"
                  style={{
                    lineHeight: "32px",
                  }}
                >
                  不满意
                </Checkbox>
              </Col>
            </Row>
            
          </Checkbox.Group>
        </Form.Item>
        <Form.Item name="checkbox-group" label="病原体分析">
          <Checkbox.Group>
            <Row>
              <Col span={8}>
                <Checkbox
                  value="s"
                  style={{
                    lineHeight: "32px",
                  }}
                >
                  满意
                </Checkbox>
              </Col>
              <Col span={8}>
                <Checkbox
                  value="neck"
                  style={{
                    lineHeight: "32px",
                  }}
                >
                  颈管细胞
                </Checkbox>
              </Col>
              <Col span={8}>
                <Checkbox
                  value="metaplastic"
                  style={{
                    lineHeight: "32px",
                  }}
                >
                  化生细胞
                </Checkbox>
              </Col>
              <Col span={8}>
                <Checkbox
                  value="u"
                  style={{
                    lineHeight: "32px",
                  }}
                >
                  不满意
                </Checkbox>
              </Col>
            </Row>
            
          </Checkbox.Group>
        </Form.Item>
        
      </Form>
    </Modal>
  );
};
export default CollectionCreateForm;

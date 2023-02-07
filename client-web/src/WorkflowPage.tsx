import { useState, useEffect, useRef } from "react";
import "./App.css";
import User from "./User";
import { Button, Cascader, Form, Input, Typography, Space } from "antd";
import type { FormInstance } from "antd/es/form";
import { useNavigate } from "react-router-dom";

type SizeType = Parameters<typeof Form>[0]["size"];
const { TextArea } = Input;
const { Title } = Typography;

type ActionType = {
  _id: string;
  name: string;
  description: string;
};

type ReactionType = {
  _id: string;
  name: string;
  description: string;
};

type ServiceType = {
  _id: string;
  name: string;
  route: string;
  actions: ActionType[];
  reactions: ReactionType[];
  isConnected: string;
};

const WorkflowPage = () => {
  const [services, setServices] = useState<ServiceType[] | never[]>([]);

  const formRef = useRef<FormInstance>(null);
  const navigate = useNavigate();
  const getServices = async () => {
    try {
      const response = await fetch(
        "http://localhost:8080/services?populate=actions,reactions",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      if (response.status !== 200) {
        alert(data.message);
      } else {
        setServices(data.services);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getServices();
  }, []);

  const onSubmit = async (values: any) => {
    console.log("values", values);
    const { name, description, action, reaction } = values;

    const workflow = {
      name,
      description,
      actions: [action[1]],
      reactions: [reaction[1]],
    };

    const response = await fetch("http://localhost:8080/workflows", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(workflow),
    });
    const data = await response.json();
    console.log("response status", response.status);
    console.log("data", data);
    if (response.status !== 201) {
      alert(data.message);
    } else {
      navigate("/Home");
    }
  };

  return (
    <div className="background">
      <User />
      <div className="base">
        <Form
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 20 }}
          layout="horizontal"
          onFinish={onSubmit}
          style={{ marginLeft: 20 }}
        >
          <Title>Création de Workflow</Title>
          <Form.Item label="Name" name="name">
            <Input />
          </Form.Item>
          <Form.Item label="Description" name="description">
            <TextArea rows={3} maxLength={255} />
          </Form.Item>
          <Title level={3}>Actions</Title>
          <Form.Item label="Action" name="action">
            <Cascader
              options={services
                .filter((service) => service.actions.length > 0)
                .map((service) => {
                  return {
                    value: service._id,
                    label: service.name,
                    children: service.actions.map((action) => {
                      return {
                        value: action._id,
                        label: action.name,
                      };
                    }),
                  };
                })}
            />
          </Form.Item>
          <Title level={3}>Reactions</Title>
          <Form.Item label="Reaction" name="reaction">
            <Cascader
              options={services
                .filter((service) => service.reactions.length > 0)
                .map((service) => {
                  return {
                    value: service._id,
                    label: service.name,
                    children: service.reactions.map((action) => {
                      return {
                        value: action._id,
                        label: action.name,
                      };
                    }),
                  };
                })}
            />
          </Form.Item>

          <Form.Item wrapperCol={{ span: 3, offset: 8 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default WorkflowPage;

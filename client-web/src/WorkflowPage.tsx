import { useState, useEffect, useRef } from "react";
import "./App.css";
import User from "./User";
import Menu from "./Component/Menu";
import { Button, Cascader, Form, Input, Typography, message } from "antd";
import type { FormInstance } from "antd/es/form";
import { useNavigate } from "react-router-dom";

import { useAuthContext } from "./Context/AuthContext";
import FormItem from "antd/es/form/FormItem";

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
  const { user, fetchAPI } = useAuthContext();
  const formRef = useRef<FormInstance>(null);
  const navigate = useNavigate();
  const getServices = async () => {
    try {
      const response = await fetchAPI(
        "/services?populate=actions,reactions",
        "GET"
      );
      const data = response.data;
      if (response.status !== 200) {
        message.error(data.message);
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
    console.log(values);
    const { name, description, action, reaction } = values;

    const workflow = {
      name,
      description,
      actions: [action[1]],
      reactions: [reaction[1]],
      relativeUser: user,
      serviceAction: services
        .find((service) => service._id === action[0])
        ?.name.toLowerCase(),
      serviceReaction: services
        .find((service) => service._id === reaction[0])
        ?.name.toLowerCase(),
      additionalData: {
        repoOwner: values.repoOwner ? values.repoOwner : "",
        repoName: values.repoName ? values.repoName : "",
        prNumber: values.prNumber ? values.prNumber : "",
        repoOwner2: values.repoOwner2 ? values.repoOwner2 : "",
        repoName2: values.repoName2 ? values.repoName2 : "",
        titleIssue: values.titleIssue ? values.titleIssue : "",
        bodyIssue: values.bodyIssue ? values.bodyIssue : "",
      },
    };
    try {
      const response = await fetchAPI(
        "http://localhost:8080/workflows",
        "POST",
        workflow
      );
      message.success("Workflow créé:" + response.data);
      navigate("/Home");
    } catch (error: any) {
      if (error.response) {
        message.error(error.response.data.message);
      }
    }
  };

  const display = (value: any, element: string) => {
    const service = services.find((service) => service._id === value[0]);
    const dvPassport = document.getElementById(element);
    if (dvPassport == null) {
      return;
    }
    if (service?.name === "GitHub" && dvPassport != null) {
      dvPassport.style.display = "flex";
    } else {
      dvPassport.style.display = "none";
    }
  };

  return (
    <div className="background">
      <User />
      <div className="base">
        <Menu />
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
              onChange={(value) => display(value, "github")}
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
          <div id="github" style={{ display: "none", flexDirection: "column" }}>
            <FormItem label="repoOwner" name="repoOwner">
              <Input />
            </FormItem>
            <FormItem label="repoName" name="repoName">
              <Input />
            </FormItem>
            <FormItem label="prNumber" name="prNumber">
              <Input />
            </FormItem>
          </div>
          <Title level={3}>Reactions</Title>
          <Form.Item label="Reaction" name="reaction">
            <Cascader
              onChange={(value) => display(value, "github2")}
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
          <div id="github2" style={{ display: "none", flexDirection: "column" }}>
            <FormItem label="repoOwner2" name="repoOwner2">
              <Input />
            </FormItem>
            <FormItem label="repoName2" name="repoName2">
              <Input />
            </FormItem>
            <FormItem label="title Issue" name="titleIssue">
              <Input />
            </FormItem>
            <FormItem label="body Issue" name="bodyIssue">
              <Input />
            </FormItem>
          </div>

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

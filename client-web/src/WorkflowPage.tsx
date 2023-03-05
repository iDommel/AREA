import { useState, useEffect, useRef } from "react";
import "./App.css";
import User from "./User";
import Menu from "./Component/Menu";
import { Button, Cascader, Form, Input, Typography, message, DatePicker, TimePicker } from "antd";
import type { FormInstance } from "antd/es/form";
import { useNavigate } from "react-router-dom";

import { useAuthContext } from "./Context/AuthContext";
import FormItem from "antd/es/form/FormItem";

import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(customParseFormat);

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
        localisation: values.localisation ? values.localisation : "",
        subject : values.subject ? values.subject : "",
        content : values.content ? values.content : "",
        to : values.to ? values.to : "",
        subjectEvent : values.subjectEvent ? values.subjectEvent : "",
        contentEvent : values.contentEvent ? values.contentEvent : "",
        startDate : values.startDate ? dayjs(values.startDate).format("YYYY-MM-DD HH:mm:ss") : "",
        endDate : values.endDate ? dayjs(values.endDate).format("YYYY-MM-DD HH:mm:ss") : "",
        playlistUrl : values.playlistUrl ? values.playlistUrl : "",
        newPlaylistName : values.newPlaylistName ? values.newPlaylistName : "",
        trackName : values.trackName ? values.trackName : "",
        issueNb : values.issueNb ? values.issueNb : "",
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

  const display = (value: any, isAction: boolean) => {
    const service = services.find((service) => service._id === value[0]);
    const github = document.getElementById("github");
    const weather = document.getElementById("weather");
    const microsoft = document.getElementById("microsoft");
    const microsoft2 = document.getElementById("microsoft2");
    const spotify = document.getElementById("spotify");
    const spotify2 = document.getElementById("spotify2");

    const github2 = document.getElementById("github2");
    const github3 = document.getElementById("github3");

    if (github == null || weather == null || github2 == null || microsoft == null || microsoft2 == null || spotify == null || spotify2 == null || github3 == null) {
      return;
    }
    if (service?.name === "GitHub" && isAction === true) {
      github.style.display = "flex";
      weather.style.display = "none";
      spotify.style.display = "none";
    } else if (service?.name === "Weather") {
      github.style.display = "none";
      weather.style.display = "flex";
      spotify.style.display = "none";
    } else if (service?.name === "Spotify" && isAction === true) {
      spotify.style.display = "flex";
      github.style.display = "none";
      weather.style.display = "none";
    } else if (isAction === true) {
      github.style.display = "none";
      weather.style.display = "none";
      spotify.style.display = "none";
    }

    if (service?.name === "GitHub" && isAction === false && value[1] === "63f49f3716c5004cdec50c1e") {
      github2.style.display = "flex";
      microsoft.style.display = "none";
      microsoft2.style.display = "none";
      spotify2.style.display = "none";
      github3.style.display = "none";
    } else if (service?.name === "Microsoft" && value[1] === "64031cb83a9dfd1b90a4ee8f") {
      github2.style.display = "none";
      microsoft2.style.display = "none";
      microsoft.style.display = "flex";
      spotify2.style.display = "none";
      github3.style.display = "none";
    } else if (service?.name === "Microsoft") {
      github2.style.display = "none";
      microsoft.style.display = "none";
      microsoft2.style.display = "flex";
      spotify2.style.display = "none";
      github3.style.display = "none";
    } else if (service?.name === "Spotify" && isAction === false) {
      github2.style.display = "none";
      microsoft.style.display = "none";
      microsoft2.style.display = "none";
      spotify2.style.display = "flex";
      github3.style.display = "none";
    } else if (service?.name === "GitHub" && isAction === false && value[1] === "640324493a9dfd1b90a4ee90") {
      github2.style.display = "none";
      github3.style.display = "flex";
      microsoft.style.display = "none";
      microsoft2.style.display = "none";
      spotify2.style.display = "none";
    } else if (isAction === false) {
      github2.style.display = "none";
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
              onChange={(value) => display(value, true)}
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
          <div id="weather" style={{ display: "none", flexDirection: "column" }}>
            <FormItem label="Localisation" name="localisation">
              <Input />
            </FormItem>
          </div>
          <div id="spotify" style={{ display: "none", flexDirection: "column" }}>
            <FormItem label="trackName" name="trackName">
              <Input />
            </FormItem>
          </div>
          <Title level={3}>Reactions</Title>
          <Form.Item label="Reaction" name="reaction">
            <Cascader
              onChange={(value) => display(value, false)}
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
          <div id="microsoft" style={{ display: "none", flexDirection: "column" }}>
            <FormItem label="Subject" name="subject">
              <Input />
            </FormItem>
            <FormItem label="Content" name="content">
              <Input />
            </FormItem>
            <FormItem label="To" name="to">
              <Input />
            </FormItem>
          </div>
          <div id="microsoft2" style={{ display: "none", flexDirection: "column" }}>
            <FormItem label="subjectEvent" name="subjectEvent">
              <Input />
            </FormItem>
            <FormItem label="contentEvent" name="contentEvent">
              <Input />
            </FormItem>
            <FormItem label="startDate" name="startDate">
              <DatePicker
                format="YYYY-MM-DD HH:mm:ss"
                showTime={{ defaultValue: dayjs('00:00:00', 'HH:mm:ss') }}
              />
            </FormItem>
            <FormItem label="endDate" name="endDate">
              <DatePicker
                format="YYYY-MM-DD HH:mm:ss"
                showTime={{ defaultValue: dayjs('00:00:00', 'HH:mm:ss') }}
              />
            </FormItem>
          </div>
          <div id="spotify2" style={{ display: "none", flexDirection: "column" }}>
            <FormItem label="playlistUrl" name="playlistUrl">
              <Input />
            </FormItem>
            <FormItem label="newPlaylistName" name="newPlaylistName">
              <Input />
            </FormItem>
          </div>

          <div id="github3" style={{ display: "none", flexDirection: "column" }}>
            <FormItem label="repoOwner2" name="repoOwner2">
              <Input />
            </FormItem>
            <FormItem label="repoName2" name="repoName2">
              <Input />
            </FormItem>
            <FormItem label="issueNb" name="issueNb">
              <Input />
            </FormItem>
            <FormItem label="content" name="content">
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

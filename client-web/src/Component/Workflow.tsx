import { useNavigate } from "react-router-dom";
import { Card } from "antd";

type AppProps = {
  id: string;
  name: string;
  isActivated: string;
  preview: string;
  service1: string;
  service2: string;
};

const Workflow = ({ id, name, isActivated, preview, service1, service2 }: AppProps) => {
  const navigate = useNavigate();

  const goToWorkflow = (id: string) => {
    if (id === "1") {
      navigate("/Workflow");
    } else {
      navigate("/WorkflowInfo/id=" + id);
    }
  };

  return (
    <div className="workflow">
      <Card className="button" title={name} onClick={() => goToWorkflow(id)}>
        {preview}
        <img src={"https://img.icons8.com/ios/50/000000/" + service1.toLowerCase() + ".png"} alt={service1} />
        <img src={"https://img.icons8.com/ios/30/000000/arrow.png"} alt="arrow" />
        <img src={"https://img.icons8.com/ios/50/000000/" + service2.toLowerCase() + ".png"} alt={service2} />
      </Card>
    </div>
  );
};

export default Workflow;

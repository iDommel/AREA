import { useNavigate } from "react-router-dom";

type AppProps = {
  id: string;
  name: string;
  isActivated: string;
};

const Workflow = ({ id, name, isActivated }: AppProps) => {
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
      <button className="button" onClick={() => goToWorkflow(id)}>
        <h3>{name}</h3>
      </button>
    </div>
  );
};

export default Workflow;

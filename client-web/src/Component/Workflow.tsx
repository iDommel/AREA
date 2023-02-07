import { useNavigate } from "react-router-dom";

type AppProps = {
  id: string;
  name: string;
  isActivated: string;
};

const Workflow = ({ id, name, isActivated }: AppProps) => {
  const navigate = useNavigate();
  const nameClass = "workflow";
  const buttonClass = "button";

  const goToWorkflow = (id: string) => {
    if (id === "1") {
      navigate("/Workflow");
    }
  };

  return (
    <div className={nameClass}>
      <button className={buttonClass} onClick={() => goToWorkflow(id)}>
        <h3>{name}</h3>
      </button>
    </div>
  );
};

export default Workflow;

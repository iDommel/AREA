import { useState } from "react";

type AppProps = {
  id: string;
  name: string;
  route: string;
  isConnected: string;
  globallyEnabled: boolean;
};

const Service = ({ id, name, route, isConnected, globallyEnabled }: AppProps) => {
  const [service, setService] = useState({
    globallyEnabled: globallyEnabled,
    _id: id,
    name: name,
    isConnected: isConnected,
  });

  let endpoint = "http://localhost:8080";

  const [borderColor, setBorderColor] = useState(
    globallyEnabled ? "#3AB500" : "#DE1313"
  );
  const imgClass =
    "https://img.icons8.com/color/112/000000/" + name.toLowerCase() + ".png";

  const updateService = async (status : boolean) => {
    try {
      const response = await fetch("http://localhost:8080/services/63f49774c9221b400ba2c89f", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          globallyEnabled: status,
        }),
      });
      const data = await response.json();
      if (response.status !== 200) {
        console.error(data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const HandleClick = async () => {
    if (service.globallyEnabled) {
      setBorderColor("#DE1313");
      setService({ ...service, globallyEnabled: false });
    } else {
      window.location.href = endpoint + route;
      setBorderColor("#3AB500");
      setService({ ...service, globallyEnabled: true });
    }
    await updateService(!service.globallyEnabled);
  };
  return (
    <div className="service">
      <button
        className="buttonservice"
        onClick={() => HandleClick()}
        style={{ borderColor: borderColor }}
      >
        <img src={imgClass} alt={name} />
      </button>
      <h3 className="status">{service.globallyEnabled ? "Activé" : "Désactivé"}</h3>
    </div>
  );
};

export default Service;

import React, { useState } from "react";

type AppProps = {
  id: string;
  name: string;
  route: string;
  isConnected: string;
  isActivated: boolean;
};

const Service = ({ id, name, route, isConnected, isActivated }: AppProps) => {
  const [service, setService] = useState({
    status: isActivated,
    _id: id,
    name: name,
    isConnected: isConnected,
  });

  let endpoint = "http://localhost:8080";

  const [borderColor, setBorderColor] = useState("#DE1313");
  const imgClass =
    "https://img.icons8.com/color/112/000000/" + name.toLowerCase() + ".png";

  const connectToService = async () => {
    try {
      const response = await fetch(endpoint + route, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(service),
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  const HandleClick = () => {
    if (service.status) {
      setBorderColor("#DE1313");
      setService({ ...service, status: false });
    } else {
      connectToService();
      setBorderColor("#3AB500");
      setService({ ...service, status: true });
    }
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
      <h3 className="status">{service.status ? "Activé" : "Désactivé"}</h3>
    </div>
  );
};

export default Service;

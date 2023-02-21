import React, { useState } from "react";
import { Link } from "react-router-dom";

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
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (response.status !== 200) {
        alert(data.message);
      } else {
        console.log(data);
        setBorderColor("#3AB500");
        setService({ ...service, status: true });
        window.location.href = data.url;
      }
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
    }
  };
  return (
    <div className="service">
      <Link to={`${endpoint}${route}`}>
        <button
          className="buttonservice"
          onClick={() => HandleClick()}
          style={{ borderColor: borderColor }}
        >
          <img src={imgClass} alt={name} />
        </button>
        <h3 className="status">{service.status ? "Activé" : "Désactivé"}</h3>
      </Link>
    </div>
  );
};

export default Service;

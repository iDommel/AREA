import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { message } from "antd";
import { useAuthContext } from "../Context/AuthContext";
type AppProps = {
  id: string;
  name: string;
  route: string;
  isConnected: boolean;
  isActivated: boolean;
};

const Service = ({ id, name, route, isConnected, isActivated }: AppProps) => {
  const endpoint = "http://localhost:8080";

  const [borderColor, setBorderColor] = useState(
    isConnected ? "#3AB500" : "#DE1313"
  );

  useEffect(() => {
    if (isConnected) {
      setBorderColor("#3AB500");
    } else {
      setBorderColor("#DE1313");
    }
  }, [isConnected]);

  const imgClass =
    "https://img.icons8.com/color/112/000000/" + name.toLowerCase() + ".png";

  return (
    <div className="service">
      <Link to={`${endpoint}${route}`}>
        <button className="buttonservice" style={{ borderColor: borderColor }}>
          <img src={imgClass} alt={name} />
        </button>
        <h3 className="status">{isConnected ? "Activé" : "Désactivé"}</h3>
      </Link>
    </div>
  );
};

export default Service;

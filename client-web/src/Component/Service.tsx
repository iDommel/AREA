import React, { useState } from "react";

type AppProps = {
    id: string;
    name: string;
    isConnected: string;
    isActivated: string;
}; 

const Service = ({id, name, isConnected, isActivated} : AppProps) => {

    const [service, setService] = useState({
      status: isActivated,
      _id: id,
      name: name,
      isConnected: isConnected,
    });
  
    const [borderColor, setBorderColor] = useState("#DE1313");
    const imgClass =
      "https://img.icons8.com/color/112/000000/" + name.toLowerCase() + ".png";
  
    const HandleClick = () => {
      if (service.status === "Activé") {
        setBorderColor("#DE1313");
        setService({ ...service, status: "Désactivé" });
      } else {
        setBorderColor("#3AB500");
        setService({ ...service, status: "Activé" });
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
          <h3 className="status">{service.status}</h3>
        </div>
      );
}

export default Service;
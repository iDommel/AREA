import React from "react";
import "./NotFound.css";
import User from "./User";
import Menu from "./Component/Menu";

const NotFound = () => {
  return (
    <div className="background">
      <User />
      <div className="base">
        <Menu />
        <div className="content">
          <h1 className="title">
            404: The page you're looking for doesn't exist
          </h1>
        </div>
      </div>
    </div>
  );
};

export default NotFound;

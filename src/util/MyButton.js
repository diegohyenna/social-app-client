import React from "react";
import { Tooltip, IconButton } from "@material-ui/core";

export default ({ children, onClick, tip, btnClassName, tipClassName }) => {
  return (
    <Tooltip title={tip} className={tipClassName} placement="top">
      <IconButton onClick={onClick} className={btnClassName}>
        {children}
      </IconButton>
    </Tooltip>
  );
};

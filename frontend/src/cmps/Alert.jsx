import React from 'react';
import Alert from '@material-ui/lab/Alert';

const style = {
  fontSize: 40,
  backgroundColor: "white",
  position: "fixed",
  right: "50px",
  bottom: "50px",
  zIndex: "100"
}

// setTimeout(() => {
//   style.display= "none"
// }, 2000);

export default function ColorAlerts({ text , severity }) {
  return (
    <div className="alert" style={style}>
      <Alert severity={`${severity}`}  >
        {text}
      </Alert>
    </div>
  );
}
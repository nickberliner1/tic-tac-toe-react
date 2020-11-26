import React from 'react';
import Button from '@material-ui/core/Button';


export const Square = (props) => {
  
    return (
      <div className="square-container">
      <Button 
        variant="contained" 
        color="default"
        onClick={props.onClick}
        className="square"
      >
        {props.value}
      </Button>
      </div>
    );
  }
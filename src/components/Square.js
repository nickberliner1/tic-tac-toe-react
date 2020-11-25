import React from 'react';
import Button from '@material-ui/core/Button';

function squareColor(props){
  if ( props.value == "x" ) {
    return 'primary';
  } else if ( props.value == "o" ) {
    return 'secondary';
  } else {
    return 'default';
  }
}

export const Square = (props) => {
  
    return (
      <Button 
        variant="contained" 
        color="default"
        // color={squareColor()}
        className="square"
        onClick={props.onClick}
      >
        {props.value}
      </Button>
    );
  }
import React, { useState, useEffect } from "react";
import { Grid, Button } from "@mui/material";

const VirtualKeyboard = ({ inputValue, onKeyPress, keyboardType }) => {

  const [activeLayout, setActiveLayout] = useState("upper");
  useEffect(() => {
    keyboardType ? setActiveLayout(keyboardType) : setActiveLayout("upper");
  }, [])
  

  const keyboardLayouts = {
    upper: [
      ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"],
      ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
      ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
      ["123", "shift", "Z", "X", "C", "V", "B", "N", "M", ".", ":", "<"]
    ],
    lower: [
      ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"],
      ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
      ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
      ["123" , "shift", "z", "x", "c", "v", "b", "n", "m", ".", ":", "<"],
    ],
    numeric: [
      ["1", "2", "3"],
      ["4", "5", "6"],
      ["7", "8", "9"],
      ["ABC", "0", ".", "<"]

    ]
  };

  const handleKeyPress = (value) => {
    if (!inputValue) {
      inputValue = "";
    }

    if (value === "<") {
      // Handle backspace
      const newValue = inputValue.slice(0, -1);
      onKeyPress(newValue);
    } else if (value === "shift") {
      // Toggle case layout
      setActiveLayout(activeLayout === "upper" ? "lower" : "upper");
    } else if (value === "123") {
      // Toggle case layout
      setActiveLayout("numeric");
    } else if (value === "ABC") {
      // Toggle case layout
      setActiveLayout("upper");
    } else {
      // Handle other characters
      const newValue = inputValue + value;
      onKeyPress(newValue);
    }
  };

  return (
    <Grid container spacing={1}>
      {keyboardLayouts[activeLayout].map((row, rowIndex) => (
        <Grid container item key={rowIndex} justifyContent="center">
          {row.map((key, keyIndex) => (
            <Grid item key={keyIndex}>
              <Button
                variant="outlined"
                onClick={() => handleKeyPress(key)}
                sx={{
                  width: "40px",
                  height: "40px",
                  fontSize: "14px",
                  padding: "0",
                  textTransform: "none",
                  "@media (max-width: 900px)": {
                    width: "30px",
                    height: "30px",
                    fontSize: "12px",
                    padding: "0",
                  },
                }}
              >
                {key === "shift" ? (
                  activeLayout === "upper" ? (
                    <span style={{ width: "10px" }}>&uarr;</span>
                  ) : (
                    <span>&darr;</span>
                  )
                ) : (
                  key
                )}
              </Button>
            </Grid>
          ))}
        </Grid>
      ))}
    </Grid>
  );
};

export default VirtualKeyboard;

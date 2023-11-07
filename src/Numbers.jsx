import React from "react";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { Link, useNavigate } from "react-router-dom";
import LatHtaukBayDin from "../LatHtaukBayDin.json";
import { useState, useEffect } from "react";
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import Typography from '@mui/material/Typography';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

const Numbers = () => {
    const [theme, setTheme] = useState("light");
    const [showSnackbar, setShowSnackbar] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
      const storedTheme = localStorage.getItem("theme");
      if (storedTheme) {
        setTheme(storedTheme);
      }
    }, []);
    useEffect(() => {
      const body = document.body;
      const textElements = document.querySelectorAll('p, span, h1, h2, h3, button, div, svg, i'); // Add more selectors as needed
    
      body.style.backgroundColor = theme === "dark" ? "#001919" : "white";
      textElements.forEach(element => {
        element.style.color = theme === "dark" ? "white" : "black";
      });
    }, [theme]);
    const toggleTheme = () => {
      const newTheme = theme === "light" ? "dark" : "light";
      setTheme(newTheme);
      // Store the theme preference in localStorage
      localStorage.setItem("theme", newTheme);
    };
    const showSnackbarMessage = () => {
      setShowSnackbar(true);
    };
    const getIcon = () => {
      return theme === "light" ? (
        <LightModeIcon style={{ cursor: "pointer" }} sx={{ padding: "10px" }} onClick={toggleTheme} />
      ) : (
        <DarkModeIcon style={{ cursor: "pointer" }} sx={{ padding: "10px" }} onClick={toggleTheme} />
      );
    };
    const convertMyanmarToEnglishNumber = (myanmarNumber) => {
      const myanmarDigits = "၀၁၂၃၄၅၆၇၈၉"; 
      const englishDigits = "0123456789"; 

      const digitMap = {};
      for (let i = 0; i < myanmarDigits.length; i++) {
        digitMap[myanmarDigits[i]] = englishDigits[i];
      }
    
      let englishNumber = "";
      for (let i = 0; i < myanmarNumber.length; i++) {
        const digit = myanmarNumber[i];
        if (digit in digitMap) {
          englishNumber += digitMap[digit];
        } else {
          englishNumber += digit;
        }
      }
    
      return englishNumber;
    };
    
    const getAnswer = (answerNo) => {
      // console.log(convertMyanmarToEnglishNumber(answerNo))
      const ansNoEng = convertMyanmarToEnglishNumber(answerNo)
      // console.log(ansNoEng)

      localStorage.setItem("answerNo", ansNoEng);
      showSnackbarMessage();
      setTimeout(() => {
        setShowSnackbar(false); 
        navigate("/answers");
      }, 2000);
    }
  const numbers = LatHtaukBayDin.numberList;
  const gridSize = 9; // Define the grid size (9x9)

  if (numbers.length !== gridSize * gridSize) {
    console.error("Invalid number of elements in LatHtaukBayDin.json");
    return null;
  }

  const createGrid = () => {
    const grid = [];
    for (let row = 0; row < gridSize; row++) {
      const columns = [];
      for (let col = 0; col < gridSize; col++) {
        const index = row * gridSize + col;
        columns.push(
          <Grid item key={index}>
            <Button variant="contained" color="info"  onClick={() => getAnswer(numbers[index])}>{numbers[index]}</Button>
          </Grid>
        );
      }
      grid.push(
        <Grid container item key={row} spacing={1} justifyContent="center">
          {columns}
        </Grid>
      );
    }
    return grid;
  };

  return (
    <div>
        <div style={{ display: "flex", justifyContent: "flex-end", width: "100%" }}>
            {getIcon()}
        </div>
        <Typography variant="body" component="div" sx={{ fontSize: {xs: "2rem", md: "3rem", textAlign: "center", padding: "10px" }}}>
            Numbers  
            <br />
            <Typography variant="h6" sx={{ m:5 }}>Please Choose only ONE number</Typography>
        </Typography>
        <Container>
        <Grid container spacing={1} justifyContent="center">
            {createGrid()}
        </Grid>
        <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 5, padding: "20px" }}>
            <Button variant="contained" color="primary" component={Link} to="/blogs">
            Go back
            </Button>
        </div>
        </Container>
        <Snackbar open={showSnackbar} autoHideDuration={2000} onClose={() => setShowSnackbar(false)}>
          <Alert severity="info">Please wait...</Alert>
        </Snackbar>
    </div>
  );
};

export default Numbers;

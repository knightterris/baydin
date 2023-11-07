import { Link } from "react-router-dom"; 
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useState, useEffect } from "react";
import "./index.css"

function App() {
  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
  };
  const [theme, setTheme] = useState("light");
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
  const getIcon = () => {
    return theme === "light" ? (
      <LightModeIcon style={{ cursor: "pointer" }} sx={{ padding: "10px" }} onClick={toggleTheme} />
    ) : (
      <DarkModeIcon style={{ cursor: "pointer" }} sx={{ padding: "10px" }} onClick={toggleTheme} />
    );
  };
  return (
    <>
      <div style={{ display: "flex", justifyContent: "flex-end", width: "100%" }}>
        {getIcon()}
      </div>
      <Container sx={containerStyle}>
        <Typography variant="h3" component="div" sx={{ fontSize: {xs: "2rem", md: "3rem" } }}>
          <div style={{ textAlign: "center" }}>မင်းသိင်္ခ</div>
          <br/>
            လက်ထောက်ဗေဒင်
        </Typography>
        <Button variant="contained" color="primary" component={Link} to="/blogs" sx={{ mt:5 }}>
          Go to Blogs
        </Button>
        <Typography variant="body" sx={{ fontSize: { xs: "1rem", md: "2rem" }, textAlign: "center", marginTop: 5 }}>
          Credit to resource owner : Ko Sann Lynn Htun & Ko Oat Soe Khant
        </Typography>
      </Container>
    </>
  )
}

export default App;

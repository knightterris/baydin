import questions from "../LatHtaukBayDin.json"
import HelpIcon from '@mui/icons-material/Help';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import Button from '@mui/material/Button';
import { useState, useEffect } from "react";
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { Link, useNavigate } from "react-router-dom"; 

const Blogs = () => {
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
      element.style.color = theme === "dark" ? "white" : "#001919";
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
  const getQuestion = (questionNo) => {
    // console.log(questionNo)
    localStorage.setItem("questionNo", questionNo);
    showSnackbarMessage();
    setTimeout(() => {
      setShowSnackbar(false); 
      navigate("/numbers");
    }, 2000);
  }
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "flex-end", width: "100%" }}>
        {getIcon()}
      </div>
      <Typography variant="body" component="div" sx={{ fontSize: {xs: "2rem", md: "3rem", textAlign: "center", padding: "10px" }}}>
        Questions  
        <br />
        <Typography variant="h6" sx={{ m:5 }}>Please Choose only ONE question</Typography>
      </Typography>
      <Grid container spacing={2}>
        {questions.questions.map((question) => (
          <Grid item xs={12} sm={12} md={6} key={question.questionNo} onClick={() => getQuestion(question.questionNo)}>
            <List>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <HelpIcon />
                  </ListItemIcon>
                  <ListItemText>
                    {question.questionName}
                  </ListItemText>
                </ListItemButton>
              </ListItem>
            </List>
          </Grid>
        ))}
      </Grid>
      <Snackbar open={showSnackbar} autoHideDuration={2000} onClose={() => setShowSnackbar(false)}>
      <Alert severity="info">Please wait...</Alert>
    </Snackbar>
      <div style={{ display: "flex", justifyContent: "flex-end", mt: 5, padding: "20px" }}>
        <Button variant="contained" color="primary" component={Link} to="/" >
          Go back
        </Button>
      </div>
    </div>
  );
}

export default Blogs;

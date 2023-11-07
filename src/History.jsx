import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, Avatar, Typography, Button, CardActions } from '@mui/material';
import LightModeIcon from '@mui/icons-material/LightMode';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import HelpIcon from '@mui/icons-material/Help';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { Link, useNavigate } from "react-router-dom";
import { Help } from '@mui/icons-material';

const History = () => {
    const [theme, setTheme] = useState("light");
    const [data, setData] = useState([]);
    const [showSnackbar, setShowSnackbar] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
      const storedTheme = localStorage.getItem("theme");
      if (storedTheme) {
        setTheme(storedTheme);
      }
      const storedData = localStorage.getItem("records");
      if (storedData) {
        setData(JSON.parse(storedData));
      }
    }, []);

    useEffect(() => {
      const body = document.body;
      const textElements = document.querySelectorAll('p, span, h1, h2, h3, button, div, svg, i');

      const card = document.querySelector('.my-card'); 
      card.style.backgroundColor = theme === "dark" ? "rgb(22 46 46)" : "white";
    
      body.style.backgroundColor = theme === "dark" ? "#001919" : "#c3c3c3";
      // Update theme-related styles for text elements
      textElements.forEach(element => {
        element.style.color = theme === "dark" ? "white" : "black";
      });
    }, [theme]);

    const showSnackbarMessage = () => {
      setShowSnackbar(true);
    };

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

    const clearRecord = () => {
        const questionNo = localStorage.getItem("questionNo")
        const answerNo = localStorage.getItem("answerNo")
        const records = localStorage.getItem("records")
        if(questionNo && answerNo && records){
            localStorage.removeItem("questionNo")
             localStorage.removeItem("answerNo")
             localStorage.removeItem("records")
             showSnackbarMessage();
            setTimeout(() => {
                setShowSnackbar(false); 
                navigate("/");
            }, 2000);
        }else{
            console.log("nothing here")
        }
    }

    return (
      <div>
          <div style={{ display: "flex", justifyContent: "flex-end", width: "100%" }}>
              {getIcon()}
          </div>
          <div>
              <Card className='my-card'  style={{ margin: '10px' }}>
              {data.map((card, index) => (
                <div key={index}>
                    <CardHeader avatar={<Avatar><HelpIcon /></Avatar>} title={card.question} />
                    <CardContent style={{ display: 'flex', alignItems: 'center' }}>
                    <Avatar sx={{ marginRight: '10px' }}>
                        <QuestionAnswerIcon />
                    </Avatar>
                    <Typography variant="body2" color="textSecondary">
                        {card.answer}
                    </Typography>
                    </CardContent>
                </div>
                ))}

              </Card>
               <CardActions style={{ justifyContent: 'flex-end', margin: '10px 0' }}>
                        <Button variant="contained" color="primary" component={Link} to="/" style={{ marginRight: '10px' }}>
                            Go Home
                        </Button>

                        <Button variant="contained" color="primary" component={Link} to="/answers" style={{ marginRight: '10px' }}>
                            Go back
                        </Button>

                        <Button variant="contained" color="secondary" onClick={clearRecord}>
                            Clear
                        </Button>
                    </CardActions>
          </div>
          <Snackbar open={showSnackbar} autoHideDuration={2000} onClose={() => setShowSnackbar(false)}>
                <Alert severity="info">Please wait...</Alert>
              </Snackbar>
      </div>
    );
};

export default History;

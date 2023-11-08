import React from 'react';
import { Card, CardContent, Typography, Button, CardActions, Avatar, Box } from '@mui/material';
import { useState, useEffect } from "react";
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { Link, useNavigate } from "react-router-dom";
import HelpIcon from '@mui/icons-material/Help';
import Answers from "../LatHtaukBayDin.json";
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

const MyPage = () => {
    const [theme, setTheme] = useState("light");
    const navigate = useNavigate();
    const [showSnackbar, setShowSnackbar] = useState(false);
    useEffect(() => {
      const storedTheme = localStorage.getItem("theme");
      if (storedTheme) {
        setTheme(storedTheme);
      }
    }, []);
    useEffect(() => {
      const body = document.body;
      const textElements = document.querySelectorAll('p, span, h1, h2, h3, button, div, svg, i');
      const card = document.querySelector('.my-card'); 
      card.style.backgroundColor = theme === "dark" ? "rgb(22 46 46)" : "white";
    
      body.style.backgroundColor = theme === "dark" ? "#001919" : "#c3c3c3";
      textElements.forEach(element => {
        element.style.color = theme === "dark" ? "white" : "black";
      });
    }, [theme]);

    // useEffect(() => {
    //   const questionNo = localStorage.getItem("questionNo");
    //   const answerNo = localStorage.getItem("answerNo");
    //   if (questionNo && answerNo) {
    //     const question = Answers.questions.find(question => (
    //       question.questionNo === parseInt(questionNo)
    //     ))
    //     // const number = Answers.questions.find(question => (
    //     //   question.questionNo === parseInt(questionNo)
    //     // ))
    //     const result = Answers.answers.find(answer => (
    //       answer.questionNo === parseInt(questionNo) && answer.answerNo === parseInt(answerNo)
    //     ));
        
    //     if (result && question ) {
    //       console.log(result.questionNo);
    //       console.log(result.answerNo);
    //       console.log(question.questionName);
    //       console.log(result.answerResult);
    //     } else {
    //       console.log("Answer not found in the JSON data.");
    //     }
    //   }
    // }, []);
    const showSnackbarMessage = () => {
      setShowSnackbar(true);
    };

     const getQuestionResult = () => {
      const questionNo = localStorage.getItem("questionNo");
      const answerNo = localStorage.getItem("answerNo");
      if (questionNo && answerNo) {
        const question = Answers.questions.find(question => (
          question.questionNo === parseInt(questionNo)
        ));
        
        if (question) {
          return (
            <Typography variant='body' component="div">
              {question.questionName}
            </Typography>
          );
        } else {
          return <Typography variant='body' component="div">Question not found</Typography>;
        }
      }
    };

    const getAnswerResult = () => {
      const questionNo = localStorage.getItem("questionNo");
      const answerNo = localStorage.getItem("answerNo");
      if (questionNo && answerNo) {
        const result = Answers.answers.find(answer => (
          answer.questionNo === parseInt(questionNo) && answer.answerNo === parseInt(answerNo)
        ));
        
        if (result) {
          return (
            <Typography variant='body' component="div">
              {result.answerResult}
            </Typography>
          );
        } else {
          return <Typography variant='body' component="div">Result not found</Typography>;
        }
      }
    };

    const saveResult = () => {
      const questionNo = localStorage.getItem("questionNo");
      const answerNo = localStorage.getItem("answerNo");
      if (questionNo && answerNo) {
        const question = Answers.questions.find(question => (
          question.questionNo === parseInt(questionNo)
        ))
        const result = Answers.answers.find(answer => (
          answer.questionNo === parseInt(questionNo) && answer.answerNo === parseInt(answerNo)
        ));
        
        if (result && question ) {
          const record = {
            question: question.questionName,
            answer: result.answerResult,
          };
         
          const existingRecordsJSON = localStorage.getItem("records");
          const existingRecords = existingRecordsJSON ? JSON.parse(existingRecordsJSON) : [];
    
          // Push the new record to the list of records
          existingRecords.push(record);
    
          // Store the updated list of records in local storage
          localStorage.setItem("records", JSON.stringify(existingRecords));

          showSnackbarMessage();
          setTimeout(() => {
            setShowSnackbar(false); 
            navigate("/history");
          }, 2000);
          
        } else {
          console.log("Answer not found in the JSON data.");
        }
      }
    }

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
    <div>
            <div style={{ display: "flex", justifyContent: "flex-end", width: "100%" }}>
                {getIcon()}
            </div>
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
                <Card className='my-card' style={{ width: '100%', maxWidth: 1000 }}>
                    <CardContent>
                        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
                            <img src="/mintheinkha_logo.png" alt="Logo" width="250" height="250" />
                        </div>
                        <Box display="flex" alignItems="center" marginBottom="20px">
                            <Avatar sx={{ marginRight: '10px' }}>
                                <HelpIcon />
                            </Avatar>
                            {getQuestionResult()}
                        </Box>
                        <Box display="flex" alignItems="center" marginBottom="20px">
                            <Avatar sx={{ marginRight: '10px' }}>
                                <QuestionAnswerIcon />
                            </Avatar>
                            <Typography variant="body" color="text.secondary">
                              {getAnswerResult()}
                            </Typography>
                        </Box>
                        
                    </CardContent>
                    <CardActions style={{ justifyContent: 'flex-end', margin: '10px 0' }}>
                        <Button variant="contained" color="primary" component={Link} to="/numbers" style={{ marginRight: '10px' }}>
                            Go Back
                        </Button>
                        <Button variant="contained" color="success" type='submit' onClick={saveResult}>
                            Save
                        </Button>
                        <Button variant="contained" color="secondary" component={Link} to="/history">
                            Records
                        </Button>
                    </CardActions>
                </Card>
            </Box>
            <Snackbar open={showSnackbar} autoHideDuration={2000} onClose={() => setShowSnackbar(false)}>
              <Alert severity="info">Please wait...</Alert>
            </Snackbar>
        </div>
  );
};

export default MyPage;

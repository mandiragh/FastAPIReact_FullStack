import React, { useState, useEffect } from 'react';
import axios from 'axios';
import QuestionList from './QuestionList';
import AddQuestionForm from './AddQuestionForm';

function App() {
  // State to store the list of questions
  const [questions, setQuestions] = useState([]);

  // Fetch the questions when the app loads
  useEffect(() => {
    fetchQuestions();
  }, []);

  // Function to fetch questions from the backend
  const fetchQuestions = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/questions/");
      setQuestions(response.data);
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  };

  // Function to add a new question to the list
  const addQuestion = (newQuestion) => {
    setQuestions([...questions, newQuestion]);
  };

  return (
    <div className="App">
      <h1>Quiz Application</h1>

      {/* Add Question Form */}
      <AddQuestionForm addQuestion={addQuestion} />

      {/* Display the list of questions */}
      <h2>Existing Questions</h2>
      <QuestionList questions={questions} />

    </div>
  );
}

export default App;

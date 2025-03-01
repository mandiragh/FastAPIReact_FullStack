import React, { useState, useEffect } from 'react';
import axios from 'axios';

const QuestionList = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch questions when the component mounts
  useEffect(() => {
    axios
      .get('http://127.0.0.1:8000/questions/') // Fetch questions from FastAPI backend
      .then(response => {
        setQuestions(response.data); // Assuming response.data is an array of questions
        setLoading(false);
      })
      .catch(error => {
        console.error('There was an error fetching the questions!', error);
        setLoading(false);
      });
  }, []); // Empty array ensures this effect runs once when the component mounts

  return (
    <div>
      {loading ? (
        <p>Loading questions...</p> // Show loading message while fetching data
      ) : (
        <ul>
          {questions.length > 0 ? (
            questions.map(question => (
              <li key={question.id}>
                <h3>{question.question_text}</h3>
                <ul>
                  {question.choices && question.choices.length > 0 ? (
                    question.choices.map((choice, index) => (
                      <li key={index}>
                        {choice.choice_text} - {choice.is_correct ? 'Correct' : 'Incorrect'}
                      </li>
                    ))
                  ) : (
                    <li>No choices available for this question.</li>
                  )}
                </ul>
              </li>
            ))
          ) : (
            <p>No questions available.</p>
          )}
        </ul>
      )}
    </div>
  );
};

export default QuestionList;

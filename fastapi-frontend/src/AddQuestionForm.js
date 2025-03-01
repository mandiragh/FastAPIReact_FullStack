import React, { useState } from 'react';
import axios from 'axios';

const AddQuestionForm = () => {
  const [questionText, setQuestionText] = useState('');
  const [choices, setChoices] = useState([{ choiceText: '', isCorrect: false }]);

  const handleAddChoice = () => {
    setChoices([...choices, { choiceText: '', isCorrect: false }]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const question = {
      question_text: questionText,
      choices: choices.map(choice => ({
        choice_text: choice.choiceText,
        is_correct: choice.isCorrect,
      })),
    };

    try {
      await axios.post('http://127.0.0.1:8000/questions/', question);
      alert('Question added successfully!');
    } catch (error) {
      console.error('Error adding question:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Question Text"
        value={questionText}
        onChange={(e) => setQuestionText(e.target.value)}
      />
      <div>
        {choices.map((choice, index) => (
          <div key={index}>
            <input
              type="text"
              placeholder="Choice Text"
              value={choice.choiceText}
              onChange={(e) =>
                setChoices(
                  choices.map((c, i) =>
                    i === index ? { ...c, choiceText: e.target.value } : c
                  )
                )
              }
            />
            <input
              type="checkbox"
              checked={choice.isCorrect}
              onChange={() =>
                setChoices(
                  choices.map((c, i) =>
                    i === index ? { ...c, isCorrect: !c.isCorrect } : c
                  )
                )
              }
            />
            <label>Correct</label>
          </div>
        ))}
      </div>
      <button type="button" onClick={handleAddChoice}>Add Choice</button>
      <button type="submit">Submit Question</button>
    </form>
  );
};

export default AddQuestionForm;

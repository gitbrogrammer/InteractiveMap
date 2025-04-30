import React from 'react';

function Question({ question, answers, onAnswer }) {
    return (
        <div>
            <h3>{question}</h3>
            <ul>
                {answers.map((answer, index) => (
                    <li key={index}>
                        <button onClick={() => onAnswer(answer.correct)}>
                            {answer.text}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Question;
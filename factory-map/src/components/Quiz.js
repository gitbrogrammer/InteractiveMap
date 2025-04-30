import React, { useEffect, useState } from 'react';
import Question from './Question';
import axios from "axios";
import Results from './Results';

function Quiz() {
    const [questions, setQuestions] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [finished, setFinished] = useState(false);

    useEffect(() => {
        axios.get(`http://localhost:4000/questions`)
            .then(res => {
                setQuestions(res.data);
                console.log("Подключение к серверу успешно!");
            })
            .catch(error => {
                console.error("Ошибка при подключении к серверу: ", error);
            });
    }, []);

    const handleAnswer = (isCorrect) => {
        if (isCorrect) {
            setScore(score + 1);
        }
        const nextQuestion = currentQuestion + 1;
        if (nextQuestion < questions.length) {
            setCurrentQuestion(nextQuestion);
        } else {
            setFinished(true);
        }
    };

    const handleRestart = () => {
        setCurrentQuestion(0);
        setScore(0);
        setFinished(false);
    };

    if (finished) {
        return <Results score={score} total={questions.length} onRestart={handleRestart} />;
    }

    if (questions.length === 0) {
        return <div>Загрузка...</div>
    }

    return (
        <div>
            <h2>Тест: Предприятия Беларуси</h2>
            <Question
                question={questions[currentQuestion].question}
                answers={questions[currentQuestion].answers}
                onAnswer={handleAnswer}
            />
        </div>
    );
}

export default Quiz;
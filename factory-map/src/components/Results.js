import React from 'react';

function Results({ score, total, onRestart }) {
    return (
        <div>
            <h2>Результаты</h2>
            <p>
                Вы ответили правильно на {score} из {total} вопросов.
            </p>
            <p>{score / total >= 0.5 ? "Хорошая работа!" : "Попробуйте снова!"}</p>
            <button onClick={onRestart}>Начать заново</button>
        </div>
    );
}

export default Results;
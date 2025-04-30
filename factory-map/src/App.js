import React, { useState, useEffect } from "react";
import axios from "axios";
import Map from "./components/Map";
import PlantDetails from "./components/PlantDetails";
import AdminPanel from "./components/AdminPanel";
import Quiz from './components/Quiz';
import "./App.css";

const API_URL = "http://localhost:4000"; // Замени на адрес своего backend

function App() {
    const [enterprises, setEnterprises] = useState([]);
    const [selectedEnterprise, setSelectedEnterprise] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false);
    const [addMode, setAddMode] = useState(false);
    const [pendingCoords, setPendingCoords] = useState(null);

    useEffect(() => {
        axios.get(`${API_URL}/enterprises`)
            .then(res => {
                setEnterprises(res.data);
                console.log("Подключение к серверу успешно!");
            })
            .catch(error => {
                console.error("Ошибка при подключении к серверу: ", error);
            });
    }, []);

    const handleMarkerClick = (enterprise) => setSelectedEnterprise(enterprise);
    const handleCloseDetails = () => setSelectedEnterprise(null);

    const handleAdd = (enterprise) => {
        axios.post(`${API_URL}/enterprises`, enterprise)
            .then(res => setEnterprises(enterprises => [...enterprises, res.data]));
    };

    const handleEdit = (updatedEnterprise) => {
        axios.put(`${API_URL}/enterprises/${updatedEnterprise.id}`, updatedEnterprise)
            .then(() => setEnterprises(enterprises => enterprises.map(
                p => p.id === updatedEnterprise.id ? updatedEnterprise : p
            )));
    };

    const handleDelete = (id) => {
        axios.delete(`${API_URL}/enterprises/${id}`)
            .then(() => setEnterprises(enterprises => enterprises.filter(p => p.id !== id)));
    };

    return (
        <div className="App">
            <header>
                <h1>Карта предприятий</h1>
                <button onClick={() => setIsAdmin((v) => !v)}>
                    {isAdmin ? "Выйти из админ-панели" : "Войти в админ-панель"}
                </button>
            </header>
            {isAdmin ? (
                <AdminPanel
                    enterprises={enterprises}
                    onAdd={handleAdd}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                    addMode={addMode}
                    setAddMode={setAddMode}
                    pendingCoords={pendingCoords}
                    setPendingCoords={setPendingCoords}
                />
            ) : (
                <>
                        <Map enterprises={enterprises} onMarkerClick={handleMarkerClick} />
                    {selectedEnterprise && (
                            <PlantDetails enterprise={selectedEnterprise} onClose={handleCloseDetails} />
                    )}
                </>
            )}
            <div className="App">
                <Quiz />
            </div>
        </div>
    );
}

export default App;
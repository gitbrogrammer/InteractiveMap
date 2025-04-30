import React, { useState, useEffect } from "react";
import Map from "./Map";

function AdminPanel({
    enterprises,
    onAdd,
    onEdit,
    onDelete,
    addMode,
    setAddMode,
    pendingCoords,
    setPendingCoords
}) {
    const [editing, setEditing] = useState(null);   // id редактируемого завода или null
    const [adding, setAdding] = useState(false);    // true если идёт добавление нового завода
    const [form, setForm] = useState({
        id: "",
        name: "",
        image: "",
        x: "",
        y: "",
        shortDescription: "",
        fullDescription: "",
    });

    // При выборе координат для нового завода — открываем режим добавления и подставляем координаты
    useEffect(() => {
        if (pendingCoords && addMode) {
            setAdding(true);
            setForm(f => ({
                ...f,
                x: pendingCoords.x,
                y: pendingCoords.y,
            }));
        }
    }, [pendingCoords, addMode]);

    // Сброс всех режимов и формы
    const handleCancel = () => {
        setEditing(null);
        setPendingCoords(null);
        setAdding(false);
        setAddMode(false);
        setForm({
            id: "",
            name: "",
            image: "",
            x: "",
            y: "",
            shortDescription: "",
            fullDescription: "",
        });
    };

    // Перетаскивание маркера: обновляем координаты
    const handleMarkerDrag = coords => {
        setForm(f => ({
            ...f,
            x: coords.x,
            y: coords.y,
        }));
    };

    // Начать редактирование существующего завода
    const handleEditClick = enterprise => {
        if (addMode || adding) return;
        setEditing(enterprise.id);
        setPendingCoords(null);
        setAdding(false);
        setForm(enterprise);
    };

    // Клик "добавить завод" — ожидаем клик по карте
    const handleAddMode = () => {
        if (editing) return;
        setAddMode(true);
        setPendingCoords(null);
        setEditing(null);
        setAdding(false);
        setForm({
            id: "",
            name: "",
            image: "",
            x: "",
            y: "",
            shortDescription: "",
            fullDescription: "",
        });
    };

    // Сохранить изменения (добавить или обновить)
    const handleSubmit = e => {
        e.preventDefault();
        if (editing) {
            onEdit(form);
        } else {
            onAdd({ ...form, id: Date.now().toString() });
        }
        handleCancel();
    };

    return (
        <div style={{ padding: 20 }}>
            <h2>Админ-панель</h2>
            <button onClick={handleAddMode} disabled={addMode || adding || editing}>
                {addMode && !adding ? "Кликните на карту" : "Добавить завод на карту"}
            </button>

            {/* Этап 1: ждём клик по карте для выбора координат */}
            {addMode && !adding && (
                <div style={{ margin: "16px 0", border: "2px dashed #aaa" }}>
                    <p>Кликните на карту для выбора координат расположения завода.</p>
                    <Map
                        enterprises={enterprises}
                        onMapClick={coords => {
                            setPendingCoords(coords);
                        }}
                        adminAddMode={true}
                    />
                    <button type="button" onClick={handleCancel} style={{ marginTop: 10 }}>Отмена</button>
                </div>
            )}

            {/* Этап 2: выбранные координаты — добавление нового завода с draggable-маркером */}
            {adding && (
                <div>
                    <Map
                        enterprises={[]} // НЕ показываем остальные маркеры для чистоты
                        editingEnterprise={form}
                        onMarkerDrag={handleMarkerDrag}
                        adminEditMode={true}
                    />
                    <form onSubmit={handleSubmit} style={{ marginTop: 16 }}>
                        <input
                            placeholder="Название"
                            value={form.name}
                            onChange={e => setForm({ ...form, name: e.target.value })}
                            required
                        />
                        <input
                            placeholder="Ссылка на картинку"
                            value={form.image}
                            onChange={e => setForm({ ...form, image: e.target.value })}
                            required
                        />
                        <input
                            placeholder="X (0-100%)"
                            type="text"
                            value={form.x}
                            onChange={e => setForm({ ...form, x: parseFloat(e.target.value) })}
                            required
                            min="0"
                            max="100"
                        />
                        <input
                            placeholder="Y (0-100%)"
                            type="text"
                            value={form.y}
                            onChange={e => setForm({ ...form, y: parseFloat(e.target.value) })}
                            required
                            min="0"
                            max="100"
                        />
                        <input
                            placeholder="Краткое описание"
                            value={form.shortDescription}
                            onChange={e =>
                                setForm({ ...form, shortDescription: e.target.value })
                            }
                            required
                        />
                        <textarea
                            placeholder="Полное описание"
                            value={form.fullDescription}
                            onChange={e =>
                                setForm({ ...form, fullDescription: e.target.value })
                            }
                            required
                        />
                        <button type="submit">Добавить</button>
                        <button type="button" onClick={handleCancel}>
                            Отмена
                        </button>
                    </form>
                </div>
            )}

            {/* Этап редактирования существующего завода */}
            {editing && (
                <div>
                    <Map
                        enterprises={enterprises}
                        editingEnterprise={form}
                        onMarkerDrag={handleMarkerDrag}
                        adminEditMode={true}
                    />
                    <form onSubmit={handleSubmit} style={{ marginTop: 16 }}>
                        <input
                            placeholder="Название"
                            value={form.name}
                            onChange={e => setForm({ ...form, name: e.target.value })}
                            required
                        />
                        <input
                            placeholder="Ссылка на картинку"
                            value={form.image}
                            onChange={e => setForm({ ...form, image: e.target.value })}
                            required
                        />
                        <input
                            placeholder="X (0-100%)"
                            type="text"
                            value={form.x}
                            onChange={e => setForm({ ...form, x: parseFloat(e.target.value) })}
                            required
                            min="0"
                            max="100"
                        />
                        <input
                            placeholder="Y (0-100%)"
                            type="text"
                            value={form.y}
                            onChange={e => setForm({ ...form, y: parseFloat(e.target.value) })}
                            required
                            min="0"
                            max="100"
                        />
                        <input
                            placeholder="Краткое описание"
                            value={form.shortDescription}
                            onChange={e =>
                                setForm({ ...form, shortDescription: e.target.value })
                            }
                            required
                        />
                        <textarea
                            placeholder="Полное описание"
                            value={form.fullDescription}
                            onChange={e =>
                                setForm({ ...form, fullDescription: e.target.value })
                            }
                            required
                        />
                        <button type="submit">Сохранить</button>
                        <button type="button" onClick={handleCancel}>
                            Отмена
                        </button>
                    </form>
                </div>
            )}

            <h3>Список заводов</h3>
            <ul>
                {enterprises.map(enterprise => (
                    <li key={enterprise.id}>
                        <b>{enterprise.name}</b>
                        <button onClick={() => handleEditClick(enterprise)} disabled={addMode || adding || editing === enterprise.id}>
                            Редактировать
                        </button>
                        <button onClick={() => onDelete(enterprise.id)} disabled={addMode || adding || editing}>Удалить</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default AdminPanel;
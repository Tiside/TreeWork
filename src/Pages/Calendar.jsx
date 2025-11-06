import React, { useState, useEffect } from "react";

const Calendar = () => {
    const today = new Date();
    const [currentMonth, setCurrentMonth] = useState(today.getMonth());
    const [currentYear, setCurrentYear] = useState(today.getFullYear());
    const [events, setEvents] = useState(() => {
        const saved = localStorage.getItem("events");
        return saved ? JSON.parse(saved) : {};
    });
    const [notification, setNotification] = useState("");

    useEffect(() => {
        localStorage.setItem("events", JSON.stringify(events));
    }, [events]);

    // 🔔 Sprawdzanie powiadomień
    useEffect(() => {
        const now = new Date();
        const tomorrow = new Date(now);
        tomorrow.setDate(now.getDate() + 1);
        const key = `${tomorrow.getFullYear()}-${tomorrow.getMonth()}-${tomorrow.getDate()}`;
        if (events[key]) {
            setNotification(`Jutro (${tomorrow.toLocaleDateString()}): ${events[key]}`);
        } else {
            setNotification("");
        }
    }, [events]);

    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const firstDay = new Date(currentYear, currentMonth, 1).getDay();

    const handleAddEvent = (day) => {
        const dateKey = `${currentYear}-${currentMonth}-${day}`;
        const desc = prompt("Dodaj opis wydarzenia:");
        if (desc) {
            setEvents({ ...events, [dateKey]: desc });
        }
    };

    const handlePrevMonth = () => {
        if (currentMonth === 0) {
            setCurrentMonth(11);
            setCurrentYear((y) => y - 1);
        } else {
            setCurrentMonth((m) => m - 1);
        }
    };

    const handleNextMonth = () => {
        if (currentMonth === 11) {
            setCurrentMonth(0);
            setCurrentYear((y) => y + 1);
        } else {
            setCurrentMonth((m) => m + 1);
        }
    };

    const days = [];
    for (let i = 0; i < firstDay; i++) days.push(<div key={`empty-${i}`} />);
    for (let d = 1; d <= daysInMonth; d++) {
        const key = `${currentYear}-${currentMonth}-${d}`;
        days.push(
            <div
                key={d}
                onClick={() => handleAddEvent(d)}
                style={{
                    border: "1px solid #ccc",
                    padding: "8px",
                    cursor: "pointer",
                    background: events[key] ? "#e0ffe0" : "#fff",
                }}
            >
                <strong>{d}</strong>
                <div style={{ fontSize: "0.8em" }}>{events[key]}</div>
            </div>
        );
    }

    const displayedMonth = new Date(currentYear, currentMonth).toLocaleString("pl-PL", {
        month: "long",
        year: "numeric",
    });

    return (
        <div style={{ padding: 20 }}>
            <h2 style={{ textTransform: "capitalize" }}>{displayedMonth}</h2>

            {notification && (
                <div
                    style={{
                        background: "#ffefc1",
                        padding: 10,
                        border: "1px solid #999",
                        marginBottom: 10,
                    }}
                >
                    🔔 {notification}
                </div>
            )}

            <div style={{ marginBottom: 10 }}>
                <button onClick={handlePrevMonth}>⬅️ Poprzedni</button>
                <button onClick={handleNextMonth}>Następny ➡️</button>
            </div>

            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(7, 1fr)",
                    gap: "5px",
                }}
            >
                {days}
            </div>
        </div>
    );
};

export default Calendar;
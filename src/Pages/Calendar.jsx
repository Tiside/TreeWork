import React, {useState, useEffect} from "react";
import "/src/Css/calendar.css"

const Calendar = () => {
    const today = new Date();
    const [currentMonth, setCurrentMonth] = useState(today.getMonth());
    const [currentYear, setCurrentYear] = useState(today.getFullYear());
    const [events, setEvents] = useState({});
    const [notification, setNotification] = useState("");
    const [selectedDate, setSelectedDate] = useState(null);
    const [newEvent, setNewEvent] = useState("");

    useEffect(() => {
        const saved = localStorage.getItem("events");
        if (saved) {
            try {
                setEvents(JSON.parse(saved));
            } catch {
                setEvents({});
            }
        }
    }, []);

    // 💾 Zapisz do localStorage
    useEffect(() => {
        localStorage.setItem("events", JSON.stringify(events));
    }, [events]);

    // 🧹 Usuń przeszłe wydarzenia
    useEffect(() => {
        const now = new Date();
        const cleaned = Object.entries(events).reduce((acc, [key, val]) => {
            const [y, m, d] = key.split("-").map(Number);
            const date = new Date(y, m, d);
            if (date >= new Date(now.getFullYear(), now.getMonth(), now.getDate())) {
                acc[key] = val;
            }
            return acc;
        }, {});
        setEvents(cleaned);
    }, []);

    // 🔔 Powiadomienie dzień przed
    useEffect(() => {
        const now = new Date();
        const tomorrow = new Date(now);
        tomorrow.setDate(now.getDate() + 1);
        const key = `${tomorrow.getFullYear()}-${tomorrow.getMonth()}-${tomorrow.getDate()}`;
        if (events[key] && events[key].length > 0) {
            setNotification(
                `🔔 Jutro (${tomorrow.toLocaleDateString()}): ${events[key].join(", ")}`
            );
        } else {
            setNotification("");
        }
    }, [events]);

    // ➕ Dodaj wydarzenie
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!selectedDate || !newEvent.trim()) return;
        setEvents((prev) => {
            const updated = {...prev};
            if (!updated[selectedDate]) updated[selectedDate] = [];
            updated[selectedDate].push(newEvent.trim());
            return updated;
        });
        setNewEvent("");
        setSelectedDate(null);
    };

    // ❌ Usuń wydarzenie
    const handleRemoveEvent = (dateKey, index) => {
        setEvents((prev) => {
            const updated = {...prev};
            updated[dateKey].splice(index, 1);
            if (updated[dateKey].length === 0) delete updated[dateKey];
            return updated;
        });
    };

    // 🔄 Nawigacja miesięcy
    const prevMonth = () => {
        if (currentMonth === 0) {
            setCurrentMonth(11);
            setCurrentYear((y) => y - 1);
        } else setCurrentMonth((m) => m - 1);
    };
    const nextMonth = () => {
        if (currentMonth === 11) {
            setCurrentMonth(0);
            setCurrentYear((y) => y + 1);
        } else setCurrentMonth((m) => m + 1);
    };

    // 📅 Tworzenie siatki dni
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const firstDay = new Date(currentYear, currentMonth, 1).getDay();
    const offset = firstDay === 0 ? 6 : firstDay - 1;

    const days = [];
    for (let i = 0; i < offset; i++) days.push(<div  key={`empty-${i}`}/>);
    for (let d = 1; d <= daysInMonth; d++) {
        const key = `${currentYear}-${currentMonth}-${d}`;
        const dayEvents = events[key] || [];
        days.push(
            <div
                key={d}
                onClick={() => setSelectedDate(key)}
            >
                <div>{d}</div>
                <div>
                    {dayEvents.map((e, i) => (
                        <div key={i}>
                            {e}{" "}
                            <button
                                onClick={(ev) => {
                                    ev.stopPropagation();
                                    handleRemoveEvent(key, i);
                                }}
                            >
                                ✖
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    const weekDays = ["Pn", "Wt", "Śr", "Cz", "Pt", "So", "Nd"];
    const monthName = new Date(currentYear, currentMonth).toLocaleString("pl-PL", {
        month: "long",
        year: "numeric",
    });

    return (
        <div className="calendar" style={{fontFamily: "sans-serif"}}>
            <div className="calendar-nav">
                <h2 style={{textTransform: "capitalize"}}>{monthName}</h2>

                {notification && (
                    <div>
                        {notification}
                    </div>
                )}

                <div className="buttons" style={{marginBottom: 10}}>
                    <button onClick={prevMonth}>
                        <i className='bx bx-chevrons-left'></i>
                    </button>
                    <button onClick={nextMonth}>
                        <i className='bx bx-chevrons-right'></i>
                    </button>
                </div>
            </div>


            {/* Dni tygodnia */}
            <div className="week-days">
                {weekDays.map((w) => (
                    <div className="week-day" key={w}>{w}</div>
                ))}
            </div>

            {/* Dni miesiąca */}
            <div className="days">

                    {days}
            </div>

            {selectedDate && (
                <div
                >
                    <h4>Dodaj wydarzenie ({selectedDate.split("-").reverse().join(".")})</h4>
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            value={newEvent}
                            onChange={(e) => setNewEvent(e.target.value)}
                            placeholder="Nazwa wydarzenia"
                        />
                        <button type="submit">Dodaj</button>
                        <button
                            type="button"
                            onClick={() => {
                                setSelectedDate(null);
                                setNewEvent("");
                            }}
                        >
                            Anuluj
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default Calendar;

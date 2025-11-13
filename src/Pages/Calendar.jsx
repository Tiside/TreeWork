import React, {useEffect, useMemo, useState} from "react";
import "/src/Css/calendar.css";

const Calendar = () => {
    const today = useMemo(() => new Date(), []);
    const [currentMonth, setCurrentMonth] = useState(today.getMonth());
    const [currentYear, setCurrentYear] = useState(today.getFullYear());

    const [events, setEvents] = useState({});
    const [notification, setNotification] = useState("");
    const [selectedDate, setSelectedDate] = useState(null);
    const [newEvent, setNewEvent] = useState("");

    useEffect(() => {
        try {
            const saved = localStorage.getItem("events");
            if (saved) setEvents(JSON.parse(saved));
        } catch {
            setEvents({});
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("events", JSON.stringify(events));
    }, [events]);

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

    useEffect(() => {
        const now = new Date();
        const tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
        const key = `${tomorrow.getFullYear()}-${tomorrow.getMonth()}-${tomorrow.getDate()}`;
        if (events[key]?.length) {
            setNotification(`🔔 Jutro (${tomorrow.toLocaleDateString()}): ${events[key].join(", ")}`);
        } else {
            setNotification("");
        }
    }, [events]);

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

    const handleRemoveEvent = (dateKey, index) => {
        setEvents((prev) => {
            const updated = {...prev};
            updated[dateKey].splice(index, 1);
            if (updated[dateKey].length === 0) delete updated[dateKey];
            return updated;
        });
    };

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

    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const firstDay = new Date(currentYear, currentMonth, 1).getDay();
    const offset = firstDay === 0 ? 6 : firstDay - 1;

    const days = [];
    for (let i = 0; i < offset; i++) {
        days.push(<div className="day empty" key={`empty-${i}`}/>);
    }

    for (let d = 1; d <= daysInMonth; d++) {
        const key = `${currentYear}-${currentMonth}-${d}`;
        const dayEvents = events[key] || [];

        const isToday =
            d === today.getDate() &&
            currentMonth === today.getMonth() &&
            currentYear === today.getFullYear();

        const isSelected = selectedDate === key;
        const weekIndex = (offset + (d - 1)) % 7;
        const isWeekend = weekIndex >= 5;

        const cls = [
            "day",
            isToday && "today",
            isSelected && "selected",
            dayEvents.length > 0 && "has-events",
            isWeekend && "weekend",
        ]
            .filter(Boolean)
            .join(" ");

        days.push(
            <div
                className={cls}
                key={d}
                onClick={() => setSelectedDate(key)}
                role="button"
                tabIndex={0}
            >
                <div className="day-head">
                    <span className="day-number">{d}</span>
                    {dayEvents.length > 0 && (
                        <span className="events-badge">{dayEvents.length}</span>
                    )}
                </div>

                <div className="events">
                    {dayEvents.map((e, i) => (
                        <div className="this-event">
                            <div className="event" key={i}>
                                <p>
                                    {e}
                                </p>

                                <button
                                    className="remove"
                                    onClick={(ev) => {
                                        ev.stopPropagation();
                                        handleRemoveEvent(key, i);
                                    }}
                                >
                                    ✖
                                </button>
                            </div>
                            <span className="time">10:00 - 12:00 </span>
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

        <div className="calendar">
            <div className="calendar-nav">
                <h2 style={{textTransform: "capitalize"}}>{monthName}</h2>

                {notification && <div className="calendar-note">{notification}</div>}

                <div className="buttons">
                    <button onClick={prevMonth}>
                        <i className="bx bx-chevrons-left"></i>
                    </button>
                    <button onClick={nextMonth}>
                        <i className="bx bx-chevrons-right"></i>
                    </button>
                </div>
            </div>

            <div className="week-days">
                {weekDays.map((w) => (
                    <div className="week-day" key={w}>
                        {w}
                    </div>
                ))}
            </div>

            <div className="days">{days}</div>

            {selectedDate && (
                <div className="add-event">
                    <h4>
                        Dodaj wydarzenie ({selectedDate.split("-").reverse().join(".")})
                    </h4>
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            value={newEvent}
                            onChange={(e) => setNewEvent(e.target.value)}
                            placeholder="Nazwa wydarzenia"
                        />
                        <div className="buttons">
                            <button type="submit" className="add-btn">Dodaj</button>
                            <button
                                type="button"
                                onClick={() => {
                                    setSelectedDate(null);
                                    setNewEvent("");
                                }}
                                className="remove-btn"
                            >
                                Anuluj
                            </button>
                        </div>

                    </form>
                </div>
            )}
        </div>

    );
};

export default Calendar;

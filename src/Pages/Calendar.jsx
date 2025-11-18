import React, {useEffect, useMemo, useState} from "react";
import "/src/Css/calendar.css";
import axios from "axios";

const Calendar = ({token}) => {
    const today = useMemo(() => new Date(), []);
    const [currentMonth, setCurrentMonth] = useState(today.getMonth());
    const [currentYear, setCurrentYear] = useState(today.getFullYear());

    const [events, setEvents] = useState([]);
    const [notification, setNotification] = useState("");
    const [selectedDate, setSelectedDate] = useState(null);
    const [newEvent, setNewEvent] = useState("");
    const [timeFrom, setTimeFrom] = useState("");
    const [timeTo, setTimeTo] = useState("");

    useEffect(() => {
        if (!token) {
            setEvents([]);
            return;
        }

        const fetchEvents = async () => {
            try {
                const res = await axios.get("http://localhost:3000/calendar", {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setEvents(res.data);
            } catch (err) {
                console.error(err);
            }
        };

        fetchEvents();
    }, [token]);



    // useEffect(() => {
    //     const now = new Date();
    //     const tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
    //     const key = `${tomorrow.getFullYear()}-${tomorrow.getMonth()}-${tomorrow.getDate()}`;
    //     if (events[key]?.length) {
    //         setNotification(`🔔 Jutro (${tomorrow.toLocaleDateString()}): ${events[key].join(", ")}`);
    //     } else {
    //         setNotification("");
    //     }
    // }, [events]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!selectedDate || !newEvent.trim()) return;

        const payload = {
            text: newEvent.trim(),
            date: selectedDate,
            hour_from: timeFrom || null,
            hour_to: timeTo || null,
        };

        axios.post("http://localhost:3000/calendar", payload, {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(res => {
                if (!res.data.id) {
                    console.error("Brak zwracanego idd z backendu!");
                    return;
                }
                setEvents(prev => [...prev, { id: res.data.id, ...payload }]);
                setNewEvent("");
                setTimeFrom("");
                setTimeTo("");
                setSelectedDate(null);
            })
            .catch(err => console.error(err));
    };

    const handleRemoveEvent = (id) => {
        axios.delete(`http://localhost:3000/calendar/${id}`, {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(() => {
                setEvents(prev => prev.filter(e => e.id !== id));
            })
            .catch(err => console.error(err));
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
        const monthPadded = String(currentMonth + 1).padStart(2, "0");
        const dayPadded = String(d).padStart(2, "0");
        const key = `${currentYear}-${monthPadded}-${dayPadded}`;
        const dayEvents = events.filter(ev => {
            const eventDate = new Date(ev.date);
            return eventDate.getFullYear() === currentYear &&
                eventDate.getMonth() === currentMonth &&
                eventDate.getDate() === d;
        });
        const isToday = d === today.getDate() && currentMonth === today.getMonth() && currentYear === today.getFullYear();
        const isSelected = selectedDate === key;
        const weekIndex = (offset + (d - 1)) % 7;
        const isWeekend = weekIndex >= 5;

        const cls = ["day", isToday && "today", isSelected && "selected", dayEvents.length > 0 && "has-events", isWeekend && "weekend"].filter(Boolean).join(" ");

        days.push(
            <div className={cls} key={key} onClick={() => setSelectedDate(key)} role="button" tabIndex={0}>
                <div className="day-head">
                    <span className="day-number">{d}</span>
                    {dayEvents.length > 0 && <span className="events-badge">{dayEvents.length}</span>}
                </div>

                <div className="events">
                    {dayEvents.map((e, i) => (
                        <div className="this-event" key={i}>
                            <div className="event">
                                <p>{e.text}</p>
                                <button className="remove" onClick={(ev) => { ev.stopPropagation(); handleRemoveEvent(e.id); }}>✖</button>
                            </div>
                            {(e.hour_from || e.hour_to) && (
                                <span className="time">{e.hour_from || "--:--"} - {e.hour_to || "--:--"}</span>
                            )}
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
                        <div className="times">
                            <div className="time">
                                <label htmlFor="time-from">Time from</label>
                                <input type="time" id="time-from" value={timeFrom} onChange={(e) => setTimeFrom(e.target.value)}/>
                            </div>
                            <div className="time">
                                <label htmlFor="time-to">Time to</label>
                                <input type="time" id="time-to" value={timeTo} onChange={(e) => setTimeTo(e.target.value)}/>
                            </div>
                        </div>

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
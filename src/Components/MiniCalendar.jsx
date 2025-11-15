import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import "/src/Css/mini-calendar.css"; // или отдельный css, как тебе удобнее

function MiniCalendar() {
    const today = useMemo(() => new Date(), []);
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();

    const [events, setEvents] = useState({});

    useEffect(() => {
        try {
            const saved = localStorage.getItem("events");
            if (saved) setEvents(JSON.parse(saved));
        } catch {
            setEvents({});
        }
    }, []);

    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const firstDay = new Date(currentYear, currentMonth, 1).getDay();
    const offset = firstDay === 0 ? 6 : firstDay - 1;

    const weekDays = ["Pn", "Wt", "Śr", "Cz", "Pt", "So", "Nd"];
    const monthName = new Date(currentYear, currentMonth).toLocaleString("pl-PL", {
        month: "long",
        year: "numeric",
    });

    const days = [];
    for (let i = 0; i < offset; i++) {
        days.push(<div className="mini-day empty" key={`empty-${i}`}></div>);
    }

    for (let d = 1; d <= daysInMonth; d++) {
        const key = `${currentYear}-${currentMonth}-${d}`;
        const dayEvents = events[key] || [];

        const isToday = d === today.getDate();

        const cls = [
            "mini-day",
            isToday && "today",
            dayEvents.length > 0 && "has-events",
        ]
            .filter(Boolean)
            .join(" ");

        days.push(
            <div className={cls} key={d}>
                <span className="mini-day-number">{d}</span>
                {dayEvents.length > 0 && (
                    <span className="mini-badge">{dayEvents.length}</span>
                )}
            </div>
        );
    }

    const todayKey = `${today.getFullYear()}-${today.getMonth()}-${today.getDate()}`;
    const todayEvents = events[todayKey] || [];

    return (
        <div className="calendar-mini">
            <div className="calendar-mini-header">
                <div>
                    <p className="calendar-mini-label">Calendar overview</p>
                    <h3 style={{ textTransform: "capitalize" }}>{monthName}</h3>
                </div>
                <Link to="/calendar" className="calendar-mini-link">
                    Open full
                </Link>
            </div>

            <div className="calendar-mini-weekdays">
                {weekDays.map((w) => (
                    <div className="mini-weekday" key={w}>
                        {w}
                    </div>
                ))}
            </div>

            <div className="calendar-mini-days">{days}</div>

            <div className="calendar-mini-today">
                <h4>Today</h4>
                {todayEvents.length === 0 && (
                    <p className="calendar-mini-empty">No events for today.</p>
                )}

                {todayEvents.map((e, i) => {
                    const isString = typeof e === "string";
                    const title = isString ? e : e.title;
                    const from = isString ? "" : e.from;
                    const to = isString ? "" : e.to;

                    return (
                        <div className="calendar-mini-event" key={i}>
                            <span className="calendar-mini-event-title">{title}</span>
                            {(from || to) && (
                                <span className="calendar-mini-event-time">
                                    {from || "--:--"} - {to || "--:--"}
                                </span>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default MiniCalendar;

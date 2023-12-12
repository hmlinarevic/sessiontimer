import { useState, useEffect } from "react";

export default function useLocalStorage(isTimerEnd: boolean) {
    const [sessionsToday, setSessionsToday] = useState(0);

    // inital load of sessions
    useEffect(() => {
        const date = new Date().toLocaleDateString(); // e.g. "23/10/2023"
        const sessions = localStorage.getItem("sessions");

        if (sessions) {
            setSessionsToday(Number(JSON.parse(sessions)[date]));
        } else {
            // set default sessions data when not present in the local storage
            localStorage.setItem("sessions", JSON.stringify({ [date]: 0 }));
        }
    }, []);

    // when timer is done we increment sessions
    useEffect(() => {
        if (isTimerEnd) {
            setSessionsToday((prevState) => prevState + 1);
        }
    }, [isTimerEnd]);

    // when sessions today are updated store to local storage
    useEffect(() => {
        const date = new Date().toLocaleDateString(); // e.g. "23/10/2023"

        localStorage.setItem(
            "sessions",
            JSON.stringify({ [date]: sessionsToday }),
        );
    }, [sessionsToday]);

    return {
        sessionsToday,
        setSessionsToday,
    };
}

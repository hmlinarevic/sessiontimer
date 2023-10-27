import { useState, useEffect } from "react";

/*
    Sessions: 
        today
        total

    Local storage:
        sessions-today
        sessions-total
         
    Today sessions:   
        
*/

type Sessions = {
    [sessionDate: string]: string;
};

export default function useSessions(isTimerEnd: boolean) {
    const [today, setToday] = useState(0);
    const date = new Date().toLocaleDateString(); // e.g. "23/10/2023"

    // console.log({
    //     sessions: {
    //         today_app: today,
    //         today_storage: localStorage.getItem("sessions-today"),
    //     },
    // });

    // inital load of todays sessions
    useEffect(() => {
        const storage = localStorage.getItem("sessions");

        if (storage) {
            const store = JSON.parse(storage);
            const sessions: Sessions = store[date];
            console.log({ sessions });
            setToday(Number(sessions));
        } else {
            console.log("no session store, setting one...");
            const store = { [date]: "0" };
            localStorage.setItem("sessions", JSON.stringify(store));
        }
    }, []);

    // when timer is done we increment sessions and store
    useEffect(() => {
        if (isTimerEnd) {
            setToday((prevState) => prevState + 1);
        }

        if (today) {
            localStorage.setItem("sessions", JSON.stringify({ [date]: today }));
        }
    }, [isTimerEnd, today]);

    return {
        today,
        setToday,
    };
}

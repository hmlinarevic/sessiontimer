import { useState, useEffect } from "react";

let interval: NodeJS.Timeout;

const useCountdown = (seconds: number, isStart: boolean) => {
    const [secondsLeft, setSecondsLeft] = useState(seconds);

    useEffect(() => {
        console.log("useCountdown's useEffect runs..");

        const timeEnd = Date.now() + seconds * 1000;

        if (isStart) {
            console.log("starting interval");
            interval = setInterval(() => {
                const timeLeft = timeEnd - Date.now();
                setSecondsLeft(Math.ceil(timeLeft / 1000));
            }, 1000);
        }

        if (!isStart) {
            setSecondsLeft(seconds);
        }

        return () => {
            console.log("useCountdown cleanup: interval cleared!");
            clearInterval(interval);
        };
    }, [isStart, seconds]);

    useEffect(() => {
        if (secondsLeft <= 0) {
            console.log("no seconds left, clearing interval..");
            clearInterval(interval);
        }
    }, [secondsLeft]);

    return secondsLeft;
};

export default useCountdown;

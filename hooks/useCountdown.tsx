import { useState, useEffect } from "react";

let interval: NodeJS.Timeout;

const useCountdown = (
    seconds: number,
    { isStart, isStop }: { isStart: boolean; isStop: boolean },
) => {
    const [secondsLeft, setSecondsLeft] = useState(seconds);

    useEffect(() => {
        // console.log("useCountdown's useEffect runs..");

        const timeEnd = Date.now() + secondsLeft * 1000;

        if (isStart) {
            // console.log("starting interval");
            interval = setInterval(() => {
                const timeLeft = timeEnd - Date.now();
                setSecondsLeft(Math.ceil(timeLeft / 1000));
            }, 1000);
        }

        if (!isStart) {
            setSecondsLeft(seconds);
        }

        if (isStop) {
            clearInterval(interval)
        }

        return () => {
            // console.log("useCountdown cleanup: interval cleared!");
            clearInterval(interval);
        };
    }, [isStart, seconds, isStop]);

    useEffect(() => {
        if (secondsLeft <= 0) {
            // console.log("no seconds left, clearing interval..");
            clearInterval(interval);
        }
    }, [secondsLeft]);

    return  {secondsLeft, setSecondsLeft};
};

export default useCountdown;

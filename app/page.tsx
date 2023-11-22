"use client";

import { useState, useEffect } from "react";
import useCountdown from "@/hooks/useCountdown";
import useSessions from "@/hooks/useSessions";
import Button from "@/components/button";
import Display from "@/components/display";

const timers = {
    focus: 1500,
    test: 3,
};

export default function Home() {
    const [isStart, setIsStart] = useState(false);
    const [isStop, setIsStop] = useState(false);
    const [isEnd, setIsEnd] = useState(false);

    const [isOptions, setIsOptions] = useState(false);

    const [time, setTime] = useState(timers.focus);

    const {secondsLeft, setSecondsLeft} = useCountdown(time, {
        isStart,
        isStop,
    });
    const sessions = useSessions(isEnd);

    const checkNotification = () => {
        if (Notification.permission !== "denied") {
            Notification.requestPermission();
        }
    };

    useEffect(() => {
        if (secondsLeft === 0) {
            setIsEnd(true);
            setIsStart(false);
            new Notification("session done!", { body: "great job focusing..." });
        }
    }, [secondsLeft]);

    // when timer finished flip it back to not finished
    useEffect(() => setIsEnd(false), [isEnd]);

    const handleStart = () => {
        checkNotification();
        setIsStart(true);
    };

    const handleOptions = () => {
        setIsOptions((prevState) => !prevState);
    };

    const handleStop = () => {
        setIsStop(true);
    };

    const handleResume = () => {
        setIsStop(false);
        // console.log("resuming...");
    };

    const handleNew = () => {
        setIsStop(false)
        setIsStart(false)
        setSecondsLeft(timers.focus)
    };

    const optionsContent = (
        <div className="flex items-center justify-between w-full">
            <span className="text-neutral-500">today: {sessions.today}</span>
            <Button
                label="clear"
                className="text-orange-400"
                onClick={() => {
                    const date = new Date().toLocaleDateString(); // e.g. "23/10/2023"
                    sessions.setToday(0);
                    localStorage.setItem(
                        "sessions",
                        JSON.stringify({ [date]: "0" }),
                    );
                }}
            />
        </div>
    );

    return (
        <main className="grid h-screen content-center justify-center">
            <div className="grid grid-rows-[auto_36px] gap-y-4 p-4 relative">
                <header className="relative grid grid-cols-[auto_89px_auto] items-center gap-x-6">
                    <Button label="sessions" onClick={handleOptions} />
                    {!isStart ? (
                        <Button label="start" onClick={handleStart} />
                    ) : (
                        !isStop && <Button label="stop" onClick={handleStop} />
                    )}
                    {isStop && <Button label="resume" onClick={handleResume} />}
                    <Display secondsLeft={secondsLeft} className="px-[10px]" />
                    {isStop && (
                        <Button
                            label="new"
                            onClick={handleNew}
                            className="absolute right-[-84px]"
                        />
                    )}
                </header>
                {isOptions && (
                    <section className="ml-[8px]">
                        {isOptions ? optionsContent : null}
                    </section>
                )}
            </div>
        </main>
    );
}

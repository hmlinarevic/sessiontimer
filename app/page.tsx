"use client";

import { useState, useEffect } from "react";
import useCountdown from "@/hooks/useCountdown";
import useSessions from "@/hooks/useSessions";
import Button from "@/components/button";
import Display from "@/components/display";

const timers = {
    focus: 2700,
    test: 3,
};

export default function Home() {
    const [isStart, setIsStart] = useState(false);
    const [isEnd, setIsEnd] = useState(false);
    const [isOptions, setIsOptions] = useState(false);
    const secondsLeft = useCountdown(timers.focus, isStart);
    const sessions = useSessions(isEnd);

    useEffect(() => {
        if (secondsLeft === 0) {
            setIsEnd(true);
            setIsStart(false);
            new Notification("focus done!", { body: "great job bro.." });
        }
    }, [secondsLeft]);

    // when timer finished flip it back to not finished
    useEffect(() => setIsEnd(false), [isEnd]);

    const handleStart = () => {
        setIsStart(true);
    };

    const handleOptions = () => {
        setIsOptions((prevState) => !prevState);
    };

    const optionsContent = (
        <div className="flex items-center justify-between">
            <span className="text-neutral-500">today: {sessions.today}</span>
            <Button
                label="clear"
                className="mr-[-0.5rem] text-orange-400"
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
            <div className="grid grid-rows-[auto_minmax(48px,1fr)] gap-y-4">
                <header className="flex items-center gap-x-6">
                    <Button label="sessions" onClick={handleOptions} />
                    <Button label="start" onClick={handleStart} />
                    <Display secondsLeft={secondsLeft} />
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

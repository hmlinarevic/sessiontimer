"use client";

// react lib
import { useState, useEffect } from "react";

// hooks
import useCountdown from "@/hooks/useCountdown";
import useSessions from "@/hooks/useSessions";

// components
import ControlsTop from "./controls-top";
import ControlsMiddle from "./controls-middle";
import ControlsBottom from "./controls-bottom";

// utility
const toSeconds = (minutes: number) => minutes * 60;

// timer options
const timers = {
    focus: 25 * 60, // 25 minutes in seconds
    work: 45 * 60, // 45 minutes in seconds
};

export default function Timer() {
    const [timerDuration, setTimer] = useState(timers.focus);

    // timer controls
    const [isStart, setIsStart] = useState(false);
    const [isStop, setIsStop] = useState(false);
    const [isEnd, setIsEnd] = useState(false);

    // timer countdown
    const { secondsLeft, setSecondsLeft } = useCountdown(timerDuration, {
        isStart,
        isStop,
    });

    // timer ui
    const [toggleUi, setToggleUi] = useState({
        top: false,
        bottom: false,
        customTimerInput: false,
    });

    // local storage
    const sessions = useSessions(isEnd);

    // change timer duration
    const [userInput, setUserInput] = useState({ timerDuration: "" });

    const checkNotification = () => {
        if (Notification.permission !== "denied") {
            Notification.requestPermission();
        }
    };

    useEffect(() => {
        if (secondsLeft === 0) {
            setIsEnd(true);
            setIsStart(false);
            new Notification("session done!", {
                body: "great job focusing...",
            });
        }
    }, [secondsLeft]);

    // when timerDuration finished flip it back to not finished
    useEffect(() => setIsEnd(false), [isEnd]);

    // timer contols - handlers
    const handleStart = () => {
        checkNotification();
        setIsStart(true);

        setToggleUi((prevState) => ({
            ...prevState,
            bottom: false,
            top: false,
        }));
    };

    const handleStop = () => {
        setIsStop(true);
    };

    const handleOptions = () => {
        setToggleUi((prevState) => ({
            ...prevState,
            bottom: !prevState.bottom,
        }));
    };

    const handleResume = () => {
        setIsStop(false);
    };

    const handleNew = () => {
        setIsStop(false);
        setIsStart(false);
        setSecondsLeft(timers.focus);
    };

    const handleDisplay = () => {
        setToggleUi((prevState) => ({ ...prevState, top: !prevState.top }));
    };

    const handleCustomTimer = (e: any) => {
        const isReadInput = e.type === "blur" || e.key === "Enter";

        if (isReadInput) {
            setToggleUi((prevState) => ({
                ...prevState,
                customTimerInput: false,
            }));

            const validateInput = (numString: string) => {
                const num = Number(numString);
                if (num < 1) return 1;
                if (num > 90) return 90;
                return num;
            };

            // reset user timer duration preference
            setUserInput((prevState) => ({
                ...prevState,
                timerDuration: "",
            }));

            setTimer(toSeconds(validateInput(userInput.timerDuration)));

            setToggleUi((prevState) => ({ ...prevState, top: false }));
        }

        // on every number key press store to state
        if (!isNaN(Number(e.key))) {
            setUserInput((prevState) => ({
                ...prevState,
                timerDuration: `${prevState.timerDuration}${e.key}`.slice(0, 2),
            }));
        }
    };

    return (
        <div className="grid w-[400px] grid-rows-3 gap-y-4">
            <ControlsTop
                timers={timers}
                toggleUi={toggleUi}
                setTimer={setTimer}
                setToggleUi={setToggleUi}
                handleCustomTimer={handleCustomTimer}
            />

            <ControlsMiddle
                secondsLeft={secondsLeft}
                isStart={isStart}
                isStop={isStop}
                handleOptions={handleOptions}
                handleStart={handleStart}
                handleStop={handleStop}
                handleResume={handleResume}
                handleNew={handleNew}
                handleDisplay={handleDisplay}
            />

            <ControlsBottom
                sessions={sessions}
                toggleUi={toggleUi}
                setToggleUi={setToggleUi}
            />
        </div>
    );
}

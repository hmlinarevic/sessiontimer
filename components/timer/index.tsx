"use client";

// react lib
import { useState, useEffect } from "react";

// hooks
import useCountdown from "@/hooks/useCountdown";
import useSessions from "@/hooks/useSessions";

// components
import Button from "@/components/button";
import Display from "@/components/display";
import ControlsTop from "./controls-top";

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
        <>
            <main className="grid h-screen select-none content-center justify-center">
                <div className="grid w-[400px] grid-rows-3 gap-y-4">
                    {/* controls - top */}
                    <div className="flex items-center justify-between pl-1.5">
                        {toggleUi.top && (
                            <ControlsTop
                                timers={timers}
                                toggleUi={toggleUi}
                                setTimer={setTimer}
                                setToggleUi={setToggleUi}
                                handleCustomTimer={handleCustomTimer}
                            />
                        )}
                    </div>

                    {/* controls - middle */}
                    <div className="flex items-center justify-between text-emerald-400">
                        <Button onClick={handleOptions}>[sessions]</Button>
                        {!isStart ? (
                            <Button onClick={handleStart}>[start]</Button>
                        ) : (
                            !isStop && (
                                <Button onClick={handleStop}>[stop]</Button>
                            )
                        )}
                        {isStop && (
                            <Button onClick={handleResume}>[resume]</Button>
                        )}
                        {isStop && <Button onClick={handleNew}>[new]</Button>}
                        <Button onClick={handleDisplay} isStart={isStart}>
                            <Display
                                secondsLeft={secondsLeft}
                                isStart={isStart}
                            />
                        </Button>
                    </div>

                    {/* controls - bottom */}
                    {toggleUi.bottom && (
                        <div className="flex items-center justify-evenly pl-1.5">
                            <div className="flex w-full items-center justify-between">
                                <span className="text-neutral-500">
                                    today: {sessions.today}
                                </span>
                                <Button
                                    buttonType="control"
                                    className="text-orange-400"
                                    onClick={() => {
                                        const date =
                                            new Date().toLocaleDateString(); // e.g. "23/10/2023"
                                        sessions.setToday(0);
                                        localStorage.setItem(
                                            "sessions",
                                            JSON.stringify({ [date]: "0" }),
                                        );
                                        setToggleUi((prevState) => ({
                                            ...prevState,
                                            bottom: false,
                                        }));
                                    }}
                                >
                                    [clear]
                                </Button>
                            </div>
                        </div>
                    )}
                </div>
            </main>
        </>
    );
}

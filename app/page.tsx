"use client";

import { useState, useEffect } from "react";
import useCountdown from "@/hooks/useCountdown";
import useSessions from "@/hooks/useSessions";
import Button from "@/components/button";
import Display from "@/components/display";
import { clear } from "console";

const toSeconds = (minutes: number) => minutes * 60;

const timers = {
    // 25 minutes in seconds
    focus: 25 * 60,
};

export default function Home() {
    const [timer, setTimer] = useState(timers.focus);

    const [isStart, setIsStart] = useState(false);
    const [isStop, setIsStop] = useState(false);
    const [isEnd, setIsEnd] = useState(false);

    // controls
    const [toggleUi, setToggleUi] = useState({
        controls: {
            top: false,
            middle: true,
            bottom: false,
        },
    });
    const [showChangeTimerInput, setShowChangeTimerInput] = useState(false);

    const [isOptions, setIsOptions] = useState(false);

    const { secondsLeft, setSecondsLeft } = useCountdown(timer, {
        isStart,
        isStop,
    });

    const [userInput, setUserInput] = useState({ timer: "" });
    const [changeTimerInput, setChangeTimerInput] = useState(0);

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
            new Notification("session done!", {
                body: "great job focusing...",
            });
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
        setIsStop(false);
        setIsStart(false);
        setSecondsLeft(timers.focus);
    };

    const handleDisplay = () => {
        setToggleUi((prevState) => {
            return {
                ...prevState,
                controls: {
                    ...prevState.controls,
                    top: !prevState.controls.top,
                },
            };
        });
    };

    const handleCustomTimer = (e: any) => {
        // submit
        if (e.type === "blur" || e.key === "Enter") {
            setShowChangeTimerInput((prevState) => !prevState);

            const validateInput = (numString: string) => {
                const num = Number(numString);
                if (num < 1) return 1;
                if (num > 90) return 90;
                return num;
            };

            setUserInput((prevState) => ({
                ...prevState,
                timer: "",
            }));

            console.log(userInput.timer);

            setTimer(toSeconds(validateInput(userInput.timer)));
        }

        // number input
        if (!isNaN(Number(e.key))) {
            setUserInput((prevState) => ({
                ...prevState,
                timer: `${prevState.timer}${e.key}`.slice(0, 2),
            }));
        }
    };

    useEffect(() => {
        console.log(userInput.timer);
    }, [userInput.timer]);

    return (
        <>
            <main className="grid h-screen content-center justify-center dark:text-lime-400">
                <div className="grid w-[400px] grid-rows-3 gap-y-4">
                    {/* controls - top */}
                    <div className="flex items-center justify-between pl-1.5">
                        {toggleUi.controls.top && (
                            <>
                                <span className="text-neutral-500">timer:</span>
                                <Button
                                    className="text-orange-400"
                                    onClick={() => setTimer(1500)}
                                >
                                    [25]
                                </Button>
                                <Button
                                    className="text-orange-400"
                                    onClick={() => setTimer(2700)}
                                >
                                    [45]
                                </Button>
                                {showChangeTimerInput ? (
                                    <input
                                        type="text"
                                        maxLength={2}
                                        autoFocus
                                        className="w-[88.8px]  bg-transparent text-center outline-none "
                                        placeholder="minutes"
                                        onBlur={handleCustomTimer}
                                        onKeyDown={handleCustomTimer}
                                    />
                                ) : (
                                    <Button
                                        className="text-orange-400"
                                        onClick={() =>
                                            setShowChangeTimerInput(true)
                                        }
                                    >
                                        [custom]
                                    </Button>
                                )}
                            </>
                        )}
                    </div>

                    {/* controls - middle */}
                    <div className="flex items-center justify-between">
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
                        <Button onClick={handleDisplay}>
                            <Display secondsLeft={secondsLeft} />
                        </Button>
                    </div>

                    {/* controls - bottom */}
                    {isOptions && (
                        <div className="flex items-center justify-evenly pl-1.5">
                            <div className="flex w-full items-center justify-between">
                                <span className="text-neutral-500">
                                    today: {sessions.today}
                                </span>
                                <Button
                                    className="text-orange-400"
                                    onClick={() => {
                                        const date =
                                            new Date().toLocaleDateString(); // e.g. "23/10/2023"
                                        sessions.setToday(0);
                                        localStorage.setItem(
                                            "sessions",
                                            JSON.stringify({ [date]: "0" }),
                                        );
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

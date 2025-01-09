"use client";
import React, { useState, useEffect, useRef, use } from "react";
import {
  PlayCircle,
  PauseCircle,
  RotateCcwIcon,
  ChevronLeftSquareIcon,
} from "lucide-react";
import "./clock.css";

import { Howl } from "howler";

function ChessClock({ data }) {
  const [playerOneTime, setPlayerOneTime] = useState(data.time1 * 60 * 1000);
  const [playerTwoTime, setPlayerTwoTime] = useState(data.time2 * 60 * 1000);
  const [playerMoves, setPlayerMoves] = useState({ one: 0, two: 0 });
  const [activePlayer, setActivePlayer] = useState(null);
  const [isRunning, setIsRunning] = useState(false);
  const [lastSwitchTime, setLastSwitchTime] = useState(Date.now());
  const [incrementTime, setIncrementTime] = useState(data.addTime * 1000);
  const soundRef = useRef(new Howl({src:["tick.wav"]}))
  const bellRef = useRef(new Howl({src:["bell.wav"]}))


 const [isPortrait, setIsPortrait] = useState(
  typeof window !== "undefined" ? window.innerWidth < window.innerHeight : true
);

useEffect(() => {
  if (typeof window === "undefined") return;

  const handleResize = () => {
    setIsPortrait(window.innerWidth < window.innerHeight);
  };

  handleResize();
  window.addEventListener("resize", handleResize);
  return () => window.removeEventListener("resize", handleResize);
}, []);
  useEffect(()=>{
    if (activePlayer === "playerOne") {
      console.log(playerOneTime);
      soundRef.current.pause()
      soundRef.current.CurrentTime = 0;
      soundRef.current.play()
    } else if (activePlayer === "playerTwo") {
      console.log(playerTwoTime);
      soundRef.current.pause()
      soundRef.current.CurrentTime = 0;
      soundRef.current.play()
    }
  }, [Math.floor((playerOneTime % 60000) / 1000), Math.floor((playerTwoTime % 60000) / 1000)])

  useEffect(() => {
    let timer;
    if (isRunning && activePlayer) {
      timer = setInterval(() => {
        const now = Date.now();
        const elapsed = now - lastSwitchTime;

        if (activePlayer === "playerOne") {
          setPlayerOneTime((prev) => Math.max(prev - elapsed, 0));
        } else if (activePlayer === "playerTwo") {
          setPlayerTwoTime((prev) => Math.max(prev - elapsed, 0));
        }

        setLastSwitchTime(now);
      }, 10);
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isRunning, activePlayer, lastSwitchTime]);

  

  const toggleStartPause = () => {
    setIsRunning((prev) => !prev);
    if (!isRunning && !activePlayer) setActivePlayer("playerOne");
  };

  const switchTurn = () => {
    if (!isRunning) return;

    bellRef.current.pause()
    bellRef.current.CurrentTime = 0;
    bellRef.current.play()
    if (activePlayer === "playerOne") {
      if(playerMoves.one > data.moves){
        setPlayerOneTime((prev) => prev + incrementTime);
      }
      setPlayerMoves((prev) => ({ ...prev, one: prev.one + 1 }));
      setActivePlayer("playerTwo");
    } else {
      if(playerMoves.two > data.moves){
        setPlayerTwoTime((prev) => prev + incrementTime);
      }
      setPlayerMoves((prev) => ({ ...prev, two: prev.two + 1 }));
      setActivePlayer("playerOne");
    }

    setLastSwitchTime(Date.now());
  };

  const resetClocks = () => {
    setPlayerOneTime(data.time1 * 60 * 1000);
    setPlayerTwoTime(data.time2 * 60 * 1000);
    setActivePlayer(null);
    setIsRunning(false);
    setLastSwitchTime(Date.now());
    setPlayerMoves({ one: 0, two: 0 });
  };

  const formatTime = (time) => {
    const hour = String(Math.floor(time / 3600000)).padStart(2, "0");
    const mins = String(Math.floor((time % 3600000) / 60000)).padStart(2, "0");
    const secs = String(Math.floor((time % 60000) / 1000)).padStart(2, "0");
    const mils = String(Math.floor((time % 1000))).padStart(3, "0")

    return `${parseInt(hour) ? hour + ":" : ""}${mins}:${secs}${(time>30000 ? "" : "."+mils)}`;
  };

  return (
    <>
      {isPortrait && <div className="warning">Rotate your device</div>}
      <div style={{overflow:"hidden"}} className="clockCont">
        <div className="timer" onClick={switchTurn} style={(activePlayer === "playerTwo") ? {pointerEvents:"none", opacity:0.5, transform:"scale(0.9)"} : {pointerEvents:"all"}}>
          <span>{formatTime(playerOneTime)}</span>
          <span className="timerInfo">{playerMoves.one} moves</span>
        </div>
        <div className="division">
          <button className="clockBt" style={{transform: isRunning ? "scale(1)" : "scale(2)"}} onClick={toggleStartPause}>
            {isRunning ? <PauseCircle size={40} /> : <PlayCircle size={100} />}
          </button>
          <button className="clockBt" onClick={()=>window.location.href="/"}>
            <ChevronLeftSquareIcon size={40} />
          </button>
          <button className="clockBt" onClick={resetClocks}>
            <RotateCcwIcon size={40} />
          </button>
        </div>
        <div className="timer" onClick={switchTurn} style={(activePlayer === "playerOne") ? {pointerEvents:"none", opacity:0.5, transform:"scale(0.9)"} : {pointerEvents:"all"}}>
          <span>{formatTime(playerTwoTime)}</span>
          <span className="timerInfo">{playerMoves.two} moves</span>
        </div>
      </div>
    </>
  );
}

export default ChessClock;

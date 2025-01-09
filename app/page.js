"use client";
import React from "react";
import { useRouter } from 'next/navigation';
import Switch from "./components/switch/switch";

import { useData } from "./DataContext";

import { Crown } from "lucide-react";
import { motion } from "framer-motion";

function Page() {
  const { setData } = useData();
  const router = useRouter();
  
  const enterFullScreen = () => {
    if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen(); // For most browsers
      document.body.style.overflow = "scroll"; // Enable scrolling on body
    } else if (document.documentElement.webkitRequestFullscreen) {
      document.documentElement.webkitRequestFullscreen(); // Safari
      document.body.style.overflow = "scroll"; // Enable scrolling on body
    } else if (document.documentElement.msRequestFullscreen) {
      document.documentElement.msRequestFullscreen(); // IE/Edge
      document.body.style.overflow = "scroll"; // Enable scrolling on body
    }
  };
  
  

  const [options, setOptions] = React.useState({
    isDifferent: false,
    time1: 5,
    time2: 5,
    addTime: 5,
    moves: 0,
    type: "Fistcher",
  });

  const formatTime = (numb) => {
    const hours = Math.floor(numb/60);
    const mins = Math.floor(numb%60);
    return hours ? `${hours}h ${mins}m` : `${mins}m`
  };
  return (
    <div style={{display:"flex", flexDirection:"row", justifyContent:"center", alignItems:"center", width:"100vw"}}>
    <div className="optionCont" onClick={enterFullScreen}>
      <div className="optionSection" style={{ flexDirection: "row" }}>
        Time Different for 2 players.
        <Switch options={options} setOptions={setOptions} />
      </div>
      {/* Toggle */}

      {/* // Time - Selection */}
      <div className="optionSection" style={{ flexDirection: "column" }}>
        <label>Time(mins):</label>
        <motion.div layout className="optionInputCont">
          {options.isDifferent ? (
            <>
              <Crown
                size={100}
                color="#c7c7c7"
                className="bg-[#494949] p-4"
                style={{ borderRadius: "30px" }}
              />
              <Crown
                size={100}
                color="#0b0b0b"
                className="bg-[#494949] p-4"
                style={{ borderRadius: "30px" }}
              />
            </>
          ) : (
            <Crown
              size={100}
              color="#1e1e1e"
              className="bg-[#494949] p-4"
              style={{ borderRadius: "30px" }}
            />
          )}
        </motion.div>
        <div className="optionInputCont">
          <motion.div
            layout
            className="flex justify-center items-center flex-col gap-[20px]"
          >
            <input
              className="optionInput"
              value={formatTime(options.time1)}
              readOnly
            />
            <label className="slider">
              <input
                value={options.time1}
                min={2}
                max={180}
                onChange={(e) => {
                  if (!options.isDifferent) {
                    setOptions({
                      ...options,
                      time1: e.target.value,
                      time2: e.target.value,
                    });
                  } else {
                    setOptions({ ...options, time1: e.target.value });
                  }
                }}
                type="range"
                className="level"
              />
            </label>
          </motion.div>

          {options.isDifferent && (
            <motion.div
              initial={{ opacity: 0, translateX: "-100px" }}
              animate={{ opacity: 1, translateX: "0px" }}
              className="flex justify-center items-center flex-col gap-[20px]"
            >
              <input
                className="optionInput"
                value={formatTime(options.time2)}
                readOnly
              />
              <label className="slider">
                <input
                  value={options.time2}
                  min={2}
                  max={180}
                  onChange={(e) =>
                    setOptions({ ...options, time2: e.target.value })
                  }
                  type="range"
                  className="level"
                />
              </label>
            </motion.div>
          )}
        </div>
      </div>
      {/* Time Selection */}
      <div style={{ display: "flex" }}>
        <div
          className="optionSection"
          style={{
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <label style={{width:"100%", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center"}}>
          <input
              style={{ width: "80px", height: "60px", fontSize: "35px" }}
              value={options.addTime + "s"}
              readOnly
              className="optionInput"
            />
            Increment (time):{" "}
          </label>
          <label className="slider">
            <input
              min={0}
              max={30}
              value={options.addTime}
              onChange={(e) =>
                setOptions({ ...options, addTime: e.target.value })
              }
              type="range"
              className="level"
              style={{ width: "350px" }}
            />
          </label>
          {/* Additonal time: range, add features like estimated game duration */}
        </div>
      </div>

      <div
          className="optionSection"
          style={{
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <label>
            Increment after:{" "}
            <input
              style={{ width: "200px", height: "60px", fontSize: "35px" }}
              value={options.moves + " moves"}
              readOnly
              className="optionInput"
            />
          </label>
          <label className="slider">
            <input
              min={0}
              max={100}
              value={options.moves}
              onChange={(e) =>
                setOptions({ ...options, moves: e.target.value })
              }
              type="range"
              className="level"
              style={{ width: "350px" }}
            />
          </label>
          {/* Additonal time: range, add features like estimated game duration */}
        </div>
        <button className="continueBt" onClick={()=>{
          setData(options);
          router.push("/clock")
          }}>Continue</button>
    </div>
    <img className="welcome" style={{width:"100%"}} src="welcome.png" alt="" />
    </div>
  );
}

export default Page;

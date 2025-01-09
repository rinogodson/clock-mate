"use client"
import React from 'react';
import styled from 'styled-components';

const Switch = ({options, setOptions}) => {
  return (
    <StyledWrapper>
      <div>
        <input checked={options.isDifferent} onChange={(e)=>setOptions({...options, isDifferent: !options.isDifferent, time2: (options.isDifferent ? options.time1 : options.time2)})} type="checkbox"  id="checkboxInput" />
        <label htmlFor="checkboxInput" className="toggleSwitch">
        </label>
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  /* To hide the checkbox */
  #checkboxInput {
    display: none;
  }

  .toggleSwitch {
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    width: 90px;
    height: 50px;
    background-color: rgb(82, 82, 82);
    border-radius: 1000px;
    cursor: pointer;
    transition-duration: .2s;
  }

  .toggleSwitch::after {
    content: "";
    position: absolute;
    height: 40px;
    width: 40px;
    left: 5px;
    background-color: transparent;
    border-radius: 50%;
    transition-duration: .2s;
    box-shadow: 5px 2px 7px rgba(8, 8, 8, 0.26);
    border: 5px solid white;
  }

  #checkboxInput:checked+.toggleSwitch::after {
    transform: translateX(100%);
    transition-duration: .2s;
    background-color: white;
  }
  /* Switch background change */
  #checkboxInput:checked+.toggleSwitch {
    background-color: rgb(148, 118, 255);
    transition-duration: .2s;
  }`;

export default Switch;

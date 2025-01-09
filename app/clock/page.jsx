"use client"
import React from 'react'
import ChessClock from '../components/chessClock/chessClock';
import { useData } from '../DataContext';


function Page() {
  const {data} = useData();
  console.log(data);
  

  return <ChessClock data={data} />;
}

export default Page

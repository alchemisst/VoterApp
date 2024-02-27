


import React ,{useState,useEffect, useContext}from "react";
import Image from "next/image";
import Countdown from "react-countdown";


//Internal
import { VotingContext } from "@/context/Voter";
import Style from "../styles/index.module.css";
import card from "@/components/Card/card";
import image from "../assets/candidate-1.jpg";


const index = () => {
  const { getNewCandidate,candidateArray,giveVote, voterLength,candidateLength,checkIfWalletIsConnected,currentAccount} = useContext(VotingContext);

  useEffect(()=>{
    // checkIfWalletIsConnected
  })
  
  
  return (
    <div className={Style.home}>
    {currentAccount && (
      <div className={Style.winner}>
        <div className={Style.winner_info}>
          <div className={Style.candidate_list}>
            <p>
              Total Candidates: <span>{candidateLength}</span>
            </p>
          </div>
          <div className={Style.candidate_list}>
            <p>
              Total Voters: <span>{voterLength}</span>
            </p>
          </div>
        </div>

        <div className={Style.winner_message}>
          <small>
            <Countdown date={Date.now()+10000} />
          </small>
        </div>

      </div>
    )}

    <Card 
    candidateArray={candidateArray}
    giveVote={giveVote} />
    
    </div>
  );
};

export default index;

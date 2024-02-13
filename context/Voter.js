
import React,{ useState,useEffect }  from 'react';
import Web3Modal from 'web3modal';
import { ethers } from 'ethers';
import {create as ipfsHttpClient} from 'ipfs-http-client';
import axios from 'axios';
import { useRouter } from 'next/navigation';


//internal
import { VotingAddress,VotingAddressABI } from './constants';

const client  = ipfsHttpClient('https://infura.io:5001/api/v0');

const fetchContract = (signerOrProvider) => new ethers.fetchContract(VotingAddress,VotingAddressABI,signerOrProvider);  

export const VotingContext = React.createContext();

export const VotingProvider = ({children}) => {

    const votingTitle ="My first app";
    const router = useRouter();
    const [currentAccount,setCurrentAccount] =useState('');
    const [candidateLength,setCandidateLength] = useState('');
    const pushCandidate = [];
    const candidateIndex=[];
    const [candidateArray, setCandidateArray] =useState(pushCandidate);

    //---Candidate data end 

    const [error,setError] = useState('');
    const highestVote = [];

    ///Voter Section;
    const pushVoter = [];
    const [voterArray,setVoterArray] = useState(pushVoter);
    const [voterLength,setVoterLength]= useStat('');
    const [voterAddress,setVoterAddress] = useState([]);

    //---Connnecting the Wallet;
    const checkIfWalletIsConnected = async() => {
        if(!window.ethereum) return setError("Please Install a Wallet");
        
        const account = await window.ethereum.request({method:"eth_accounts"});

        if(account.length){
            setCurrentAccount = account[0];
        }else {
            setError("Please Install MetaMask & Connect, Reload");
        }
    };

    ///---Connect Wallet
    const connectWallet = async() => {
        if(!window.ethereum) return setError("Please Install a Wallet");

        const account = await window.ethereum.request(
            {method:"eth_reuestAccounts"}
            );
        
        setCurrentAccount(account[0]);

    }


    //Uploading the image to IPFS
    const uploadToIPFS = async(file){
        try{
            const added = await client.add({content:file});
            const url = `htpps://ipfs.infura.io/ipfs/${added.path}`;

            return url;

        }catch(error){
             setError("Error while uploading to IPFS")
        }
    }



    return(

    <VotingContext.Provider value={{votingTitle, checkIfWalletIsConnected,connectWallet,uploadToIPFS}}>
    {children}
    </VotingContext.Provider>
    )
}



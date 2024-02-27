
import React,{ useState,useEffect }  from 'react';
import Web3Modal from 'web3modal';
import { ethers } from 'ethers';
import axios from 'axios';
import { useRouter } from 'next/navigation';


//internal
import { VotingAddress,VotingAddressABI } from './constants';


const fetchContract = (signerOrProvider) => new ethers.Contract(VotingAddress,VotingAddressABI,signerOrProvider);  

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
    const [voterLength,setVoterLength]= useState('');
    const [voterAddress,setVoterAddress] = useState([]);

    //---Connnecting the Wallet;
    const checkIfWalletIsConnected = async() => {

        if(!window.ethereum) return setError("Please Install a Wallet");
        
        const account = await window.ethereum.request({method:"eth_accounts"});

        if(account.length){
            setCurrentAccount(account[0]);
        }else {
            setError("Please Install MetaMask & Connect, Reload");
        }
    };

    ///---Connect Wallet
    const connectWallet = async() => {
        if(!window.ethereum) return setError("Please Install a Wallet");

        const account = await window.ethereum.request(
            {method:"eth_requestAccounts"}
            );
        
        setCurrentAccount(account[0]);

    }
   
    //Uploading the voter image to IPFS
    const uploadToIPFS = async(file) => {
      
    
       if(file){
        try{
            const formData = new FormData();
            formData.append("file",file);

            const response = await axios({
                method:"post",
                url:"https://api.pinata.cloud/pinning/pinFileToIPFS",
                data:formData,
                headers:{
                    pinata_api_key: process.env.NEXT_PUBLIC_PINATA_KEY,
                    pinata_secret_api_key: process.env.NEXT_PUBLIC_PINATA_SECRET_KEY,
                    // "Content-Type":"multipart/form-data",
                },
            });
        
        const ImgHash = `https://gateway.pinata.cloud/ipfs/${response.data.IpfsHash}`;
        return ImgHash;

        }catch(error){
             console.log("Unable to upload: ",error);
        }
    }}

    ///Candidate Image to IPFS
    const uploadToIPFSCandidate = async(file) => {
    
        if(file){
         try{
             const formData = new FormData();
             formData.append("file",file);
 
             const response = await axios({
                 method:"post",
                 url:"https://api.pinata.cloud/pinning/pinFileToIPFS",
                 data:formData,
                 headers:{
                     pinata_api_key: process.env.NEXT_PUBLIC_PINATA_KEY,
                     pinata_secret_api_key: process.env.NEXT_PUBLIC_PINATA_SECRET_KEY,
                     // "Content-Type":"multipart/form-data",
                 },
             });
         
         const ImgHash = `https://gateway.pinata.cloud/ipfs/${response.data.IpfsHash}`;
         return ImgHash;
 
         }catch(error){
            console.log("Unable to upload: ",error);
         }
     }}


    ///Create Voter
    const createVoter = async(formInput,fileUrl,router) => {
        try{
            const {name,address,position}=formInput;
            if(!name || !address || !position)
                return setError("Voter Info is missing");

            //Connecting the Smart Contract
            const web3modal = new Web3Modal();
            const connection = await web3modal.connect();
            const provider = new ethers.providers.Web3Provider(connection);
            const signer = provider.getSigner();
            const contract = fetchContract(signer);
            

            const data = JSON.stringify({name,address,position,image : fileUrl})
            
            const response = await axios({
                method:"POST",
                url:"https://api.pinata.cloud/pinning/pinJSONToIPFS",
                data:data,
                headers:{
                    pinata_api_key: process.env.NEXT_PUBLIC_PINATA_KEY,
                    pinata_secret_api_key: process.env.NEXT_PUBLIC_PINATA_SECRET_KEY,
                    // "Content-Type":"application/json",
                }
                
            });

            const url = `https://gateway.pinata.cloud/ipfs/${response.data.IpfsHash}`;
            const voter = await contract.voterRight(address,name,fileUrl,url);
            
            
            voter.wait();
          
          
            router.push("/voterList");

        }catch(error){
            setError("Error in creating voter")
        }
    }

    //----GEt Voter DATA
    const getAllVoterData = async() => {
        try{
        
            //Connecting to the Smart Contract
         const web3modal = new Web3Modal();
         const connection = await web3modal.connect();
         const provider = new ethers.providers.Web3Provider(connection);
         const signer = provider.getSigner();
         const contract = fetchContract(signer);

         //Voter List
         const voterListData = await contract.getVoterList();

         setVoterAddress(voterListData);
        
         voterListData.map(async(eL) => {
            const singleVoterData = await contract.getVoterData(eL);
            pushVoter.push(singleVoterData)
         })
        
         ////Voter Length
         const voterList = await contract.getVoterLength();
         setVoterLength(voterList.toNumber())

        } catch(error){
            setError("Unable to Get voter data")
        }
       
    }


    // console.log(voterAddress);
    // useEffect(()=>{
    //     getAllVoterData();
    //  },[])


    ///---------Give Vote
    const giveVote = async(id) => {
        try{

        }catch(error){
            console.log(error)
        }
    }



     

    ///-----------------Candidate Function --------------------
    const setCandidate = async(candidateForm,fileUrl,router) => {
        const {name,address,age} = candidateForm;

        if (!name || !address || !age) 
        return console.log("Input Data is missing");

        const web3Modal = new Web3Modal();
        const connection = await web3Modal.connect();
        const provider = new ethers.providers.Web3Provider (connection);
        const signer = provider.getSigner();
        const contract = fetchContract (signer);

         
        const data = JSON.stringify({name,address,image: fileUrl,age,});
        const response = await axios({
            method: "POST",
            url: "https://api.pinata.cloud/pinning/pinJSONTOIPFS",  
            data: data,
            headers:{
                pinata_api_key: process.env.NEXT_PUBLIC_PINATA_KEY,
                pinata_secret_api_key: process.env.NEXT_PUBLIC_PINATA_SECRET_KEY,
                // "Content-Type":"application/json",
            },
    });
    const ipfs = `https://gateway.pinata.cloud/ipfs/${response.data.IpfsHash}`;

    const candidate = await contract.setCandidate(address,age,name,fileUrl,ipfs);
    candidate.wait();
    router.push("/");
};

    const getNewCandidate = async() => {
        try{
        const web3Modal = new Web3Modal();
        const connection = await web3Modal.connect();
        const provider = new ethers.providers.Web3Provider (connection);
        const signer = provider.getSigner();
        const contract = fetchContract (signer);

        ///===All Candidate
        const allCandidate = await contract.getCandidate();
        allCandidate.map(async(eL) => {
            const singleCandidateData = await contract.getCandidateData(eL);
            //////////////////pushvoter
            pushCandidate.push(singleCandidateData);
            candidateIndex.push(singleCandidateData[2].toNumber())
        });
         
         ////Candidate Length
         const allCandidateLength = await contract.getCandidateLength();
         setCandidateLength(allCandidateLength.toNumber())
    
    }  catch(error){
        setError("Error in getting candidate data")

    }

}
    

    return(
    <VotingContext.Provider value={{
        votingTitle, 
        checkIfWalletIsConnected,
        connectWallet,
        uploadToIPFS,
        uploadToIPFSCandidate,
        createVoter,
        getAllVoterData,
        setCandidate,
        getNewCandidate,
        error,
        voterArray,
        voterLength,
        voterAddress,
        currentAccount,
        candidateLength,
        candidateArray

        }}>
    {children}
    </VotingContext.Provider>
    )
};

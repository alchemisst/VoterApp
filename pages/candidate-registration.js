import React, {useState,useEffect,useCallback,useContext} from "react";
import { useRouter } from "next/router";
import { useDropzone } from "react-dropzone";

import Image from "next/image";


//INternal
import { VotingContext } from "@/context/Voter";
import Style from '../styles/allowedVoter.module.css';
import images from "../assets";
import Button from "@/components/Button/Button";
import Input from "@/components/Input/Input";



const candidateRegistration = () => {
  const [fileUrl,setFileUrl] = useState(null);
  const [candidateForm, setCandidateFormInput] = useState(
    {
      name:'',
      address:'',
      age:'',

    }
  );

  const router = useRouter();
  const {uploadToIPFSCandidate, setCandidate , candidateArray , getNewCandidate } = useContext(VotingContext);
  
  //Candidate image drop
  const onDrop = useCallback( async (accepedFile) => {
    console.log("File dropped:", accepedFile);
    const url = await uploadToIPFSCandidate(accepedFile[0]);
    console.log("File URL:", url);
    
    setFileUrl(url);
    })
  
  const {getRootProps,getInputProps } = useDropzone({
    onDrop,
    accept :"image/*",
    maxSize: 5000000
  });



//JSX

  return (<div className={Style.createVoter}>
  <div>
    {fileUrl && (
      <div className={Style.voterInfo}>
      <img src={fileUrl} alt="VoterImage" />
        <div className={Style.voterInfo_paragraph}>
          <p>
            Name: &nbsp; <span> {candidateForm.name}</span>
          </p>
          <p>
            Add: &nbsp; <span>{candidateForm.address}</span>
          </p>
          <p>
            Age: &nbsp; <span>{candidateForm.age}</span>
          </p>
        </div>
      </div>
    )

    }

    {!fileUrl && (
      <div className={Style.sideInfo}>
      <div className={Style.sideInfo_box}>
      <h4>Create Candidate for Voting</h4>
      <p>
        Say no to discrepencies, Embrace Blockchain Tech
      </p>
      <p className={Style.sideInfo_para}>
        Contract Candidate
      </p>
      </div>

     <div className={Style.card}>
        {candidateArray.map((el,i)=>(
          <div key={i+1} className={Style.card_box}>
            <div className={Style.image}>
              <img src={el[3]} alt="Profile Photo" />
            </div>
            <div className={Style.card_info}>
              <p>{el[1]} #{el[2].toNumber()}</p>
              <p>{el[0]}</p>
              <p>Address: {el[6].slice(0,10)}..</p>
            </div>
          </div>
        ))}


      </div>
      </div>
    )}

    
  </div>
      <div className={Style.voter}>
      <div className={Style.voter_container}>
      <h1>Create New Candidate</h1>  
      <div className={Style.voter_container_box}>
        <div className={Style.voter_container_box_div}>
          <div {...getRootProps()}>
            <input {...getInputProps()}/>
            <div className={Style.voter_container_box_div_info}>
                <p>Upload FIle: JPG,GIF,WEBM,PNG Max-10MB</p>
              <div className={Style.voter_container_box_image}>
                <Image src={images.upload} alt="File Upload" width={150} height={150} objectFit="contain" />
              </div>
              <p>
                Drag and Drop FIle
              </p>
            <p>
              or Browse Media from your device.
            </p>
            </div>
          </div>
        </div>
      </div>    
       </div>
      <div className={Style.input_container}>
      <Input inputType="text" title="Name" placeholder="Name"
      handleClick={(e)=> setCandidateFormInput({...candidateForm,name: e.target.value})} />
       <Input inputType="text" title="Voter Address" placeholder="Voter Address"
      handleClick={(e)=> setCandidateFormInput({...candidateForm,address: e.target.value})} />
       <Input inputType="text" title="Position" placeholder="Position"
      handleClick={(e) => setCandidateFormInput({...candidateForm, age: e.target.value})} />

      <div className={Style.Button}>
        <Button btnName="Authorize Candidate" handleClick={()=> setCandidate(candidateForm,fileUrl,router)}/>
      </div>
      </div>


      </div>


      <div className={Style.createdVoter}>
        <div className={Style.createdVoter_info}>
          <Image src={images.creator} alt="User Profile"  objectFit="contain"/>
          <p>
            Notice For User
          </p>
          <p>Organizer <span>0x999999.......</span></p>
          <p>
            Only Organizer of the voting contract can create voter
          </p>
        </div>
      </div>
      
  </div>);
};

export default candidateRegistration;

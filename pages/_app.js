require('dotenv').config();

import "../styles/globals.css";

//INTERNAL IMPORT
import { VotingProvider } from "@/context/Voter";
import NavBar from "@/components/NavBar/NavBar";

import { Reem_Kufi } from "@next/font/google"

const reem = Reem_Kufi({
    subsets:['latin'],
    weight:['400','500','600','700']
     
});


const MyApp = ({ Component, pageProps }) => (
    <main className={reem.className}>
    <VotingProvider>
    <div> 
    <NavBar />
    <div>
    <Component {...pageProps} />;
    </div>
       
    </div>
    </VotingProvider>
    </main>
    )
export default MyApp;

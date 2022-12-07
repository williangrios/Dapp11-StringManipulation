import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from 'react';
import WRHeader from 'wrcomponents/dist/WRHeader';
import WRFooter from 'wrcomponents/dist/WRFooter';
import WRInfo from 'wrcomponents/dist/WRInfo';
import WRContent from 'wrcomponents/dist/WRContent';
import WRTools from 'wrcomponents/dist/WRTools';
import { ethers } from "ethers";
import './App.css';
import {ToastContainer, toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { _toEscapedUtf8String } from "ethers/lib/utils";

function App() {

  const [textLenght, setTextLenght] = useState('');
  const [text1, setText1] = useState('');
  const [text2, setText2] = useState('');
  
  const addressContract = '0x2D73005824f33DA1EE3EcdF9226b9B0C4941F2B8';

  const abi = [
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "str",
          "type": "string"
        }
      ],
      "name": "getLength",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "pure",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "str1",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "str2",
          "type": "string"
        }
      ],
      "name": "concatenate",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "pure",
      "type": "function",
      "constant": true
    }
  ];
  
  let contractDeployed = null;
  let contractDeployedSigner = null;
  
  function getProvider(){
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    if (contractDeployed == null){
      contractDeployed = new ethers.Contract(addressContract, abi, provider)
    }
  }

  function toastMessage(text) {
    toast.info(text)  ;
  }

  async function handleLength() {
    getProvider();
    let length = await contractDeployed.getLength(textLenght);
    toastMessage(`The lenght is ${length}`);
  }

  async function handleConcat() {
    getProvider();
    toastMessage(`The new text is ${await contractDeployed.concatenate(text1, text2)}`);
  }
 

  return (
    <div className="App">
      <ToastContainer position="top-center" autoClose={5000}/>
      <WRHeader title="String Manipulation in Blockchain" image={true} />
      <WRInfo chain="Goerli testnet" />
      <WRContent>

      <h2>String lenght</h2>
      <input type="text" placeholder="Type your text here" onChange={(e) => setTextLenght(e.target.value)} value={textLenght} />
      <button onClick={handleLength}>Get length</button>
      <hr/>

      <h2>String concatenate</h2>
      <input type="text" placeholder="Type text 1 here" onChange={(e) => setText1(e.target.value)} value={text1} />
      <input type="text" placeholder="Type text 2 here" onChange={(e) => setText2(e.target.value)} value={text2} />
      <button onClick={handleConcat}>Concatenate</button>
        
      </WRContent>
      <WRTools react={true} truffle={true} bootstrap={true} solidity={true} css={true} javascript={true} ganache={true} ethersjs={true} />
      <WRFooter />  
    </div>
  );
}

export default App;

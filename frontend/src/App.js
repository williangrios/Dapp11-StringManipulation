import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import './App.css';

import {  useState, useEffect } from 'react';
import { ethers } from "ethers";
import {ToastContainer, toast} from "react-toastify";

import WRHeader from 'wrcomponents/dist/WRHeader';
import WRFooter, { async } from 'wrcomponents/dist/WRFooter';
import WRInfo from 'wrcomponents/dist/WRInfo';
import WRContent from 'wrcomponents/dist/WRContent';
import WRTools from 'wrcomponents/dist/WRTools';

function App() {

  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({});
  const [provider, setProvider] = useState();
  const [contract, setContract] = useState();
  const [signer, setSigner] = useState();

  const [textLenght, setTextLenght] = useState('');
  const [text1, setText1] = useState('');
  const [text2, setText2] = useState('');
  
  const contractAddress = '0x80793f9501599eA39a6df5cEDeEF4aB7010Cb99A';

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
  
  async function getProvider(){
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      if (contractDeployed == null){
        contractDeployed = new ethers.Contract(contractAddress, abi, provider)
      }
    } catch (error) {
      toastMessage(error.reason)
    }
  }

  function toastMessage(text) {
    toast.info(text)  ;
  }

  async function handleLength() {
    try {
      getProvider();
      let length = await contractDeployed.getLength(textLenght);
      toastMessage(`The lenght is ${length}`);  
    } catch (error) {
      toastMessage(error.reason)
    }
  }

  async function handleConcat() {
    try {
      getProvider();
      toastMessage(`The new text is ${await contractDeployed.concatenate(text1, text2)}`);  
    } catch (error) {
      toastMessage(error.reason)
    }
  }

  return (
    <div className="App">
      <ToastContainer position="top-center" autoClose={5000}/>
      <WRHeader title="String Manipulation in Blockchain (legacy)" image={true} />
      <WRInfo chain="Goerli testnet" />
      <WRContent>
        <h2>String lenght</h2>
        <input type="text" className="mb-1 commands" placeholder="Type your text here" onChange={(e) => setTextLenght(e.target.value)} value={textLenght} />
        <button className="btn btn-primary  commands" onClick={handleLength}>Get length</button>
        <hr/>
        <h2>String concatenate</h2>
        <input type="text" className="mb-1  commands" placeholder="Type text 1 here" onChange={(e) => setText1(e.target.value)} value={text1} />
        <input type="text" className="mb-1  commands" placeholder="Type text 2 here" onChange={(e) => setText2(e.target.value)} value={text2} />
        <button className="btn btn-primary  commands" onClick={handleConcat}>Concatenate</button>
      </WRContent>
      <WRTools react={true} truffle={true} bootstrap={true} solidity={true} css={true} javascript={true} ganache={true} ethersjs={true} />
      <WRFooter />  
    </div>
  );
}

export default App;

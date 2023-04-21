import { createContext, useState, useEffect } from 'react';
import { TailSpin } from 'react-loader-spinner';
import { ethers } from 'ethers';
import styled from 'styled-components';
import { blue } from '@mui/material/colors';
let pinataUrlString = "";
const axios = require("axios");
const FormState = createContext();

export default function Form() {

  const [form, setForm] = useState({
    story: ""
  });

  const [loading, setLoading] = useState(false);
  const [inputString, setinputString] = useState("");
  const [uploaded, setUploaded] = useState(false);
  const [storyUrl, setStoryUrl] = useState();
  const [image, setImage] = useState(null);
  const [uploadLoading, setUploadLoading] = useState(false);

  useEffect(()=>{
    if(storyUrl){
      createPost()
    }
  },[storyUrl])

  const FormHandler = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }


  const createPost= async(e)=>{

    // setUploadLoading(true);

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const ABI=[
        {
          "inputs": [
            {
              "internalType": "string",
              "name": "_name",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "_symbol",
              "type": "string"
            }
          ],
          "stateMutability": "nonpayable",
          "type": "constructor"
        },
        {
          "inputs": [],
          "name": "ApprovalCallerNotOwnerNorApproved",
          "type": "error"
        },
        {
          "inputs": [],
          "name": "ApprovalQueryForNonexistentToken",
          "type": "error"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "to",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "tokenId",
              "type": "uint256"
            }
          ],
          "name": "approve",
          "outputs": [],
          "stateMutability": "payable",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "BalanceQueryForZeroAddress",
          "type": "error"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "quantity",
              "type": "uint256"
            }
          ],
          "name": "mintbatch",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "MintERC2309QuantityExceedsLimit",
          "type": "error"
        },
        {
          "inputs": [],
          "name": "MintToZeroAddress",
          "type": "error"
        },
        {
          "inputs": [],
          "name": "MintZeroQuantity",
          "type": "error"
        },
        {
          "inputs": [],
          "name": "OwnerQueryForNonexistentToken",
          "type": "error"
        },
        {
          "inputs": [],
          "name": "OwnershipNotInitializedForExtraData",
          "type": "error"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "from",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "to",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "tokenId",
              "type": "uint256"
            }
          ],
          "name": "safeTransferFrom",
          "outputs": [],
          "stateMutability": "payable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "from",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "to",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "tokenId",
              "type": "uint256"
            },
            {
              "internalType": "bytes",
              "name": "_data",
              "type": "bytes"
            }
          ],
          "name": "safeTransferFrom",
          "outputs": [],
          "stateMutability": "payable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "operator",
              "type": "address"
            },
            {
              "internalType": "bool",
              "name": "approved",
              "type": "bool"
            }
          ],
          "name": "setApprovalForAll",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "TransferCallerNotOwnerNorApproved",
          "type": "error"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "from",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "to",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "tokenId",
              "type": "uint256"
            }
          ],
          "name": "transferFrom",
          "outputs": [],
          "stateMutability": "payable",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "TransferFromIncorrectOwner",
          "type": "error"
        },
        {
          "inputs": [],
          "name": "TransferToNonERC721ReceiverImplementer",
          "type": "error"
        },
        {
          "inputs": [],
          "name": "TransferToZeroAddress",
          "type": "error"
        },
        {
          "inputs": [],
          "name": "URIQueryForNonexistentToken",
          "type": "error"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "internalType": "address",
              "name": "owner",
              "type": "address"
            },
            {
              "indexed": true,
              "internalType": "address",
              "name": "approved",
              "type": "address"
            },
            {
              "indexed": true,
              "internalType": "uint256",
              "name": "tokenId",
              "type": "uint256"
            }
          ],
          "name": "Approval",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "internalType": "address",
              "name": "owner",
              "type": "address"
            },
            {
              "indexed": true,
              "internalType": "address",
              "name": "operator",
              "type": "address"
            },
            {
              "indexed": false,
              "internalType": "bool",
              "name": "approved",
              "type": "bool"
            }
          ],
          "name": "ApprovalForAll",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "internalType": "uint256",
              "name": "fromTokenId",
              "type": "uint256"
            },
            {
              "indexed": false,
              "internalType": "uint256",
              "name": "toTokenId",
              "type": "uint256"
            },
            {
              "indexed": true,
              "internalType": "address",
              "name": "from",
              "type": "address"
            },
            {
              "indexed": true,
              "internalType": "address",
              "name": "to",
              "type": "address"
            }
          ],
          "name": "ConsecutiveTransfer",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "internalType": "address",
              "name": "from",
              "type": "address"
            },
            {
              "indexed": true,
              "internalType": "address",
              "name": "to",
              "type": "address"
            },
            {
              "indexed": true,
              "internalType": "uint256",
              "name": "tokenId",
              "type": "uint256"
            }
          ],
          "name": "Transfer",
          "type": "event"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "owner",
              "type": "address"
            }
          ],
          "name": "balanceOf",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "tokenId",
              "type": "uint256"
            }
          ],
          "name": "getApproved",
          "outputs": [
            {
              "internalType": "address",
              "name": "",
              "type": "address"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "getMintedNFT",
          "outputs": [
            {
              "internalType": "uint256[]",
              "name": "",
              "type": "uint256[]"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "owner",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "operator",
              "type": "address"
            }
          ],
          "name": "isApprovedForAll",
          "outputs": [
            {
              "internalType": "bool",
              "name": "",
              "type": "bool"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "name",
          "outputs": [
            {
              "internalType": "string",
              "name": "",
              "type": "string"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "tokenId",
              "type": "uint256"
            }
          ],
          "name": "ownerOf",
          "outputs": [
            {
              "internalType": "address",
              "name": "",
              "type": "address"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "bytes4",
              "name": "interfaceId",
              "type": "bytes4"
            }
          ],
          "name": "supportsInterface",
          "outputs": [
            {
              "internalType": "bool",
              "name": "",
              "type": "bool"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "symbol",
          "outputs": [
            {
              "internalType": "string",
              "name": "",
              "type": "string"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "tokenId",
              "type": "uint256"
            }
          ],
          "name": "tokenURI",
          "outputs": [
            {
              "internalType": "string",
              "name": "",
              "type": "string"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "totalSupply",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        }
      ]
        
      const contract = new ethers.Contract(
          process.env.NEXT_PUBLIC_ADDRESS,
          ABI,
          signer
      );

      console.log("minting total "+inputString)

      const mintOnew = await contract.mintbatch(inputString);
          
      const desoPostResult = await mintOnew.wait(); 

      alert("MINT SUCCESSFUL!")
    
      console.log(desoPostResult)

      console.log(contract);


      return false;
  }

  return (

    <FormState.Provider value={{ form, setForm, setLoading, FormHandler, setStoryUrl, setUploaded }} >
      {uploadLoading ? 
      <Spinner>
        <TailSpin height={60} />
      </Spinner> : null}
      <form action="#" className="relative">
        <div
          style={{ 'margin': "20px 32px" }}
        >
          <div
            style={{ "margin": "0 15px" }}
            className="flex items-center justify-between space-x-3 border-t border-gray-200 px-2 py-2 sm:px-3">
            
            <div className="flex-shrink-0">
              Enter number between 1 and 5 to mint NFTs
              <br></br>
              <br></br>
              <input style={{ 'backgroundColor': "#CCCCDD","border":"2px solid #CCCCCC" }} pattern="[1-5]" type='text' value={inputString} onChange={e=>setinputString(e.target.value)}/>
              <br></br>
              <br></br>
              <button
                type="submit"
                onClick={createPost}
                style={{ "fontSize": "12px", "height": "30px" }}
                className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Mint
              </button>
            </div>
          </div>

        </div>


      </form>
    </FormState.Provider>
  )
}

const Spinner = styled.div`
    position:fixed;
    width:100%;
    left:0;right:0;top:0;bottom:0;
    background-color: rgba(255,255,255,0.7);
    display:flex ;
    justify-content:center ;
    align-items:center ;
    z-index:9999;
`
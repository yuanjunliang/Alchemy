import React, { useState } from "react";
import { ethers } from "ethers";
import "./App.css";
import styled from "styled-components";
import COFFEE_ABI from "./abi/coffee.abi.json";

const Button = styled.button`
  width: 200px;
  height: 45px;
  background-color: #409eff;
  border-style: none;
  color: #fff;
  font-size: 18px;
  border-radius: 5px;
  cursor: pointer;
`;
const Input = styled.input`
  width: 300px;
  height: 30px;
  border-radius: 5px;
  border: #ccc solid 1px;
  margin: 10px;
  padding-left: 15px;
`;

declare global {
  interface Window {
    ethereum: any;
  }
}

function App() {
  const [account, setAccount] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [provider, setProvider] = useState<any>(null);
  const handleConnect = async () => {
    if (typeof window.ethereum === "undefined") {
      alert("Please install metamask");
      return;
    }
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    if (accounts.length > 0) {
      setAccount(accounts[0]);
    }

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    setProvider(provider);
  };

  const buyCoffee = async () => {
    if (!account) {
      alert("Please connect wallet");
      return;
    }
    const contractAddress = "";
    const contract = new ethers.Contract(contractAddress, COFFEE_ABI, provider);

    await contract.buyCoffee(name, message);
  };

  return (
    <div className="App">
      <h1>Buy Me A Coffee</h1>
      <Button onClick={handleConnect}>connect wallet</Button>
      <p>
        <strong>account</strong>: {account}
      </p>
      <div>
        <Input
          placeholder="name"
          onChange={(event) => setName(event.target.value)}
        />{" "}
        <br />
        <Input
          placeholder="message"
          onChange={(e) => setMessage(e.target.value)}
        />{" "}
        <br />
        <Button onClick={buyCoffee}>buyCoffee</Button>
      </div>
    </div>
  );
}

export default App;

import Head from 'next/head'
import { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Web3Modal from 'web3modal'
import { ethers } from 'ethers'
import { BankAddress } from '../config'
import Bank from '../artifacts/contracts/Bank.sol/Bank.json'

export default function Home() {
  const [view, setView] = useState('deposit')
  const [amount, setAmount] = useState()

  useEffect(async () => {
    const web3Modal = new Web3Modal()
    const connection = await web3Modal.connect()
    const provider = new ethers.providers.Web3Provider(connection)



  }, [])

  async function deposit() {
    const web3Modal = new Web3Modal()
    const connection = await web3Modal.connect()
    const provider = new ethers.providers.Web3Provider(connection)
    const signer = provider.getSigner()
    const contract = new ethers.Contract(BankAddress, Bank.abi, signer)
    const ethIn = ethers.utils.parseEther(amount)
    const tx = await contract.deposit({value: ethIn})
    console.log("tx: ", tx)
    const receipt = await tx.wait()
    console.log("rcp: ", receipt)
    const data = receipt.logs[0].data
    console.log(data)

    ethers.utils.defaultAbiCoder.decode(
      ['uint256', 'uint256'], data
    )

    const [amt, timeStart] = ethers.utils.defaultAbiCoder.decode(
      ['uint256', 'uint256'], data
    )

    console.log(amt.toString())
    console.log(timeStart.toString())

    alert(`Successful deposit of ${amt.toString()} ETH at time ${timeStart}`)




    
  }


  return (
    <div>
      <Navbar />
      <div className="flex justify-center mt-10">
        <div className="flex flex-col">
          <p className="text-xl">Welcome to ChowderBank!</p>
          <div>
            <div className="flex mt-5">
              {
                view === 'deposit' ?
                <div>
                  <button className="bg-blue-300 py-2 px-4 rounded" onClick={deposit}>Deposit</button>
                  <button className="py-2 px-4">Withdraw</button>
                </div>
                :
                <div>
                  <button className="py-2 px-4">Deposit</button>
                  <button className="bg-blue-300 py-2 px-4 rounded">Withdraw</button>
                </div>
              }
            </div>
            <input
            type="number"
            onChange={e => setAmount(e.target.value)}
            />
          </div>
        </div>
      </div>
    </div>

  )
}

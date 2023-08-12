import React, { useEffect, useState } from "react";
import { ethers, utils } from "ethers";
import { Table } from "@mui/material";
import { useSelector } from "react-redux";
import { tokens, exchanges } from "../utils/helpers";

function Exchanges(props) {
  const data = useSelector((state) => state.blockchain.value);
  const [amounts, setAmounts] = useState([]);
  const {rate} = props
  const currentNet = data.network !== "" ? data.network : "Ethereum Mainnet";

  
  
  return (
    <>
    <div style={{display:'flex',alignSelf:'flex-start'}}>
      <Table style={{width:200}}>
        <thead>
          <tr>
            <th>Exchange</th>
            <th>INR Price</th>
          </tr>
        </thead>
        <tbody>
          <td>1 USDT</td>
          <td>{rate?rate:'81.992'}</td>{" "}
        </tbody>
      </Table>
      </div>
    </>
  );
}

export default Exchanges;
/**
 * {amounts.map((a, index) => {
                        return (
                            <tr key={index}>
                                <td>
                                    {a.exchange}
                                </td>
                                <td>
                                    {a.price !== 0 ? parseFloat(a.price).toFixed(8) : "/"}
                                </td>
                            </tr>
                        )
                    })}
 */

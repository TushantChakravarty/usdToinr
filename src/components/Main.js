import React from 'react'
import { useSelector } from "react-redux"
import NavBar from "./NavBar"
import { NoteNav, Note } from "./NavbarElements"

function Main() {
    const data = useSelector((state) => state.blockchain.value)
    const isConnected = data.account !== ""

    return (
            <NavBar />
    )
}

export default Main
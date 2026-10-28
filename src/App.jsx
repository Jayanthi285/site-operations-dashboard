import { useState } from "react";

import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Sites from "./pages/Sites";
import "./index.css"

function App()
{
    const[page,setPage]=useState("dashboard");

    return(
        <div className="app">
            <Navbar page={page} setPage={setPage} />
            <main className="main-content">
                {page === "dashboard" ? (
                    <Dashboard />
                ) : (
                    <Sites />
                )
                }
            </main>
        </div>
    );
}

export default App;
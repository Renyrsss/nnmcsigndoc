import { useState } from "react";
import Main from "./components/main";
import DocumentPage from "./components/DocumentPage";
import SignPage from "./components/SignPage";
import SignaturePad from "./components/SignaturePad/SignaturePad";
import { Routes, Route, Link } from "react-router-dom";
import "./App.css";

function App() {
    const [count, setCount] = useState(0);
    const [signature, setSignature] = useState(null);

    const handleEnd = (signature) => {
        setSignature(signature);
    };
    return (
        <>
            <Routes>
                <Route path="/" element={<Main />} />
                <Route path="/Document" element={<DocumentPage />} />
                <Route path="SignPage" element={<SignPage />} />
                <Route path="*" element={<Main />} />
            </Routes>
        </>
    );
}

export default App;

import "./App.css";
import { Model } from "./Components/Model";
import { Canvas } from "@react-three/fiber";
// import { Box } from "./components/Box";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { Suspense, useState } from "react";
import { create } from "ipfs-http-client";
import { FileUpload } from "react-ipfs-uploader";
window.Buffer = window.Buffer || require("buffer").Buffer;
const client = create("https://ipfs.infura.io:5001/api/v0");
function App() {
  const [fileUrl, setFileUrl] = useState("");
  return (
    <div className="App">
      <FileUpload setUrl={setFileUrl} /> {/*ipfs file uploader*/}
      FileUrl :{" "}
      <a href={fileUrl} target="_blank" rel="noopener noreferrer">
        {fileUrl}
      </a>
    </div>
  );
}

export default App;

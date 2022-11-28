import "./App.css";
import { Model } from "./Components/Model";
import { Canvas } from "@react-three/fiber";
// import { Box } from "./components/Box";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { Suspense, useState } from "react";
import { create } from "ipfs-http-client";
window.Buffer = window.Buffer || require("buffer").Buffer;
// need to provide client auth before creation like auth headers
const client = create("https://ipfs.infura.io:5001/api/v0");
function App2() {
  const [file, setFile] = useState(null);
  const [urlArr, setUrlArr] = useState([]);
  const retrieveFile = (e) => {
    const data = e.target.files[0];
    const reader = new window.FileReader();
    reader.readAsArrayBuffer(data);
    reader.onloadend = () => {
      setFile(Buffer(reader.result));
      // console.log("Buffer data: ", Buffer(reader.result));
    };

    e.preventDefault();
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const created = await client.add(file);
      console.log("created", created);

      // const url = `https://ipfs.infura.io/ipfs/${created.path}`;
      // setUrlArr((prev) => [...prev, url]);
    } catch (error) {
      console.log(error.message);
    }
  };
  const { scene } = useGLTF("../huracan_eagletm.glb");
  // custom usage of ipfs
  return (
    <div className="App">
      <form className="form" onSubmit={handleSubmit}>
        <input type="file" accept=".glb" name="data" onChange={retrieveFile} />
        <button type="submit" className="btn">
          Submit
        </button>
      </form>
      {/* <Canvas style={{ background: "#171717", height: 700 }} className="canvas">   3d modal canvas
        <OrbitControls enableZoom={false} />
        <ambientLight intensity={0.5} />
        <directionalLight intensity={1} position={[-15, 15, 12]} />
        <Suspense fallback={null}>
          <Model />
        </Suspense>
      </Canvas> */}
      <div className="display">
        {urlArr.length !== 0 ? (
          urlArr.map(
            (el) => <primitive object={el} scale={1.3} />
            //<img src={el} alt="nfts" />
          )
        ) : (
          <h3>Upload data</h3>
        )}
      </div>
    </div>
  );
}

export default App2;

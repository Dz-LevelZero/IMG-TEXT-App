import { useEffect, useState } from 'react';
import { createWorker } from 'tesseract.js';
import './App.css';

function App() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [textResult, setTextResult] = useState("");

  const worker = createWorker();

  const convertImageToText = async () => {
    await worker.load();
    await worker.loadLanguage('eng');
    await worker.initialize('eng');
    const { data: { text } } = await worker.recognize(selectedImage);
    setTextResult(text);
  }

  useEffect(() => {
    if (selectedImage) {
      convertImageToText();
    }
  }, [selectedImage]);

  const handleChangeImg = (e) => {
    setSelectedImage(e.target.files[0]);
  }

  return (
    <div className="App">
      <h1>IMG - TEXT</h1>
      <p>Get text from image !</p>
      <div className="input-wrapper">
        <label htmlFor="upload">Upload Image</label>
        <input type="file" id="upload" accept='image/*' onChange={handleChangeImg}/>
      </div>
      <div className="result">
        {selectedImage && (
          <div className='box-image'>
            <img src={URL.createObjectURL(selectedImage)} alt="selectedImage" />
          </div>
        )}
        {textResult && (
          <div className="box-p">
            <p>{textResult}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;

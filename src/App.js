import { useState, useEffect } from "react";
import { MathJax } from "better-react-mathjax";

import "./App.css";
import useFetch from "./hooks/use-Fetch";
import Loading from "./components/Loading";
import Navbar from "./components/Navbar";

const arr = [
  "AreaUnderTheCurve_901",
  "BinomialTheorem_901",
  "DifferentialCalculus2_901",
];

function App() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [ques, setQues] = useState(arr[0]);
  const { data, loading, error } = useFetch(ques);

  useEffect(() => {
    setQues(arr[currentIndex]);
  }, [currentIndex]);

  if (error) {
    return alert("Something went wrong");
  }

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < arr.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  return (
    <>
      <Navbar />
      {loading ? (
        <div className="loading">
          <Loading />
        </div>
      ) : (
        <div className="container">
          <div className="box">
            <span className={currentIndex === 0 ? "selected" : ""}>Q1</span>
            <span className={currentIndex === 1 ? "selected" : ""}>Q2</span>
            <span className={currentIndex === 2 ? "selected" : ""}>Q3</span>
          </div>
          <div className="card">
            <div className="ques">
              {data?.length > 0 && (
                <MathJax>
                  <span>{data[0].Question}</span>
                </MathJax>
              )}
            </div>
            <div className="buttons">
              <button
                className={currentIndex === 0 ? "disabled" : "prev"}
                disabled={currentIndex === 0}
                onClick={handlePrevious}
              >
                Previous
              </button>
              <button
                className={currentIndex === 2 ? "disabled" : "next"}
                disabled={currentIndex === 2}
                onClick={handleNext}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default App;

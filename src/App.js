import React, { useState, useEffect } from "react";
import AayushmanImage from "./Images/Aayushman.png";

function App() {
  useEffect(() => {
    document.title = "Ayushman Bharat Survey";
  }, []);
  // Personal info state
  const [name, setName] = useState("");
  const [aadhar, setAadhar] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");

  // Main survey states
  const [hasCard, setHasCard] = useState(null);
  const [siteStatus, setSiteStatus] = useState(null);

  // For the "Why not" section main questions (3 healthcare-related questions)
  const [whyNotAnswers, setWhyNotAnswers] = useState([null, null, null]);
  // For the subsidiary questions under "Why not"
  const [whyNotSubs, setWhyNotSubs] = useState([
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ]);

  // For the "Awareness" section main questions (3 healthcare-related questions)
  const [awarenessAnswers, setAwarenessAnswers] = useState([null, null, null]);
  // For the subsidiary questions under "Awareness"
  const [awarenessSubs, setAwarenessSubs] = useState([
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ]);

  // Button styling objects
  const defaultButtonStyle = {
    padding: "10px 20px",
    margin: "5px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    background: "#f0f0f0",
    cursor: "pointer",
    fontSize: "1rem",
  };

  const selectedButtonStyle = {
    ...defaultButtonStyle,
    background: "#007BFF",
    color: "#fff",
    border: "1px solid #007BFF",
  };

  // Handlers for main questions
  const handleWhyNotAnswer = (index, answer) => {
    const updated = [...whyNotAnswers];
    updated[index] = answer;
    setWhyNotAnswers(updated);
  };

  const handleAwarenessAnswer = (index, answer) => {
    const updated = [...awarenessAnswers];
    updated[index] = answer;
    setAwarenessAnswers(updated);
  };

  // Handlers for subsidiary questions under Why not
  const handleWhyNotSubAnswer = (questionIndex, subIndex, answer) => {
    const updatedSubs = [...whyNotSubs];
    updatedSubs[questionIndex][subIndex] = answer;
    setWhyNotSubs(updatedSubs);
  };

  // Handlers for subsidiary questions under Awareness
  const handleAwarenessSubAnswer = (questionIndex, subIndex, answer) => {
    const updatedSubs = [...awarenessSubs];
    updatedSubs[questionIndex][subIndex] = answer;
    setAwarenessSubs(updatedSubs);
  };

  // Reset all form fields
  const resetForm = () => {
    setName("");
    setAadhar("");
    setAddress("");
    setPhone("");
    setHasCard(null);
    setSiteStatus(null);
    setWhyNotAnswers([null, null, null]);
    setWhyNotSubs([
      [null, null, null],
      [null, null, null],
      [null, null, null],
    ]);
    setAwarenessAnswers([null, null, null]);
    setAwarenessSubs([
      [null, null, null],
      [null, null, null],
      [null, null, null],
    ]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      name,
      aadhar,
      address,
      phone,
      hasCard,
      siteStatus,
      whyNotAnswers,
      whyNotSubs,
      awarenessAnswers,
      awarenessSubs,
    };

    try {
      await fetch(
        "https://script.google.com/macros/s/AKfycby2qz8e2PZnfDqrSckrMDSMdZXeF2Og92w_z32Ix8c6GwQJHLv8oA9czTPkWhdB3M2a/exec",
        {
          method: "POST",
          mode: "no-cors", // For development: bypasses CORS (response will be opaque)
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }
      );
      alert("Thank you for completing the survey!");
      resetForm();
    } catch (error) {
      console.error("Error:", error);
      alert("Submission failed. Please try again.");
    }
  };

  return (
    <div
      style={{
        backgroundImage: `url(${AayushmanImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
        flexDirection: "column",
      }}
    >
      <h1
        style={{
          fontSize: "2rem",
          textAlign: "center",
          color: "#000",
          marginBottom: "20px",
        }}
      >
        Ayushman Bharat <br />
        <sub style={{ fontSize: "1rem" }}>Healthcare Survey</sub>
      </h1>

      {/* Personal Info Section */}
      <div
        style={{
          background: "#fff",
          padding: "20px",
          borderRadius: "4px",
          marginBottom: "20px",
          maxWidth: "600px",
          width: "100%",
        }}
      >
        <div style={{ marginBottom: "10px" }}>
          <label>Name: </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{ width: "90%", padding: "8px" }}
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>Aadhar Number: </label>
          <input
            type="text"
            value={aadhar}
            onChange={(e) => setAadhar(e.target.value)}
            style={{ width: "90%", padding: "8px" }}
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>Address: </label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            style={{ width: "90%", padding: "8px" }}
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>Phone No: </label>
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            style={{ width: "90%", padding: "8px" }}
          />
        </div>
      </div>

      {/* Survey Form */}
      <form
        onSubmit={handleSubmit}
        style={{
          background: "rgba(255,255,255,0.9)",
          padding: "20px",
          borderRadius: "4px",
          maxWidth: "600px",
          width: "100%",
          fontFamily: "Arial, sans-serif",
        }}
      >
        {/* Q1: Ayushman Card */}
        <div style={{ marginBottom: "20px" }}>
          <p>Do you have an Ayushman Bharat Card?</p>
          <button
            type="button"
            onClick={() => setHasCard(true)}
            style={hasCard === true ? selectedButtonStyle : defaultButtonStyle}
          >
            Yes
          </button>
          <button
            type="button"
            onClick={() => setHasCard(false)}
            style={hasCard === false ? selectedButtonStyle : defaultButtonStyle}
          >
            No
          </button>
        </div>

        {/* If "No" for card, only show thank-you */}
        {hasCard === false && (
          <div style={{ marginBottom: "20px" }}>
            <p>Thank you for visiting!</p>
          </div>
        )}

        {hasCard === true && (
          <>
            {/* Q2: Onsite benefits */}
            <div style={{ marginBottom: "20px" }}>
              <p>Did you avail the onsite healthcare benefits?</p>
              <button
                type="button"
                onClick={() => setSiteStatus("Onsite")}
                style={
                  siteStatus === "Onsite"
                    ? selectedButtonStyle
                    : defaultButtonStyle
                }
              >
                Onsite
              </button>
              <button
                type="button"
                onClick={() => setSiteStatus("Didn't")}
                style={
                  siteStatus === "Didn't"
                    ? selectedButtonStyle
                    : defaultButtonStyle
                }
              >
                Didn't
              </button>
            </div>

            {siteStatus === "Didn't" && <p>Didn't avail onsite benefits.</p>}

            {siteStatus === "Onsite" && (
              <>
                {/* Why not Section (Healthcare Questions) */}
                <h2>Why not (Healthcare Issues)</h2>
                {[0, 1, 2].map((i) => (
                  <div key={`whyNot-${i}`} style={{ marginBottom: "10px" }}>
                    <p>
                      Question {i + 1}: Do you feel that healthcare services are
                      easily accessible in your region?
                    </p>
                    <button
                      type="button"
                      onClick={() => handleWhyNotAnswer(i, "Yes")}
                      style={
                        whyNotAnswers[i] === "Yes"
                          ? selectedButtonStyle
                          : defaultButtonStyle
                      }
                    >
                      Yes
                    </button>
                    <button
                      type="button"
                      onClick={() => handleWhyNotAnswer(i, "No")}
                      style={
                        whyNotAnswers[i] === "No"
                          ? selectedButtonStyle
                          : defaultButtonStyle
                      }
                    >
                      No
                    </button>
                    {/* Show subsidiary questions only if "Yes" is chosen */}
                    {whyNotAnswers[i] === "Yes" && (
                      <div style={{ marginLeft: "20px", marginTop: "10px" }}>
                        <p>Sub Question 1: Do you have access to basic care?</p>
                        <button
                          type="button"
                          onClick={() => handleWhyNotSubAnswer(i, 0, "Yes")}
                          style={
                            whyNotSubs[i][0] === "Yes"
                              ? selectedButtonStyle
                              : defaultButtonStyle
                          }
                        >
                          Yes
                        </button>
                        <button
                          type="button"
                          onClick={() => handleWhyNotSubAnswer(i, 0, "No")}
                          style={
                            whyNotSubs[i][0] === "No"
                              ? selectedButtonStyle
                              : defaultButtonStyle
                          }
                        >
                          No
                        </button>
                        <p>
                          Sub Question 2: Are medical facilities well-equipped?
                        </p>
                        <button
                          type="button"
                          onClick={() => handleWhyNotSubAnswer(i, 1, "Yes")}
                          style={
                            whyNotSubs[i][1] === "Yes"
                              ? selectedButtonStyle
                              : defaultButtonStyle
                          }
                        >
                          Yes
                        </button>
                        <button
                          type="button"
                          onClick={() => handleWhyNotSubAnswer(i, 1, "No")}
                          style={
                            whyNotSubs[i][1] === "No"
                              ? selectedButtonStyle
                              : defaultButtonStyle
                          }
                        >
                          No
                        </button>
                        <p>
                          Sub Question 3: Do you feel safe at the healthcare
                          centers?
                        </p>
                        <button
                          type="button"
                          onClick={() => handleWhyNotSubAnswer(i, 2, "Yes")}
                          style={
                            whyNotSubs[i][2] === "Yes"
                              ? selectedButtonStyle
                              : defaultButtonStyle
                          }
                        >
                          Yes
                        </button>
                        <button
                          type="button"
                          onClick={() => handleWhyNotSubAnswer(i, 2, "No")}
                          style={
                            whyNotSubs[i][2] === "No"
                              ? selectedButtonStyle
                              : defaultButtonStyle
                          }
                        >
                          No
                        </button>
                      </div>
                    )}
                  </div>
                ))}

                {/* Awareness Section (Healthcare Questions) */}
                <h2>Awareness (Healthcare Issues)</h2>
                {[0, 1, 2].map((i) => (
                  <div key={`awareness-${i}`} style={{ marginBottom: "10px" }}>
                    <p>
                      Question {i + 1}: Are you aware of any free healthcare
                      schemes available in your area?
                    </p>
                    <button
                      type="button"
                      onClick={() => handleAwarenessAnswer(i, "Yes")}
                      style={
                        awarenessAnswers[i] === "Yes"
                          ? selectedButtonStyle
                          : defaultButtonStyle
                      }
                    >
                      Yes
                    </button>
                    <button
                      type="button"
                      onClick={() => handleAwarenessAnswer(i, "No")}
                      style={
                        awarenessAnswers[i] === "No"
                          ? selectedButtonStyle
                          : defaultButtonStyle
                      }
                    >
                      No
                    </button>
                    {awarenessAnswers[i] === "Yes" && (
                      <div style={{ marginLeft: "20px", marginTop: "10px" }}>
                        <p>
                          Sub Question 1: Do you know how to register for these
                          schemes?
                        </p>
                        <button
                          type="button"
                          onClick={() => handleAwarenessSubAnswer(i, 0, "Yes")}
                          style={
                            awarenessSubs[i][0] === "Yes"
                              ? selectedButtonStyle
                              : defaultButtonStyle
                          }
                        >
                          Yes
                        </button>
                        <button
                          type="button"
                          onClick={() => handleAwarenessSubAnswer(i, 0, "No")}
                          style={
                            awarenessSubs[i][0] === "No"
                              ? selectedButtonStyle
                              : defaultButtonStyle
                          }
                        >
                          No
                        </button>
                        <p>
                          Sub Question 2: Are you aware of any ongoing
                          healthcare campaigns?
                        </p>
                        <button
                          type="button"
                          onClick={() => handleAwarenessSubAnswer(i, 1, "Yes")}
                          style={
                            awarenessSubs[i][1] === "Yes"
                              ? selectedButtonStyle
                              : defaultButtonStyle
                          }
                        >
                          Yes
                        </button>
                        <button
                          type="button"
                          onClick={() => handleAwarenessSubAnswer(i, 1, "No")}
                          style={
                            awarenessSubs[i][1] === "No"
                              ? selectedButtonStyle
                              : defaultButtonStyle
                          }
                        >
                          No
                        </button>
                        <p>
                          Sub Question 3: Do you know where to get more
                          information?
                        </p>
                        <button
                          type="button"
                          onClick={() => handleAwarenessSubAnswer(i, 2, "Yes")}
                          style={
                            awarenessSubs[i][2] === "Yes"
                              ? selectedButtonStyle
                              : defaultButtonStyle
                          }
                        >
                          Yes
                        </button>
                        <button
                          type="button"
                          onClick={() => handleAwarenessSubAnswer(i, 2, "No")}
                          style={
                            awarenessSubs[i][2] === "No"
                              ? selectedButtonStyle
                              : defaultButtonStyle
                          }
                        >
                          No
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </>
            )}

            <button
              type="submit"
              style={{ ...selectedButtonStyle, marginTop: "20px" }}
            >
              Submit
            </button>
          </>
        )}
      </form>
    </div>
  );
}

export default App;

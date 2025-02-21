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

  // Error states for validations
  const [nameError, setNameError] = useState("");
  const [aadharError, setAadharError] = useState("");
  const [addressError, setAddressError] = useState("");
  const [phoneError, setPhoneError] = useState("");

  // Loading state for submission
  const [isLoading, setIsLoading] = useState(false);

  // Main survey states
  const [hasCard, setHasCard] = useState(null);
  const [siteStatus, setSiteStatus] = useState(null);

  // For the "Why not" section main questions
  const [whyNotAnswers, setWhyNotAnswers] = useState([null, null, null]);
  // For the subsidiary questions under "Why not"
  const [whyNotSubs, setWhyNotSubs] = useState([
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ]);

  // For the "Awareness" section main questions
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

  // Real-time validation handlers for personal info
  const handleNameChange = (e) => {
    const value = e.target.value;
    setName(value);
    if (value.trim().length >= 4) {
      setNameError("");
    } else {
      setNameError("Name must be at least 4 characters long.");
    }
  };

  const handleAadharChange = (e) => {
    const value = e.target.value;
    setAadhar(value);
    if (/^\d{12}$/.test(value.trim())) {
      setAadharError("");
    } else {
      setAadharError("Aadhar must be exactly 12 digits.");
    }
  };

  const handleAddressChange = (e) => {
    const value = e.target.value;
    setAddress(value);
    if (value.trim() !== "") {
      setAddressError("");
    } else {
      setAddressError("Address is required.");
    }
  };

  const handlePhoneChange = (e) => {
    const value = e.target.value;
    setPhone(value);
    if (/^\d{10}$/.test(value.trim())) {
      setPhoneError("");
    } else {
      setPhoneError("Phone number must be exactly 10 digits.");
    }
  };

  // Handlers for survey questions
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

  const handleWhyNotSubAnswer = (questionIndex, subIndex, answer) => {
    const updatedSubs = [...whyNotSubs];
    updatedSubs[questionIndex][subIndex] = answer;
    setWhyNotSubs(updatedSubs);
  };

  const handleAwarenessSubAnswer = (questionIndex, subIndex, answer) => {
    const updatedSubs = [...awarenessSubs];
    updatedSubs[questionIndex][subIndex] = answer;
    setAwarenessSubs(updatedSubs);
  };

  // Reset all form fields and error messages
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
    setNameError("");
    setAadharError("");
    setAddressError("");
    setPhoneError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let valid = true;

    // Validate name
    if (name.trim().length < 4) {
      setNameError("Name must be at least 4 characters long.");
      valid = false;
    }
    // Validate aadhar
    if (!/^\d{12}$/.test(aadhar.trim())) {
      setAadharError("Aadhar must be exactly 12 digits.");
      valid = false;
    }
    // Validate address
    if (address.trim() === "") {
      setAddressError("Address is required.");
      valid = false;
    }
    // Validate phone
    if (!/^\d{10}$/.test(phone.trim())) {
      setPhoneError("Phone number must be exactly 10 digits.");
      valid = false;
    }

    if (!valid) return;

    // Set loading state
    setIsLoading(true);

    // Auto prefix phone with +91
    const phoneWithPrefix = "+91" + phone.trim();

    const data = {
      name,
      aadhar,
      address,
      phone: phoneWithPrefix,
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
    } finally {
      setIsLoading(false);
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
        <div style={{ marginBottom: "5px" }}>
          <label>Name: </label>
          <input
            type="text"
            value={name}
            onChange={handleNameChange}
            style={{ width: "90%", padding: "8px" }}
          />
          {nameError && (
            <div style={{ color: "red", fontSize: "0.8rem" }}>{nameError}</div>
          )}
        </div>
        <div style={{ marginBottom: "5px" }}>
          <label>Aadhar Number: </label>
          <input
            type="text"
            value={aadhar}
            onChange={handleAadharChange}
            style={{ width: "90%", padding: "8px" }}
          />
          {aadharError && (
            <div style={{ color: "red", fontSize: "0.8rem" }}>
              {aadharError}
            </div>
          )}
        </div>
        <div style={{ marginBottom: "5px" }}>
          <label>Address: </label>
          <input
            type="text"
            value={address}
            onChange={handleAddressChange}
            style={{ width: "90%", padding: "8px" }}
          />
          {addressError && (
            <div style={{ color: "red", fontSize: "0.8rem" }}>
              {addressError}
            </div>
          )}
        </div>
        <div style={{ marginBottom: "5px" }}>
          <label>Phone No: </label>
          <input
            type="text"
            value={phone}
            onChange={handlePhoneChange}
            style={{ width: "90%", padding: "8px" }}
          />
          {phoneError && (
            <div style={{ color: "red", fontSize: "0.8rem" }}>{phoneError}</div>
          )}
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
        {/* Q1: Ayushman Bharat Card */}
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
                {/* Why not Section */}
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
                    {whyNotAnswers[i] === "Yes" && (
                      <div style={{ marginLeft: "20px", marginTop: "10px" }}>
                        <p>Sub Question 1: Access to basic care?</p>
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
                        <p>Sub Question 2: Facilities well-equipped?</p>
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
                        <p>Sub Question 3: Feel safe at centers?</p>
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

                {/* Awareness Section */}
                <h2>Awareness (Healthcare Issues)</h2>
                {[0, 1, 2].map((i) => (
                  <div key={`awareness-${i}`} style={{ marginBottom: "10px" }}>
                    <p>
                      Question {i + 1}: Are you aware of any free healthcare
                      schemes?
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
                        <p>Sub Question 1: Know registration process?</p>
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
                        <p>Sub Question 2: Aware of ongoing campaigns?</p>
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
                        <p>Sub Question 3: Know where to get info?</p>
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
              disabled={isLoading}
            >
              {isLoading ? "Submitting..." : "Submit"}
            </button>
          </>
        )}
      </form>
    </div>
  );
}

export default App;

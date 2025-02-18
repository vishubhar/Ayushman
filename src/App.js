import React, { useState } from "react";
import AayushmanImage from "./Images/Aayushman.png";

function App() {
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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Healthcare Survey Responses:", {
      hasCard,
      siteStatus,
      whyNotAnswers,
      whyNotSubs,
      awarenessAnswers,
      awarenessSubs,
    });
    alert("Thank you for completing the survey!");
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
      }}
    >
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
        <h1 style={{ fontSize: "1.5rem", textAlign: "center" }}>
          Ayushman Bharat Healthcare Survey
        </h1>

        {/* Q1: Ayushman Card */}
        <div style={{ marginBottom: "20px" }}>
          <p>Do you have an Ayushman Bharat Card?</p>
          <button type="button" onClick={() => setHasCard(true)}>
            Yes
          </button>{" "}
          <button type="button" onClick={() => setHasCard(false)}>
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
              <button type="button" onClick={() => setSiteStatus("Onsite")}>
                Onsite
              </button>{" "}
              <button type="button" onClick={() => setSiteStatus("Didn't")}>
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
                    >
                      Yes
                    </button>{" "}
                    <button
                      type="button"
                      onClick={() => handleWhyNotAnswer(i, "No")}
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
                        >
                          Yes
                        </button>{" "}
                        <button
                          type="button"
                          onClick={() => handleWhyNotSubAnswer(i, 0, "No")}
                        >
                          No
                        </button>
                        <p>
                          Sub Question 2: Are medical facilities well-equipped?
                        </p>
                        <button
                          type="button"
                          onClick={() => handleWhyNotSubAnswer(i, 1, "Yes")}
                        >
                          Yes
                        </button>{" "}
                        <button
                          type="button"
                          onClick={() => handleWhyNotSubAnswer(i, 1, "No")}
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
                        >
                          Yes
                        </button>{" "}
                        <button
                          type="button"
                          onClick={() => handleWhyNotSubAnswer(i, 2, "No")}
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
                    >
                      Yes
                    </button>{" "}
                    <button
                      type="button"
                      onClick={() => handleAwarenessAnswer(i, "No")}
                    >
                      No
                    </button>
                    {/* Show subsidiary questions only if "Yes" is chosen */}
                    {awarenessAnswers[i] === "Yes" && (
                      <div style={{ marginLeft: "20px", marginTop: "10px" }}>
                        <p>
                          Sub Question 1: Do you know how to register for these
                          schemes?
                        </p>
                        <button
                          type="button"
                          onClick={() => handleAwarenessSubAnswer(i, 0, "Yes")}
                        >
                          Yes
                        </button>{" "}
                        <button
                          type="button"
                          onClick={() => handleAwarenessSubAnswer(i, 0, "No")}
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
                        >
                          Yes
                        </button>{" "}
                        <button
                          type="button"
                          onClick={() => handleAwarenessSubAnswer(i, 1, "No")}
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
                        >
                          Yes
                        </button>{" "}
                        <button
                          type="button"
                          onClick={() => handleAwarenessSubAnswer(i, 2, "No")}
                        >
                          No
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </>
            )}

            <button type="submit">Submit</button>
          </>
        )}
      </form>
    </div>
  );
}

export default App;

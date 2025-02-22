import React, { useState, useEffect } from "react";
import AayushmanImage from "./Images/Aayushman.png";

function App() {
  // Language state: 'en' for English and 'hi' for Hindi
  const [language, setLanguage] = useState("en");

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "en" ? "hi" : "en"));
  };

  // Translation dictionary for static texts
  const t = {
    title:
      language === "en" ? "Ayushman Bharat Survey" : "आयुष्मान भारत सर्वेक्षण",
    header: language === "en" ? "Ayushman Bharat" : "आयुष्मान भारत",
    subheader:
      language === "en" ? "Healthcare Survey" : "स्वास्थ्य देखभाल सर्वेक्षण",
    name: language === "en" ? "Name" : "नाम",
    aadhar: language === "en" ? "Aadhar Number" : "आधार संख्या",
    address: language === "en" ? "Address" : "पता",
    phone: language === "en" ? "Phone No" : "फ़ोन नंबर",
    nameError:
      language === "en"
        ? "Name must be at least 4 characters long."
        : "नाम कम से कम 4 अक्षरों का होना चाहिए।",
    aadharError:
      language === "en"
        ? "Aadhar must be exactly 12 digits."
        : "आधार संख्या ठीक 12 अंकों की होनी चाहिए।",
    addressError: language === "en" ? "Address is required." : "पता आवश्यक है।",
    phoneError:
      language === "en"
        ? "Phone number must be exactly 10 digits."
        : "फ़ोन नंबर ठीक 10 अंकों का होना चाहिए।",
    q1:
      language === "en"
        ? "Do you have an Ayushman Bharat Card?"
        : "क्या आपके पास आयुष्मान भारत कार्ड है?",
    yes: language === "en" ? "Yes" : "हाँ",
    no: language === "en" ? "No" : "नहीं",
    thankYouVisit:
      language === "en"
        ? "Thank you for visiting!"
        : "आपके भ्रमण के लिए धन्यवाद!",
    q2:
      language === "en"
        ? "Did you avail the onsite healthcare benefits?"
        : "क्या आपने ऑनसाइट स्वास्थ्य देखभाल लाभ का उपयोग किया?",
    onsite: language === "en" ? "Onsite" : "ऑनसाइट",
    didnt: language === "en" ? "Didn't" : "नहीं किया",
    didntAvail:
      language === "en"
        ? "Didn't avail onsite benefits."
        : "ऑनसाइट लाभ का उपयोग नहीं किया।",
    // Main questions for Why not section
    whyNotHeader:
      language === "en"
        ? "Why not (Healthcare Issues)"
        : "क्यों नहीं (स्वास्थ्य संबंधी मुद्दे)",
    questionHealthcare1:
      language === "en"
        ? "Do you feel that healthcare facilities in your area are adequately staffed?"
        : "क्या आपको लगता है कि आपके क्षेत्र में स्वास्थ्य सुविधाओं में पर्याप्त स्टाफ है?",
    questionHealthcare2:
      language === "en"
        ? "Are you satisfied with the waiting times at healthcare centers?"
        : "क्या आप स्वास्थ्य केंद्रों में प्रतीक्षा समय से संतुष्ट हैं?",
    questionHealthcare3:
      language === "en"
        ? "Do you believe local hospitals are well-equipped to handle emergencies?"
        : "क्या आपको लगता है कि स्थानीय अस्पताल आपातकालीन स्थितियों को संभालने के लिए अच्छी तरह से सुसज्जित हैं?",
    // Main questions for Awareness section
    awarenessHeader:
      language === "en"
        ? "Awareness (Healthcare Issues)"
        : "जागरूकता (स्वास्थ्य संबंधी मुद्दे)",
    questionFreeHealthcare1:
      language === "en"
        ? "Are you aware of any government health insurance schemes?"
        : "क्या आप किसी सरकारी स्वास्थ्य बीमा योजना से अवगत हैं?",
    questionFreeHealthcare2:
      language === "en"
        ? "Do you know about the preventive healthcare programs in your area?"
        : "क्या आप अपने क्षेत्र में प्रिवेंटिव हेल्थकेयर कार्यक्रमों के बारे में जानते हैं?",
    questionFreeHealthcare3:
      language === "en"
        ? "Have you attended any health awareness camps recently?"
        : "क्या आपने हाल ही में किसी स्वास्थ्य जागरूकता शिविर में भाग लिया है?",
    submit: language === "en" ? "Submit" : "जमा करें",
    submitLoading: language === "en" ? "Submitting..." : "जमा हो रहा है...",
    thankYouComplete:
      language === "en"
        ? "Thank you for completing the survey!"
        : "सर्वेक्षण पूरा करने के लिए धन्यवाद!",
    submitFailed:
      language === "en"
        ? "Submission failed. Please try again."
        : "प्रस्तुति विफल हुई। कृपया पुनः प्रयास करें।",
  };

  // Create arrays for distinct main questions
  const whyNotQuestions = [
    t.questionHealthcare1,
    t.questionHealthcare2,
    t.questionHealthcare3,
  ];

  const awarenessQuestions = [
    t.questionFreeHealthcare1,
    t.questionFreeHealthcare2,
    t.questionFreeHealthcare3,
  ];

  // Create 2D arrays for distinct sub questions for each main question
  const whyNotSubQuestions = [
    [
      language === "en"
        ? "Is there a shortage of medical staff?"
        : "क्या चिकित्सा स्टाफ की कमी है?",
      language === "en"
        ? "Is the facility lacking necessary equipment?"
        : "क्या सुविधा में आवश्यक उपकरणों की कमी है?",
      language === "en"
        ? "Is the facility overcrowded?"
        : "क्या सुविधा भीड़भाड़ वाली है?",
    ],
    [
      language === "en"
        ? "Is the wait time too long?"
        : "क्या प्रतीक्षा समय बहुत लंबा है?",
      language === "en"
        ? "Are the appointments inconvenient?"
        : "क्या अपॉइंटमेंट असुविधाजनक हैं?",
      language === "en"
        ? "Do you face delays in service?"
        : "क्या सेवा में देरी होती है?",
    ],
    [
      language === "en"
        ? "Are emergency services prompt?"
        : "क्या आपातकालीन सेवाएं त्वरित हैं?",
      language === "en"
        ? "Is the hospital technologically up-to-date?"
        : "क्या अस्पताल तकनीकी रूप से अपडेटेड है?",
      language === "en"
        ? "Do you trust the facility's competence?"
        : "क्या आप सुविधा की क्षमता पर भरोसा करते हैं?",
    ],
  ];

  const awarenessSubQuestions = [
    [
      language === "en"
        ? "Do you know how to enroll in the scheme?"
        : "क्या आपको योजना में नामांकन करने का तरीका पता है?",
      language === "en"
        ? "Are you aware of the coverage details?"
        : "क्या आप कवरेज विवरण से अवगत हैं?",
      language === "en"
        ? "Have you seen any promotional material?"
        : "क्या आपने कोई प्रचार सामग्री देखी है?",
    ],
    [
      language === "en"
        ? "Do you know the benefits of preventive healthcare?"
        : "क्या आपको निवारक स्वास्थ्य देखभाल के लाभ पता हैं?",
      language === "en"
        ? "Are local camps regularly organized?"
        : "क्या स्थानीय शिविर नियमित रूप से आयोजित किए जाते हैं?",
      language === "en"
        ? "Do you feel informed about health checks?"
        : "क्या आपको स्वास्थ्य जांच के बारे में जानकारी है?",
    ],
    [
      language === "en"
        ? "Is there a designated center for information?"
        : "क्या जानकारी के लिए कोई केंद्र निर्धारित है?",
      language === "en"
        ? "Do you know the helpline number?"
        : "क्या आपको हेल्पलाइन नंबर पता है?",
      language === "en"
        ? "Have you received community health updates?"
        : "क्या आपको सामुदायिक स्वास्थ्य अपडेट प्राप्त हुए हैं?",
    ],
  ];

  useEffect(() => {
    document.title = t.title;
  }, [t.title]);

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
      setNameError(t.nameError);
    }
  };

  const handleAadharChange = (e) => {
    const value = e.target.value;
    setAadhar(value);
    if (/^\d{12}$/.test(value.trim())) {
      setAadharError("");
    } else {
      setAadharError(t.aadharError);
    }
  };

  const handleAddressChange = (e) => {
    const value = e.target.value;
    setAddress(value);
    if (value.trim() !== "") {
      setAddressError("");
    } else {
      setAddressError(t.addressError);
    }
  };

  const handlePhoneChange = (e) => {
    const value = e.target.value;
    setPhone(value);
    if (/^\d{10}$/.test(value.trim())) {
      setPhoneError("");
    } else {
      setPhoneError(t.phoneError);
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
      setNameError(t.nameError);
      valid = false;
    }
    // Validate aadhar
    if (!/^\d{12}$/.test(aadhar.trim())) {
      setAadharError(t.aadharError);
      valid = false;
    }
    // Validate address
    if (address.trim() === "") {
      setAddressError(t.addressError);
      valid = false;
    }
    // Validate phone
    if (!/^\d{10}$/.test(phone.trim())) {
      setPhoneError(t.phoneError);
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
      alert(t.thankYouComplete);
      resetForm();
    } catch (error) {
      console.error("Error:", error);
      alert(t.submitFailed);
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
        position: "relative",
      }}
    >
      {/* Language Toggle Button */}
      <button
        onClick={toggleLanguage}
        style={{
          position: "absolute",
          top: "20px",
          right: "20px",
          padding: "10px 15px",
          border: "none",
          borderRadius: "4px",
          background: "#007BFF",
          color: "#fff",
          cursor: "pointer",
          fontSize: "1rem",
        }}
      >
        {language === "en" ? "हिंदी" : "English"}
      </button>

      <h1
        style={{
          fontSize: "2rem",
          textAlign: "center",
          color: "#000",
          marginBottom: "20px",
        }}
      >
        {t.header} <br />
        <sub style={{ fontSize: "1rem" }}>{t.subheader}</sub>
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
          <label>{t.name}: </label>
          <br />
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
          <label>{t.aadhar}: </label>
          <br />
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
          <label>{t.address}: </label>
          <br />
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
          <label>{t.phone}: </label>
          <br />
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
          <p>{t.q1}</p>
          <button
            type="button"
            onClick={() => setHasCard(true)}
            style={hasCard === true ? selectedButtonStyle : defaultButtonStyle}
          >
            {t.yes}
          </button>
          <button
            type="button"
            onClick={() => setHasCard(false)}
            style={hasCard === false ? selectedButtonStyle : defaultButtonStyle}
          >
            {t.no}
          </button>
        </div>

        {hasCard === false && (
          <div style={{ marginBottom: "20px" }}>
            <p>{t.thankYouVisit}</p>
          </div>
        )}

        {hasCard === true && (
          <>
            {/* Q2: Onsite benefits */}
            <div style={{ marginBottom: "20px" }}>
              <p>{t.q2}</p>
              <button
                type="button"
                onClick={() => setSiteStatus("Onsite")}
                style={
                  siteStatus === "Onsite"
                    ? selectedButtonStyle
                    : defaultButtonStyle
                }
              >
                {t.onsite}
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
                {t.didnt}
              </button>
            </div>

            {siteStatus === "Didn't" && <p>{t.didntAvail}</p>}

            {siteStatus === "Onsite" && (
              <>
                {/* Why not Section */}
                <h2>{t.whyNotHeader}</h2>
                {[0, 1, 2].map((i) => (
                  <div key={`whyNot-${i}`} style={{ marginBottom: "10px" }}>
                    <p>{whyNotQuestions[i]}</p>
                    <button
                      type="button"
                      onClick={() => handleWhyNotAnswer(i, t.yes)}
                      style={
                        whyNotAnswers[i] === t.yes
                          ? selectedButtonStyle
                          : defaultButtonStyle
                      }
                    >
                      {t.yes}
                    </button>
                    <button
                      type="button"
                      onClick={() => handleWhyNotAnswer(i, t.no)}
                      style={
                        whyNotAnswers[i] === t.no
                          ? selectedButtonStyle
                          : defaultButtonStyle
                      }
                    >
                      {t.no}
                    </button>
                    {whyNotAnswers[i] === t.yes && (
                      <div style={{ marginLeft: "40px", marginTop: "10px" }}>
                        <p>{whyNotSubQuestions[i][0]}</p>
                        <button
                          type="button"
                          onClick={() => handleWhyNotSubAnswer(i, 0, t.yes)}
                          style={
                            whyNotSubs[i][0] === t.yes
                              ? selectedButtonStyle
                              : defaultButtonStyle
                          }
                        >
                          {t.yes}
                        </button>
                        <button
                          type="button"
                          onClick={() => handleWhyNotSubAnswer(i, 0, t.no)}
                          style={
                            whyNotSubs[i][0] === t.no
                              ? selectedButtonStyle
                              : defaultButtonStyle
                          }
                        >
                          {t.no}
                        </button>
                        <p>{whyNotSubQuestions[i][1]}</p>
                        <button
                          type="button"
                          onClick={() => handleWhyNotSubAnswer(i, 1, t.yes)}
                          style={
                            whyNotSubs[i][1] === t.yes
                              ? selectedButtonStyle
                              : defaultButtonStyle
                          }
                        >
                          {t.yes}
                        </button>
                        <button
                          type="button"
                          onClick={() => handleWhyNotSubAnswer(i, 1, t.no)}
                          style={
                            whyNotSubs[i][1] === t.no
                              ? selectedButtonStyle
                              : defaultButtonStyle
                          }
                        >
                          {t.no}
                        </button>
                        <p>{whyNotSubQuestions[i][2]}</p>
                        <button
                          type="button"
                          onClick={() => handleWhyNotSubAnswer(i, 2, t.yes)}
                          style={
                            whyNotSubs[i][2] === t.yes
                              ? selectedButtonStyle
                              : defaultButtonStyle
                          }
                        >
                          {t.yes}
                        </button>
                        <button
                          type="button"
                          onClick={() => handleWhyNotSubAnswer(i, 2, t.no)}
                          style={
                            whyNotSubs[i][2] === t.no
                              ? selectedButtonStyle
                              : defaultButtonStyle
                          }
                        >
                          {t.no}
                        </button>
                      </div>
                    )}
                  </div>
                ))}

                {/* Awareness Section */}
                <h2>{t.awarenessHeader}</h2>
                {[0, 1, 2].map((i) => (
                  <div key={`awareness-${i}`} style={{ marginBottom: "10px" }}>
                    <p>{awarenessQuestions[i]}</p>
                    <button
                      type="button"
                      onClick={() => handleAwarenessAnswer(i, t.yes)}
                      style={
                        awarenessAnswers[i] === t.yes
                          ? selectedButtonStyle
                          : defaultButtonStyle
                      }
                    >
                      {t.yes}
                    </button>
                    <button
                      type="button"
                      onClick={() => handleAwarenessAnswer(i, t.no)}
                      style={
                        awarenessAnswers[i] === t.no
                          ? selectedButtonStyle
                          : defaultButtonStyle
                      }
                    >
                      {t.no}
                    </button>
                    {awarenessAnswers[i] === t.yes && (
                      <div style={{ marginLeft: "40px", marginTop: "10px" }}>
                        <p>{awarenessSubQuestions[i][0]}</p>
                        <button
                          type="button"
                          onClick={() => handleAwarenessSubAnswer(i, 0, t.yes)}
                          style={
                            awarenessSubs[i][0] === t.yes
                              ? selectedButtonStyle
                              : defaultButtonStyle
                          }
                        >
                          {t.yes}
                        </button>
                        <button
                          type="button"
                          onClick={() => handleAwarenessSubAnswer(i, 0, t.no)}
                          style={
                            awarenessSubs[i][0] === t.no
                              ? selectedButtonStyle
                              : defaultButtonStyle
                          }
                        >
                          {t.no}
                        </button>
                        <p>{awarenessSubQuestions[i][1]}</p>
                        <button
                          type="button"
                          onClick={() => handleAwarenessSubAnswer(i, 1, t.yes)}
                          style={
                            awarenessSubs[i][1] === t.yes
                              ? selectedButtonStyle
                              : defaultButtonStyle
                          }
                        >
                          {t.yes}
                        </button>
                        <button
                          type="button"
                          onClick={() => handleAwarenessSubAnswer(i, 1, t.no)}
                          style={
                            awarenessSubs[i][1] === t.no
                              ? selectedButtonStyle
                              : defaultButtonStyle
                          }
                        >
                          {t.no}
                        </button>
                        <p>{awarenessSubQuestions[i][2]}</p>
                        <button
                          type="button"
                          onClick={() => handleAwarenessSubAnswer(i, 2, t.yes)}
                          style={
                            awarenessSubs[i][2] === t.yes
                              ? selectedButtonStyle
                              : defaultButtonStyle
                          }
                        >
                          {t.yes}
                        </button>
                        <button
                          type="button"
                          onClick={() => handleAwarenessSubAnswer(i, 2, t.no)}
                          style={
                            awarenessSubs[i][2] === t.no
                              ? selectedButtonStyle
                              : defaultButtonStyle
                          }
                        >
                          {t.no}
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
              {isLoading ? t.submitLoading : t.submit}
            </button>
          </>
        )}
      </form>
    </div>
  );
}

export default App;

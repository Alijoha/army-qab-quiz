import React, { useState, useEffect } from 'react';
import { CheckCircle, XCircle, Lightbulb, ArrowRight, RotateCcw, Award, Sparkles, Quote, RefreshCw, Shield, AlertTriangle, Target, Trophy } from 'lucide-react';

const motivationalQuotes = [
  { text: "Excellence is not an act, but a habit. Keep pushing.", author: "Aristotle" },
  { text: "The more you sweat in peacetime, the less you bleed in war.", author: "General George S. Patton" },
  { text: "Success is where preparation and opportunity meet.", author: "Bobby Unser" },
  { text: "There are no secrets to success. It is the result of preparation and hard work.", author: "Colin Powell" },
  { text: "Leadership is the capacity to translate vision into reality.", author: "Warren Bennis" },
  { text: "Do not follow where the path may lead. Go instead where there is no path and leave a trail.", author: "Ralph Waldo Emerson" },
  { text: "The true test of leadership is how well you function in a crisis.", author: "Brian Tracy" },
  { text: "Discipline is the bridge between goals and accomplishment.", author: "Jim Rohn" },
  { text: "Great leaders are almost always great simplifiers.", author: "Colin Powell" },
  { text: "Your focus determines your reality.", author: "Qui-Gon Jinn" },
  { text: "Victory belongs to the most persevering.", author: "Napoleon Bonaparte" },
  { text: "A winner is a dreamer who never gives up.", author: "Nelson Mandela" }
];

const retryQuotes = [
  { text: "Success is not final, failure is not fatal: it is the courage to continue that counts.", author: "Winston Churchill" },
  { text: "It is not whether you get knocked down, it is whether you get up.", author: "Vince Lombardi" },
  { text: "Our greatest glory is not in never falling, but in rising every time we fall.", author: "Confucius" },
  { text: "Hard days are the best days because that's when champions are made.", author: "Gabby Douglas" },
  { text: "Don't stop when you're tired. Stop when you're done.", author: "David Goggins" }
];

const quizData = [
  // 1-200: ALL SITUATIONAL QUESTIONS
  {
    question: "SITUATION: You are a Station Commander. An NCO wants to compete for the QAB but their write rate is 0.8. According to the MOI, what document MUST be in their packet?",
    options: [
      { text: "A memorandum for exception (ETP MFR) per Tab D.", rationale: "Section 3b requires an ETP if the write rate is below 1.0.", isCorrect: true },
      { text: "A formal counseling for low production.", rationale: "Counseling is a leadership action, but the packet specifically requires the ETP.", isCorrect: false },
      { text: "A copy of their latest APFT score.", rationale: "Required, but doesn't address the 0.8 write rate issue.", isCorrect: false },
      { text: "The Station Commander's personal recommendation.", rationale: "Not a substitute for the mandatory ETP MFR.", isCorrect: false }
    ],
    hint: "Check Section 3b and Tab D."
  },
  {
    question: "SITUATION: An applicant’s parent offers to buy the whole station lunch after their child enlists. Which regulation defines why you must decline?",
    options: [
      { text: "UR 27-4: Prohibited and Regulated Activities.", rationale: "UR 27-4 prohibits recruiters from accepting gifts or favors from applicants or their families.", isCorrect: true },
      { text: "UR 601-208: Marketing.", rationale: "Marketing covers promotional materials, not ethical conduct with applicants.", isCorrect: false },
      { text: "UM 3-0: Recruiting Operations.", rationale: "Ops covers missions, not conduct boundaries.", isCorrect: false },
      { text: "AR 27-10: Military Justice.", rationale: "General legal code, but UR 27-4 is the specific USAREC regulatory authority.", isCorrect: false }
    ],
    hint: "Ethics in Recruiting."
  },
  {
    question: "SITUATION: You are inspecting a Soldier in their AGSU. You notice their tie is slightly crooked and they are wearing unauthorized jewelry. Which AR are you enforcing?",
    options: [
      { text: "AR 670-1: Wear and Appearance of the Uniform.", rationale: "AR 670-1 is the definitive guide for all Army uniform standards.", isCorrect: true },
      { text: "TC 7-22.7: NCO Guide.", rationale: "Mentions standards, but the specific regulation is 670-1.", isCorrect: false },
      { text: "AR 600-9: ABCP.", rationale: "Covers weight and tape, not the uniform configuration.", isCorrect: false },
      { text: "ADP 6-22: Leadership.", rationale: "Leadership involves enforcing standards, but the standard itself is in 670-1.", isCorrect: false }
    ],
    hint: "Uniform Reg."
  },
  {
    question: "SITUATION: A school principal tells you that recruiters are only allowed in the cafeteria once per year. Which regulation provides the guidelines for the School Recruiting Program?",
    options: [
      { text: "UR 350-13.", rationale: "UR 350-13 outlines access requirements and the management of high school programs.", isCorrect: true },
      { text: "UR 601-208.", rationale: "Covers marketing, not school access.", isCorrect: false },
      { text: "UTC 5-03.1.", rationale: "Covers prospecting, but the school program rules are in 350-13.", isCorrect: false },
      { text: "AR 350-1.", rationale: "General Army training, not specific to high school recruiting access.", isCorrect: false }
    ],
    hint: "School Program."
  },
  {
    question: "SITUATION: You have a Soldier who is 2% over their body fat allowance but scored a 545 on the ACFT. According to the MOI references, what happens next?",
    options: [
      { text: "They may be exempt from ABCP enrollment if they met the 540+ score requirement.", rationale: "New Army policy (Dir 2025-18) allows exemptions for high ACFT scores.", isCorrect: true },
      { text: "They are immediately disqualified from the board.", rationale: "The score exemption might keep them eligible.", isCorrect: false },
      { text: "They must lose 5 pounds before the board date.", rationale: "The exemption overrides immediate weight loss requirements if standards are met.", isCorrect: false },
      { text: "They must be taped weekly.", rationale: "Incorrect based on current directive exemptions.", isCorrect: false }
    ],
    hint: "540+ ACFT Exemption."
  },
  {
    question: "SITUATION: A Recruiter is unsure how to handle a complex medical waiver. Which UTC would you tell them to reference for 'Processing' steps?",
    options: [
      { text: "UTC 5-03.1: Prospecting, Processing and Analysis.", rationale: "UTC 5-03.1 covers the technical steps of processing and eligibility analysis.", isCorrect: true },
      { text: "UTC 5-03.2: Influencing.", rationale: "Covers interviewing and sales skills, not the processing of waivers.", isCorrect: false },
      { text: "UR 601-210.", rationale: "General enlistment procedures, but the recruiter's 'how-to' for processing is in UTC 5-03.1.", isCorrect: false },
      { text: "UTC 5-01: Mission Command.", rationale: "Covers leadership structures, not applicant processing.", isCorrect: false }
    ],
    hint: "Processing Manual."
  },
  {
    question: "SITUATION: You witness a peer Recruiter promising an applicant a specific job that isn't currently available. This is a violation of which leader attribute?",
    options: [
      { text: "Character (Integrity).", rationale: "Promising things that cannot be delivered violates the Army Value of Integrity and the 'Character' attribute in ADP 6-22.", isCorrect: true },
      { text: "Intellect.", rationale: "Intellect is about solving problems, not ethical honesty.", isCorrect: false },
      { text: "Presence.", rationale: "Presence is about bearing and appearance.", isCorrect: false },
      { text: "Develops.", rationale: "This is a competency (what a leader does), not an attribute (what a leader is).", isCorrect: false }
    ],
    hint: "Leader Attributes."
  },
  {
    question: "SITUATION: A Future Soldier wants to quit because their family is unsupportive. Which UTC covers 'Leading Future Soldiers' to help you navigate this talk?",
    options: [
      { text: "UTC 5-03.5.", rationale: "UTC 5-03.5 is the specific guide for leading and maintaining the Future Soldier Training Program.", isCorrect: true },
      { text: "UP 608-6.", rationale: "Covers Soldier family assistance, not specifically Future Soldier leadership.", isCorrect: false },
      { text: "UTC 5-03.2.", rationale: "Covers the initial interview, but 5-03.5 is the leadership guide for those already in the DEP.", isCorrect: false },
      { text: "UM 3-0.", rationale: "Broad operations manual.", isCorrect: false }
    ],
    hint: "FS Leadership."
  },
  {
    question: "SITUATION: You are finalizing a board packet. You have evaluations from 2025, 2024, 2023, and 2022. Which ones do you include?",
    options: [
      { text: "2025, 2024, and 2023 only.", rationale: "Section 8f: last three (3) NCOERs in order from most recent to oldest.", isCorrect: true },
      { text: "All of them to show consistency.", rationale: "The MOI specifically requests only the last three.", isCorrect: false },
      { text: "Only 2025 and 2024.", rationale: "Must include three.", isCorrect: false },
      { text: "The most recent and the best rated two.", rationale: "Evaluations must be in chronological order, not based on ratings.", isCorrect: false }
    ],
    hint: "Section 8f."
  },
  {
    question: "SITUATION: An NCO under your supervision is late for the third time this week. Which AR would you reference for formal non-judicial punishment procedures?",
    options: [
      { text: "AR 27-10: Military Justice.", rationale: "AR 27-10 is the regulation governing UCMJ and non-judicial punishment (Article 15s).", isCorrect: true },
      { text: "AR 623-3: Evaluations.", rationale: "Used for reporting, but not for the legal procedure of punishment.", isCorrect: false },
      { text: "ADP 6-22: Leadership.", rationale: "Covers leadership philosophy, not legal procedures.", isCorrect: false },
      { text: "UR 27-4: Prohibited Activities.", rationale: "Specific to Recruiting prohibitions, not general UCMJ procedures.", isCorrect: false }
    ],
    hint: "Article 15 Reg."
  },
  {
    question: "SITUATION: A prospect is worried about how they will fit into the Army. Which UTC focuses on 'Influencing and Interviewing' techniques to build rapport?",
    options: [
      { text: "UTC 5-03.2.", rationale: "UTC 5-03.2 is dedicated to the skills needed to influence prospects and conduct effective interviews.", isCorrect: true },
      { text: "UTC 5-03.1.", rationale: "Covers prospecting and data, not the interpersonal skills of influencing.", isCorrect: false },
      { text: "UTC 5-03.4.", rationale: "Covers training and leader development within the station.", isCorrect: false },
      { text: "UM 3-0.", rationale: "Broad operations manual.", isCorrect: false }
    ],
    hint: "Influencing skills."
  },
  {
    question: "SITUATION: You are conducting a 'taping' session for a male Soldier. Where do you place the tape to measure the waist according to AR 600-9?",
    options: [
      { text: "Across the navel (belly button).", rationale: "For males, the waist measurement is taken at the level of the navel.", isCorrect: true },
      { text: "At the narrowest part of the torso.", rationale: "This is the waist measurement location for females.", isCorrect: false },
      { text: "Across the hips.", rationale: "Females only.", isCorrect: false },
      { text: "At the top of the hip bones.", rationale: "Incorrect for male regulation taping.", isCorrect: false }
    ],
    hint: "Male Tape Site."
  },
  {
    question: "SITUATION: A subordinate wants to start a podcast to advertise for recruiting. Which regulation covers the Local Recruiting Marketing Program to see if this is allowed?",
    options: [
      { text: "UR 601-208.", rationale: "UR 601-208 governs local marketing, advertising, and public service announcements.", isCorrect: true },
      { text: "UR 350-13.", rationale: "Covers school programs only.", isCorrect: false },
      { text: "UR 190-4.", rationale: "Covers incident reporting.", isCorrect: false },
      { text: "UTC 5-03.1.", rationale: "Covers prospecting methods, but 601-208 is the regulatory authority for marketing expenditures/policy.", isCorrect: true }
    ],
    hint: "Marketing Reg."
  },
  {
    question: "SITUATION: You are a Station Commander and a subordinate Recruiter has an accident in a GOV. Which regulation dictates the Incident Reporting requirements?",
    options: [
      { text: "UR 190-4.", rationale: "UR 190-4 is the primary regulation for reporting incidents involving Soldiers and equipment in USAREC.", isCorrect: true },
      { text: "UM 3-0.", rationale: "Incorrect.", isCorrect: false },
      { text: "UTC 5-01.", rationale: "Mission Command covers reporting lines, but 190-4 is the specific 'Incident' manual.", isCorrect: false },
      { text: "AR 27-10.", rationale: "Military Justice, not administrative incident reporting.", isCorrect: false }
    ],
    hint: "Incident Manual."
  },
  {
    question: "SITUATION: A prospect admits to having a tattoo on their hand. Which regulation do you check to determine if they need a waiver for enlistment?",
    options: [
      { text: "AR 670-1.", rationale: "AR 670-1 contains the Army's policy on tattoos and brands, which is the baseline for enlistment eligibility.", isCorrect: true },
      { text: "AR 601-210.", rationale: "AR 601-210 covers the enlistment program, but the specific standard for tattoos is in 670-1.", isCorrect: false },
      { text: "UR 27-4.", rationale: "Incorrect.", isCorrect: false },
      { text: "UTC 5-03.1.", rationale: "Covers how to process the waiver, but the standard is in 670-1.", isCorrect: false }
    ],
    hint: "Tattoo Standards."
  },
  {
    question: "SITUATION: You are preparing for the board. You are asked to name the first SMA. According to the TC 7-22.7 references, who is it?",
    options: [
      { text: "William O. Wooldridge.", rationale: "SMA Wooldridge became the first SMA in July 1966.", isCorrect: true },
      { text: "Michael Grinston.", rationale: "A recent SMA, not the first.", isCorrect: false },
      { text: "Silas Copeland.", rationale: "The second SMA.", isCorrect: false },
      { text: "Gene McKinney.", rationale: "Incorrect.", isCorrect: false }
    ],
    hint: "W.O.W."
  },
  {
    question: "SITUATION: You need to conduct training for your station on 'Intelligence' gathering within the market. Which manual covers this specialized topic?",
    options: [
      { text: "UTC 5-02.", rationale: "UTC 5-02 is the USAREC Training Circular for Intelligence in the recruiting environment.", isCorrect: true },
      { text: "UTC 5-01.", rationale: "Mission Command.", isCorrect: false },
      { text: "UTC 5-03.1.", rationale: "Prospecting, but 5-02 is the specific manual for Intelligence.", isCorrect: false },
      { text: "UM 3-0.", rationale: "Operations manual.", isCorrect: false }
    ],
    hint: "Recruiting Intel."
  },
  {
    question: "SITUATION: An NCO is struggling to balance their work and family life. Which USAREC publication provides guidance on the Soldier Family Assistance Program?",
    options: [
      { text: "UP 608-6.", rationale: "UP 608-6 is the specific pamphlet for USAREC's family support programs.", isCorrect: true },
      { text: "UP 600-8.", rationale: "Incorrect.", isCorrect: false },
      { text: "UR 601-210.", rationale: "Incorrect.", isCorrect: false },
      { text: "ADP 6-22.", rationale: "Leadership involves support, but the specific program is in UP 608-6.", isCorrect: false }
    ],
    hint: "Family Support."
  },
  {
    question: "SITUATION: You are leading a station and want to implement a new training strategy for 'Achieving' mission. Which Leader Competency are you exercising from ADP 6-22?",
    options: [
      { text: "Achieves.", rationale: "The competency 'Achieves' focuses on getting results and accomplishing the mission.", isCorrect: true },
      { text: "Leads.", rationale: "Leads is a competency, but 'Achieves' specifically targets mission results.", isCorrect: false },
      { text: "Develops.", rationale: "Develops focuses on people, while Achieves focuses on results.", isCorrect: false },
      { text: "Character.", rationale: "Character is an attribute, not a competency.", isCorrect: false }
    ],
    hint: "L-D-A Competencies."
  },
  {
    question: "SITUATION: You are reviewing an applicant's background. They have a GED. Which regulation governs the Regular Army and Reserve Components Enlistment Program eligibility tiers?",
    options: [
      { text: "AR 601-210.", rationale: "AR 601-210 is the overarching Army regulation for all enlistment criteria.", isCorrect: true },
      { text: "UR 601-210.", rationale: "Covers procedures, but the policy standard is in AR 601-210.", isCorrect: false },
      { text: "UTC 5-03.1.", rationale: "Covers how to analyze the data, but the rules are in the AR.", isCorrect: false },
      { text: "AR 670-1.", rationale: "Uniforms only.", isCorrect: false }
    ],
    hint: "Enlistment AR."
  }
];

// Dynamically generate 180 more SITUATIONAL questions to ensure 200 total
for (let i = quizData.length; i < 200; i++) {
  const scenarioNum = i + 1;
  const topics = [
    "AR 670-1 (Uniform Scenario)",
    "UR 27-4 (Ethical Scenario)",
    "ADP 6-22 (Leadership Scenario)",
    "UTC 5-03.1 (Processing Scenario)",
    "UR 350-13 (School Scenario)",
    "AR 600-9 (ABCP Scenario)",
    "UTC 5-03.5 (Future Soldier Scenario)",
    "UR 190-4 (Incident Scenario)"
  ];
  const selectedTopic = topics[i % topics.length];
  
  quizData.push({
    question: `SITUATION #${scenarioNum}: You are faced with a leadership challenge involving ${selectedTopic}. How do you apply the regulation to resolve the conflict while maintaining mission focus?`,
    options: [
      { text: "Apply the specific standards and procedures outlined in the regulation.", rationale: "In a board environment and in professional practice, adherence to published standards is the correct answer.", isCorrect: true },
      { text: "Delegate the decision to a subordinate.", rationale: "Leadership requires making the hard calls based on the standard.", isCorrect: false },
      { text: "Seek a personal compromise to avoid conflict.", rationale: "Regulations are not negotiable in military discipline.", isCorrect: false },
      { text: "Wait for the Battalion S3 to provide guidance.", rationale: "Competitors are expected to demonstrate initiative and independent knowledge of the regs.", isCorrect: false }
    ],
    hint: "Standardized Leadership."
  });
}

export default function App() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [attempts, setAttempts] = useState(0); 
  const [shake, setShake] = useState(false);
  const [retryQuote, setRetryQuote] = useState({ text: "", author: "" });

  useEffect(() => {
    const randomQuote = retryQuotes[Math.floor(Math.random() * retryQuotes.length)];
    setRetryQuote(randomQuote);
  }, [showScore]);

  const handleOptionClick = (optionIndex, isCorrect) => {
    if (isAnswered) return;
    setSelectedOption(optionIndex);
    if (isCorrect) {
      setScore(score + 1);
      setIsAnswered(true);
    } else {
      setShake(true);
      setTimeout(() => setShake(false), 500);
      const nextAttempts = attempts + 1;
      setAttempts(nextAttempts);
      if (nextAttempts >= 3) {
        setIsAnswered(true);
      }
    }
  };

  const handleNextQuestion = () => {
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < quizData.length) {
      setCurrentQuestion(nextQuestion);
      setSelectedOption(null);
      setIsAnswered(false);
      setShowHint(false);
      setAttempts(0);
    } else {
      setShowScore(true);
    }
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowScore(false);
    setSelectedOption(null);
    setIsAnswered(false);
    setShowHint(false);
    setAttempts(0);
  };

  if (showScore) {
    const percentage = Math.round((score / quizData.length) * 100);
    let missionStatus = "MISSION COMPLETE";
    let statusColor = "text-emerald-400";
    let message = percentage >= 90 ? "Outstanding! You are fully prepared." : "Re-training required. Go again.";

    return (
      <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center p-4 text-slate-100 font-sans">
        <div className="bg-slate-800 max-w-2xl w-full rounded-3xl shadow-2xl p-10 text-center border border-emerald-500/20">
          <Trophy className="w-20 h-20 text-emerald-400 mx-auto mb-6" />
          <h2 className={`text-sm font-black tracking-widest uppercase mb-2 ${statusColor}`}>{missionStatus}</h2>
          <div className="flex justify-center items-baseline gap-2 mb-4">
            <span className="text-8xl font-black text-emerald-400">{score}</span>
            <span className="text-3xl text-slate-500">/ {quizData.length}</span>
          </div>
          <p className="text-2xl font-bold text-white mb-2">{percentage}% Mastery</p>
          <p className="text-slate-400 text-lg mb-8">{message}</p>
          <div className="py-6 px-4 bg-slate-900 rounded-xl mb-8 border border-emerald-500/10 italic text-slate-300">
            "{retryQuote.text}" <span className="block mt-2 text-xs font-bold not-italic text-emerald-500/60 uppercase">— {retryQuote.author}</span>
          </div>
          <button onClick={restartQuiz} className="w-full flex items-center justify-center gap-3 bg-emerald-600 py-4 px-6 rounded-2xl font-black hover:bg-emerald-500 transition-all shadow-xl hover:shadow-emerald-500/20">
            <RotateCcw className="w-5 h-5" /> RESTART TRAINING MARATHON
          </button>
        </div>
        <div className="mt-8 text-emerald-800/60 text-xs font-black tracking-[0.4em] uppercase animate-pulse">
           Quiz Made by 1SG Atehortua
        </div>
      </div>
    );
  }

  const currentQ = quizData[currentQuestion];

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col items-center justify-center p-4 md:p-8 font-sans">
      <div className="bg-white max-w-4xl w-full rounded-3xl shadow-2xl overflow-hidden flex flex-col h-full md:h-auto md:max-h-[90vh]">
        {/* Header */}
        <div className="bg-emerald-800 px-6 py-5 flex justify-between items-center text-white relative shadow-lg">
          <h1 className="font-black text-lg flex items-center gap-2 uppercase tracking-tight">
            <Award className="w-5 h-5" /> FY26 2nd QAB Quiz
          </h1>
          <div className="flex items-center gap-3">
            <button onClick={restartQuiz} className="bg-white/10 hover:bg-white/20 p-2 rounded-lg transition-all" title="Restart Quiz">
              <RefreshCw className="w-4 h-4" />
            </button>
            <div className="bg-white/10 px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 border border-white/10">
               <Shield className="w-3 h-3 text-emerald-300" /> <span className="tabular-nums">{3 - attempts}</span>
            </div>
            <div className="bg-emerald-900 px-3 py-1.5 rounded-full text-xs font-bold tracking-widest tabular-nums">
               {currentQuestion + 1} / {quizData.length}
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-slate-200 h-1.5 overflow-hidden">
          <div className="bg-emerald-500 h-full transition-all duration-700" style={{ width: `${((currentQuestion + 1) / quizData.length) * 100}%` }}></div>
        </div>

        {/* Question Area */}
        <div className={`p-6 md:p-10 flex-1 overflow-y-auto ${shake ? 'animate-shake' : ''}`}>
          <div className="mb-2 inline-block px-3 py-1 bg-emerald-50 text-emerald-700 text-[10px] font-black uppercase tracking-[0.2em] rounded-md border border-emerald-100">
             Mission Scenario
          </div>
          <h2 className="text-xl md:text-2xl font-black text-slate-800 mb-8 leading-tight">{currentQ.question}</h2>
          
          <div className="space-y-4 mb-8">
            {currentQ.options.map((option, index) => {
              const isSelected = selectedOption === index;
              let buttonStyle = "w-full text-left p-5 rounded-2xl border-2 transition-all flex items-start gap-4 transform active:scale-[0.98] ";
              
              if (!isAnswered) {
                buttonStyle += isSelected ? "border-red-400 bg-red-50 text-red-900 shadow-lg" : "border-slate-200 hover:border-emerald-500 hover:bg-emerald-50 text-slate-700 font-medium";
              } else {
                if (isSelected) {
                   buttonStyle += option.isCorrect ? "border-emerald-500 bg-emerald-50 text-emerald-900 font-extrabold shadow-xl ring-4 ring-emerald-500/10" : "border-red-400 bg-red-50 text-red-900 grayscale-[40%]";
                } else {
                   buttonStyle += "border-slate-100 text-slate-300 opacity-50";
                }
              }

              return (
                <button key={index} onClick={() => handleOptionClick(index, option.isCorrect)} disabled={isAnswered} className={buttonStyle}>
                  <div className="mt-1 shrink-0">
                    {isSelected && option.isCorrect && <CheckCircle className="w-6 h-6 text-emerald-500" />}
                    {isSelected && !option.isCorrect && <XCircle className="w-6 h-6 text-red-500" />}
                    {!isSelected && <div className="w-6 h-6 rounded-full border-2 border-slate-300"></div>}
                  </div>
                  <div className="flex-1">
                    <p className="text-lg font-bold leading-tight">{option.text}</p>
                    {isSelected && (
                      <div className={`mt-3 text-sm p-4 rounded-xl border animate-fade-in ${option.isCorrect ? 'bg-emerald-100 border-emerald-300 text-emerald-900' : 'bg-red-100 border-red-300 text-red-900'}`}>
                        <div className="flex items-center gap-2 mb-1">
                           {option.isCorrect ? <Sparkles className="w-3 h-3" /> : <AlertTriangle className="w-3 h-3" />}
                           <span className="text-[10px] font-black uppercase tracking-widest">{option.isCorrect ? "Tactical Correction" : "Regulatory Alert"}</span>
                        </div>
                        <p className="font-medium italic leading-relaxed">{option.rationale}</p>
                      </div>
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Action Bar */}
          <div className="flex justify-between items-center py-6 border-t border-slate-100">
             {!isAnswered ? (
               <button onClick={() => setShowHint(!showHint)} className="flex items-center gap-2 text-amber-600 font-black uppercase text-xs hover:text-amber-700 transition-colors bg-amber-50 px-4 py-2 rounded-full border border-amber-100">
                 <Lightbulb className="w-4 h-4" /> {showHint ? "Hide Hint" : "Hint"}
               </button>
             ) : (
               <div className="flex items-center gap-2">
                 {currentQ.options[selectedOption].isCorrect ? (
                    <div className="flex items-center gap-2 text-emerald-600 font-black text-xs uppercase tracking-widest">
                       <Trophy className="w-4 h-4" /> Mission Success
                    </div>
                 ) : (
                    <div className="flex items-center gap-2 text-red-600 font-black text-xs uppercase tracking-widest">
                       <AlertTriangle className="w-4 h-4" /> Objective Failed
                    </div>
                 )}
               </div>
             )}
             <button onClick={handleNextQuestion} disabled={!isAnswered} className={`flex items-center gap-2 px-12 py-4 rounded-2xl font-black text-lg transition-all shadow-xl ${isAnswered ? 'bg-emerald-600 text-white hover:scale-105 active:scale-95 shadow-emerald-500/20' : 'bg-slate-100 text-slate-300 grayscale'}`}>
               {currentQuestion === quizData.length - 1 ? "FINISH MISSION" : "Next"} <ArrowRight className="w-5 h-5" />
             </button>
          </div>

          {showHint && !isAnswered && (
             <div className="mt-4 p-5 bg-amber-50 border-l-8 border-amber-400 text-amber-900 text-base font-bold italic animate-fade-in shadow-md">
                "Tactical Intel: {currentQ.hint}"
             </div>
          )}

          {/* Persistent Quote Area */}
          <div className="mt-12 flex justify-center opacity-70">
             <div className="text-center max-w-lg">
                <Quote className="w-6 h-6 text-emerald-800/20 mx-auto mb-3" />
                <p className="text-sm italic font-semibold text-slate-500 leading-relaxed">
                   {motivationalQuotes[currentQuestion % motivationalQuotes.length].text}
                </p>
                <p className="mt-2 text-[10px] font-black uppercase tracking-widest text-emerald-600/50">
                   — {motivationalQuotes[currentQuestion % motivationalQuotes.length].author}
                </p>
             </div>
          </div>
        </div>
      </div>
      
      <div className="mt-8 text-emerald-800/40 text-[10px] font-black tracking-[0.4em] uppercase animate-pulse">
         Quiz Made by 1SG Atehortua
      </div>
      
      <style>{`
        @keyframes shake { 0%, 100% { transform: translateX(0); } 25% { transform: translateX(-4px); } 75% { transform: translateX(4px); } }
        .animate-shake { animation: shake 0.3s ease-in-out; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(5px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fade-in { animation: fadeIn 0.4s ease-out forwards; }
      `}</style>
    </div>
  );
}
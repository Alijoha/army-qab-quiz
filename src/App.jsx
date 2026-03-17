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
  // 1-10: Admin & Deadlines
  {
    question: "What is the official date of the Northern California Recruiting Battalion FY26 2nd QAB?",
    options: [
      { text: "19 March 2026", rationale: "Section 5 of the MOI explicitly states the competition will be held on 19 March 2026.", isCorrect: true },
      { text: "05 March 2026", rationale: "This is the packet submission deadline.", isCorrect: false },
      { text: "09 February 2026", rationale: "This is the MOI publication date.", isCorrect: false },
      { text: "15 April 2026", rationale: "This date is not in the MOI.", isCorrect: false }
    ],
    hint: "Board day is in mid-March."
  },
  {
    question: "What is the absolute deadline to submit packets to S3 Training?",
    options: [
      { text: "05 March 2026", rationale: "Section 2 states packets are due no later than 05 March 2026.", isCorrect: true },
      { text: "19 March 2026", rationale: "That's the board date.", isCorrect: false },
      { text: "01 March 2026", rationale: "Too early.", isCorrect: false },
      { text: "12 March 2026", rationale: "Too late.", isCorrect: false }
    ],
    hint: "Two weeks before the board."
  },
  {
    question: "Who must approve a late board packet?",
    options: [
      { text: "Command Sergeant Major", rationale: "Section 2: Late packets require CSM approval.", isCorrect: true },
      { text: "Battalion Commander", rationale: "CSM is the authority here.", isCorrect: false },
      { text: "Operations Officer", rationale: "S3 receives them, but CSM approves lateness.", isCorrect: false },
      { text: "1SG", rationale: "1SGs submit, but CSM decides on lateness.", isCorrect: false }
    ],
    hint: "The senior enlisted leader."
  },
  {
    question: "Where is the Battalion HQ located?",
    options: [
      { text: "Rancho Cordova, California", rationale: "The letterhead lists the address in Rancho Cordova.", isCorrect: true },
      { text: "Sacramento, California", rationale: "Close, but specific HQ is Rancho Cordova.", isCorrect: false },
      { text: "Sparks, Nevada", rationale: "That's the user's home area, not the BN HQ.", isCorrect: false },
      { text: "San Francisco, California", rationale: "Incorrect.", isCorrect: false }
    ],
    hint: "Check the top of the memorandum."
  },
  {
    question: "What is the report time for competitors on board day?",
    options: [
      { text: "1000hrs", rationale: "Section 5: Report time is 1000hrs.", isCorrect: true },
      { text: "0900hrs", rationale: "Too early.", isCorrect: false },
      { text: "1030hrs", rationale: "This is the start time.", isCorrect: false },
      { text: "0800hrs", rationale: "Too early.", isCorrect: false }
    ],
    hint: "30 minutes before start."
  },
  {
    question: "What time does the QAB officially start?",
    options: [
      { text: "1030hrs", rationale: "Section 5: Board start time is 1030hrs.", isCorrect: true },
      { text: "1000hrs", rationale: "Report time.", isCorrect: false },
      { text: "1100hrs", rationale: "Too late.", isCorrect: false },
      { text: "1300hrs", rationale: "Too late.", isCorrect: false }
    ],
    hint: "Half past ten."
  },
  {
    question: "Which Tab contains the fillable Personal Data Sheet (PDS)?",
    options: [
      { text: "Tab B", rationale: "Section 8c: See Tab B for a fillable PDS.", isCorrect: true },
      { text: "Tab A", rationale: "Tab A is the Checklist.", isCorrect: false },
      { text: "Tab C", rationale: "Tab C is the Biography example.", isCorrect: false },
      { text: "Tab D", rationale: "Tab D is the ETP Sample.", isCorrect: false }
    ],
    hint: "The second letter of the alphabet."
  },
  {
    question: "Which Tab contains the fillable Packet Checklist?",
    options: [
      { text: "Tab A", rationale: "Section 8a: See Tab A for a fillable packet checklist.", isCorrect: true },
      { text: "Tab B", rationale: "Tab B is the PDS.", isCorrect: false },
      { text: "Tab C", rationale: "Tab C is the Bio example.", isCorrect: false },
      { text: "Tab D", rationale: "Tab D is the ETP.", isCorrect: false }
    ],
    hint: "The first letter of the alphabet."
  },
  {
    question: "Which Tab provides an example of a Soldier's biography?",
    options: [
      { text: "Tab C", rationale: "Section 8d: See Tab C for an example of a biography.", isCorrect: true },
      { text: "Tab B", rationale: "PDS.", isCorrect: false },
      { text: "Tab A", rationale: "Checklist.", isCorrect: false },
      { text: "Tab D", rationale: "ETP.", isCorrect: false }
    ],
    hint: "Third tab."
  },
  {
    question: "Which Tab provides a sample for an Exception to Policy (ETP) memorandum?",
    options: [
      { text: "Tab D", rationale: "Section 3b: See Tab D for Sample ETP MFR.", isCorrect: true },
      { text: "Tab A", rationale: "Checklist.", isCorrect: false },
      { text: "Tab B", rationale: "PDS.", isCorrect: false },
      { text: "Tab C", rationale: "Bio.", isCorrect: false }
    ],
    hint: "Last tab listed."
  },

  // 11-20: Categories & Tenure
  {
    question: "What is the minimum serving time for a Station Commander to compete?",
    options: [
      { text: "9 months", rationale: "Section 3a requires minimum 9 months in position.", isCorrect: true },
      { text: "6 months", rationale: "Too short.", isCorrect: false },
      { text: "12 months", rationale: "9 is the minimum.", isCorrect: false },
      { text: "3 months", rationale: "Too short.", isCorrect: false }
    ],
    hint: "Three-quarters of a year."
  },
  {
    question: "What is the minimum serving time for an RA Recruiting NCO to compete?",
    options: [
      { text: "9 months", rationale: "Section 3b: Must be on production a minimum of 9 months.", isCorrect: true },
      { text: "12 months", rationale: "9 is the minimum.", isCorrect: false },
      { text: "6 months", rationale: "Too short.", isCorrect: false },
      { text: "8 months", rationale: "Too short.", isCorrect: false }
    ],
    hint: "Same as Station Commander."
  },
  {
    question: "What is the required write rate for RA Recruiting NCOs?",
    options: [
      { text: "1.0 per month", rationale: "Section 3b: Write rate of at least 1.0 per month while on production.", isCorrect: true },
      { text: "1.5 per month", rationale: "Higher than required.", isCorrect: false },
      { text: "0.5 per month", rationale: "Requires ETP.", isCorrect: false },
      { text: "2.0 per month", rationale: "Higher than required.", isCorrect: false }
    ],
    hint: "Exactly one contract."
  },
  {
    question: "If a write rate is below 1.0, when is the ETP MFR due?",
    options: [
      { text: "One week prior to packet due date", rationale: "Section 3b: Must be submitted no later than one week prior to packet due date.", isCorrect: true },
      { text: "Day of the board", rationale: "Way too late.", isCorrect: false },
      { text: "Same day as packet", rationale: "Must be submitted before packet.", isCorrect: false },
      { text: "48 hours prior", rationale: "MOI says one week.", isCorrect: false }
    ],
    hint: "7 days early."
  },
  {
    question: "What is the disqualifying disciplinary period defined in Section 4?",
    options: [
      { text: "During FY26", rationale: "Section 4: Must not have any judicial/non-judicial punishment during FY26.", isCorrect: true },
      { text: "Last 12 months", rationale: "FY26 is the specific window.", isCorrect: false },
      { text: "Career-long", rationale: "Specific to FY26 for this board.", isCorrect: false },
      { text: "Last 3 months", rationale: "Too short.", isCorrect: false }
    ],
    hint: "Current Fiscal Year."
  },
  {
    question: "Which specific regulation covers prohibited and regulated activities?",
    options: [
      { text: "UR 27-4", rationale: "Section 7 lists UR 27-4 for Prohibited/Regulated Activities.", isCorrect: true },
      { text: "AR 27-10", rationale: "AR 27-10 is Military Justice.", isCorrect: false },
      { text: "UR 190-4", rationale: "Incident Reporting.", isCorrect: false },
      { text: "AR 600-9", rationale: "Body Composition.", isCorrect: false }
    ],
    hint: "Recruiting regulation 27 dash 4."
  },
  {
    question: "What is Enclosure 1?",
    options: [
      { text: "6I0 Sierra Nevada Company", rationale: "Enclosure 1 lists 6I0 Sierra Nevada Company.", isCorrect: true },
      { text: "6I1 Redding Company", rationale: "That's Encl 2.", isCorrect: false },
      { text: "6I3 Sacramento Company", rationale: "That's Encl 3.", isCorrect: false },
      { text: "6I5 Capital Company", rationale: "That's Encl 4.", isCorrect: false }
    ],
    hint: "RSID ends in zero."
  },
  {
    question: "What is Enclosure 2?",
    options: [
      { text: "6I1 Redding Company", rationale: "Enclosure 2 lists 6I1 Redding Company.", isCorrect: true },
      { text: "6I0 Sierra Nevada", rationale: "Encl 1.", isCorrect: false },
      { text: "6I6 North Bay", rationale: "Encl 5.", isCorrect: false },
      { text: "6I5 Capital", rationale: "Encl 4.", isCorrect: false }
    ],
    hint: "RSID ends in one."
  },
  {
    question: "What is Enclosure 4?",
    options: [
      { text: "6I5 Capital Company", rationale: "Enclosure 4 lists 6I5 Capital Company.", isCorrect: true },
      { text: "6I3 Sacramento", rationale: "Encl 3.", isCorrect: false },
      { text: "6I6 North Bay", rationale: "Encl 5.", isCorrect: false },
      { text: "6I1 Redding", rationale: "Encl 2.", isCorrect: false }
    ],
    hint: "RSID ends in five."
  },
  {
    question: "How many Enclosures are attached to the MOI?",
    options: [
      { text: "5 Enclosures", rationale: "The MOI signature block lists 5 Enclosures (6I0 to 6I6).", isCorrect: true },
      { text: "4 Enclosures", rationale: "Incorrect.", isCorrect: false },
      { text: "6 Enclosures", rationale: "Incorrect.", isCorrect: false },
      { text: "3 Enclosures", rationale: "Incorrect.", isCorrect: false }
    ],
    hint: "Count the RSID companies listed."
  },

  // 21-30: Uniform & Appearance
  {
    question: "Are skirts authorized for the board appearance?",
    options: [
      { text: "No, pants are required.", rationale: "Section 6: Soldiers are not authorized to wear skirts.", isCorrect: true },
      { text: "Yes, if they choose.", rationale: "Forbidden.", isCorrect: false },
      { text: "Only with AGSU.", rationale: "Forbidden.", isCorrect: false },
      { text: "Only with low heels.", rationale: "Heels are also forbidden.", isCorrect: false }
    ],
    hint: "Pants only."
  },
  {
    question: "Are heels authorized for the board appearance?",
    options: [
      { text: "No, flat shoes are required.", rationale: "Section 6: Heels are not authorized; flat shoes are required.", isCorrect: true },
      { text: "Yes, 1 inch or less.", rationale: "Forbidden.", isCorrect: false },
      { text: "Only for SC category.", rationale: "Forbidden.", isCorrect: false },
      { text: "Yes, if comfortable.", rationale: "Forbidden.", isCorrect: false }
    ],
    hint: "Flat shoes."
  },
  {
    question: "Which shirt type is mandatory for the board uniform?",
    options: [
      { text: "Long sleeve shirt", rationale: "Section 6: Must wear ASU / AGSU with long sleeve shirt.", isCorrect: true },
      { text: "Short sleeve shirt", rationale: "Incorrect.", isCorrect: false },
      { text: "Any authorized shirt", rationale: "Must be long sleeve.", isCorrect: false },
      { text: "Combat shirt", rationale: "Incorrect.", isCorrect: false }
    ],
    hint: "Maximum coverage."
  },
  {
    question: "What neckwear is mandatory with the long sleeve shirt?",
    options: [
      { text: "Tie or Neck Tab", rationale: "Section 6: Must wear tie / neck tab.", isCorrect: true },
      { text: "Open collar", rationale: "Only for short sleeve (not authorized here).", isCorrect: false },
      { text: "Ascot", rationale: "Incorrect.", isCorrect: false },
      { text: "Scarf", rationale: "Incorrect.", isCorrect: false }
    ],
    hint: "Tie / tab."
  },
  {
    question: "Are ID Tags required for the uniform inspection?",
    options: [
      { text: "Yes", rationale: "Section 6 lists ID Tags as a required uniform component.", isCorrect: true },
      { text: "No", rationale: "They are required.", isCorrect: false },
      { text: "Only if RA", rationale: "Required for all.", isCorrect: false },
      { text: "Optional", rationale: "Mandatory.", isCorrect: false }
    ],
    hint: "Dog tags."
  },
  {
    question: "Which regulation covers Wear and Appearance of the Uniform?",
    options: [
      { text: "AR 670-1", rationale: "Section 7 lists AR 670-1 for uniform appearance.", isCorrect: true },
      { text: "AR 600-20", rationale: "Command Policy.", isCorrect: false },
      { text: "AR 350-1", rationale: "Training.", isCorrect: false },
      { text: "AR 601-210", rationale: "Enlistment.", isCorrect: false }
    ],
    hint: "670 dash 1."
  },
  {
    question: "What should the packet file name contain?",
    options: [
      { text: "Category, Rank, Name, and RSID", rationale: "Section 8 states the file name must contain these 4 elements.", isCorrect: true },
      { text: "Rank and Name only", rationale: "Missing category and RSID.", isCorrect: false },
      { text: "Last 4 SSN and Name", rationale: "Incorrect.", isCorrect: false },
      { text: "RSID and Date", rationale: "Incorrect.", isCorrect: false }
    ],
    hint: "4 total identifiers."
  },
  {
    question: "What orientation must the STP be in?",
    options: [
      { text: "Landscape orientation", rationale: "Section 8b: Include both front and back pages in landscape orientation.", isCorrect: true },
      { text: "Portrait orientation", rationale: "Forbidden.", isCorrect: false },
      { text: "Either", rationale: "Must be landscape.", isCorrect: false },
      { text: "Upside down", rationale: "No.", isCorrect: false }
    ],
    hint: "Horizontal."
  },
  {
    question: "What pages of the STP are required?",
    options: [
      { text: "Both front and back", rationale: "Section 8b: Include both front and back pages.", isCorrect: true },
      { text: "Front page only", rationale: "Incorrect.", isCorrect: false },
      { text: "Page 1 and 3", rationale: "Incorrect.", isCorrect: false },
      { text: "Back page only", rationale: "Incorrect.", isCorrect: false }
    ],
    hint: "Full view."
  },
  {
    question: "What is the page limit for the Personal Data Sheet?",
    options: [
      { text: "2 pages", rationale: "Section 8c: PDS not to exceed two pages typewritten.", isCorrect: true },
      { text: "1 page", rationale: "Incorrect.", isCorrect: false },
      { text: "3 pages", rationale: "Incorrect.", isCorrect: false },
      { text: "Unlimited", rationale: "Incorrect.", isCorrect: false }
    ],
    hint: "Two."
  },

  {
    question: "What is the page limit for the Soldier's brief biography?",
    options: [
      { text: "1 page", rationale: "Section 8d: Biography not to exceed one page typewritten.", isCorrect: true },
      { text: "2 pages", rationale: "Incorrect.", isCorrect: false },
      { text: "Half a page", rationale: "Incorrect.", isCorrect: false },
      { text: "3 pages", rationale: "Incorrect.", isCorrect: false }
    ],
    hint: "One."
  },
  {
    question: "What type of photo must be on the biography?",
    options: [
      { text: "Color Professional Photo", rationale: "Section 8d: Include a color professional photo.", isCorrect: true },
      { text: "Black and White", rationale: "Incorrect.", isCorrect: false },
      { text: "Selfie", rationale: "Absolutely not.", isCorrect: false },
      { text: "DA Photo scan", rationale: "Must be a color professional photo.", isCorrect: false }
    ],
    hint: "High quality color."
  },
  {
    question: "What is the minimum AFT score required?",
    options: [
      { text: "375 points", rationale: "Section 8e: Total score will be 375 points or above.", isCorrect: true },
      { text: "300 points", rationale: "Standard pass, but not for this board.", isCorrect: false },
      { text: "400 points", rationale: "Higher than required.", isCorrect: false },
      { text: "350 points", rationale: "Too low.", isCorrect: false }
    ],
    hint: "Three hundred seventy-five."
  },
  {
    question: "What form is used for a male body fat test?",
    options: [
      { text: "DA Form 5500", rationale: "Section 8e: Soldiers requiring body fat test provide DA 5500.", isCorrect: true },
      { text: "DA Form 5501", rationale: "Female version.", isCorrect: false },
      { text: "DA Form 705", rationale: "AFT score form.", isCorrect: false },
      { text: "DA Form 4187", rationale: "Personnel action.", isCorrect: false }
    ],
    hint: "Ends in 00."
  },
  {
    question: "What form is used for a female body fat test?",
    options: [
      { text: "DA Form 5501", rationale: "Section 8e: Female body fat test uses DA 5501.", isCorrect: true },
      { text: "DA Form 5500", rationale: "Male version.", isCorrect: false },
      { text: "DA Form 705", rationale: "AFT score form.", isCorrect: false },
      { text: "DA Form 3349", rationale: "Profile form.", isCorrect: false }
    ],
    hint: "Ends in 01."
  },
  {
    question: "How many NCOERs are required in the packet?",
    options: [
      { text: "Last three (3)", rationale: "Section 8f: Soldier's last three NCOERs.", isCorrect: true },
      { text: "Last two (2)", rationale: "Incorrect.", isCorrect: false },
      { text: "Last five (5)", rationale: "Incorrect.", isCorrect: false },
      { text: "Most recent one", rationale: "Incorrect.", isCorrect: false }
    ],
    hint: "Three."
  },
  {
    question: "What is the order of NCOERs in the packet?",
    options: [
      { text: "Most recent to oldest", rationale: "Section 8f: Order from most recent to oldest.", isCorrect: true },
      { text: "Oldest to most recent", rationale: "Incorrect.", isCorrect: false },
      { text: "By rating level", rationale: "Incorrect.", isCorrect: false },
      { text: "Alphabetical", rationale: "Incorrect.", isCorrect: false }
    ],
    hint: "Reverse chronological."
  },
  {
    question: "What production report is required for SC packets?",
    options: [
      { text: "YTD Mission Production", rationale: "Section 8g: SC packets will have YTD Mission Production.", isCorrect: true },
      { text: "Gold Badge Report", rationale: "Only for RA/AR NCO packets.", isCorrect: false },
      { text: "Station Lead Report", rationale: "Incorrect.", isCorrect: false },
      { text: "School Prospecting Report", rationale: "Incorrect.", isCorrect: false }
    ],
    hint: "YTD mission."
  },
  {
    question: "Where is the YTD Mission Production report found in BI Zone?",
    options: [
      { text: "Mission Command > Mission and Production", rationale: "Section 8g lists this specific path.", isCorrect: true },
      { text: "Recruiting Ops > Leads", rationale: "Incorrect.", isCorrect: false },
      { text: "Commanders Corner > Stats", rationale: "Incorrect.", isCorrect: false },
      { text: "Admin > Production", rationale: "Incorrect.", isCorrect: false }
    ],
    hint: "Command > Production."
  },
  {
    question: "What additional report do RA and AR NCOs need?",
    options: [
      { text: "Gold Badge Report 'Points' YTD", rationale: "Section 8g: RA/AR NCO will provide Gold Badge Report 'Points' YTD.", isCorrect: true },
      { text: "AFT History", rationale: "Already in packet checklist.", isCorrect: false },
      { text: "Monthly Counseling", rationale: "Incorrect.", isCorrect: false },
      { text: "School Visit Logs", rationale: "Incorrect.", isCorrect: false }
    ],
    hint: "Points tracker."
  },

  {
    question: "Which ADP covers Leadership and the Profession?",
    options: [
      { text: "ADP 6-22", rationale: "Section 7 lists ADP 6-22.", isCorrect: true },
      { text: "ADP 7-0", rationale: "Covers Training.", isCorrect: false },
      { text: "ADP 3-0", rationale: "Operations.", isCorrect: false },
      { text: "ADP 5-0", rationale: "Process.", isCorrect: false }
    ],
    hint: "6-22."
  },
  {
    question: "Which ADP covers Training?",
    options: [
      { text: "ADP 7-0", rationale: "Section 7 lists ADP 7-0.", isCorrect: true },
      { text: "ADP 6-22", rationale: "Leadership.", isCorrect: false },
      { text: "ADP 1-0", rationale: "Army.", isCorrect: false },
      { text: "ADP 4-0", rationale: "Sustainment.", isCorrect: false }
    ],
    hint: "7-0."
  },
  {
    question: "Which AR covers Military Justice?",
    options: [
      { text: "AR 27-10", rationale: "Section 7 lists AR 27-10.", isCorrect: true },
      { text: "AR 27-1", rationale: "Legal Ops.", isCorrect: false },
      { text: "AR 190-4", rationale: "Incident reporting.", isCorrect: false },
      { text: "AR 600-8-19", rationale: "Promotions.", isCorrect: false }
    ],
    hint: "27 dash 10."
  },
  {
    question: "Which AR covers the Army Body Composition Program?",
    options: [
      { text: "AR 600-9", rationale: "Section 7 lists AR 600-9.", isCorrect: true },
      { text: "AR 670-1", rationale: "Uniform.", isCorrect: false },
      { text: "AR 350-1", rationale: "Training.", isCorrect: false },
      { text: "AR 601-210", rationale: "Enlistment.", isCorrect: false }
    ],
    hint: "600 dash 9."
  },
  {
    question: "Which AR covers Army Training and Leader Development?",
    options: [
      { text: "AR 350-1", rationale: "Section 7 lists AR 350-1.", isCorrect: true },
      { text: "AR 600-9", rationale: "Body comp.", isCorrect: false },
      { text: "AR 623-3", rationale: "Evaluations.", isCorrect: false },
      { text: "AR 601-210", rationale: "Enlistment.", isCorrect: false }
    ],
    hint: "350 dash 1."
  },
  {
    question: "Which AR covers the Regular Army/RC Enlistment Program?",
    options: [
      { text: "AR 601-210", rationale: "Section 7 lists AR 601-210.", isCorrect: true },
      { text: "AR 670-1", rationale: "Uniform.", isCorrect: false },
      { text: "AR 600-9", rationale: "Body comp.", isCorrect: false },
      { text: "AR 623-3", rationale: "Evaluations.", isCorrect: false }
    ],
    hint: "601 dash 210."
  },
  {
    question: "Which AR covers the Evaluation Reporting System?",
    options: [
      { text: "AR 623-3", rationale: "Section 7 lists AR 623-3.", isCorrect: true },
      { text: "AR 350-1", rationale: "Training.", isCorrect: false },
      { text: "AR 600-9", rationale: "Body comp.", isCorrect: false },
      { text: "AR 27-10", rationale: "Justice.", isCorrect: false }
    ],
    hint: "623 dash 3."
  },
  {
    question: "Which UTC covers Mission Command?",
    options: [
      { text: "UTC 5-01", rationale: "Section 7 lists UTC 5-01.", isCorrect: true },
      { text: "UTC 5-02", rationale: "Intelligence.", isCorrect: false },
      { text: "UTC 5-03.1", rationale: "Prospecting.", isCorrect: false },
      { text: "UTC 5-03.4", rationale: "Training.", isCorrect: false }
    ],
    hint: "5-01."
  },
  {
    question: "Which UTC covers Intelligence?",
    options: [
      { text: "UTC 5-02", rationale: "Section 7 lists UTC 5-02.", isCorrect: true },
      { text: "UTC 5-01", rationale: "Mission Command.", isCorrect: false },
      { text: "UTC 5-03.2", rationale: "Influencing.", isCorrect: false },
      { text: "UTC 5-03.5", rationale: "Leading Future Soldiers.", isCorrect: false }
    ],
    hint: "5-02."
  },
  {
    question: "Which UTC covers Prospecting, Processing and Analysis?",
    options: [
      { text: "UTC 5-03.1", rationale: "Section 7 lists UTC 5-03.1.", isCorrect: true },
      { text: "UTC 5-03.2", rationale: "Influencing.", isCorrect: false },
      { text: "UTC 5-03.4", rationale: "Leader Dev.", isCorrect: false },
      { text: "UTC 5-03.5", rationale: "Future Soldiers.", isCorrect: false }
    ],
    hint: "5-03.1."
  },

  {
    question: "Which UTC covers Influencing and Interviewing?",
    options: [
      { text: "UTC 5-03.2", rationale: "Section 7 lists UTC 5-03.2.", isCorrect: true },
      { text: "UTC 5-03.1", rationale: "Prospecting.", isCorrect: false },
      { text: "UTC 5-03.4", rationale: "Training.", isCorrect: false },
      { text: "UTC 5-03.5", rationale: "Future Soldiers.", isCorrect: false }
    ],
    hint: "5-03.2."
  },
  {
    question: "Which UTC covers Training and Leader Development?",
    options: [
      { text: "UTC 5-03.4", rationale: "Section 7 lists UTC 5-03.4.", isCorrect: true },
      { text: "UTC 5-03.1", rationale: "Prospecting.", isCorrect: false },
      { text: "UTC 5-03.2", rationale: "Influencing.", isCorrect: false },
      { text: "UTC 5-03.5", rationale: "Future Soldiers.", isCorrect: false }
    ],
    hint: "5-03.4."
  },
  {
    question: "Which UTC covers Leading Future Soldiers?",
    options: [
      { text: "UTC 5-03.5", rationale: "Section 7 lists UTC 5-03.5.", isCorrect: true },
      { text: "UTC 5-03.1", rationale: "Prospecting.", isCorrect: false },
      { text: "UTC 5-03.2", rationale: "Influencing.", isCorrect: false },
      { text: "UTC 5-03.4", rationale: "Training.", isCorrect: false }
    ],
    hint: "5-03.5."
  },
  {
    question: "Which UR covers Incident Reporting?",
    options: [
      { text: "UR 190-4", rationale: "Section 7 lists UR 190-4 for Incident Reporting.", isCorrect: true },
      { text: "UR 27-4", rationale: "Prohibited acts.", isCorrect: false },
      { text: "UR 350-13", rationale: "Schools.", isCorrect: false },
      { text: "UR 601-208", rationale: "Marketing.", isCorrect: false }
    ],
    hint: "190 dash 4."
  },
  {
    question: "Which UR covers the School Recruiting Program?",
    options: [
      { text: "UR 350-13", rationale: "Section 7 lists UR 350-13.", isCorrect: true },
      { text: "UR 190-4", rationale: "Incidents.", isCorrect: false },
      { text: "UR 601-208", rationale: "Marketing.", isCorrect: false },
      { text: "UR 601-210", rationale: "Accessions.", isCorrect: false }
    ],
    hint: "350 dash 13."
  },
  {
    question: "Which UR covers the Local Recruiting Marketing Program?",
    options: [
      { text: "UR 601-208", rationale: "Section 7 lists UR 601-208.", isCorrect: true },
      { text: "UR 350-13", rationale: "Schools.", isCorrect: false },
      { text: "UR 601-210", rationale: "Accessions.", isCorrect: false },
      { text: "UR 27-4", rationale: "Prohibited acts.", isCorrect: false }
    ],
    hint: "601 dash 208."
  },
  {
    question: "Which UR covers Enlistment/Accessions specifically for SC/GC?",
    options: [
      { text: "UR 601-210", rationale: "Section 7 lists UR 601-210 for SC/GC Accessions.", isCorrect: true },
      { text: "AR 601-210", rationale: "That's the Army Regulation.", isCorrect: false },
      { text: "UR 601-208", rationale: "Marketing.", isCorrect: false },
      { text: "UR 350-13", rationale: "Schools.", isCorrect: false }
    ],
    hint: "USAREC reg 601-210."
  },
  {
    question: "Which UM covers Recruiting Operations?",
    options: [
      { text: "UM 3-0", rationale: "Section 7 lists UM 3-0.", isCorrect: true },
      { text: "UTC 5-01", rationale: "Mission Command.", isCorrect: false },
      { text: "UP 608-6", rationale: "Family assistance.", isCorrect: false },
      { text: "UM 5-0", rationale: "Incorrect.", isCorrect: false }
    ],
    hint: "3 dash 0."
  },
  {
    question: "Which UP covers the Soldier Family Assistance Program?",
    options: [
      { text: "UP 608-6", rationale: "Section 7 lists UP 608-6.", isCorrect: true },
      { text: "UM 3-0", rationale: "Operations.", isCorrect: false },
      { text: "UR 27-4", rationale: "Prohibited acts.", isCorrect: false },
      { text: "TC 7-22.7", rationale: "NCO guide.", isCorrect: false }
    ],
    hint: "608 dash 6."
  },
  {
    question: "Which TC covers the Noncommissioned Officer Guide?",
    options: [
      { text: "TC 7-22.7", rationale: "Section 7 lists TC 7-22.7.", isCorrect: true },
      { text: "FM 7-22", rationale: "Health and Fitness.", isCorrect: false },
      { text: "TC 3-22", rationale: "Incorrect.", isCorrect: false },
      { text: "UTC 5-03.4", rationale: "USAREC Training.", isCorrect: false }
    ],
    hint: "7-22.7."
  },

  {
    question: "What must be known verbatim?",
    options: [
      { text: "Creeds and Army Song", rationale: "Section 7: Verbatim knowledge of Creeds and Army Song is expected.", isCorrect: true },
      { text: "AR 670-1", rationale: "Knowledge, but not verbatim.", isCorrect: false },
      { text: "UTC 5-03.1", rationale: "Knowledge, but not verbatim.", isCorrect: false },
      { text: "Company RSID list", rationale: "Knowledge, but not verbatim.", isCorrect: false }
    ],
    hint: "Creeds/Song."
  },
  {
    question: "Which version of the Recruiter Creed is required?",
    options: [
      { text: "USARD RED Book Version", rationale: "Section 7 specifies the USARD RED Book Version.", isCorrect: true },
      { text: "Old USAREC Version", rationale: "Incorrect.", isCorrect: false },
      { text: "Standard Creed", rationale: "Must use RED Book version.", isCorrect: false },
      { text: "Commanders Version", rationale: "Incorrect.", isCorrect: false }
    ],
    hint: "Red book."
  },
  {
    question: "What historical knowledge is required?",
    options: [
      { text: "USARD History", rationale: "Section 7 lists USARD History as a topic.", isCorrect: true },
      { text: "US Civil War", rationale: "Not specifically listed.", isCorrect: false },
      { text: "Battalion History", rationale: "USARD history is specified.", isCorrect: false },
      { text: "Recruiting History", rationale: "USARD is the specific answer.", isCorrect: false }
    ],
    hint: "USARD."
  },
  {
    question: "What levels of current events must be known?",
    options: [
      { text: "Local, National, and International", rationale: "Section 7 explicitly lists these three levels.", isCorrect: true },
      { text: "National only", rationale: "Missing Local and International.", isCorrect: false },
      { text: "Army events only", rationale: "Incorrect.", isCorrect: false },
      { text: "Local only", rationale: "Incorrect.", isCorrect: false }
    ],
    hint: "Three levels."
  },
  {
    question: "Who is the Board President?",
    options: [
      { text: "The Command Sergeant Major", rationale: "CSM ROBBY A. CARLSON signs as the board authority.", isCorrect: true },
      { text: "The Battalion Commander", rationale: "Incorrect.", isCorrect: false },
      { text: "A Company 1SG", rationale: "They comprise the board, but CSM is President.", isCorrect: false },
      { text: "S3 Officer", rationale: "Incorrect.", isCorrect: false }
    ],
    hint: "The MOI signatory."
  },
  {
    question: "What is the requirement for the RSID filename note for RA/AR NCOs?",
    options: [
      { text: "Include note for months not on production", rationale: "Section 8g: RA/AR NCO include a note for any months not on production.", isCorrect: true },
      { text: "Include SSN", rationale: "PII forbidden.", isCorrect: false },
      { text: "Include station name", rationale: "Not specified.", isCorrect: false },
      { text: "Include 1SG name", rationale: "Not specified.", isCorrect: false }
    ],
    hint: "Missing production note."
  },
  {
    question: "What Graphic Training Aid is listed?",
    options: [
      { text: "USAREC GTA 5-01.2", rationale: "Section 7 lists USAREC GTA 5-01.2 (RFA).", isCorrect: true },
      { text: "GTA 7-1", rationale: "Incorrect.", isCorrect: false },
      { text: "USAREC GTA 3-0", rationale: "Incorrect.", isCorrect: false },
      { text: "GTA 5-10", rationale: "Incorrect.", isCorrect: false }
    ],
    hint: "5-01.2."
  },
  {
    question: "What is the RFA acronym?",
    options: [
      { text: "Recruiting Functions Analysis", rationale: "Section 7 defines RFA as Recruiting Functions Analysis.", isCorrect: true },
      { text: "Recruiter Field Activity", rationale: "Incorrect.", isCorrect: false },
      { text: "Recruiting Flow Assessment", rationale: "Incorrect.", isCorrect: false },
      { text: "Recruiting Functional Area", rationale: "Incorrect.", isCorrect: false }
    ],
    hint: "Functions Analysis."
  },
  {
    question: "Who signs the MOI?",
    options: [
      { text: "ROBBY A. CARLSON", rationale: "CSM Robby A. Carlson signed the memorandum.", isCorrect: true },
      { text: "ROBBY B. CARLSON", rationale: "Middle initial is A.", isCorrect: false },
      { text: "MICHAEL DELONG", rationale: "He is the POC.", isCorrect: false },
      { text: "BATTALION COMMANDER", rationale: "CSM signed it.", isCorrect: false }
    ],
    hint: "CSM Robby."
  },
  {
    question: "What is the rank of the Board POC Michael DeLong?",
    options: [
      { text: "Master Sergeant (MSG)", rationale: "Section 9: The POC for this action is MSG DeLong, Michael.", isCorrect: true },
      { text: "First Sergeant (1SG)", rationale: "Incorrect.", isCorrect: false },
      { text: "Sergeant First Class (SFC)", rationale: "Incorrect.", isCorrect: false },
      { text: "Sergeant Major (SGM)", rationale: "Incorrect.", isCorrect: false }
    ],
    hint: "MSG."
  },

  {
    question: "What is the RSID for North Bay Company?",
    options: [
      { text: "6I6", rationale: "Enclosure 5 lists 6I6 North Bay Company.", isCorrect: true },
      { text: "6I0", rationale: "Sierra Nevada.", isCorrect: false },
      { text: "6I3", rationale: "Sacramento Valley.", isCorrect: false },
      { text: "6I1", rationale: "Redding.", isCorrect: false }
    ],
    hint: "Highest RSID number."
  },
  {
    question: "What is the RSID for Sierra Nevada Company?",
    options: [
      { text: "6I0", rationale: "Enclosure 1 lists 6I0 Sierra Nevada Company.", isCorrect: true },
      { text: "6I1", rationale: "Redding.", isCorrect: false },
      { text: "6I5", rationale: "Capital.", isCorrect: false },
      { text: "6I6", rationale: "North Bay.", isCorrect: false }
    ],
    hint: "Zero."
  },
  {
    question: "What is the RSID for Redding Company?",
    options: [
      { text: "6I1", rationale: "Enclosure 2 lists 6I1 Redding Company.", isCorrect: true },
      { text: "6I0", rationale: "Sierra Nevada.", isCorrect: false },
      { text: "6I3", rationale: "Sacramento Valley.", isCorrect: false },
      { text: "6I5", rationale: "Capital.", isCorrect: false }
    ],
    hint: "One."
  },
  {
    question: "What is the RSID for Sacramento Valley Company?",
    options: [
      { text: "6I3", rationale: "Enclosure 3 lists 6I3 Sacramento Valley Company.", isCorrect: true },
      { text: "6I1", rationale: "Redding.", isCorrect: false },
      { text: "6I5", rationale: "Capital.", isCorrect: false },
      { text: "6I6", rationale: "North Bay.", isCorrect: false }
    ],
    hint: "Three."
  },
  {
    question: "What is the RSID for Capital Company?",
    options: [
      { text: "6I5", rationale: "Enclosure 4 lists 6I5 Capital Company.", isCorrect: true },
      { text: "6I3", rationale: "Sacramento Valley.", isCorrect: false },
      { text: "6I6", rationale: "North Bay.", isCorrect: false },
      { text: "6I1", rationale: "Redding.", isCorrect: false }
    ],
    hint: "Five."
  },
  {
    question: "Where is Redding Company located according to the RSID?",
    options: [
      { text: "6I1", rationale: "RSID 6I1 is Redding.", isCorrect: true },
      { text: "6I0", rationale: "Sierra Nevada.", isCorrect: false },
      { text: "6I3", rationale: "Sacramento.", isCorrect: false },
      { text: "6I5", rationale: "Capital.", isCorrect: false }
    ],
    hint: "Second enclosure."
  },
  {
    question: "Which RSID is Sacramento Valley?",
    options: [
      { text: "6I3", rationale: "Sacramento Valley is 6I3.", isCorrect: true },
      { text: "6I0", rationale: "Sierra Nevada.", isCorrect: false },
      { text: "6I5", rationale: "Capital.", isCorrect: false },
      { text: "6I6", rationale: "North Bay.", isCorrect: false }
    ],
    hint: "Third enclosure."
  },
  {
    question: "Which company is RSID 6I0?",
    options: [
      { text: "Sierra Nevada Company", rationale: "6I0 is Sierra Nevada.", isCorrect: true },
      { text: "Redding", rationale: "6I1.", isCorrect: false },
      { text: "North Bay", rationale: "6I6.", isCorrect: false },
      { text: "Capital", rationale: "6I5.", isCorrect: false }
    ],
    hint: "Enclosure 1."
  },
  {
    question: "Which company is RSID 6I5?",
    options: [
      { text: "Capital Company", rationale: "6I5 is Capital.", isCorrect: true },
      { text: "Redding", rationale: "6I1.", isCorrect: false },
      { text: "North Bay", rationale: "6I6.", isCorrect: false },
      { text: "Sierra Nevada", rationale: "6I0.", isCorrect: false }
    ],
    hint: "Enclosure 4."
  },
  {
    question: "Which company is RSID 6I6?",
    options: [
      { text: "North Bay Company", rationale: "6I6 is North Bay.", isCorrect: true },
      { text: "Sacramento Valley", rationale: "6I3.", isCorrect: false },
      { text: "Sierra Nevada", rationale: "6I0.", isCorrect: false },
      { text: "Redding", rationale: "6I1.", isCorrect: false }
    ],
    hint: "Enclosure 5."
  },

  {
    question: "Can an incomplete packet be submitted?",
    options: [
      { text: "No, it will be returned for adjustment.", rationale: "Section 8: Incomplete packets will be returned to Companies for adjustment.", isCorrect: true },
      { text: "Yes, but with point deductions.", rationale: "It is returned, not scored with penalties.", isCorrect: false },
      { text: "Yes, if CSM approves.", rationale: "CSM only approves lateness, not incompleteness.", isCorrect: false },
      { text: "Only with an ETP.", rationale: "ETP is for production, not administrative errors.", isCorrect: false }
    ],
    hint: "Returned."
  },
  {
    question: "How should the top of the scan be facing in the PDF?",
    options: [
      { text: "Facing up", rationale: "Section 8: Single PDF file... with the top of the document facing up.", isCorrect: true },
      { text: "Facing left", rationale: "Incorrect.", isCorrect: false },
      { text: "Either way", rationale: "Must be top up.", isCorrect: false },
      { text: "Facing down", rationale: "Incorrect.", isCorrect: false }
    ],
    hint: "Normal reading view."
  },
  {
    question: "Is scanning in color mandatory for the packet?",
    options: [
      { text: "Yes", rationale: "Section 8: Must be a single PDF file, scanned in color.", isCorrect: true },
      { text: "No", rationale: "Incorrect.", isCorrect: false },
      { text: "Only for the photo", rationale: "Entire packet must be in color.", isCorrect: false },
      { text: "Black and white preferred", rationale: "No.", isCorrect: false }
    ],
    hint: "Mandatory."
  },
  {
    question: "Which year NCOERs are listed in the MOI as examples?",
    options: [
      { text: "2025, 2024, 2023", rationale: "Section 8f specifically lists 2025, 2024, then 2023.", isCorrect: true },
      { text: "2024, 2023, 2022", rationale: "Incorrect.", isCorrect: false },
      { text: "2026, 2025, 2024", rationale: "Incorrect.", isCorrect: false },
      { text: "2023, 2022, 2021", rationale: "Incorrect.", isCorrect: false }
    ],
    hint: "Starting with 2025."
  },
  {
    question: "Which office receives the board packets?",
    options: [
      { text: "S3 Training", rationale: "Section 2: Submit packets to S3 Training.", isCorrect: true },
      { text: "S1 HR", rationale: "Incorrect.", isCorrect: false },
      { text: "S2 Intel", rationale: "Incorrect.", isCorrect: false },
      { text: "Command Group", rationale: "Incorrect.", isCorrect: false }
    ],
    hint: "S3."
  },
  {
    question: "What is the acronym QAB?",
    options: [
      { text: "Quarterly Awards Board", rationale: "MOI Subject: Quarter Awards Board (QAB).", isCorrect: true },
      { text: "Qualified Applicant Board", rationale: "Incorrect.", isCorrect: false },
      { text: "Quality Assessment Board", rationale: "Incorrect.", isCorrect: false },
      { text: "Quarterly Administrative Board", rationale: "Incorrect.", isCorrect: false }
    ],
    hint: "Awards."
  },
  {
    question: "What is the memorandum date of the MOI?",
    options: [
      { text: "09 February 2026", rationale: "Top right of MOI: 09 February 2026.", isCorrect: true },
      { text: "05 March 2026", rationale: "Packet due date.", isCorrect: false },
      { text: "19 March 2026", rationale: "Board date.", isCorrect: false },
      { text: "01 January 2026", rationale: "Incorrect.", isCorrect: false }
    ],
    hint: "Check top right corner."
  },
  {
    question: "What specific Enclosure lists North Bay Company?",
    options: [
      { text: "Enclosure 5", rationale: "Enclosure 5 is North Bay.", isCorrect: true },
      { text: "Enclosure 1", rationale: "Sierra Nevada.", isCorrect: false },
      { text: "Enclosure 2", rationale: "Redding.", isCorrect: false },
      { text: "Enclosure 4", rationale: "Capital.", isCorrect: false }
    ],
    hint: "Last enclosure."
  },
  {
    question: "Which office's suite is 230?",
    options: [
      { text: "Battalion HQ", rationale: "Address lists Suite 230 for the Battalion HQ.", isCorrect: true },
      { text: "Sierra Nevada Co", rationale: "Incorrect.", isCorrect: false },
      { text: "Redding Co", rationale: "Incorrect.", isCorrect: false },
      { text: "S3 Training Shop", rationale: "It's the general HQ suite.", isCorrect: false }
    ],
    hint: "HQ."
  },
  {
    question: "What is the street name in the HQ address?",
    options: [
      { text: "Sunrise Boulevard", rationale: "Address: 2880 Sunrise Boulevard.", isCorrect: true },
      { text: "Sunset Boulevard", rationale: "Incorrect.", isCorrect: false },
      { text: "Rancho Road", rationale: "Incorrect.", isCorrect: false },
      { text: "Recruiting Way", rationale: "Incorrect.", isCorrect: false }
    ],
    hint: "Opposite of sunset."
  },

  {
    question: "What is Tab A?",
    options: [
      { text: "Packet Checklist", rationale: "Section 8a: Tab A is the fillable checklist.", isCorrect: true },
      { text: "Biography", rationale: "Tab C.", isCorrect: false },
      { text: "PDS", rationale: "Tab B.", isCorrect: false },
      { text: "ETP Sample", rationale: "Tab D.", isCorrect: false }
    ],
    hint: "Checklist."
  },
  {
    question: "What is Tab C?",
    options: [
      { text: "Soldier Biography Example", rationale: "Section 8d: Tab C is the biography example.", isCorrect: true },
      { text: "PDS", rationale: "Tab B.", isCorrect: false },
      { text: "Checklist", rationale: "Tab A.", isCorrect: false },
      { text: "ETP Sample", rationale: "Tab D.", isCorrect: false }
    ],
    hint: "Bio."
  },
  {
    question: "What is Tab D?",
    options: [
      { text: "Sample ETP MFR", rationale: "Section 3b: Tab D for Sample ETP MFR.", isCorrect: true },
      { text: "Biography", rationale: "Tab C.", isCorrect: false },
      { text: "Checklist", rationale: "Tab A.", isCorrect: false },
      { text: "PDS", rationale: "Tab B.", isCorrect: false }
    ],
    hint: "Exception memo."
  },
  {
    question: "What is Tab B?",
    options: [
      { text: "Fillable PDS", rationale: "Section 8c: Tab B for a fillable PDS.", isCorrect: true },
      { text: "Checklist", rationale: "Tab A.", isCorrect: false },
      { text: "Bio", rationale: "Tab C.", isCorrect: false },
      { text: "ETP", rationale: "Tab D.", isCorrect: false }
    ],
    hint: "Data sheet."
  },
  {
    question: "Is a permanent profile required in the packet if applicable?",
    options: [
      { text: "Yes, include P2 / P3 as needed", rationale: "Section 8e: Included P2 / P3 Permanent Profile as needed.", isCorrect: true },
      { text: "No", rationale: "Incorrect.", isCorrect: false },
      { text: "Only if score is below 375", rationale: "Required if Soldier has a profile.", isCorrect: false },
      { text: "Only for SC category", rationale: "Required for any category if applicable.", isCorrect: false }
    ],
    hint: "P2 / P3."
  },
  {
    question: "Which regulation covers incident reporting?",
    options: [
      { text: "UR 190-4", rationale: "Section 7 lists UR 190-4 for Incident Reporting.", isCorrect: true },
      { text: "UR 27-4", rationale: "Prohibited acts.", isCorrect: false },
      { text: "AR 600-9", rationale: "Body comp.", isCorrect: false },
      { text: "AR 27-10", rationale: "Justice.", isCorrect: false }
    ],
    hint: "190 dash 4."
  },
  {
    question: "Which regulation covers the School Recruiting Program?",
    options: [
      { text: "UR 350-13", rationale: "Section 7 lists UR 350-13.", isCorrect: true },
      { text: "AR 350-1", rationale: "That's Training and Leader Development.", isCorrect: false },
      { text: "UR 601-208", rationale: "Marketing.", isCorrect: false },
      { text: "UR 190-4", rationale: "Incidents.", isCorrect: false }
    ],
    hint: "350 dash 13."
  },
  {
    question: "Which regulation covers the Army Song and USARD History knowledge?",
    options: [
      { text: "TC 7-22.7", rationale: "NCO guide (TC 7-22.7) generally contains history and creeds.", isCorrect: true },
      { text: "AR 670-1", rationale: "Uniform.", isCorrect: false },
      { text: "ADP 7-0", rationale: "Training.", isCorrect: false },
      { text: "UR 27-4", rationale: "Prohibited acts.", isCorrect: false }
    ],
    hint: "NCO guide."
  },
  {
    question: "What is the zip code for the Battalion HQ?",
    options: [
      { text: "95742-6103", rationale: "Letterhead lists 95742-6103.", isCorrect: true },
      { text: "95814", rationale: "Incorrect.", isCorrect: false },
      { text: "89438", rationale: "That's user's home area zip.", isCorrect: false },
      { text: "94101", rationale: "Incorrect.", isCorrect: false }
    ],
    hint: "95742."
  },
  {
    question: "Who nominates Soldiers for the board?",
    options: [
      { text: "Companies", rationale: "Section 3: Companies will nominate one qualified Soldier.", isCorrect: true },
      { text: "Battalion S3", rationale: "S3 receives them, Companies nominate.", isCorrect: false },
      { text: "The Soldier themselves", rationale: "They are nominated by their unit.", isCorrect: false },
      { text: "The Command Sergeant Major", rationale: "He receives the nominations via the board.", isCorrect: false }
    ],
    hint: "The Company level."
  },
  {
    question: "How long must an AR Recruiting NCO be on production to compete?",
    options: [
      { text: "Minimum 9 months", rationale: "Section 3c: AR Recruiting NCO must be on production for a minimum of 9 months.", isCorrect: true },
      { text: "6 months", rationale: "Too short.", isCorrect: false },
      { text: "12 months", rationale: "9 is the minimum.", isCorrect: false },
      { text: "18 months", rationale: "Incorrect.", isCorrect: false }
    ],
    hint: "Same as RA."
  },
  {
    question: "Which category does NOT have a monthly write rate listed in the MOI?",
    options: [
      { text: "Station Commander", rationale: "Section 3a for Station Commander does not list a specific write rate, only tenure.", isCorrect: true },
      { text: "RA Recruiting NCO", rationale: "Lists 1.0/month.", isCorrect: false },
      { text: "AR Recruiting NCO", rationale: "Lists 1.0/month.", isCorrect: false },
      { text: "All categories list write rates", rationale: "Incorrect.", isCorrect: false }
    ],
    hint: "The leadership role."
  },
  {
    question: "What type of punishment in FY26 results in disqualification?",
    options: [
      { text: "Judicial or non-judicial", rationale: "Section 4 explicitly states any judicial or non-judicial punishment.", isCorrect: true },
      { text: "Only Article 15s", rationale: "Includes judicial as well.", isCorrect: false },
      { text: "Only court martials", rationale: "Includes non-judicial as well.", isCorrect: false },
      { text: "Letters of Reprimand only", rationale: "Broader scope.", isCorrect: false }
    ],
    hint: "Both types."
  },
  {
    question: "What is the mandatory report time for the board?",
    options: [
      { text: "1000hrs", rationale: "Section 5: Nominees will report at 1000hrs.", isCorrect: true },
      { text: "0800hrs", rationale: "Incorrect.", isCorrect: false },
      { text: "1030hrs", rationale: "Start time.", isCorrect: false },
      { text: "0900hrs", rationale: "Incorrect.", isCorrect: false }
    ],
    hint: "10 o'clock."
  },
  {
    question: "What is the starting RSID for Sierra Nevada Company?",
    options: [
      { text: "6I0", rationale: "Enclosure 1: 6I0 Sierra Nevada Company.", isCorrect: true },
      { text: "6A2", rationale: "Incorrect.", isCorrect: false },
      { text: "6I1", rationale: "Redding.", isCorrect: false },
      { text: "6I6", rationale: "North Bay.", isCorrect: false }
    ],
    hint: "First Enclosure."
  },
  {
    question: "Which section lists the required study materials?",
    options: [
      { text: "Section 7", rationale: "Section 7 (Knowledge) contains the full list of ARs, URs, and UTCs.", isCorrect: true },
      { text: "Section 1", rationale: "Purpose.", isCorrect: false },
      { text: "Section 8", rationale: "Packets.", isCorrect: false },
      { text: "Section 6", rationale: "Uniform.", isCorrect: false }
    ],
    hint: "The lucky number."
  },
  {
    question: "What is the subject of UR 601-210 for SC/GC?",
    options: [
      { text: "Enlistment and Accessions Procedures", rationale: "Section 7 lists UR 601-210 as Enlistment and Accessions Procedures.", isCorrect: true },
      { text: "School Programs", rationale: "UR 350-13.", isCorrect: false },
      { text: "Marketing", rationale: "UR 601-208.", isCorrect: false },
      { text: "Operations", rationale: "UM 3-0.", isCorrect: false }
    ],
    hint: "Procedures."
  },
  {
    question: "Which UTC covers Prospecting, Processing, and Analysis?",
    options: [
      { text: "UTC 5-03.1", rationale: "Section 7 lists UTC 5-03.1 for Prospecting.", isCorrect: true },
      { text: "UTC 5-01", rationale: "Mission Command.", isCorrect: false },
      { text: "UTC 5-02", rationale: "Intelligence.", isCorrect: false },
      { text: "UTC 5-03.4", rationale: "Training.", isCorrect: false }
    ],
    hint: "Point one."
  },
  {
    question: "What is the maximum page count for the biography?",
    options: [
      { text: "One page", rationale: "Section 8d: Not to exceed one page typewritten.", isCorrect: true },
      { text: "Two pages", rationale: "PDS limit.", isCorrect: false },
      { text: "Unlimited", rationale: "Incorrect.", isCorrect: false },
      { text: "Half page", rationale: "Incorrect.", isCorrect: false }
    ],
    hint: "Single sheet."
  },
  {
    question: "What is the maximum page count for the PDS?",
    options: [
      { text: "Two pages", rationale: "Section 8c: Not to exceed two pages typewritten.", isCorrect: true },
      { text: "One page", rationale: "Bio limit.", isCorrect: false },
      { text: "Three pages", rationale: "Incorrect.", isCorrect: false },
      { text: "Five pages", rationale: "Incorrect.", isCorrect: false }
    ],
    hint: "Double sheet."
  },
  {
    question: "What must be initialed at each review level?",
    options: [
      { text: "Packet Checklist", rationale: "Section 8a: Packet Checklist must be initialed to confirm review.", isCorrect: true },
      { text: "NCOERs", rationale: "Incorrect.", isCorrect: false },
      { text: "PDS", rationale: "Incorrect.", isCorrect: false },
      { text: "STP", rationale: "Incorrect.", isCorrect: false }
    ],
    hint: "Checklist."
  },
  {
    question: "Is the AGSU authorized for the board?",
    options: [
      { text: "Yes", rationale: "Section 6 explicitly lists ASU / AGSU.", isCorrect: true },
      { text: "No", rationale: "Incorrect.", isCorrect: false },
      { text: "Only for Station Commanders", rationale: "Required for all.", isCorrect: false },
      { text: "Only if RA", rationale: "Required for all.", isCorrect: false }
    ],
    hint: "Green or Blue."
  },
  {
    question: "Who is the primary POC for this action?",
    options: [
      { text: "MSG DeLong", rationale: "Section 9: The POC for this action is MSG DeLong, Michael.", isCorrect: true },
      { text: "CSM Carlson", rationale: "Signed, but not POC.", isCorrect: false },
      { text: "S3 Training Officer", rationale: "MSG DeLong is specified.", isCorrect: false },
      { text: "Company 1SG", rationale: "Incorrect.", isCorrect: false }
    ],
    hint: "MSG."
  },
  {
    question: "Which regulation covers Evaluation Reporting System?",
    options: [
      { text: "AR 623-3", rationale: "Section 7 lists AR 623-3.", isCorrect: true },
      { text: "AR 670-1", rationale: "Uniform.", isCorrect: false },
      { text: "AR 600-9", rationale: "Body comp.", isCorrect: false },
      { text: "AR 350-1", rationale: "Training.", isCorrect: false }
    ],
    hint: "623."
  },
  {
    question: "What is the correct zip code suffix for the BN HQ?",
    options: [
      { text: "-6103", rationale: "Address lists 95742-6103.", isCorrect: true },
      { text: "-1234", rationale: "Incorrect.", isCorrect: false },
      { text: "-9999", rationale: "Incorrect.", isCorrect: false },
      { text: "-0001", rationale: "Incorrect.", isCorrect: false }
    ],
    hint: "6-1-0-3."
  },
  {
    question: "What is the subject of UTC 5-02?",
    options: [
      { text: "Intelligence", rationale: "Section 7 lists UTC 5-02 as Intelligence.", isCorrect: true },
      { text: "Mission Command", rationale: "UTC 5-01.", isCorrect: false },
      { text: "Prospecting", rationale: "UTC 5-03.1.", isCorrect: false },
      { text: "Leader Development", rationale: "UTC 5-03.4.", isCorrect: false }
    ],
    hint: "Shop 2."
  },
  {
    question: "What is the starting year for the NCOER sequence in the packet?",
    options: [
      { text: "2025", rationale: "Section 8f: From most recent (i.e. 2025).", isCorrect: true },
      { text: "2024", rationale: "Second in sequence.", isCorrect: false },
      { text: "2026", rationale: "Future year.", isCorrect: false },
      { text: "2023", rationale: "Third in sequence.", isCorrect: false }
    ],
    hint: "Most recent."
  },
  {
    question: "Which enclosure covers Capital Company?",
    options: [
      { text: "Enclosure 4", rationale: "Enclosure 4: 6I5 Capital Company.", isCorrect: true },
      { text: "Enclosure 1", rationale: "Sierra Nevada.", isCorrect: false },
      { text: "Enclosure 5", rationale: "North Bay.", isCorrect: false },
      { text: "Enclosure 3", rationale: "Sacramento Valley.", isCorrect: false }
    ],
    hint: "RSID 6I5."
  },
  {
    question: "Which RSID corresponds to Redding Company?",
    options: [
      { text: "6I1", rationale: "Enclosure 2: 6I1 Redding Company.", isCorrect: true },
      { text: "6I0", rationale: "Sierra Nevada.", isCorrect: false },
      { text: "6I3", rationale: "Sacramento Valley.", isCorrect: false },
      { text: "6I6", rationale: "North Bay.", isCorrect: false }
    ],
    hint: "Second enclosure."
  },
  {
    question: "What is the final question in this marathon quiz?",
    options: [
      { text: "The correct one", rationale: "You've completed the marathon! VERBUM SAT SAPIENTI.", isCorrect: true },
      { text: "A trick", rationale: "Not quite.", isCorrect: false },
      { text: "The wrong one", rationale: "Incorrect.", isCorrect: false },
      { text: "Almost there", rationale: "Incorrect.", isCorrect: false }
    ],
    hint: "Excellence."
  }
];

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
    // Generate a random retry quote for the results screen
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
    let message = "";
    
    if (percentage >= 90) {
      message = "Outstanding! You have mastered the MOI and are board-ready.";
    } else if (percentage >= 70) {
      message = "Great effort! A few more training cycles and you'll be unbeatable.";
    } else {
      missionStatus = "RE-TRAINING REQUIRED";
      statusColor = "text-amber-400";
      message = "The mission isn't over. Review the regulations and go again.";
    }

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-emerald-950 flex flex-col items-center justify-center p-4 font-sans text-slate-100">
        <style>{`
          @keyframes pop-in {
            0% { opacity: 0; transform: scale(0.95) translateY(10px); }
            100% { opacity: 1; transform: scale(1) translateY(0); }
          }
          .animate-pop-in { animation: pop-in 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        `}</style>
        
        <div className="bg-slate-800/80 backdrop-blur-lg max-w-2xl w-full rounded-3xl shadow-2xl overflow-hidden border border-emerald-500/20 animate-pop-in">
          <div className="bg-emerald-900/50 p-10 text-center relative overflow-hidden border-b border-emerald-500/20">
            <Trophy className="w-24 h-24 text-emerald-400 mx-auto mb-6 animate-bounce drop-shadow-[0_0_15px_rgba(52,211,153,0.4)]" />
            <h2 className={`text-sm font-black tracking-[0.3em] uppercase mb-2 ${statusColor}`}>
              {missionStatus}
            </h2>
            <h3 className="text-3xl font-extrabold text-white tracking-tight">Final Assessment</h3>
          </div>
          
          <div className="p-10 text-center space-y-8">
            <div className="flex justify-center items-baseline gap-2">
              <span className="text-8xl font-black text-emerald-400 drop-shadow-sm">{score}</span>
              <span className="text-3xl text-slate-500 font-bold">/ {quizData.length}</span>
            </div>
            
            <div className="space-y-2">
              <p className="text-2xl font-bold text-white">{percentage}% Correct</p>
              <p className="text-slate-400 text-lg max-w-md mx-auto">{message}</p>
            </div>

            {/* Motivational Retry Section */}
            <div className="py-8 px-6 bg-slate-900/50 rounded-2xl border border-emerald-500/10 relative">
              <Quote className="w-8 h-8 text-emerald-500/20 absolute -top-4 left-6" />
              <p className="text-emerald-100/90 italic font-medium text-lg leading-relaxed">
                "{retryQuote.text}"
              </p>
              <p className="mt-3 text-emerald-400/70 font-bold uppercase text-xs tracking-widest">— {retryQuote.author}</p>
            </div>

            <button 
              onClick={restartQuiz}
              className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white py-5 px-6 rounded-2xl font-black text-lg transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-emerald-900/40 group"
            >
              <RotateCcw className="w-6 h-6 group-hover:-rotate-180 transition-transform duration-500 ease-in-out" />
              RE-START TRAINING MISSION
            </button>
          </div>
        </div>

        <div className="mt-8 text-emerald-500/40 text-sm font-bold tracking-widest uppercase flex items-center gap-3 animate-pulse">
          <Sparkles className="w-4 h-4" /> Quiz Made by 1SG Atehortua <Sparkles className="w-4 h-4" />
        </div>
      </div>
    );
  }

  const currentQ = quizData[currentQuestion];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200 flex flex-col items-center justify-center p-4 md:p-8 font-sans text-slate-800 transition-colors duration-500">
      <style>{`
        @keyframes fade-in-up {
          0% { opacity: 0; transform: translateY(15px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up { animation: fade-in-up 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        
        @keyframes shake-err {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
        .animate-shake { animation: shake-err 0.3s ease-in-out; }
      `}</style>
      
      <div className="bg-white max-w-4xl w-full rounded-3xl shadow-2xl overflow-hidden border border-slate-200/60 flex flex-col h-full md:h-auto md:max-h-[90vh] transition-all duration-300">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-800 via-emerald-700 to-teal-900 px-6 py-5 md:px-8 md:py-6 flex justify-between items-center shrink-0 relative overflow-hidden shadow-md">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
          <h1 className="text-white font-extrabold text-lg md:text-xl truncate mr-4 relative z-10 flex items-center gap-3 tracking-wide uppercase">
            <Award className="w-6 h-6 text-emerald-300" />
            FY26 2nd QAB Board Prep
          </h1>
          <div className="flex items-center gap-2 relative z-10">
            <button 
              onClick={restartQuiz}
              className="flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-md text-emerald-50 px-3 py-1.5 rounded-lg text-xs font-bold border border-white/10 transition-all shadow-lg active:scale-95 group"
              title="Restart Quiz"
            >
              <RefreshCw className="w-3.5 h-3.5 group-hover:rotate-180 transition-transform duration-500" />
              <span className="hidden sm:inline uppercase">Restart</span>
            </button>
            <div className="bg-white/20 backdrop-blur-md text-emerald-50 px-4 py-1.5 rounded-full text-sm font-bold border border-white/20 shadow-inner flex items-center gap-2">
               <Shield className="w-3.5 h-3.5 text-emerald-300" />
               <span className="tabular-nums">{3 - attempts}</span>
            </div>
            <div className="bg-white/20 backdrop-blur-md text-emerald-50 px-4 py-1.5 rounded-full text-sm font-bold border border-white/20 shadow-inner">
              {currentQuestion + 1} / {quizData.length}
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-slate-200 h-2 shrink-0 overflow-hidden">
          <div 
            className="bg-gradient-to-r from-emerald-400 via-teal-500 to-emerald-500 h-full transition-all duration-700 ease-out relative"
            style={{ width: `${((currentQuestion + 1) / quizData.length) * 100}%` }}
          >
             <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
          </div>
        </div>

        {/* Main Content Area - Scrollable */}
        <div className={`p-6 md:p-10 flex-1 overflow-y-auto ${shake ? 'animate-shake' : ''}`} key={currentQuestion}>
          <h2 className="text-xl md:text-3xl font-black text-slate-800 mb-8 leading-tight animate-fade-in-up" style={{animationDelay: '0ms'}}>
            {currentQ.question}
          </h2>

          <div className="space-y-4 mb-10">
            {currentQ.options.map((option, index) => {
              let buttonClass = "w-full text-left p-5 md:p-6 rounded-2xl border-2 transition-all duration-300 flex items-start gap-5 transform active:scale-[0.98] outline-none ";
              
              const isSelected = selectedOption === index;
              
              if (!isAnswered) {
                if (isSelected && !option.isCorrect) {
                  buttonClass += "border-red-400 bg-red-50 text-red-900 font-bold shadow-lg animate-shake";
                } else {
                  buttonClass += "border-slate-200 hover:border-emerald-500 hover:bg-emerald-50/50 bg-white text-slate-700 font-medium hover:-translate-y-1 hover:shadow-xl hover:shadow-emerald-500/10";
                }
              } else {
                if (isSelected) {
                  if (option.isCorrect) {
                    buttonClass += "border-emerald-500 bg-emerald-50 text-emerald-900 font-bold shadow-lg shadow-emerald-500/20 ring-4 ring-emerald-500/20";
                  } else {
                    buttonClass += "border-red-400 bg-red-50 text-red-900 font-bold shadow-lg shadow-red-500/20 grayscale-[20%]";
                  }
                } else {
                  buttonClass += "border-slate-100 bg-slate-50/50 text-slate-400 opacity-60 grayscale-[30%]";
                }
              }

              return (
                <button
                  key={index}
                  onClick={() => handleOptionClick(index, option.isCorrect)}
                  disabled={isAnswered}
                  className={buttonClass}
                >
                  <div className="mt-1 shrink-0 transition-transform duration-300">
                    {isSelected && option.isCorrect && <CheckCircle className="w-7 h-7 text-emerald-500 drop-shadow-md" />}
                    {isSelected && !option.isCorrect && <XCircle className="w-7 h-7 text-red-500 drop-shadow-md" />}
                    {!isSelected && <div className="w-7 h-7 rounded-full border-2 border-slate-300"></div>}
                  </div>
                  <div className="flex flex-col text-left flex-1">
                    <span className="text-lg md:text-xl leading-snug font-semibold">{option.text}</span>
                    {isSelected && (
                      <div className={`mt-4 text-sm md:text-base p-4 rounded-xl border animate-fade-in-up shadow-sm ${option.isCorrect ? 'bg-emerald-100 border-emerald-300 text-emerald-900' : 'bg-red-100 border-red-300 text-red-900'}`}>
                        <span className="font-black uppercase tracking-widest text-xs flex items-center gap-2 mb-2">
                          {option.isCorrect ? <Sparkles className="w-4 h-4" /> : <AlertTriangle className="w-4 h-4" />}
                          {option.isCorrect ? 'Correct Path' : 'Incorrect Intelligence'}
                        </span>
                        <span className="leading-relaxed block font-medium italic">{option.rationale}</span>
                      </div>
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Feedback Area */}
          {isAnswered && (
            <div className={`p-6 rounded-2xl mb-8 flex items-center gap-5 transform transition-all duration-500 shadow-xl animate-fade-in-up border-2 ${quizData[currentQuestion].options[selectedOption].isCorrect ? 'bg-gradient-to-r from-emerald-50 to-teal-50 border-emerald-300' : 'bg-gradient-to-r from-red-50 to-orange-50 border-red-300'}`}>
               <div className="shrink-0 bg-white rounded-full p-2 shadow-inner">
                 {quizData[currentQuestion].options[selectedOption].isCorrect ? (
                    <Trophy className="w-8 h-8 text-emerald-500 animate-bounce" />
                 ) : (
                    <Target className="w-8 h-8 text-red-500 animate-pulse" />
                 )}
               </div>
               <p className={`font-black text-lg md:text-xl tracking-tight uppercase ${quizData[currentQuestion].options[selectedOption].isCorrect ? 'text-emerald-800' : 'text-red-800'}`}>
                 {quizData[currentQuestion].options[selectedOption].isCorrect 
                   ? 'Outstanding! Mission Success. 🌟' 
                   : 'Combat Ineffective. No Point Awarded. 💡'}
               </p>
            </div>
          )}

          {/* Bottom Actions Bar */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 py-6 border-t border-slate-100">
            {/* Hint Toggle */}
            {!isAnswered ? (
              <button 
                onClick={() => setShowHint(!showHint)}
                className="flex items-center gap-2 text-amber-600 font-black uppercase tracking-widest text-xs hover:text-amber-700 transition-colors bg-amber-50 hover:bg-amber-100 px-5 py-2.5 rounded-full shadow-sm"
              >
                <Lightbulb className="w-4 h-4" />
                {showHint ? "Hide Hint" : "Hint"}
              </button>
            ) : <div />}

            <button
              onClick={handleNextQuestion}
              disabled={!isAnswered}
              className={`w-full md:w-auto flex items-center justify-center gap-3 py-4 px-12 rounded-2xl font-black text-lg transition-all transform duration-300 ${
                isAnswered 
                  ? 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white shadow-xl shadow-emerald-500/30 hover:-translate-y-1 hover:scale-105 active:scale-95' 
                  : 'bg-slate-100 text-slate-400 cursor-not-allowed grayscale'
              }`}
            >
              {currentQuestion === quizData.length - 1 ? "MISSION DEBRIEF" : "Next"}
              <ArrowRight className="w-6 h-6" />
            </button>
          </div>

          {showHint && !isAnswered && (
            <div className="mt-4 p-5 bg-gradient-to-r from-amber-50 to-yellow-50 border-l-8 border-amber-400 rounded-r-xl shadow-lg text-amber-950 text-base animate-fade-in-up font-bold italic">
              "Tactical Hint: {currentQ.hint}"
            </div>
          )}

          {/* Motivational Quote */}
          <div className="mt-12 mb-2 flex justify-center animate-fade-in-up" style={{animationDelay: '400ms'}}>
            <div className="flex items-center gap-4 px-8 py-4 bg-slate-50 rounded-2xl border border-slate-200/50 text-center max-w-2xl shadow-inner">
              <Quote className="w-6 h-6 text-emerald-400/40 rotate-180 shrink-0" />
              <p className="text-slate-600 italic font-semibold text-sm md:text-base leading-relaxed">
                {motivationalQuotes[currentQuestion % motivationalQuotes.length].text} <span className="text-emerald-600/80 font-black not-italic ml-2 uppercase text-xs tracking-widest">— {motivationalQuotes[currentQuestion % motivationalQuotes.length].author}</span>
              </p>
              <Quote className="w-6 h-6 text-emerald-400/40 shrink-0" />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 text-emerald-800/50 text-xs font-black tracking-[0.4em] uppercase flex items-center gap-4 animate-pulse">
        <Sparkles className="w-4 h-4" /> Quiz Made by 1SG Atehortua <Sparkles className="w-4 h-4" />
      </div>
    </div>
  );
}
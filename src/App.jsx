import React, { useState } from 'react';
import { CheckCircle, XCircle, Lightbulb, ArrowRight, RotateCcw, Award, Sparkles, Quote } from 'lucide-react';

const motivationalQuotes = [
  "Excellence is not an act, but a habit. Keep pushing. - Aristotle",
  "The more you sweat in peacetime, the less you bleed in war. - General George S. Patton",
  "Success is where preparation and opportunity meet. - Bobby Unser",
  "There are no secrets to success. It is the result of preparation and hard work. - Colin Powell",
  "Leadership is the capacity to translate vision into reality. - Warren Bennis",
  "Do not follow where the path may lead. Go instead where there is no path and leave a trail. - Ralph Waldo Emerson",
  "The true test of leadership is how well you function in a crisis. - Brian Tracy",
  "Discipline is the bridge between goals and accomplishment. - Jim Rohn",
  "Great leaders are almost always great simplifiers. - Colin Powell",
  "Your focus determines your reality. - Qui-Gon Jinn",
  "Victory belongs to the most persevering. - Napoleon Bonaparte",
  "A winner is a dreamer who never gives up. - Nelson Mandela"
];

const quizData = [
  {
    question: "What is the official date of the Northern California Recruiting Battalion FY26 2nd QAB?",
    options: [
      { text: "19 March 2026", rationale: "Section 5 of the MOI explicitly states the competition will be held on 19 March 2026.", isCorrect: true },
      { text: "05 March 2026", rationale: "This is the packet submission deadline, not the board date.", isCorrect: false },
      { text: "09 February 2026", rationale: "This is the date the MOI was published.", isCorrect: false },
      { text: "15 April 2026", rationale: "This date is not mentioned in the MOI.", isCorrect: false }
    ],
    hint: "Look for the mid-March date mentioned in Section 5."
  },
  {
    question: "What is the required report time for competitors on the day of the board?",
    options: [
      { text: "1000hrs", rationale: "Section 5 states the report time is 1000hrs.", isCorrect: true },
      { text: "1030hrs", rationale: "This is the board start time, not the report time.", isCorrect: false },
      { text: "0900hrs", rationale: "This is earlier than the required report time.", isCorrect: false },
      { text: "0600hrs", rationale: "This is a typical PT formation time, not the board report time.", isCorrect: false }
    ],
    hint: "Competitors need to report 30 minutes before the 1030hrs start time."
  },
  {
    question: "At what time does the QAB officially start?",
    options: [
      { text: "1030hrs", rationale: "Section 5 of the MOI explicitly states the start time is 1030hrs.", isCorrect: true },
      { text: "1000hrs", rationale: "This is the report time, not the start time.", isCorrect: false },
      { text: "0900hrs", rationale: "This is incorrect based on the MOI.", isCorrect: false },
      { text: "1300hrs", rationale: "This is incorrect based on the MOI.", isCorrect: false }
    ],
    hint: "The board starts 30 minutes after the 1000hrs report time."
  },
  {
    question: "What is the absolute deadline to submit the winning Soldiers' packets to S3 Training?",
    options: [
      { text: "05 March 2026", rationale: "Section 2 states packets are due no later than 05 March 2026.", isCorrect: true },
      { text: "19 March 2026", rationale: "This is the actual board date.", isCorrect: false },
      { text: "09 February 2026", rationale: "This is the MOI publication date.", isCorrect: false },
      { text: "One week prior to the board", rationale: "This is the deadline for ETP MFRs, not the actual packet.", isCorrect: false }
    ],
    hint: "The packets are due approximately two weeks before the board date."
  },
  {
    question: "Who must approve the acceptance of a late board packet?",
    options: [
      { text: "Command Sergeant Major", rationale: "Section 2 notes late packets will not be accepted without Command Sergeant Major approval.", isCorrect: true },
      { text: "Battalion Commander", rationale: "The MOI specifies the CSM, not the Battalion Commander.", isCorrect: false },
      { text: "S3 Training Officer", rationale: "While submitted to S3, the CSM holds the approval authority for late packets.", isCorrect: false },
      { text: "Company First Sergeant", rationale: "The 1SG runs the company board, but the Battalion CSM approves late battalion packets.", isCorrect: false }
    ],
    hint: "Look to the highest enlisted leader in the Battalion."
  },
  {
    question: "How long must a Soldier be assigned and serving in the position to compete for Station Commander of the Quarter / Year?",
    options: [
      { text: "Minimum of 9 months", rationale: "Section 3a requires the SC to be serving in the position for a minimum of 9 months.", isCorrect: true },
      { text: "Minimum of 6 months", rationale: "This is shorter than the required 9 months.", isCorrect: false },
      { text: "Minimum of 12 months", rationale: "The minimum is 9 months, not a full 12.", isCorrect: false },
      { text: "Minimum of 3 months", rationale: "This is insufficient time in the position.", isCorrect: false }
    ],
    hint: "It takes three-quarters of a year to meet this requirement."
  },
  {
    question: "What is the minimum write rate per month required for a Regular Army Recruiting NCO to compete without an Exception to Policy (ETP)?",
    options: [
      { text: "1.0 per month", rationale: "Section 3b mandates a write rate of at least 1.0 per month.", isCorrect: true },
      { text: "1.5 per month", rationale: "This exceeds the minimum requirement.", isCorrect: false },
      { text: "2.0 per month", rationale: "This is a high standard but not the minimum required by the MOI.", isCorrect: false },
      { text: "0.5 per month", rationale: "This rate requires an ETP to compete.", isCorrect: false }
    ],
    hint: "The requirement is exactly one contract per month."
  },
  {
    question: "If an AR or RA NCO has a write rate of less than 1.0 per month, when is their memorandum for exception (ETP MFR) due?",
    options: [
      { text: "No later than one week prior to the packet due date", rationale: "Sections 3b and 3c specify the ETP must be submitted one week prior to the packet due date.", isCorrect: true },
      { text: "On the same day the packet is due", rationale: "The ETP must be submitted and approved before the packet is submitted.", isCorrect: false },
      { text: "On the day of the board", rationale: "This is far too late; the ETP is needed for packet acceptance.", isCorrect: false },
      { text: "No later than two weeks prior to the board", rationale: "It is tied to the packet due date, not the board date.", isCorrect: false }
    ],
    hint: "It must be submitted 7 days before the packet itself is due."
  },
  {
    question: "Which specific regulation will Guidance Counselor (GC) competitors be additionally tested on?",
    options: [
      { text: "UR 601-210", rationale: "Section 3d notes GCs will have an additional category covering UR 601-210 (Enlistment and Accessions Procedures).", isCorrect: true },
      { text: "AR 670-1", rationale: "All competitors are tested on this, but GCs have an additional specific test.", isCorrect: false },
      { text: "TC 7-22.7", rationale: "All competitors are tested on the NCO Guide.", isCorrect: false },
      { text: "UR 350-13", rationale: "This covers School Recruiting, not the GC-specific test.", isCorrect: false }
    ],
    hint: "This regulation covers Enlistment and Accessions Procedures specifically for SCs and GCs."
  },
  {
    question: "What type of disciplinary history will automatically disqualify a Soldier from competing in this board?",
    options: [
      { text: "Any type of judicial or non-judicial punishment during FY26", rationale: "Section 4 clearly states Soldiers must not have any type of judicial / non-judicial punishment during FY26.", isCorrect: true },
      { text: "Only a Field Grade Article 15", rationale: "The MOI specifies 'any type' of punishment.", isCorrect: false },
      { text: "Any punishment within the last 5 years", rationale: "The restriction is specifically tied to FY26.", isCorrect: false },
      { text: "A missed PT session", rationale: "While an issue, the MOI specifically points to formal judicial/non-judicial punishment.", isCorrect: false }
    ],
    hint: "The restriction applies to any formal UCMJ actions during the current fiscal year."
  },
  {
    question: "What uniform is authorized for the board appearance?",
    options: [
      { text: "ASU / AGSU", rationale: "Section 6 specifies ASU / AGSU for the board appearance.", isCorrect: true },
      { text: "ACU / OCP", rationale: "Combat uniforms are not authorized.", isCorrect: false },
      { text: "Army Physical Fitness Uniform (APFU)", rationale: "The board requires a formal dress uniform.", isCorrect: false },
      { text: "Civilian Business Attire", rationale: "Military members must wear the prescribed military dress uniform.", isCorrect: false }
    ],
    hint: "It is the Army's standard formal dress uniform (either the older blue or newer green version)."
  },
  {
    question: "According to the MOI, are female Soldiers authorized to wear skirts to the board?",
    options: [
      { text: "No, skirts are not authorized; pants are required.", rationale: "Section 6 explicitly states: 'Soldiers are not authorized to wear skirts... Pants... are required.'", isCorrect: true },
      { text: "Yes, skirts are the preferred uniform.", rationale: "The MOI explicitly prohibits skirts for this specific board.", isCorrect: false },
      { text: "Yes, if authorized by the Company Commander.", rationale: "The Battalion MOI strictly forbids skirts with no exception listed.", isCorrect: false },
      { text: "Yes, but only with low heels.", rationale: "Both skirts and heels are forbidden by the MOI.", isCorrect: false }
    ],
    hint: "Look closely at the specific restrictions in Section 6 regarding lower-body garments."
  },
  {
    question: "What type of footwear is explicitly required for all nominees?",
    options: [
      { text: "Flat shoes", rationale: "Section 6 mandates that 'flat shoes are required' and prohibits heels.", isCorrect: true },
      { text: "Low heels (pumps)", rationale: "Heels are explicitly unauthorized.", isCorrect: false },
      { text: "Combat boots", rationale: "Boots are not worn with the prescribed configuration of the ASU/AGSU.", isCorrect: false },
      { text: "Oxfords only", rationale: "The MOI specifies 'flat shoes' broadly, prohibiting heels.", isCorrect: false }
    ],
    hint: "Heels are not allowed; footwear must be completely level."
  },
  {
    question: "Which shirt configuration is required for the board uniform?",
    options: [
      { text: "Long sleeve shirt with tie/neck tab", rationale: "Section 6 dictates 'long sleeve shirt, tie/neck tab'.", isCorrect: true },
      { text: "Short sleeve shirt with open collar", rationale: "Short sleeves and open collars are not authorized.", isCorrect: false },
      { text: "Short sleeve shirt with tie/neck tab", rationale: "The MOI specifically requires long sleeves.", isCorrect: false },
      { text: "Long sleeve shirt with no tie/neck tab", rationale: "A tie or neck tab is strictly required with the long sleeve shirt.", isCorrect: false }
    ],
    hint: "Think of the most formal configuration for the Class A/Class B setup."
  },
  {
    question: "Are ID Tags (Dog Tags) required to be worn during the board appearance?",
    options: [
      { text: "Yes", rationale: "Section 6 lists 'ID Tags' as a required component of the uniform.", isCorrect: true },
      { text: "No", rationale: "The MOI specifically lists them as required.", isCorrect: false },
      { text: "Only for Regular Army NCOs", rationale: "They are required for all competitors.", isCorrect: false },
      { text: "Only if wearing the ASU, not the AGSU", rationale: "They are required regardless of which approved uniform is worn.", isCorrect: false }
    ],
    hint: "This is a commonly checked item during the formal inspection phase of a board."
  },
  {
    question: "How must the board packet be digitally formatted and submitted?",
    options: [
      { text: "As a single PDF file, scanned in color, top facing up", rationale: "Section 8 explicitly requires the packet to be a 'single PDF file... scanned in color with the top of the document facing up.'", isCorrect: true },
      { text: "As multiple PDF files attached to an email", rationale: "The MOI requires a 'single PDF file.'", isCorrect: false },
      { text: "As a printed physical binder", rationale: "The MOI refers to a 'paper packet' but specifies submission as a 'single PDF file' via S3.", isCorrect: false },
      { text: "As a Microsoft Word document", rationale: "The format must be a PDF file.", isCorrect: false }
    ],
    hint: "S3 wants the digital submission combined into one clean, colorful document."
  },
  {
    question: "What is the consequence if a Company submits an incorrect or incomplete packet?",
    options: [
      { text: "It will be returned to the Company for adjustment", rationale: "Section 8 states 'All incorrect/incomplete packets will be returned to Companies for adjustment.'", isCorrect: true },
      { text: "The Soldier is immediately disqualified", rationale: "The unit is given a chance to adjust the packet.", isCorrect: false },
      { text: "The Battalion S1 will correct the errors", rationale: "It is returned to the Company, not fixed by Battalion staff.", isCorrect: false },
      { text: "Points will be deducted from the board score", rationale: "The packet is simply returned for correction.", isCorrect: false }
    ],
    hint: "Administrative errors are pushed back down to the unit level to fix."
  },
  {
    question: "What is the correct file naming convention for the digital packet submission?",
    options: [
      { text: "Category, Rank, Name, and RSID (ex: RA NCO_SSG Doe_6A2X)", rationale: "Section 8 states the 'Packet file name must contain the Soldier’s Category, Rank, Name, and RSID.'", isCorrect: true },
      { text: "Last Name, First Name, SSN", rationale: "PII like SSN is not used in the file name convention.", isCorrect: false },
      { text: "Company Name_Soldier Name_QAB", rationale: "The category and RSID are specifically required.", isCorrect: false },
      { text: "Rank_Name_Date", rationale: "This misses the Category and RSID requirements.", isCorrect: false }
    ],
    hint: "The file name needs to identify what they are competing for, who they are, and where they are from."
  },
  {
    question: "How must the Soldier Talent Profile (STP) be formatted in the packet?",
    options: [
      { text: "Include both front and back pages in landscape orientation", rationale: "Section 8b requires 'both front and back pages in landscape orientation.'", isCorrect: true },
      { text: "Include only the front page in portrait orientation", rationale: "Both pages are required, and the orientation must be landscape.", isCorrect: false },
      { text: "Include all 5 pages of the ERB", rationale: "The requirement specifically calls for the front and back of the STP.", isCorrect: false },
      { text: "Landscape orientation, front page only", rationale: "The back page must also be included.", isCorrect: false }
    ],
    hint: "It needs to show the full picture of the Soldier, printed sideways for better readability."
  },
  {
    question: "What is the maximum length allowed for the Personal Data Sheet (PDS)?",
    options: [
      { text: "Two pages typewritten", rationale: "Section 8c limits the PDS to 'not to exceed two pages typewritten.'", isCorrect: true },
      { text: "One page typewritten", rationale: "This is the limit for the Biography, not the PDS.", isCorrect: false },
      { text: "Three pages typewritten", rationale: "The limit is strict at two pages.", isCorrect: false },
      { text: "There is no limit", rationale: "There is a strict two-page limit.", isCorrect: false }
    ],
    hint: "It can be slightly longer than the biography, but no more than double."
  },
  {
    question: "What must be included with the Soldier’s brief biography?",
    options: [
      { text: "A color Professional Photo", rationale: "Section 8d requires the biography to include a 'color Professional Photo'.", isCorrect: true },
      { text: "A copy of their DA Photo", rationale: "DA photos are not used in this manner anymore; a professional photo is required.", isCorrect: false },
      { text: "A letter of recommendation", rationale: "This is not listed as a requirement for the biography.", isCorrect: false },
      { text: "A handwritten signature", rationale: "The biography is typewritten and requires a photo, not a signature.", isCorrect: false }
    ],
    hint: "This provides a visual face to the written story of the competitor."
  },
  {
    question: "What is the minimum passing score required on the DA Form 705 AFT?",
    options: [
      { text: "375 points or above", rationale: "Section 8e mandates the Soldier 'total score will be 375 points or above.'", isCorrect: true },
      { text: "300 points or above", rationale: "While technically passing standard for some tests, the board requires 375.", isCorrect: false },
      { text: "400 points or above", rationale: "This is higher than the stated minimum.", isCorrect: false },
      { text: "450 points or above", rationale: "This is higher than the stated minimum.", isCorrect: false }
    ],
    hint: "You need to score significantly above the bare minimum to be competitive."
  },
  {
    question: "If a Soldier requires a body fat test, which forms must be provided in the packet?",
    options: [
      { text: "DA Form 5500 / 5501", rationale: "Section 8e requires 'DA Form 5500 / 5501' for Soldiers needing a body fat test.", isCorrect: true },
      { text: "DA Form 3349", rationale: "This is a physical profile form, not a body fat form.", isCorrect: false },
      { text: "DA Form 705", rationale: "This is the AFT form, not the body fat worksheet.", isCorrect: false },
      { text: "DA Form 4187", rationale: "This is a personnel action form.", isCorrect: false }
    ],
    hint: "These are the standard male and female body fat calculation worksheets."
  },
  {
    question: "How many NCOERs must be included in the submission packet?",
    options: [
      { text: "The last three (3)", rationale: "Section 8f specifically requests 'Soldier’s last three (3) NCOERs'.", isCorrect: true },
      { text: "The last two (2)", rationale: "The requirement is three.", isCorrect: false },
      { text: "All NCOERs on file", rationale: "Only the last three are required.", isCorrect: false },
      { text: "Only the most recent one", rationale: "The board requires a longer historical look at performance.", isCorrect: false }
    ],
    hint: "The packet requires a multi-year look covering up to 2023, 2024, and 2025."
  },
  {
    question: "In what order should the NCOERs be arranged in the packet?",
    options: [
      { text: "Most recent to oldest", rationale: "Section 8f dictates 'in order from the most recent to oldest (i.e. 2025, 2024, then 2023).'", isCorrect: true },
      { text: "Oldest to most recent", rationale: "The MOI specifies reverse chronological order.", isCorrect: false },
      { text: "Alphabetical by rater", rationale: "Evaluations are sorted by date, not rater name.", isCorrect: false },
      { text: "Order does not matter", rationale: "The MOI specifies a strict order.", isCorrect: false }
    ],
    hint: "The board members want to see your newest evaluation first."
  },
  {
    question: "Which specific report is required for RA NCO and AR NCO packets, but not explicitly for SC packets?",
    options: [
      { text: "Gold Badge Report 'Points' YTD", rationale: "Section 8g specifies RA and AR NCOs must provide the Gold Badge Report 'Points' YTD, whereas SC packets only list the YTD Mission Production.", isCorrect: true },
      { text: "YTD Mission Production", rationale: "This is required for both SC and NCO packets.", isCorrect: false },
      { text: "DA Form 705", rationale: "This is required for all competitors.", isCorrect: false },
      { text: "Station Commander Assessment", rationale: "This is not listed in Section 8g.", isCorrect: false }
    ],
    hint: "This report tracks progress toward a specific recruiting award."
  },
  {
    question: "Which publication covers 'Army Leadership and Profession'?",
    options: [
      { text: "ADP 6-22", rationale: "Section 7 lists 'Army Leadership and Profession (ADP 6-22)'.", isCorrect: true },
      { text: "ADP 7-0", rationale: "This covers Training.", isCorrect: false },
      { text: "AR 600-9", rationale: "This covers the Army Body Composition Program.", isCorrect: false },
      { text: "TC 7-22.7", rationale: "This is the Noncommissioned Officer Guide.", isCorrect: false }
    ],
    hint: "This is an Army Doctrine Publication (ADP) in the 6-series."
  },
  {
    question: "Which regulation covers the 'Regular Army and Reserve Components Enlistment Program'?",
    options: [
      { text: "AR 601-210", rationale: "Section 7 lists 'Regular Army and Reserve Components Enlistment Program (AR 601-210)'.", isCorrect: true },
      { text: "AR 670-1", rationale: "This covers uniforms.", isCorrect: false },
      { text: "UR 190-4", rationale: "This covers incident reporting.", isCorrect: false },
      { text: "AR 350-1", rationale: "This covers training.", isCorrect: false }
    ],
    hint: "This is the primary AR used every day by Guidance Counselors and Recruiters for enlistment eligibility."
  },
  {
    question: "Which USAREC Regulation covers the 'School Recruiting Program'?",
    options: [
      { text: "UR 350-13", rationale: "Section 7 lists 'School Recruiting Program (UR 350-13)'.", isCorrect: true },
      { text: "UR 601-208", rationale: "This covers Local Recruiting Marketing.", isCorrect: false },
      { text: "UR 27-4", rationale: "This covers Prohibited and Regulated Activities.", isCorrect: false },
      { text: "UR 190-4", rationale: "This covers Incident Reporting.", isCorrect: false }
    ],
    hint: "This regulation deals with high schools and educational institutions."
  },
  {
    question: "What is the subject of UR 190-4?",
    options: [
      { text: "Incident Reporting", rationale: "Section 7 lists 'Incident Reporting (UR 190-4)'.", isCorrect: true },
      { text: "Prohibited Activities", rationale: "This is UR 27-4.", isCorrect: false },
      { text: "Mission Command", rationale: "This is UTC 5-01.", isCorrect: false },
      { text: "Evaluation Reporting", rationale: "This is AR 623-3.", isCorrect: false }
    ],
    hint: "This regulation dictates what to do when something goes wrong (accidents, DUIs, etc.)."
  },
  {
    question: "Which publication serves as the 'Noncommissioned Officer Guide'?",
    options: [
      { text: "TC 7-22.7", rationale: "Section 7 lists 'Noncommissioned Officer Guide (TC 7-22.7)'.", isCorrect: true },
      { text: "FM 7-22", rationale: "This is Holistic Health and Fitness.", isCorrect: false },
      { text: "ADP 6-22", rationale: "This is Army Leadership and Profession.", isCorrect: false },
      { text: "UTC 5-03.5", rationale: "This is Leading Future Soldiers.", isCorrect: false }
    ],
    hint: "It is a Training Circular (TC) in the 7-series."
  },
  {
    question: "Which regulation governs the 'Wear and Appearance of the Army Uniform'?",
    options: [
      { text: "AR 670-1", rationale: "Section 7 lists 'Wear and Appearance of the Army Uniform (AR 670-1)'.", isCorrect: true },
      { text: "AR 600-9", rationale: "This is the Body Composition Program.", isCorrect: false },
      { text: "AR 623-3", rationale: "This is the Evaluation Reporting System.", isCorrect: false },
      { text: "AR 27-10", rationale: "This is Military Justice.", isCorrect: false }
    ],
    hint: "This is the most famous 600-series regulation regarding grooming and dress."
  },
  {
    question: "What does AR 623-3 cover?",
    options: [
      { text: "Evaluation Reporting System", rationale: "Section 7 lists 'Evaluation Reporting System (AR 623-3)'.", isCorrect: true },
      { text: "Military Justice", rationale: "This is AR 27-10.", isCorrect: false },
      { text: "Training", rationale: "This is ADP 7-0.", isCorrect: false },
      { text: "Mission Command", rationale: "This is UTC 5-01.", isCorrect: false }
    ],
    hint: "This regulation governs NCOERs and OERs."
  },
  {
    question: "Which USAREC Regulation covers 'Prohibited and Regulated Activities'?",
    options: [
      { text: "UR 27-4", rationale: "Section 7 lists 'Prohibited and Regulated Activities (UR 27-4)'.", isCorrect: true },
      { text: "UR 190-4", rationale: "This is Incident Reporting.", isCorrect: false },
      { text: "UR 601-208", rationale: "This is Local Recruiting Marketing.", isCorrect: false },
      { text: "UR 350-13", rationale: "This is School Recruiting.", isCorrect: false }
    ],
    hint: "This regulation falls under the Legal (27-series) umbrella."
  },
  {
    question: "Which regulation covers 'Military Justice'?",
    options: [
      { text: "AR 27-10", rationale: "Section 7 lists 'Military Justice (AR 27-10)'.", isCorrect: true },
      { text: "AR 600-9", rationale: "This is Body Composition.", isCorrect: false },
      { text: "AR 350-1", rationale: "This is Training and Leader Development.", isCorrect: false },
      { text: "AR 670-1", rationale: "This is Wear and Appearance of the Uniform.", isCorrect: false }
    ],
    hint: "This regulation covers UCMJ actions and Article 15s."
  },
  {
    question: "Which Army Doctrine Publication covers 'Training'?",
    options: [
      { text: "ADP 7-0", rationale: "Section 7 lists 'Training (ADP 7-0)'.", isCorrect: true },
      { text: "ADP 6-22", rationale: "This is Leadership.", isCorrect: false },
      { text: "UTC 5-01", rationale: "This is Mission Command.", isCorrect: false },
      { text: "UM 3-0", rationale: "This is Recruiting Operations.", isCorrect: false }
    ],
    hint: "It is an ADP in the 7-series."
  },
  {
    question: "Which publication covers 'Army Training and Leader Development'?",
    options: [
      { text: "AR 350-1", rationale: "Section 7 lists 'Army Training and Leader Development (AR 350-1)'.", isCorrect: true },
      { text: "UTC 5-03.4", rationale: "This is the USAREC specific Training and Leader Development.", isCorrect: false },
      { text: "FM 7-22", rationale: "This is Holistic Health and Fitness.", isCorrect: false },
      { text: "TC 7-22.7", rationale: "This is the NCO Guide.", isCorrect: false }
    ],
    hint: "This is the overarching Army Regulation for all schools and training."
  },
  {
    question: "Which USAREC publication covers 'Leading Future Soldiers'?",
    options: [
      { text: "UTC 5-03.5", rationale: "Section 7 lists 'Leading Future Soldiers (UTC 5-03.5)'.", isCorrect: true },
      { text: "UTC 5-03.1", rationale: "This is Prospecting, Processing and Analysis.", isCorrect: false },
      { text: "UTC 5-03.2", rationale: "This is Influencing and Interviewing.", isCorrect: false },
      { text: "UTC 5-02", rationale: "This is Intelligence.", isCorrect: false }
    ],
    hint: "This Training Circular applies heavily to the Future Soldier Training Program."
  },
  {
    question: "Which pamphlet covers the 'Soldier Family Assistance Program'?",
    options: [
      { text: "UP 608-6", rationale: "Section 7 lists 'Soldier Family Assistance Program (UP 608-6)'.", isCorrect: true },
      { text: "UR 601-208", rationale: "This is Local Recruiting Marketing.", isCorrect: false },
      { text: "UR 190-4", rationale: "This is Incident Reporting.", isCorrect: false },
      { text: "UR 27-4", rationale: "This is Prohibited Activities.", isCorrect: false }
    ],
    hint: "It is a USAREC Pamphlet (UP) in the 600-series."
  },
  {
    question: "Which regulation covers the 'Local Recruiting Marketing Program'?",
    options: [
      { text: "UR 601-208", rationale: "Section 7 lists 'Local Recruiting Marketing Program (UR 601-208)'.", isCorrect: true },
      { text: "UR 601-210", rationale: "This is the Enlistment Program.", isCorrect: false },
      { text: "UR 350-13", rationale: "This is the School Recruiting Program.", isCorrect: false },
      { text: "UR 190-4", rationale: "This is Incident Reporting.", isCorrect: false }
    ],
    hint: "This dictates how a recruiter can advertise locally."
  },
  {
    question: "Which USAREC Training Circular covers 'Mission Command'?",
    options: [
      { text: "UTC 5-01", rationale: "Section 7 lists 'Mission Command (UTC 5-01)'.", isCorrect: true },
      { text: "UTC 5-02", rationale: "This is Intelligence.", isCorrect: false },
      { text: "UTC 5-03.1", rationale: "This is Prospecting.", isCorrect: false },
      { text: "UM 3-0", rationale: "This is Recruiting Operations.", isCorrect: false }
    ],
    hint: "This is the foundational 5-01 circular."
  },
  {
    question: "Which USAREC Manual covers 'Recruiting Operations'?",
    options: [
      { text: "UM 3-0", rationale: "Section 7 lists 'Recruiting Operations (UM 3-0)'.", isCorrect: true },
      { text: "UTC 5-01", rationale: "This is Mission Command.", isCorrect: false },
      { text: "UTC 5-02", rationale: "This is Intelligence.", isCorrect: false },
      { text: "ADP 7-0", rationale: "This is Training.", isCorrect: false }
    ],
    hint: "It mirrors the Army's standard operations manual numbering."
  },
  {
    question: "Which USAREC Training Circular covers 'Intelligence'?",
    options: [
      { text: "UTC 5-02", rationale: "Section 7 lists 'Intelligence (UTC 5-02)'.", isCorrect: true },
      { text: "UTC 5-01", rationale: "This is Mission Command.", isCorrect: false },
      { text: "UTC 5-03.2", rationale: "This is Influencing and Interviewing.", isCorrect: false },
      { text: "UTC 5-03.4", rationale: "This is Training and Leader Development.", isCorrect: false }
    ],
    hint: "Intelligence is typically the '2' shop in Army staff structure."
  },
  {
    question: "Which field manual covers 'Holistic Health and Fitness'?",
    options: [
      { text: "FM 7-22", rationale: "Section 7 lists 'Holistic Health and Fitness (FM 7-22)'.", isCorrect: true },
      { text: "TC 7-22.7", rationale: "This is the NCO Guide.", isCorrect: false },
      { text: "ADP 6-22", rationale: "This is Leadership.", isCorrect: false },
      { text: "AR 600-9", rationale: "This is the Body Composition Program.", isCorrect: false }
    ],
    hint: "This is the manual that dictates physical readiness training (PRT/H2F)."
  },
  {
    question: "What is the publication number for the 'Recruiting Functions Analysis (RFA)'?",
    options: [
      { text: "USAREC GTA 5-01.2", rationale: "Section 7 lists 'Recruiting Functions Analysis (RFA) (USAREC GTA 5-01.2)'.", isCorrect: true },
      { text: "UTC 5-03.1", rationale: "This is Prospecting, Processing and Analysis.", isCorrect: false },
      { text: "UM 3-0", rationale: "This is Recruiting Operations.", isCorrect: false },
      { text: "UTC 5-01", rationale: "This is Mission Command.", isCorrect: false }
    ],
    hint: "It is a Graphic Training Aid (GTA)."
  },
  {
    question: "Which USAREC Training Circular covers 'Training and Leader Development'?",
    options: [
      { text: "UTC 5-03.4", rationale: "Section 7 lists 'Training and Leader Development (UTC 5-03.4)'.", isCorrect: true },
      { text: "AR 350-1", rationale: "This is Army Training and Leader Development, not the USAREC Training Circular.", isCorrect: false },
      { text: "UTC 5-03.5", rationale: "This is Leading Future Soldiers.", isCorrect: false },
      { text: "ADP 7-0", rationale: "This is Training.", isCorrect: false }
    ],
    hint: "This is a USAREC-specific circular in the 5-03 series."
  },
  {
    question: "Which regulation governs the 'Army Body Composition Program'?",
    options: [
      { text: "AR 600-9", rationale: "Section 7 lists 'Army Body Composition Program (AR 600-9)'. Note: Also see Army Dir 2025-18, Encl 3.", isCorrect: true },
      { text: "AR 670-1", rationale: "This covers Wear and Appearance of the Army Uniform.", isCorrect: false },
      { text: "FM 7-22", rationale: "This covers Holistic Health and Fitness.", isCorrect: false },
      { text: "TC 7-22.7", rationale: "This is the Noncommissioned Officer Guide.", isCorrect: false }
    ],
    hint: "This regulation dictates height and weight standards."
  },
  {
    question: "Which USAREC Training Circular covers 'Prospecting, Processing and Analysis'?",
    options: [
      { text: "UTC 5-03.1", rationale: "Section 7 lists 'Prospecting, Processing and Analysis (UTC 5-03.1)'.", isCorrect: true },
      { text: "UTC 5-03.2", rationale: "This covers Influencing and Interviewing.", isCorrect: false },
      { text: "UTC 5-02", rationale: "This covers Intelligence.", isCorrect: false },
      { text: "UM 3-0", rationale: "This is Recruiting Operations.", isCorrect: false }
    ],
    hint: "This is the very first manual in the 5-03 series."
  },
  {
    question: "Which USAREC Training Circular covers 'Influencing and interviewing'?",
    options: [
      { text: "UTC 5-03.2", rationale: "Section 7 lists 'Influencing and interviewing (UTC 5-03.2)'.", isCorrect: true },
      { text: "UTC 5-03.1", rationale: "This covers Prospecting, Processing and Analysis.", isCorrect: false },
      { text: "UTC 5-03.5", rationale: "This covers Leading Future Soldiers.", isCorrect: false },
      { text: "UTC 5-01", rationale: "This is Mission Command.", isCorrect: false }
    ],
    hint: "This manual follows directly after Prospecting and Processing."
  },
  {
    question: "Which foundational creeds and historical knowledge are board competitors explicitly required to know according to Section 7?",
    options: [
      { text: "Creed of the NCO, Soldier's Creed, Recruiter Creed, Army Song, and USARD History", rationale: "Section 7 explicitly lists these as required foundational knowledge topics.", isCorrect: true },
      { text: "Ranger Creed and Army Song", rationale: "The Ranger Creed is not listed in the MOI.", isCorrect: false },
      { text: "Officer's Creed and USARD History", rationale: "The Officer's Creed is not applicable to this NCO board.", isCorrect: false },
      { text: "Only the Recruiter Creed", rationale: "Competitors must know multiple creeds and the Army Song.", isCorrect: false }
    ],
    hint: "The MOI lists three specific creeds, a song, and historical knowledge."
  },
  {
    question: "Which specific version of the Recruiter Creed are candidates expected to know?",
    options: [
      { text: "USARD RED Book Version", rationale: "Section 7 explicitly states 'Recruiter Creed (USARD RED Book Version)'.", isCorrect: true },
      { text: "The standard TRADOC version", rationale: "The MOI specifies the USARD RED Book Version.", isCorrect: false },
      { text: "The USAREC Blue Book Version", rationale: "The MOI specifies the RED Book.", isCorrect: false },
      { text: "There is only one version", rationale: "The MOI felt the need to specify the RED book version.", isCorrect: false }
    ],
    hint: "It's named after a brightly colored book."
  },
  {
    question: "Who is the Battalion Command Sergeant Major that signed this MOI?",
    options: [
      { text: "Robby A. Carlson", rationale: "The signature block at the end of the document belongs to 'ROBBY A. CARLSON, CSM, USA'.", isCorrect: true },
      { text: "Michael DeLong", rationale: "MSG DeLong is the POC, not the CSM.", isCorrect: false },
      { text: "The Battalion Commander", rationale: "The document is signed by the CSM.", isCorrect: false },
      { text: "S3 Operations Sergeant Major", rationale: "The document is signed by the Battalion CSM.", isCorrect: false }
    ],
    hint: "Look at the signature block at the very end of the document."
  },
  {
    question: "Who is the Point of Contact (POC) for this board action?",
    options: [
      { text: "MSG DeLong, Michael", rationale: "Section 9 lists 'The POC for this action is MSG DeLong, Michael'.", isCorrect: true },
      { text: "CSM Robby A. Carlson", rationale: "CSM Carlson is the signature authority, not the POC.", isCorrect: false },
      { text: "The Company 1SG", rationale: "The MOI lists a specific Battalion POC.", isCorrect: false },
      { text: "S1 NCOIC", rationale: "The MOI lists MSG DeLong specifically.", isCorrect: false }
    ],
    hint: "This individual is a Master Sergeant listed in Section 9."
  },
  {
    question: "According to the Enclosures, which Company is designated as 6I3?",
    options: [
      { text: "Sacramento Valley Company", rationale: "Enclosure 3 is listed as '6I3 Sacramento Valley Company'.", isCorrect: true },
      { text: "Sierra Nevada Company", rationale: "This is 6I0.", isCorrect: false },
      { text: "Redding Company", rationale: "This is 6I1.", isCorrect: false },
      { text: "Capital Company", rationale: "This is 6I5.", isCorrect: false }
    ],
    hint: "Check Enclosure 3."
  },
  {
    question: "According to the Enclosures, which Company is designated as 6I6?",
    options: [
      { text: "North Bay Company", rationale: "Enclosure 5 is listed as '6I6 North Bay Company'.", isCorrect: true },
      { text: "Capital Company", rationale: "This is 6I5.", isCorrect: false },
      { text: "Sierra Nevada Company", rationale: "This is 6I0.", isCorrect: false },
      { text: "Redding Company", rationale: "This is 6I1.", isCorrect: false }
    ],
    hint: "Check Enclosure 5."
  }
];

export default function App() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [showHint, setShowHint] = useState(false);

  const handleOptionClick = (optionIndex, isCorrect) => {
    if (isAnswered) return;
    
    setSelectedOption(optionIndex);
    setIsAnswered(true);
    
    if (isCorrect) {
      setScore(score + 1);
    }
  };

  const handleNextQuestion = () => {
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < quizData.length) {
      setCurrentQuestion(nextQuestion);
      setSelectedOption(null);
      setIsAnswered(false);
      setShowHint(false);
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
  };

  if (showScore) {
    const percentage = Math.round((score / quizData.length) * 100);
    let message = "";
    if (percentage >= 90) message = "Outstanding! You are fully prepared for the board. 🌟";
    else if (percentage >= 70) message = "Great job! A little more studying and you'll be perfect. 📚";
    else message = "Keep studying the MOI! You'll get it next time. 💪";

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-emerald-50 flex flex-col items-center justify-center p-4 font-sans text-slate-800">
        <style>{`
          @keyframes pop-in {
            0% { opacity: 0; transform: scale(0.95) translateY(10px); }
            100% { opacity: 1; transform: scale(1) translateY(0); }
          }
          .animate-pop-in { animation: pop-in 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        `}</style>
        
        <div className="bg-white max-w-lg w-full rounded-3xl shadow-2xl overflow-hidden border border-emerald-100/50 animate-pop-in">
          <div className="bg-gradient-to-br from-emerald-800 via-emerald-700 to-teal-900 p-10 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
            <Award className="w-24 h-24 text-emerald-300 mx-auto mb-6 animate-bounce drop-shadow-[0_0_15px_rgba(110,231,183,0.5)] relative z-10" />
            <h2 className="text-3xl font-extrabold text-white mb-2 tracking-wide flex items-center justify-center gap-3 relative z-10">
              <Sparkles className="w-6 h-6 text-yellow-300 animate-pulse" />
              Quiz Complete!
              <Sparkles className="w-6 h-6 text-yellow-300 animate-pulse" />
            </h2>
            <p className="text-emerald-100 text-lg font-medium relative z-10">Northern California Recruiting Battalion QAB</p>
          </div>
          <div className="p-10 text-center space-y-6">
            <div className="text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600 drop-shadow-sm">
              {score} <span className="text-4xl text-slate-300 font-bold">/ {quizData.length}</span>
            </div>
            <p className="text-2xl font-bold text-slate-700">{percentage}% Score</p>
            <p className="text-slate-500 text-lg">{message}</p>
            <button 
              onClick={restartQuiz}
              className="mt-8 w-full flex items-center justify-center gap-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white py-5 px-6 rounded-2xl font-bold text-lg transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-emerald-500/30 group"
            >
              <RotateCcw className="w-6 h-6 group-hover:-rotate-180 transition-transform duration-500 ease-in-out" />
              Retake Quiz
            </button>
          </div>
        </div>
        <div className="mt-8 text-emerald-800/60 text-sm font-bold tracking-widest uppercase flex items-center gap-2 animate-pulse">
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
      
      <div className="bg-white max-w-3xl w-full rounded-3xl shadow-2xl overflow-hidden border border-slate-200/60 flex flex-col h-full md:h-auto md:max-h-[90vh] transition-all duration-300 hover:shadow-emerald-500/10">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-800 via-emerald-700 to-teal-900 px-6 py-5 md:px-8 md:py-6 flex justify-between items-center shrink-0 relative overflow-hidden shadow-md">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
          <h1 className="text-white font-bold text-lg md:text-xl truncate mr-4 relative z-10 flex items-center gap-3 tracking-wide">
            <Award className="w-6 h-6 text-emerald-300" />
            FY26 2nd QAB Study Guide
          </h1>
          <div className="bg-white/20 backdrop-blur-md text-emerald-50 px-5 py-2 rounded-full text-sm font-bold shrink-0 relative z-10 border border-white/20 shadow-inner">
            Question {currentQuestion + 1} of {quizData.length}
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
        <div className="p-6 md:p-10 flex-1 overflow-y-auto" key={currentQuestion}>
          <h2 className="text-xl md:text-2xl font-extrabold text-slate-800 mb-8 leading-relaxed animate-fade-in-up" style={{animationDelay: '0ms'}}>
            {currentQ.question}
          </h2>

          <div className="space-y-4 mb-8">
            {currentQ.options.map((option, index) => {
              let buttonClass = "w-full text-left p-5 md:p-6 rounded-2xl border-2 transition-all duration-300 flex items-start gap-5 transform active:scale-[0.98] outline-none ";
              
              if (!isAnswered) {
                buttonClass += "border-slate-200 hover:border-emerald-400 hover:bg-emerald-50/50 bg-white text-slate-700 font-medium hover:-translate-y-1 hover:shadow-xl hover:shadow-emerald-500/10 animate-fade-in-up opacity-0";
              } else {
                if (selectedOption === index) {
                  if (option.isCorrect) {
                    buttonClass += "border-emerald-500 bg-emerald-50 text-emerald-900 font-bold shadow-lg shadow-emerald-500/20 ring-4 ring-emerald-500/20";
                  } else {
                    buttonClass += "border-red-400 bg-red-50 text-red-900 font-bold shadow-lg shadow-red-500/20 ring-4 ring-red-500/20 animate-shake";
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
                  style={!isAnswered ? {animationDelay: `${(index + 1) * 100}ms`} : {}}
                >
                  <div className="mt-0.5 shrink-0 transition-transform duration-300">
                    {isAnswered && selectedOption === index && option.isCorrect && <CheckCircle className="w-7 h-7 text-emerald-500 drop-shadow-md scale-110 transition-transform" />}
                    {isAnswered && selectedOption === index && !option.isCorrect && <XCircle className="w-7 h-7 text-red-500 drop-shadow-md scale-110 transition-transform" />}
                    {!isAnswered && <div className="w-7 h-7 rounded-full border-2 border-slate-300 transition-colors duration-300 group-hover:border-emerald-400"></div>}
                    {isAnswered && selectedOption !== index && <div className="w-7 h-7 rounded-full border-2 border-slate-200"></div>}
                  </div>
                  <div className="flex flex-col text-left flex-1">
                    <span className="text-lg leading-snug">{option.text}</span>
                    {isAnswered && selectedOption === index && (
                      <div className={`mt-4 text-sm md:text-base p-4 rounded-xl border animate-fade-in-up shadow-sm ${option.isCorrect ? 'bg-emerald-100/80 border-emerald-300 text-emerald-900' : 'bg-red-100/80 border-red-300 text-red-900'}`}>
                        <span className="font-extrabold flex items-center gap-2 mb-1">
                          {option.isCorrect ? <Sparkles className="w-4 h-4" /> : null}
                          {option.isCorrect ? 'Explanation: ' : 'Why it is incorrect: '}
                        </span>
                        <span className="leading-relaxed block">{option.rationale}</span>
                      </div>
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Feedback Area */}
          {isAnswered && (
            <div className={`p-6 rounded-2xl mb-6 flex items-center gap-5 transform transition-all duration-500 shadow-lg animate-fade-in-up border-2 ${quizData[currentQuestion].options[selectedOption].isCorrect ? 'bg-gradient-to-r from-emerald-50 to-teal-50 border-emerald-300' : 'bg-gradient-to-r from-red-50 to-orange-50 border-red-300'}`}>
               <div className="shrink-0">
                 {quizData[currentQuestion].options[selectedOption].isCorrect ? (
                    <CheckCircle className="w-10 h-10 text-emerald-500 animate-[bounce_2s_infinite]" />
                 ) : (
                    <XCircle className="w-10 h-10 text-red-500 animate-pulse" />
                 )}
               </div>
               <p className={`font-extrabold text-lg md:text-xl ${quizData[currentQuestion].options[selectedOption].isCorrect ? 'text-emerald-800' : 'text-red-800'}`}>
                 {quizData[currentQuestion].options[selectedOption].isCorrect ? 'Outstanding! You got it right. 🌟' : 'Incorrect. Read the explanation above! 💡'}
               </p>
            </div>
          )}

          {/* Hint Toggle */}
          {!isAnswered && (
            <div className="mb-4 animate-fade-in-up" style={{animationDelay: '600ms'}}>
              <button 
                onClick={() => setShowHint(!showHint)}
                className="flex items-center gap-2 text-amber-600 font-bold hover:text-amber-700 transition-colors bg-amber-50 hover:bg-amber-100 px-4 py-2 rounded-full"
              >
                <Lightbulb className="w-5 h-5" />
                {showHint ? "Hide Hint" : "Need a hint?"}
              </button>
              {showHint && (
                <div className="mt-4 p-5 bg-gradient-to-r from-amber-50 to-yellow-50 border-l-4 border-amber-400 rounded-r-xl shadow-md text-amber-900 text-base animate-fade-in-up font-medium">
                  {currentQ.hint}
                </div>
              )}
            </div>
          )}

          {/* Motivational Quote */}
          <div className="mt-10 mb-2 flex justify-center animate-fade-in-up" style={{animationDelay: '800ms'}}>
            <div className="flex items-center gap-3 px-6 py-3 bg-emerald-50/50 rounded-2xl border border-emerald-100/50 text-center max-w-xl">
              <Quote className="w-5 h-5 text-emerald-400/60 rotate-180 shrink-0" />
              <p className="text-emerald-800/80 italic font-semibold text-sm md:text-base leading-snug">
                {motivationalQuotes[currentQuestion % motivationalQuotes.length]}
              </p>
              <Quote className="w-5 h-5 text-emerald-400/60 shrink-0" />
            </div>
          </div>

        </div>

        {/* Footer / Next Button */}
        <div className="p-6 md:px-10 md:py-6 bg-slate-50 border-t border-slate-200 shrink-0 flex justify-end rounded-b-3xl">
          <button
            onClick={handleNextQuestion}
            disabled={!isAnswered}
            className={`flex items-center gap-3 py-4 px-10 rounded-2xl font-bold text-lg transition-all transform duration-300 ${
              isAnswered 
                ? 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white shadow-xl shadow-emerald-500/30 hover:-translate-y-1 hover:scale-105 active:scale-95 animate-[pulse_2s_infinite]' 
                : 'bg-slate-200 text-slate-400 cursor-not-allowed grayscale'
            }`}
          >
            {currentQuestion === quizData.length - 1 ? "See Results" : "Next Question"}
            <ArrowRight className="w-6 h-6" />
          </button>
        </div>

      </div>
      <div className="mt-8 text-emerald-800/60 text-sm font-bold tracking-widest uppercase flex items-center gap-3 animate-pulse">
        <Sparkles className="w-4 h-4" /> Quiz Made by 1SG Atehortua <Sparkles className="w-4 h-4" />
      </div>
    </div>
  );
}
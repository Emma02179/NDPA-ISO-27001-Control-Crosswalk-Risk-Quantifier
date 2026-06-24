// ---------------------------------------------------------------
// NDPA 2023 <-> ISO/IEC 27001:2022 Control Crosswalk Reference Data
// Production Grade: Sequentially Sorted by Nigeria Data Protection Act Sections
// ---------------------------------------------------------------

const CROSSWALK = [
  {
    id: "cw03",
    ndpaSection: "Sec. 24 & 25",
    ndpaTitle: "Principles & Lawful Basis of Processing",
    ndpaSummary: "Personal data must be processed lawfully, fairly, and transparently based on explicit consent, contractual necessity, legal obligations, vital interests, or public mandate.",
    isoControls: [
      { code: "5.1", title: "Policies for information security", summary: "Information security policy and topic-specific policies should be defined, approved by management, and reviewed." }
    ],
    rationale: "Establishing legal collection mechanisms under NDPA Part V requires formal administrative data handling procedures defined explicitly within your core enterprise security policies."
  },
  {
    id: "cw04",
    ndpaSection: "Sec. 26",
    ndpaTitle: "Consent Mechanics & Burden of Proof",
    ndpaSummary: "The data controller bears the burden of proof to demonstrate that a data subject genuinely consented to the processing of their specific personal dataset.",
    isoControls: [
      { code: "8.12", title: "Data leakage prevention", summary: "Data leakage prevention measures should be applied to systems processing sensitive or personal information." }
    ],
    rationale: "Tracking, logging, and segregating consented records vs restricted channels aligns directly with preventing unauthorized secondary processing or data leaks."
  },
  {
    id: "cw02",
    ndpaSection: "Sec. 27",
    ndpaTitle: "Privacy Policy Transparency Obligations",
    ndpaSummary: "Requires controllers to explicitly inform data subjects of identity, collection purpose, recipients, retention criteria, and access rights before processing begins.",
    isoControls: [
      { code: "5.19", title: "Information security in relationships with supplier", summary: "Requirements for mitigating risks associated with supplier access to assets should be agreed and documented." }
    ],
    rationale: "Statutory transparency requires external communication of security and privacy parameters to data subjects and downstream processors handling organizational data assets."
  },
  {
    id: "cw07",
    ndpaSection: "Sec. 29",
    ndpaTitle: "Data Engagement & Processing Contracts (DPAs)",
    ndpaSummary: "Data controllers must bind data processors using a written agreement ensuring compliance with NDPA provisions and technical safety duties.",
    isoControls: [
      { code: "5.20", title: "Addressing information security within supplier agreements", summary: "Appropriate information security requirements should be established and agreed with each supplier handling corporate data assets." }
    ],
    rationale: "NDPA Section 29 explicitly mandates legal contracts for third-party processors, matching ISO requirements for technical security clauses in vendor agreements."
  },
  {
    id: "cw10",
    ndpaSection: "Sec. 33",
    ndpaTitle: "Data Protection Impact Assessments (DPIA)",
    ndpaSummary: "Mandates that controllers conduct a DPIA before processing where operations are likely to result in high risks to the rights and freedoms of data subjects, involving inventory mapping.",
    isoControls: [
      { code: "5.9", title: "Inventory of information and other associated assets", summary: "An inventory of information and other associated assets, including owners, should be maintained." }
    ],
    rationale: "You cannot accurately conduct a statutory risk evaluation or DPIA if you lack a master centralized inventory mapping out exactly where personal data assets reside."
  },
  {
    id: "cw05",
    ndpaSection: "Sec. 34 - 38",
    ndpaTitle: "Data Subject Rights (DSAR Fulfillment)",
    ndpaSummary: "Grants data subjects enforceable rights to access, rectify, erase, object to, object to automated decisions, and port their data out of corporate systems without delay.",
    isoControls: [
      { code: "8.10", title: "Information deletion", summary: "Information stored in information systems, devices or any other storage media should be deleted when no longer required." }
    ],
    rationale: "Fulfilling statutory rights to erasure ('right to be forgotten') requires functional technological mechanisms to safely purge data fields across all staging environments."
  },
  {
    id: "cw11",
    ndpaSection: "Sec. 34(1)(d)",
    ndpaTitle: "Data Retention Limitations",
    ndpaSummary: "Establishes that personal data cannot be retained longer than necessary to achieve the specific purposes for which it was originally collected.",
    isoControls: [
      { code: "8.11", title: "Data masking", summary: "Data masking should be used in accordance with the organisation's topic-specific policy on access control to protect sensitive data." }
    ],
    rationale: "Safely archiving or minimizing data outside active production fields demands structured technical strategies like masking, pseudonymization, or anonymization."
  },
  {
    id: "cw13",
    ndpaSection: "Sec. 39",
    ndpaTitle: "Security of Personal Data (Least Privilege)",
    ndpaSummary: "Requires implementing appropriate technical and organizational measures to ensure security, including restricting internal access parameters.",
    isoControls: [
      { code: "5.18", title: "Access rights", summary: "Access rights to information and other associated assets should be provisioned, reviewed, modified and removed in accordance with access control policies." }
    ],
    rationale: "Enforcing 'need-to-know' isolation criteria is the foundational technical measure to prevent unauthorized internal data access as mandated by the Act."
  },
  {
    id: "cw14",
    ndpaSection: "Sec. 39(1)(a)",
    ndpaTitle: "Data Protection via Cryptography",
    ndpaSummary: "Explicitly identifies pseudonymization and encryption of personal data as core technical safety measures required during data operational storage and transit.",
    isoControls: [
      { code: "8.24", title: "Use of cryptography", summary: "Rules for the use of cryptography, including cryptographic key management, should be defined and implemented." }
    ],
    rationale: "Cryptographic safeguarding directly fulfills the Act's suggestion of encryption to render intercepted or leaked data mathematically unreadable."
  },
  {
    id: "cw17",
    ndpaSection: "Sec. 39(1)(b)",
    ndpaTitle: "Technical Cyber Defenses & Endpoint Safety",
    ndpaSummary: "Requires protecting information systems, devices, and networks against ongoing cyber threats, unauthorized modifications, or programmatic corruption.",
    isoControls: [
      { code: "8.1", title: "User end point devices", summary: "Information on end-user devices must be protected regardless of where the device is used." },
      { code: "8.7", title: "Protection against malware", summary: "Malware protection must be implemented and supported by user awareness." }
    ],
    rationale: "Deploying enterprise endpoint tools and endpoint threat defenses fulfills the explicit statutory duty to protect corporate devices against exploitation."
  },
  {
    id: "cw15",
    ndpaSection: "Sec. 39(1)(c)",
    ndpaTitle: "Physical Security of Data Infrastructures",
    ndpaSummary: "Mandates ensuring the physical security of facilities, server clusters, and local hardware architectures containing processed citizen records.",
    isoControls: [
      { code: "7.1", title: "Physical security perimeters", summary: "Physical security perimeters should be defined and used to protect areas that contain information and other associated assets." }
    ],
    rationale: "Logical access control protections are rendered ineffective if threat actors can circumvent them by physically removing hard drives from facilities."
  },
  {
    id: "cw16",
    ndpaSection: "Sec. 39(1)(d)",
    ndpaTitle: "System Availability & Disaster Recovery",
    ndpaSummary: "Requires organizations to maintain structural backup facilities capable of restoring data availability and operational access swiftly in system disruptions.",
    isoControls: [
      { code: "5.29", title: "Information security during disruption", summary: "The organisation should plan for maintaining information security at an appropriate level during a disruption." },
      { code: "8.14", title: "Redundancy of information processing facilities", summary: "Information processing facilities should be implemented with redundancy sufficient to meet availability requirements." }
    ],
    rationale: "NDPA's structural focus on business resilience maps directly onto ISO's operational standards for high availability and disaster recovery."
  },
  {
    id: "cw12",
    ndpaSection: "Sec. 39(1)(e)",
    ndpaTitle: "Workforce Security & Awareness Training",
    ndpaSummary: "Mandates implementing operational training routines and continuous security education for personnel handling sensitive data processing systems.",
    isoControls: [
      { code: "5.6", title: "Contact with special interest groups", summary: "The organisation should maintain appropriate contacts with special interest groups or professional security forums." },
      { code: "6.3", title: "Information security awareness, education and training", summary: "Personnel should receive appropriate awareness education and regular updates on organizational policies." }
    ],
    rationale: "Human vulnerabilities are mitigated under both frameworks by driving standardized security education programs across all staff operational tracks."
  },
  {
    id: "cw18",
    ndpaSection: "Sec. 40",
    ndpaTitle: "Personal Data Breach Notification Tracking",
    ndpaSummary: "Requires tracking and notifying the Commission (NDPC) within 72 hours of detecting any data breach likely to result in personal risk.",
    isoControls: [
      { code: "8.15", title: "Logging", summary: "Logs of activity, exceptions, and faults must be produced, protected, and analysed." },
      { code: "8.16", title: "Monitoring activities", summary: "Networks, systems, and applications must be monitored for anomalous behaviour." }
    ],
    rationale: "Meeting a statutory 72-hour regulatory reporting deadline demands persistent logging and anomalous behavior detection mechanisms."
  },
  {
    id: "cw08",
    ndpaSection: "Sec. 41 - 43",
    ndpaTitle: "Cross-Border Data Transfer Restrictions",
    ndpaSummary: "Prohibits transferring personal data outside of Nigeria unless the destination country guarantees adequate legal protections approved by the NDPC.",
    isoControls: [
      { code: "5.15", title: "Access control", summary: "Rules to control physical and logical access to information and other associated assets should be established and implemented." }
    ],
    rationale: "Geographical sovereignty parameters are enforced logically by configuring access permissions and boundary constraints on cloud staging systems."
  },
  {
    id: "cw01",
    ndpaSection: "Sec. 44 & 45",
    ndpaTitle: "Designation of a Data Protection Officer (DPO)",
    ndpaSummary: "Controllers of major importance must designate a dedicated DPO to oversee compliance architectures, audit tracking, and act as Commission contact.",
    isoControls: [
      { code: "5.2", title: "Information security roles and responsibilities", summary: "Security roles and responsibilities must be clearly defined and assigned according to the organisation's needs." }
    ],
    rationale: "Both frameworks reject ambiguous ownership. The NDPA legalizes a statutory executive role; ISO 27001 requires the exact same structural transparency."
  },
  {
    id: "cw06",
    ndpaSection: "Sec. 48",
    ndpaTitle: "Enforcement Orders & Revenue-Based Fines",
    ndpaSummary: "Empowers the Commission to levy severe penalties: higher-degree fines up to ₦10M or 2% of annual gross revenue for major system compliance failures.",
    isoControls: [
      { code: "5.36", title: "Compliance with policies and standards for information security", summary: "Compliance with the organisation's information security policies, procedures, and statutory requirements should be regularly reviewed." }
    ],
    rationale: "Continuous compliance audits prevent the severe system failures that trigger the NDPC's top-tier revenue-based corporate fines."
  },
  {
    id: "cw09",
    ndpaSection: "General Duty",
    ndpaTitle: "Regulatory Independent Auditing & Review",
    ndpaSummary: "Under the legal purview of the NDPC, organizations must submit to periodic independent reviews and accountings of data tracking operations.",
    isoControls: [
      { code: "5.35", title: "Independent review of information security", summary: "The organisation's approach to managing information security and its implementation should be reviewed independently at planned intervals." }
    ],
    rationale: "The statutory obligation to verify compliance functions as an independent tracking protocol matching ISO's internal audit requirements."
  }
];
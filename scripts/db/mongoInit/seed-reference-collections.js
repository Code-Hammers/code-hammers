console.log('🌱 Seeding Profiles Collection...');

const users = db.users.find().toArray();
const forums = db.forums.find().toArray();

const cohorts = ['LA', 'NYC', 'ECRI', 'PTRI', 'WCRI', 'FTRI', 'CTRI'];

const cohortNumRange = 100;

const professionalSummaryOptions = [
  'Experienced full-stack developer passionate about building scalable web applications with a focus on user experience.',
  'Backend engineer specializing in designing and optimizing database architectures for high-performance applications.',
  'Frontend developer skilled in crafting responsive and intuitive user interfaces using modern JavaScript frameworks.',
  'DevOps engineer proficient in automating CI/CD pipelines and optimizing infrastructure for scalable cloud-based applications.',
  'Software engineer with expertise in designing and implementing RESTful APIs for seamless integration between applications.',
  'Mobile app developer adept at building cross-platform applications with a strong emphasis on performance and usability.',
  'AI and machine learning engineer leveraging data science techniques to develop predictive models for real-world applications.',
  'Security-focused software engineer ensuring robust protection mechanisms and compliance with industry security standards.',
  'Blockchain developer experienced in smart contract development and decentralized application (dApp) architecture.',
  'Game developer passionate about creating immersive gaming experiences with a strong foundation in graphics programming.',
];

const skillOptions = [
  'JavaScript',
  'Python',
  'Java',
  'C++',
  'C#',
  'Ruby',
  'HTML',
  'CSS',
  'SQL',
  'NoSQL',
  'Git',
  'Agile Development',
  'Scrum',
  'RESTful APIs',
  'GraphQL',
  'Docker',
  'Kubernetes',
  'CI/CD',
  'AWS',
  'Azure',
  'Google Cloud Platform',
  'Machine Learning',
  'Deep Learning',
  'Data Science',
  'Big Data',
  'Microservices',
  'Serverless Architecture',
  'Mobile Development',
  'iOS Development',
  'Android Development',
  'React',
  'Angular',
  'Vue.js',
  'Node.js',
  'Django',
  'Flask',
  'Spring Boot',
  'Laravel',
  'ASP.NET',
  'Blockchain',
  'Cybersecurity',
  'Unit Testing',
  'Integration Testing',
  'System Design',
  'Database Design',
  'Software Architecture',
  'Performance Optimization',
  'DevOps',
  'Continuous Deployment',
  'TDD (Test-Driven Development)',
  'BDD (Behavior-Driven Development)',
  'Graph Databases',
  'WebSockets',
  'Event-Driven Architecture',
  'Functional Programming',
  'Object-Oriented Programming',
  'SaaS (Software as a Service)',
  'PaaS (Platform as a Service)',
  'FaaS (Function as a Service)',
  'User Experience (UX) Design',
  'User Interface (UI) Design',
  'Version Control',
  'Automated Testing',
  'Code Review',
  'Pair Programming',
  'Cloud Computing',
  'Containerization',
  'Infrastructure as Code',
  'API Development',
  'API Integration',
  'ETL (Extract, Transform, Load)',
  'Data Warehousing',
  'Data Visualization',
  'Natural Language Processing',
  'Robotic Process Automation',
  'Edge Computing',
  'IoT (Internet of Things)',
  'AR/VR (Augmented/Virtual Reality)',
  'Quantum Computing',
  'Reactive Programming',
  'Concurrency',
  'Parallel Computing',
  'Graph Theory',
  'Algorithm Design',
  'Design Patterns',
  'Refactoring',
  'Legacy Code Management',
  'Technical Writing',
  'Project Management',
  'Communication Skills',
  'Problem-Solving',
  'Critical Thinking',
  'Time Management',
  'Collaboration',
  'Leadership',
];

const jobTitleOptions = [
  'Software Engineer',
  'Senior Software Engineer',
  'Lead Software Engineer',
  'Principal Software Engineer',
  'Junior Software Engineer',
  'Software Developer',
  'Backend Developer',
  'Frontend Developer',
  'Full Stack Developer',
  'DevOps Engineer',
  'Site Reliability Engineer',
  'Mobile Developer',
  'iOS Developer',
  'Android Developer',
  'Web Developer',
  'Embedded Systems Engineer',
  'Data Engineer',
  'Machine Learning Engineer',
  'AI Engineer',
  'Data Scientist',
  'Cloud Engineer',
  'Security Engineer',
  'QA Engineer',
  'Automation Engineer',
  'Test Engineer',
  'Software Architect',
  'Technical Lead',
  'Engineering Manager',
  'Technical Program Manager',
  'Product Manager',
];

const companyOptions = [
  'Google',
  'Apple',
  'Microsoft',
  'Amazon',
  'Facebook',
  'Twitter',
  'Tesla',
  'Netflix',
  'Adobe',
  'Intel',
  'NVIDIA',
  'Oracle',
  'IBM',
  'Salesforce',
  'Cisco',
  'Uber',
  'Airbnb',
  'Lyft',
  'Spotify',
  'Snapchat',
  'Dropbox',
  'PayPal',
  'Square',
  'Shopify',
  'Zoom',
  'Slack',
  'Red Hat',
  'Atlassian',
  'GitHub',
  'LinkedIn',
  'Pinterest',
  'Stripe',
  'Twilio',
  'Asana',
  'Qualcomm',
  'VMware',
  'Palantir',
  'Coinbase',
  'Robinhood',
  'Snowflake',
  'ServiceNow',
  'Workday',
  'DocuSign',
  'Okta',
  'Datadog',
  'HubSpot',
  'DoorDash',
  'Epic Games',
  'EA (Electronic Arts)',
  'Activision Blizzard',
];

const collegeOptions = [
  'Harvard University',
  'Stanford University',
  'Massachusetts Institute of Technology (MIT)',
  'California Institute of Technology (Caltech)',
  'University of California, Berkeley',
  'University of Oxford',
  'University of Cambridge',
  'Princeton University',
  'Columbia University',
  'University of Chicago',
  'Yale University',
  'University of Pennsylvania',
  'University of California, Los Angeles (UCLA)',
  'Johns Hopkins University',
  'University of Southern California',
  'Duke University',
  'Cornell University',
  'Northwestern University',
  'University of Michigan',
  'New York University (NYU)',
  'Carnegie Mellon University',
  'University of Toronto',
  'University of Washington',
  'University College London (UCL)',
  'Imperial College London',
  'London School of Economics and Political Science (LSE)',
  'University of Edinburgh',
  'University of British Columbia',
  'University of Texas at Austin',
  'Georgia Institute of Technology',
  'University of Melbourne',
  'University of Sydney',
  'Australian National University',
  'University of Queensland',
  'University of New South Wales (UNSW Sydney)',
  'McGill University',
  'University of Montreal',
  'University of Alberta',
  'ETH Zurich - Swiss Federal Institute of Technology',
  'EPFL - École Polytechnique Fédérale de Lausanne',
  'University of Tokyo',
  'Kyoto University',
  'Seoul National University',
  'National University of Singapore (NUS)',
  'Nanyang Technological University (NTU)',
  'Peking University',
  'Tsinghua University',
  'Fudan University',
  'Shanghai Jiao Tong University',
  'Hong Kong University of Science and Technology (HKUST)',
  'University of Hong Kong (HKU)',
  'Chinese University of Hong Kong (CUHK)',
  'University of California, San Diego (UCSD)',
  'University of California, Santa Barbara (UCSB)',
  'University of Illinois at Urbana-Champaign',
  'University of Wisconsin-Madison',
  'University of Minnesota',
  'University of Florida',
  'University of Maryland, College Park',
  'Ohio State University',
  'Pennsylvania State University',
  'University of North Carolina at Chapel Hill',
  'Purdue University',
  'University of Virginia',
  'Vanderbilt University',
  'Rice University',
  'Emory University',
  'Washington University in St. Louis',
  'Brown University',
  'University of Notre Dame',
  'Georgetown University',
  'Boston University',
  'University of Miami',
  'University of Rochester',
  'Case Western Reserve University',
  'University of Colorado Boulder',
  'University of Utah',
  'University of Arizona',
  'University of Iowa',
  'Indiana University Bloomington',
  'Michigan State University',
  'Rutgers University',
  'University of Pittsburgh',
  'University of Delaware',
  'University of Connecticut',
  'University of Kansas',
  'University of Oregon',
  'University of Tennessee',
  'University of South Carolina',
  'Clemson University',
  'University of Oklahoma',
  'University of Kentucky',
  'University of Nebraska-Lincoln',
  'University of Houston',
  'University of Georgia',
  'University of Missouri',
  'University of Massachusetts Amherst',
  'University of Vermont',
  'Syracuse University',
  'Brigham Young University',
];

const degreeOptions = [
  'High School Diploma',
  'Associate Degree',
  "Bachelor's Degree",
  'Bachelor of Arts (BA)',
  'Bachelor of Science (BS)',
  'Bachelor of Fine Arts (BFA)',
  'Bachelor of Business Administration (BBA)',
  'Bachelor of Engineering (BE)',
  'Bachelor of Technology (BTech)',
  "Master's Degree",
  'Master of Arts (MA)',
  'Master of Science (MS)',
  'Master of Business Administration (MBA)',
  'Master of Fine Arts (MFA)',
  'Master of Engineering (ME)',
  'Master of Technology (MTech)',
  'Master of Public Administration (MPA)',
  'Master of Public Health (MPH)',
  'Master of Social Work (MSW)',
  'Master of Education (MEd)',
  'Doctoral Degree',
  'Doctor of Philosophy (PhD)',
  'Doctor of Education (EdD)',
  'Doctor of Business Administration (DBA)',
  'Doctor of Medicine (MD)',
  'Doctor of Dental Surgery (DDS)',
  'Doctor of Dental Medicine (DMD)',
  'Doctor of Veterinary Medicine (DVM)',
  'Juris Doctor (JD)',
  'Doctor of Pharmacy (PharmD)',
  'Professional Degree',
  'Postdoctoral Research',
  'Certificate Program',
  'Diploma Program',
  'Trade School Certification',
  'Technical School Certification',
  'Continuing Education',
  'Professional Development',
  'Executive Education',
];

const fieldOfStudyOptions = [
  'Computer Science',
  'Electrical Engineering',
  'Mechanical Engineering',
  'Civil Engineering',
  'Chemical Engineering',
  'Biomedical Engineering',
  'Aerospace Engineering',
  'Environmental Engineering',
  'Information Technology',
  'Data Science',
  'Physics',
  'Mathematics',
  'Statistics',
  'Chemistry',
  'Biology',
  'Biochemistry',
  'Psychology',
  'Sociology',
  'Anthropology',
  'Political Science',
  'Economics',
  'Finance',
  'Business Administration',
  'Marketing',
  'Accounting',
  'Management',
  'International Relations',
  'History',
  'Philosophy',
  'English Literature',
  'Linguistics',
  'Journalism',
  'Communication Studies',
  'Education',
  'Law',
  'Public Health',
  'Nursing',
  'Medicine',
  'Dentistry',
  'Pharmacy',
  'Veterinary Medicine',
  'Architecture',
  'Urban Planning',
  'Fine Arts',
  'Music',
  'Theater',
  'Film Studies',
  'Graphic Design',
  'Interior Design',
];

const projectOptions = [
  {
    name: 'CodeBot',
    description: 'Automated code generation tool using AI for faster development cycles.',
    link: 'https://github.com/username/codebot',
  },
  {
    name: 'DataCrunch',
    description: 'Real-time data analytics platform for extracting insights from big data.',
    link: 'https://github.com/username/datacrunch',
  },
  {
    name: 'CloudGuard',
    description: 'Advanced cloud security suite ensuring data protection and compliance.',
    link: 'https://github.com/username/cloudguard',
  },
  {
    name: 'RoboVision',
    description: 'AI-powered computer vision system for object detection and recognition.',
    link: 'https://github.com/username/robovision',
  },
  {
    name: 'CryptoTrack',
    description: 'Blockchain-based cryptocurrency portfolio tracker for investors.',
    link: 'https://github.com/username/cryptotrack',
  },
  {
    name: 'SmartHomeHub',
    description: 'Centralized home automation system integrating IoT devices for smart living.',
    link: 'https://github.com/username/smarthomehub',
  },
  {
    name: 'HealthLink',
    description: 'Telemedicine platform connecting patients with healthcare providers remotely.',
    link: 'https://github.com/username/healthlink',
  },
  {
    name: 'AugmentWorks',
    description: 'Augmented reality application for enhancing workplace productivity and training.',
    link: 'https://github.com/username/augmentworks',
  },
  {
    name: 'GenomeQuest',
    description: 'Genomic data analysis tool for researchers and bioinformaticians.',
    link: 'https://github.com/username/genomequest',
  },
  {
    name: 'NetPlanner',
    description:
      'Network infrastructure planning software for optimizing bandwidth and efficiency.',
    link: 'https://github.com/username/netplanner',
  },
  {
    name: 'VoiceAssistant',
    description: 'Voice-controlled personal assistant using natural language processing.',
    link: 'https://github.com/username/voiceassistant',
  },
  {
    name: 'EcoTech',
    description: 'Environmental monitoring and conservation app with real-time data visualization.',
    link: 'https://github.com/username/ecotech',
  },
  {
    name: 'SecureChat',
    description: 'End-to-end encrypted messaging app ensuring user privacy and security.',
    link: 'https://github.com/username/securechat',
  },
  {
    name: 'VirtualTour',
    description: 'Virtual reality tour application for immersive travel experiences.',
    link: 'https://github.com/username/virtualtour',
  },
  {
    name: 'CodeAnalyzer',
    description: 'Static code analysis tool for detecting bugs and code quality improvements.',
    link: 'https://github.com/username/codeanalyzer',
  },
  {
    name: 'SmartInventory',
    description: 'Inventory management system with RFID and IoT integration for tracking assets.',
    link: 'https://github.com/username/smartinventory',
  },
  {
    name: 'LearnHub',
    description:
      'Online learning platform offering courses on various subjects with interactive content.',
    link: 'https://github.com/username/learnhub',
  },
  {
    name: 'HealthMonitor',
    description:
      'Personal health monitoring app with AI-driven analytics and wearable device integration.',
    link: 'https://github.com/username/healthmonitor',
  },
  {
    name: 'JobFinder',
    description:
      'Job search and application management platform with personalized recommendations.',
    link: 'https://github.com/username/jobfinder',
  },
  {
    name: 'SmartGrid',
    description: 'Smart grid technology for efficient energy distribution and consumption.',
    link: 'https://github.com/username/smartgrid',
  },
  {
    name: 'RoboTrader',
    description: 'Algorithmic trading platform for automated stock market analysis and trading.',
    link: 'https://github.com/username/robotrader',
  },
  {
    name: 'SocialConnect',
    description: 'Social media integration platform for managing multiple social accounts.',
    link: 'https://github.com/username/socialconnect',
  },
  {
    name: 'TourismApp',
    description:
      'Mobile application for tourists providing travel guides and local recommendations.',
    link: 'https://github.com/username/tourismapp',
  },
  {
    name: 'SmartMirror',
    description:
      'Interactive mirror with IoT capabilities displaying weather, news, and calendar updates.',
    link: 'https://github.com/username/smartmirror',
  },
  {
    name: 'VirtualMarket',
    description:
      'Virtual reality shopping experience allowing users to browse and buy products online.',
    link: 'https://github.com/username/virtualmarket',
  },
  {
    name: 'CodeReview',
    description: 'Collaborative code review platform with annotations and feedback features.',
    link: 'https://github.com/username/codereview',
  },
  {
    name: 'AIAssistant',
    description: 'Artificial intelligence assistant for managing tasks, scheduling, and reminders.',
    link: 'https://github.com/username/aiassistant',
  },
  {
    name: 'SecureBackup',
    description: 'Encrypted cloud backup solution ensuring secure storage and data protection.',
    link: 'https://github.com/username/securebackup',
  },
  {
    name: 'SmartCarPark',
    description:
      'Smart parking management system using IoT sensors for efficient parking space utilization.',
    link: 'https://github.com/username/smartcarpark',
  },
  {
    name: 'HomeSecurity',
    description:
      'Home security system with video surveillance, motion detection, and alarm integration.',
    link: 'https://github.com/username/homesecurity',
  },
  {
    name: 'EduTech',
    description:
      'Educational technology platform offering virtual classrooms and interactive learning tools.',
    link: 'https://github.com/username/edutech',
  },
  {
    name: 'EventPlanner',
    description: 'Event management and planning software for organizing and coordinating events.',
    link: 'https://github.com/username/eventplanner',
  },
  {
    name: 'SmartFarm',
    description:
      'Smart agriculture system with IoT sensors for monitoring and optimizing farm operations.',
    link: 'https://github.com/username/smartfarm',
  },
  {
    name: 'MediCare',
    description:
      'Medical appointment scheduling and patient management system for healthcare providers.',
    link: 'https://github.com/username/medicare',
  },
  {
    name: 'FoodDelivery',
    description:
      'Online food delivery platform connecting restaurants with customers for food ordering.',
    link: 'https://github.com/username/fooddelivery',
  },
  {
    name: 'AIChatbot',
    description: 'AI-powered chatbot for customer support and interactive communication.',
    link: 'https://github.com/username/aichatbot',
  },
  {
    name: 'SmartCity',
    description:
      'Integrated urban management system using IoT and data analytics for smart city initiatives.',
    link: 'https://github.com/username/smartcity',
  },
  {
    name: 'VirtualAssistant',
    description:
      'Virtual assistant software for voice command-based tasks and personal assistance.',
    link: 'https://github.com/username/virtualassistant',
  },
  {
    name: 'SmartLearning',
    description: 'AI-driven personalized learning platform with adaptive learning algorithms.',
    link: 'https://github.com/username/smartlearning',
  },
  {
    name: 'RecruitmentAI',
    description: 'AI-powered recruitment platform for matching candidates with job opportunities.',
    link: 'https://github.com/username/recruitmentai',
  },
  {
    name: 'CloudStorage',
    description: 'Cloud storage service with file synchronization and sharing capabilities.',
    link: 'https://github.com/username/cloudstorage',
  },
  {
    name: 'TravelGuide',
    description:
      'Interactive travel guide application providing travel tips and destination insights.',
    link: 'https://github.com/username/travelguide',
  },
  {
    name: 'SmartWatch',
    description:
      'Smart wearable device with health monitoring, fitness tracking, and notification features.',
    link: 'https://github.com/username/smartwatch',
  },
  {
    name: 'ARNavigation',
    description:
      'Augmented reality navigation app for real-time directions and location-based information.',
    link: 'https://github.com/username/arnavigation',
  },
  {
    name: 'CryptoWallet',
    description:
      'Cryptocurrency wallet application for securely storing and managing digital assets.',
    link: 'https://github.com/username/cryptowallet',
  },
  {
    name: 'CodeOptimizer',
    description:
      'AI-driven code optimization tool for improving software performance and efficiency.',
    link: 'https://github.com/username/codeoptimizer',
  },
];

const testimonialOptions = [
  {
    from: 'Alice Johnson',
    relation: 'Manager at TechSolutions Inc.',
    text: "This derp's ability to solve complex problems with elegant solutions is unparalleled. This derp's code is clean, efficient, and always delivered ahead of schedule.",
  },
  {
    from: 'David Smith',
    relation: 'Colleague at InnovateTech Ltd.',
    text: 'Working with This derp has been a pleasure. This derp brings deep technical expertise and a collaborative spirit to every project, making This derp an invaluable team member.',
  },
  {
    from: 'Emily Brown',
    relation: 'Client at GlobalSoft Solutions',
    text: "This derp's dedication to understanding our business needs and delivering customized software solutions has significantly improved our operational efficiency.",
  },
  {
    from: 'Daniel Lee',
    relation: 'Project Manager at Digital Dynamics',
    text: "This derp consistently exceeds expectations with this derp's innovative approach and meticulous attention to detail. This derp's contributions have been instrumental in our project's success.",
  },
  {
    from: 'Olivia White',
    relation: 'Tech Lead at Cloud Innovations',
    text: "Mark's expertise in backend development and this derp's proactive attitude make this derp a standout engineer. This derp has a knack for turning complex requirements into robust solutions.",
  },
  {
    from: 'Sophia Martinez',
    relation: 'Director of Engineering at FutureTech',
    text: "Jessica's leadership in architecting scalable and maintainable software solutions has been pivotal in our company's growth. This derp is a true asset to any team.",
  },
  {
    from: 'Ethan Taylor',
    relation: 'Co-founder at StartupX',
    text: "This derp's ability to rapidly prototype and iterate on software ideas has been crucial for our startup's early success. This derp's technical skills are top-notch.",
  },
  {
    from: 'Isabella Clark',
    relation: 'HR Manager at TechFusion',
    text: "Maria's professionalism and strong problem-solving skills make her a reliable team member. She consistently delivers high-quality code and meets deadlines.",
  },
  {
    from: 'Noah Rodriguez',
    relation: 'Product Owner at AgileSoft',
    text: "Julia's collaborative approach and expertise in frontend development have significantly enhanced our product's user experience. She's a pleasure to work with.",
  },
  {
    from: 'Aiden Walker',
    relation: 'CTO at Innovate Solutions',
    text: "Jack's deep understanding of software architecture and this derp's ability to mentor junior developers have been invaluable to our team's growth and success.",
  },
  {
    from: 'Liam Harris',
    relation: 'Lead Developer at CloudTech',
    text: "Sarah's technical expertise and collaborative spirit make this derp an outstanding team member. This derp's contributions have been critical to our project's success.",
  },
  {
    from: 'Emma Thompson',
    relation: 'Manager at DataTech Solutions',
    text: "Andrew's ability to analyze complex problems and deliver effective solutions is commendable. His work ethic and professionalism set a high standard.",
  },
  {
    from: 'Lucas Miller',
    relation: 'CTO at InnovateTech Ltd.',
    text: "Lucas's creativity and technical proficiency have been invaluable to our team's success. This derp consistently delivers high-quality code and exceeds expectations.",
  },
  {
    from: 'Sophie Turner',
    relation: 'Project Manager at Digital Dynamics',
    text: "Emily's expertise in software design and development has been crucial for our project's success. This derp's dedication and problem-solving skills are exemplary.",
  },
  {
    from: 'Emma Watson',
    relation: 'Director of Engineering at FutureTech',
    text: "This derp's leadership and technical skills have been instrumental in our project's progress. This derp's ability to innovate and collaborate makes this derp a valuable team member.",
  },
  {
    from: 'Oliver Jackson',
    relation: 'HR Manager at TechFusion',
    text: "Olivia's dedication and problem-solving skills have significantly contributed to our project's success. This derp's expertise in frontend development is exceptional.",
  },
  {
    from: 'Sophia Brown',
    relation: 'Product Owner at AgileSoft',
    text: "This derp's leadership and technical guidance have been crucial in our team's achievements. This derp's commitment to excellence is evident in every project.",
  },
  {
    from: 'Ethan Green',
    relation: 'CTO at Innovate Solutions',
    text: "Ethan's collaborative approach and strong technical skills make him a valuable asset to our team. This derp's contributions have improved our project's efficiency.",
  },
  {
    from: 'Mia Davis',
    relation: 'Lead Developer at CloudTech',
    text: "This derp's innovative solutions and meticulous attention to detail have greatly benefited our project. This derp is a talented engineer and a pleasure to collaborate with.",
  },
  {
    from: 'Noah Wilson',
    relation: 'Manager at DataTech Solutions',
    text: "This derp's technical expertise and collaborative spirit make this derp an outstanding team member. This derp's contributions have been critical to our project's success.",
  },
  {
    from: 'Ava Miller',
    relation: 'CTO at InnovateTech Ltd.',
    text: "Ava's ability to analyze complex problems and deliver effective solutions is commendable. This derp's work ethic and professionalism set a high standard.",
  },
  {
    from: 'Sophia Turner',
    relation: 'Project Manager at Digital Dynamics',
    text: "This derp's expertise in software design and development has been crucial for our project's success. This derp's dedication and problem-solving skills are exemplary.",
  },
  {
    from: 'Ella Watson',
    relation: 'Director of Engineering at FutureTech',
    text: "This derp's leadership and technical skills have been instrumental in our project's progress. This derp's ability to innovate and collaborate makes this derp a valuable team member.",
  },
  {
    from: 'Oliver Jackson',
    relation: 'HR Manager at TechFusion',
    text: "Olivia's dedication and problem-solving skills have significantly contributed to our project's success. This derp's expertise in frontend development is exceptional.",
  },
  {
    from: 'Sophia Brown',
    relation: 'Product Owner at AgileSoft',
    text: "This derp's leadership and technical guidance have been crucial in our team's achievements. This derp's commitment to excellence is evident in every project.",
  },
  {
    from: 'Ethan Green',
    relation: 'CTO at Innovate Solutions',
    text: "Ethan's collaborative approach and strong technical skills make him a valuable asset to our team. This derp's contributions have improved our project's efficiency.",
  },
  {
    from: 'Mia Davis',
    relation: 'Lead Developer at CloudTech',
    text: "This derp's innovative solutions and meticulous attention to detail have greatly benefited our project. This derp is a talented engineer and a pleasure to collaborate with.",
  },
  {
    from: 'Noah Wilson',
    relation: 'Manager at DataTech Solutions',
    text: "This derp's technical expertise and collaborative spirit make this derp an outstanding team member. This derp's contributions have been critical to our project's success.",
  },
  {
    from: 'Ava Miller',
    relation: 'CTO at InnovateTech Ltd.',
    text: "Ava's ability to analyze complex problems and deliver effective solutions is commendable. This derp's work ethic and professionalism set a high standard.",
  },
  {
    from: 'Sophia Turner',
    relation: 'Project Manager at Digital Dynamics',
    text: "This derp's expertise in software design and development has been crucial for our project's success. This derp's dedication and problem-solving skills are exemplary.",
  },
  {
    from: 'Ella Watson',
    relation: 'Director of Engineering at FutureTech',
    text: "This derp's leadership and technical skills have been instrumental in our project's progress. This derp's ability to innovate and collaborate makes this derp a valuable team member.",
  },
  {
    from: 'Oliver Jackson',
    relation: 'HR Manager at TechFusion',
    text: "Olivia's dedication and problem-solving skills have significantly contributed to our project's success. This derp's expertise in frontend development is exceptional.",
  },
  {
    from: 'Sophia Brown',
    relation: 'Product Owner at AgileSoft',
    text: "This derp's leadership and technical guidance have been crucial in our team's achievements. This derp's commitment to excellence is evident in every project.",
  },
  {
    from: 'Ethan Green',
    relation: 'CTO at Innovate Solutions',
    text: "Ethan's collaborative approach and strong technical skills make him a valuable asset to our team. This derp's contributions have improved our project's efficiency.",
  },
  {
    from: 'Mia Davis',
    relation: 'Lead Developer at CloudTech',
    text: "This derp's innovative solutions and meticulous attention to detail have greatly benefited our project",
  },
];

const bootcampOptions = [
  'Codesmith',
  'Le Wagon',
  'App Academy',
  'General Assembly',
  'Flatiron School',
  'Fullstack Academy',
  'Hack Reactor',
  'Coding Dojo',
  'Ironhack',
  'Thinkful',
  'BrainStation',
  'Lambda School',
  'The Tech Academy',
  'CareerFoundry',
  'Makers Academy',
  'Tech Elevator',
  'DevMountain',
  'Galvanize',
  'Nucamp',
  'Springboard',
  'Kenzie Academy',
];

const personBioOptions = [
  'Passionate software engineer with a love for solving complex problems and building scalable applications.',
  'Dedicated to continuous learning and improvement, always striving to stay updated with the latest technologies.',
  'Experienced in both frontend and backend development, with a focus on creating elegant and efficient solutions.',
  'Enthusiastic about open-source contributions and collaborating with diverse teams to deliver impactful projects.',
  'Driven by a curiosity for innovation and a commitment to delivering high-quality software solutions.',
  'Detail-oriented developer with a strong foundation in algorithms and data structures.',
  'Committed to writing clean, maintainable code that meets rigorous performance standards.',
  'Skilled communicator able to translate technical concepts into user-friendly solutions and documentation.',
  'Adaptable problem solver who thrives in dynamic, fast-paced environments.',
  "Passionate about building inclusive and accessible software that improves people's lives.",
  'Experienced in Agile methodologies, with a track record of delivering projects on time and within budget.',
  'Devoted to fostering a collaborative team environment and mentoring junior developers.',
  'Strong analytical thinker with a knack for troubleshooting and resolving complex technical issues.',
  'Proactive learner constantly exploring emerging technologies and trends in the software industry.',
  'Focused on creating seamless user experiences through intuitive interface design and interaction.',
  'Experienced in deploying and maintaining applications on cloud platforms like AWS and Azure.',
  'Passionate about leveraging data-driven insights to optimize software performance and user engagement.',
  'Dedicated to upholding best practices in software engineering, including testing, code reviews, and version control.',
  'Skilled in working with cross-functional teams to deliver innovative software solutions that exceed expectations.',
  'Experienced in building scalable microservices architectures and integrating third-party APIs.',
  'Adept at optimizing SQL and NoSQL databases for performance and scalability.',
  'Committed to ensuring software security and compliance with industry standards and regulations.',
  'Passionate about improving codebase efficiency through refactoring and performance tuning.',
  'Enthusiastic about exploring the intersection of technology and social impact.',
  'Skilled in UX/UI design principles, with a focus on creating intuitive and visually appealing interfaces.',
  'Proven ability to lead technical projects from inception to successful deployment and maintenance.',
  'Innovative thinker with a track record of proposing and implementing creative solutions to technical challenges.',
  'Advocate for diversity and inclusion in the tech industry, fostering a welcoming and supportive workplace culture.',
  'Experienced in international collaboration and remote work, with a strong appreciation for cultural diversity.',
  'Driven by a passion for problem-solving and a commitment to continuous professional development.',
  'Committed to ethical software development practices and promoting transparency in technology.',
  'Skilled in conducting technical workshops and seminars to share knowledge and mentor aspiring developers.',
  'Passionate about contributing to the tech community through open-source projects and knowledge sharing.',
  'Experienced in rapid prototyping and iterative development methodologies.',
  'Focused on delivering user-centric solutions that address real-world needs and challenges.',
];

const randomIndex = (arr) => Math.floor(Math.random() * arr.length);

const createRandomCohort = () => {
  return `${cohorts[randomIndex(cohorts)]} ${Math.floor(Math.random() * cohortNumRange)}`;
};

const createRandomDates = () => {
  const rawDate = Date.now() - Math.floor(Math.random()) * 1000 * 60 * 60 * 24 * 365 * 10;
  return [
    new Date(rawDate),
    new Date(rawDate + Math.floor(Math.random() * 1000 * 60 * 60 * 24 * 365 * 4)),
  ];
};

const createRandomSkillArray = () => {
  const randomSkills = [];
  const randoNum = Math.floor(Math.random() * 20);
  if (randoNum === 0) return randomSkills;

  for (let i = 0; i < randoNum; i++) {
    const randoIndex = randomIndex(skillOptions);

    if (randomSkills.includes(skillOptions[randoIndex])) continue;
    else randomSkills.push(skillOptions[randoIndex]);
  }

  return randomSkills;
};

const createRandomPosition = () => {
  return {
    title: jobTitleOptions[randomIndex(jobTitleOptions)],
    company: companyOptions[randomIndex(companyOptions)],
  };
};

const createPastPositions = () => {
  const pastPositions = [];
  const randoNum = Math.floor(Math.random() * 5);
  if (randoNum === 0) return pastPositions;
  for (let i = 0; i <= randoNum; i++) {
    const dates = createRandomDates();
    pastPositions.push({
      ...createRandomPosition(),
      startDate: dates[0],
      endDate: dates[1],
    });
  }
  return pastPositions;
};

const createRandomEducation = () => {
  const education = [];
  const num = Math.floor(Math.random() * 4) + 1;
  for (let i = 0; i < num; i++) {
    const dates = createRandomDates();
    education.push({
      institution: collegeOptions[randomIndex(collegeOptions)],
      degree: degreeOptions[randomIndex(degreeOptions)],
      fieldOfStudy: fieldOfStudyOptions[randomIndex(fieldOfStudyOptions)],
      startDate: dates[0],
      endDate: dates[1],
    });
  }
  return education;
};

const createRandomProjects = () => {
  const projects = [];
  let numProjects = Math.floor(Math.random() * 5);
  if (numProjects === 0) return projects;
  for (let i = 0; i <= numProjects; i++) {
    projects.push(projectOptions[randomIndex(projectOptions)]);
  }
  return projects;
};

const createTestimonials = () => {
  const testimonials = [];
  const numTestimonials = Math.floor(Math.random() * 5);
  if (numTestimonials === 0) return testimonials;
  for (let i = 0; i <= numTestimonials; i++) {
    testimonials.push(testimonialOptions[randomIndex(testimonialOptions)]);
  }
  return testimonials;
};

const generateProfile = (userDoc) => {
  return {
    user: userDoc._id,
    firstName: userDoc.firstName,
    lastName: userDoc.lastName,
    profilePhoto: userDoc.profilePic,
    cohort: createRandomCohort(),
    graduationYear: createRandomDates()[0].getUTCFullYear(),
    email: userDoc.email,
    linkedInProfile: `https://www.linkedin.com/in/${userDoc.firstName + '-' + userDoc.lastName + '-fake'}`,
    professionalSummary: professionalSummaryOptions[randomIndex(professionalSummaryOptions)],
    skills: createRandomSkillArray(),
    specializations: createRandomSkillArray(),
    careerInformation: {
      currentPosition: createRandomPosition(),
      pastPositions: createPastPositions(),
    },
    education: createRandomEducation(),
    projects: createRandomProjects(),
    personalBio: personBioOptions[randomIndex(personBioOptions)],
    testimonials: createTestimonials(),
    socialMediaLinks: {
      twitter:
        Math.random() > 0.5
          ? `https://x.com/${userDoc.firstName + '-' + userDoc.lastName}-fake`
          : undefined,
      blog:
        Math.random() > 0.5
          ? `https://www.${userDoc.firstName + '-' + userDoc.lastName}-fake-blog.com`
          : undefined,
      other:
        Math.random() > 0.5
          ? [`https://www.instagram.com/${userDoc.firstName + '-' + userDoc.lastName}-fake`]
          : undefined,
    },
    availabilityForNetworking: Math.random() > 0.4 ? true : false,
    bootcampExperience: bootcampOptions[randomIndex(bootcampOptions)],
  };
};

const profiles = users.map((u) => generateProfile(u));

db.profiles.insertMany(profiles);

console.log('🏁 Seeding Profiles Collection Successful!');

console.log('🌱 Seeding Threads Collection...');

const threadOptions = [
  {
    title: 'Best IDEs for Web Development?',
    content:
      "I'm exploring different IDE options for web development. What are your recommendations and why? Looking for suggestions on both free and paid IDEs.",
  },
  {
    title: 'How to Improve Code Review Process?',
    content:
      "Seeking advice on optimizing our team's code review process. What tools and practices do you use to ensure effective code reviews and maintain code quality?",
  },
  {
    title: 'Career Advice: Frontend vs Backend?',
    content:
      'Considering specializing in either frontend or backend development. What are the pros and cons of each? Which path offers better career opportunities?',
  },
  {
    title: 'Introduction to Docker Containers',
    content:
      "New to Docker and containers? Let's discuss the basics, benefits, and practical applications of Docker in software development and deployment.",
  },
  {
    title: 'JavaScript Frameworks Comparison',
    content:
      'Comparing popular JavaScript frameworks like React, Angular, and Vue.js. Share your experiences, strengths, and weaknesses of each framework.',
  },
  {
    title: 'Tips for Effective Debugging',
    content:
      'Share your best practices and tools for debugging complex issues in software development. How do you approach troubleshooting and resolving bugs?',
  },
  {
    title: 'Remote Work: Challenges and Solutions',
    content:
      'Discussing the challenges faced while working remotely and sharing strategies to stay productive, maintain communication, and foster team collaboration.',
  },
  {
    title: 'Machine Learning for Beginners',
    content:
      "New to machine learning? Let's explore foundational concepts, resources, and hands-on tutorials to get started with machine learning projects.",
  },
  {
    title: 'Continuous Integration and Deployment (CI/CD)',
    content:
      'Exploring CI/CD pipelines, best practices, and tools for automating software delivery processes. Share your experiences and tips for implementing CI/CD.',
  },
  {
    title: 'Interview Preparation Tips',
    content:
      'Preparing for software engineering interviews? Discussing strategies, common interview questions, and resources to ace technical interviews.',
  },
  {
    title: 'Frontend Performance Optimization Techniques',
    content:
      'Exploring strategies and tools to optimize frontend performance. Share tips on reducing page load times, improving rendering efficiency, and optimizing assets.',
  },
  {
    title: 'Backend Architecture Best Practices',
    content:
      'Discussing best practices for designing scalable and resilient backend architectures. How do you ensure high availability and fault tolerance?',
  },
  {
    title: 'Version Control: Git Tips and Tricks',
    content:
      'Share your favorite Git commands, workflows, and best practices for version control. How do you handle branching, merging, and code collaboration?',
  },
  {
    title: 'Agile Development: Scrum vs Kanban',
    content:
      'Comparing Scrum and Kanban methodologies for Agile software development. Which approach works better for your team and why?',
  },
  {
    title: 'Python vs Java: Which is Better for Backend Development?',
    content:
      'Debating the pros and cons of Python and Java for backend development. Share your experiences and preferences in choosing a backend programming language.',
  },
  {
    title: 'Tips for Building Scalable Microservices',
    content:
      'Discussing architectural patterns, communication protocols, and deployment strategies for building scalable microservices architectures.',
  },
  {
    title: 'Data Structures and Algorithms: Best Resources',
    content:
      'Sharing recommended resources, books, and online courses for learning data structures and algorithms. What are your favorite learning materials?',
  },
  {
    title: 'Web Security: Best Practices and Tools',
    content:
      'Discussing security vulnerabilities, best practices, and tools for securing web applications. How do you protect against common web attacks?',
  },
  {
    title: 'UX/UI Design Principles for Developers',
    content:
      'Exploring UX/UI design principles and best practices for developers. How can developers contribute to creating user-friendly and visually appealing interfaces?',
  },
  {
    title: 'Cloud Computing: AWS vs Azure',
    content:
      'Comparing Amazon Web Services (AWS) and Microsoft Azure cloud platforms. Which platform do you prefer for hosting and deploying your applications?',
  },
  {
    title: 'Blockchain Technology: Applications and Use Cases',
    content:
      'Exploring real-world applications and use cases of blockchain technology beyond cryptocurrencies. How is blockchain transforming industries?',
  },
  {
    title: 'Artificial Intelligence: Ethics and Implications',
    content:
      'Discussing ethical considerations and societal implications of AI technologies. How can we ensure responsible AI development and deployment?',
  },
  {
    title: 'Mobile App Development Trends for 2024',
    content:
      'Predicting and discussing emerging trends and technologies in mobile app development for the upcoming year. What trends are shaping the mobile app landscape?',
  },
  {
    title: 'Open Source Contributions: Getting Started',
    content:
      'Tips and advice for beginners on how to get started with contributing to open-source projects. What are the benefits of open-source contributions?',
  },
  {
    title: 'Big Data Analytics: Tools and Techniques',
    content:
      'Exploring tools, frameworks, and techniques for analyzing and deriving insights from large datasets. How do you handle big data challenges?',
  },
  {
    title: 'Tech Career Transition: Tips and Success Stories',
    content:
      'Sharing success stories, tips, and advice for transitioning into a tech career from a non-technical background. How did you make the leap?',
  },
  {
    title: 'Cybersecurity Threats: Prevention and Response',
    content:
      'Discussing common cybersecurity threats and strategies for prevention and incident response. How do you secure your applications and data?',
  },
  {
    title: 'Cloud Native Applications: Architecture and Benefits',
    content:
      'Exploring the architecture and benefits of cloud-native applications. How do you design and deploy applications for cloud environments?',
  },
  {
    title: 'AR/VR Development: Tools and Platforms',
    content:
      'Discussing tools, platforms, and development techniques for creating augmented reality (AR) and virtual reality (VR) applications.',
  },
  {
    title: 'Data Privacy Regulations: Compliance Challenges',
    content:
      'Navigating data privacy regulations and compliance challenges in software development. How do you ensure GDPR and CCPA compliance?',
  },
  {
    title: 'Full Stack Development: Best Practices',
    content:
      'Best practices, tools, and frameworks for mastering full-stack development. How do you balance frontend and backend development responsibilities?',
  },
  {
    title: 'Serverless Computing: Benefits and Use Cases',
    content:
      'Exploring the benefits, use cases, and challenges of serverless computing architectures. How do you leverage serverless for scalable applications?',
  },
  {
    title: 'Tech Startups: Lessons Learned and Tips',
    content:
      'Sharing lessons learned, success stories, and practical tips for launching and scaling tech startups. What challenges did you face?',
  },
  {
    title: 'Open Source Projects: Contributions and Impact',
    content:
      'Discussing the impact of open-source projects on the tech industry and society. How can open-source initiatives drive innovation and collaboration?',
  },
  {
    title: 'Software Testing: Strategies and Automation',
    content:
      'Strategies, tools, and best practices for software testing and test automation. How do you ensure comprehensive test coverage and quality?',
  },
  {
    title: 'API Design: Best Practices and Guidelines',
    content:
      'Exploring best practices, design patterns, and guidelines for designing robust and developer-friendly APIs. What makes a good API?',
  },
  {
    title: 'Tech Conferences: Recommendations and Reviews',
    content:
      'Discussing upcoming tech conferences, workshops, and events. Share your recommendations and reviews of past conferences.',
  },
  {
    title: 'Software Development Methodologies: Agile vs Waterfall',
    content:
      'Comparing Agile and Waterfall methodologies for software development. Which approach suits your project and team dynamics?',
  },
  {
    title: 'AI in Healthcare: Applications and Innovations',
    content:
      'Exploring AI applications and innovations in the healthcare industry. How is AI transforming patient care and medical research?',
  },
  {
    title: 'Code Quality Metrics and Tools',
    content:
      'Measuring code quality and implementing metrics. Discussing tools and practices for maintaining high-quality codebases.',
  },
  {
    title: 'Blockchain Development Platforms: Ethereum vs Hyperledger',
    content:
      'Comparing Ethereum and Hyperledger as blockchain development platforms. Which platform is suitable for different use cases?',
  },
  {
    title: 'Tech Diversity and Inclusion: Initiatives and Impact',
    content:
      'Discussing initiatives and strategies for promoting diversity and inclusion in the tech industry. How can we create more inclusive workplaces?',
  },
  {
    title: 'AI Ethics: Bias, Accountability, and Transparency',
    content:
      'Exploring ethical considerations in AI development, including bias mitigation, accountability frameworks, and transparency practices.',
  },
  {
    title: 'Game Development: Engines, Tools, and Challenges',
    content:
      'Discussing game development engines, tools, and challenges. Share your experiences in creating interactive and immersive gaming experiences.',
  },
];

const createThreads = (users, forums, numThreads) => {
  const threads = [];
  for (let i = 0; i <= numThreads; i++) {
    const dates = Math.random() > 0.3 ? createRandomDates() : [undefined, undefined];
    threads.push({
      ...threadOptions[randomIndex(threadOptions)],
      user: users[randomIndex(users)]._id,
      forum: forums[randomIndex(forums)]._id,
      createdAt: dates[0],
      updatedAt: dates[1],
    });
  }
  return threads;
};

const mockThreads = createThreads(users, forums, 30);

db.threads.insertMany(mockThreads);

console.log('🏁 Seeding Threads Collection Successful!');

console.log('🌱 Seeding Posts Collection...');

const postContentOptions = [
  "I'm new to web development. Can anyone recommend a good beginner-friendly JavaScript framework?",
  'What are your favorite VS Code extensions for productivity? Looking to optimize my workflow.',
  'Discussing the pros and cons of using NoSQL databases like MongoDB versus traditional SQL databases.',
  'How do you handle software architecture design in agile development? Share your strategies and experiences.',
  'Exploring the role of microservices in modern software architectures. What are the benefits and challenges?',
  'Share your experiences with continuous integration and deployment tools like Jenkins and GitLab CI/CD.',
  'Tips for optimizing frontend performance in large-scale web applications? What techniques do you use?',
  'How important is unit testing in your development workflow? Discussing the impact on code quality.',
  'Seeking advice on transitioning from frontend to full-stack development. What skills should I focus on?',
  'Comparing popular cloud providers for hosting web applications: AWS, Azure, and Google Cloud Platform.',
  'Discussing the best practices for securing RESTful APIs. How do you protect against common vulnerabilities?',
  'Share your insights on DevOps culture and its impact on software development teams.',
  'What are the essential skills for a successful software engineering career in the next decade?',
  'Debating the future of AI and its potential impact on industries like healthcare and finance.',
  'Exploring the benefits of using TypeScript in large-scale JavaScript applications. Is it worth the learning curve?',
  'How do you approach code reviews in your team? Share your process for constructive feedback and improvement.',
  'Discussing the adoption of serverless architecture in enterprise applications. What are the use cases?',
  'Seeking recommendations for online platforms or courses to learn data science and machine learning.',
  'What are your favorite design patterns for building scalable backend systems? Discussing architecture.',
  'Tips for building responsive and accessible user interfaces in web development. Best practices?',
  'Exploring the challenges of scaling applications globally. How do you design for international users?',
  'How can blockchain technology revolutionize industries beyond finance? Discussing real-world applications.',
  'Share your experiences with remote team collaboration tools like Slack, Zoom, and Microsoft Teams.',
  'What are the key factors to consider when choosing a tech stack for a new startup project?',
  'Discussing the evolution of programming languages and their impact on software development practices.',
  'Tips for managing technical debt in software projects. How do you prioritize and refactor?',
  'Seeking advice on transitioning from academia to industry as a software engineer. What are the challenges?',
  'Exploring the role of AI in enhancing cybersecurity measures. How can AI algorithms detect threats?',
  'How do you approach refactoring legacy codebases? Share your strategies for modernization.',
  'Discussing the benefits of adopting agile methodologies in non-software development teams.',
  'Share your favorite resources for staying updated with the latest tech trends and industry news.',
  'How can developers contribute to open-source projects? Discussing the impact of community contributions.',
  'Tips for effective project management in software development teams. How do you ensure deadlines are met?',
  'Seeking advice on preparing for technical interviews at top tech companies. What are common interview questions?',
  'Discussing the ethics of AI in decision-making processes. How can we ensure fairness and accountability?',
  'What are the emerging trends in mobile app development? Discussing technologies like Flutter and React Native.',
  'How do you balance feature development with technical debt reduction in agile development?',
  'Exploring the challenges of implementing AI-driven chatbots in customer service applications.',
  'What are your strategies for improving team productivity and motivation in remote work environments?',
  'Tips for building scalable and maintainable frontend architectures. How do you structure your codebase?',
  'Seeking advice on building a personal brand as a software engineer. How can networking help career growth?',
  'Discussing the impact of IoT on everyday life and its implications for software developers.',
  'How can AI and machine learning be leveraged to enhance personalized user experiences in applications?',
  'Exploring the benefits of adopting a microservices architecture over monolithic applications.',
  'What are your thoughts on the future of cybersecurity in the era of AI and automation?',
  'Tips for optimizing database performance in high-traffic web applications. Best practices?',
  'Discussing the challenges and benefits of implementing blockchain technology in supply chain management.',
  'How do you approach designing intuitive user interfaces? Share your UX/UI design principles.',
];

const createPosts = (users, threads, numPosts) => {
  const posts = [];
  for (let i = 0; i <= numPosts; i++) {
    const dates = Math.random() > 0.6 ? createRandomDates() : [undefined, undefined];
    posts.push({
      thread: threads[randomIndex(threads)]._id,
      user: users[randomIndex(users)]._id,
      content: postContentOptions[randomIndex(postContentOptions)],
      createdAt: dates[0],
      updatedAt: dates[1],
    });
  }
  return posts;
};

const threads = db.threads.find().toArray();

const mockPosts = createPosts(users, threads, 50);

db.posts.insertMany(mockPosts);

console.log('🏁 Seeding Posts Collection Successful!');

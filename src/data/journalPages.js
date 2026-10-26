const defaults = {
  eISSN: "XXXX-XXXX",
  frequency: "Biannual (June & December)",
  format: "Online Open Access",
  language: "English",
  publisher: "Lord Journals",
};

const topicsParagraph = (topics) =>
  `The journal welcomes research related to ${topics.join(", ")}.`;

export const civilEngineeringInfo = {
  ...defaults,
  title: "Lord Journal of Civil Engineering",
  shortDescription:
    "A peer-reviewed, open-access international journal for civil engineering, infrastructure development, sustainable construction, smart cities, and resilient built environments.",
  about: [
    "The Lord Journal of Civil Engineering is a peer-reviewed, open-access international journal dedicated to advancing research and innovation in civil engineering and infrastructure development.",
    "The journal provides a platform for researchers, academicians, professionals, and policymakers to publish high-quality work related to sustainable infrastructure, construction technologies, structural systems, transportation, water resources, and environmental engineering.",
  ],
  scope: [
    "The Lord Journal of Civil Engineering is a peer-reviewed, open-access international journal dedicated to publishing high-quality research in civil engineering, infrastructure development, construction technology, and the built environment.",
    topicsParagraph([
      "structural engineering",
      "geotechnical engineering",
      "transportation engineering",
      "environmental engineering",
      "water resources engineering",
      "construction management",
      "smart infrastructure",
      "disaster risk reduction",
    ]),
    "The journal publishes original research articles, review papers, case studies, technical notes, and applied studies that contribute to the advancement of civil engineering knowledge and professional practice.",
    "The aim of the journal is to promote innovative, practical, and academically sound research that supports resilient infrastructure, sustainable construction, disaster risk reduction, and improved quality of life through engineering solutions.",
  ],
  editorialBoard: [
    ["Dr. Manoj Kumar Trivedi", "Editor-in-Chief", "MITS-DU, Gwalior"],
    ["Dr. K. N. Jha", "Editorial Board Member", "IIT Delhi"],
    ["Dr. Sparsh Johari", "Editorial Board Member", "IIT Guwahati"],
    ["Dr. Vedat Togan", "Editorial Board Member", "Karadeniz Technical University"],
    ["Dr. Abhilash Shukla", "Editorial Board Member", "MITS-DU, Gwalior"],
    ["Dr. Prachi Singh", "Editorial Board Member", "MITS-DU, Gwalior"],
  ],
};

export const mechanicalEngineeringInfo = {
  ...defaults,
  title: "Lord Journal of Mechanical Engineering",
  shortDescription:
    "A peer-reviewed, open-access international journal for mechanical engineering research, industrial innovation, energy systems, manufacturing, automation, and design.",
  about: [
    "The Lord Journal of Mechanical Engineering (LJME) is a peer-reviewed, open-access international journal published by Lord-Tech Datus Sol Pvt. Ltd. It is dedicated to advancing research and knowledge in the diverse field of mechanical engineering, connecting academic rigor with industrial innovation.",
    "LJME provides a high-impact platform for researchers, engineers, academicians, and industry professionals to share original research, transformative ideas, and best practices. The journal focuses on promoting technological innovation, sustainability, and interdisciplinary collaboration in mechanical systems and design.",
    "With a strong commitment to editorial excellence, academic transparency, and global reach, LJME seeks to be a critical resource for addressing the ever-evolving challenges in energy, manufacturing, automation, and mechanical systems design.",
  ],
  scope: [
    "The Lord Journal of Mechanical Engineering aims to publish original, high-quality research articles, technical notes, and review papers that drive the advancement of mechanical engineering and its allied disciplines.",
    "LJME welcomes theoretical, experimental, and computational studies as well as innovative engineering applications that contribute to sustainable and smart technologies.",
    topicsParagraph([
      "thermal and fluid sciences",
      "design and manufacturing",
      "materials and metallurgy",
      "robotics and automation",
      "dynamics and vibrations",
      "energy systems and renewable technologies",
      "computational methods",
      "tribology and machine elements",
      "aerospace and automotive engineering",
    ]),
    "The aim of the journal is to connect academic research with industrial practice and promote mechanical engineering solutions that are innovative, sustainable, and technically rigorous.",
  ],
  editorialBoard: [["Dr. Subodh Sharma", "Editor-in-Chief", ""]],
};

export const electronicsEngineeringInfo = {
  ...defaults,
  title: "Lord Journal of Electronics Engineering",
  shortDescription:
    "A peer-reviewed, open-access international journal for electronics, embedded systems, communication technologies, instrumentation, and intelligent electronic systems.",
  about: [
    "The Lord Journal of Electronics Engineering (LJEE) is a peer-reviewed, open-access international journal published by Lord-Tech Datus Sol Pvt. Ltd. It is dedicated to publishing cutting-edge research, technological advancements, and practical innovations across all domains of electronics and electrical engineering.",
    "LJEE serves as a vital academic bridge between research institutions, industry professionals, and policy developers, offering a global platform for sharing impactful research and engineering solutions that address current and future challenges in electronic systems, embedded technologies, and smart devices.",
    "With a strong emphasis on editorial excellence, academic transparency, and global knowledge dissemination, LJEE promotes collaborative, interdisciplinary research that supports sustainable innovation and digital transformation.",
  ],
  scope: [
    "The Lord Journal of Electronics Engineering aims to publish original research, review articles, and technical notes that contribute to the advancement of knowledge in the field of electronics and its applications.",
    "LJEE invites theoretical, experimental, and applied research works that reflect innovation and contribute to solving real-world challenges through electronic and embedded systems.",
    topicsParagraph([
      "analog and digital electronics",
      "embedded systems and IoT",
      "communication systems",
      "power electronics and energy systems",
      "control systems and automation",
      "AI and machine learning in electronics",
      "instrumentation and measurement",
      "nanoelectronics and MEMS",
      "cyber-physical systems and security",
    ]),
    "The aim of the journal is to promote electronics research that advances reliable, intelligent, secure, and sustainable technologies.",
  ],
  editorialBoard: [["Dr. Vikas Mahor", "Editor-in-Chief", ""]],
};

export const electricalEngineeringInfo = {
  ...defaults,
  title: "Lord Journal of Electrical Engineering",
  shortDescription:
    "A peer-reviewed, open-access international journal for power systems, smart grids, electrical machines, renewable energy, control, and automation.",
  about: [
    "The Lord Journal of Electrical Engineering (LJEE-E) is a peer-reviewed, open-access international journal published by Lord-Tech Datus Sol Pvt. Ltd. The journal provides a scholarly platform for disseminating pioneering research and technological developments in the field of electrical engineering.",
    "LJEE-E serves researchers, engineers, educators, and industry professionals by enabling the exchange of insights, methodologies, and innovations that contribute to advancements in electrical power systems, control, automation, and electromagnetic applications.",
    "The journal adheres to the highest standards of editorial integrity, peer review, and open accessibility, ensuring that impactful research reaches a global audience. LJEE-E aims to support the development of sustainable and intelligent electrical technologies that address the demands of modern infrastructure and industry.",
  ],
  scope: [
    "The Lord Journal of Electrical Engineering aims to publish original research papers, technical articles, and comprehensive reviews that contribute to theoretical and practical knowledge in electrical engineering and its allied domains.",
    "Submissions are encouraged across a broad range of topics that reflect current trends, innovations, and challenges in the electrical engineering landscape.",
    topicsParagraph([
      "power systems and smart grids",
      "electrical machines and drives",
      "renewable energy and energy storage",
      "control systems and automation",
      "high voltage and insulation engineering",
      "power electronics",
      "electrical measurements and instrumentation",
      "electromagnetic field applications",
      "electric vehicles and smart transportation",
    ]),
    "The aim of the journal is to support sustainable, intelligent, and reliable electrical technologies for modern infrastructure and industry.",
  ],
  editorialBoard: [],
};

export const computerScienceEngineeringInfo = {
  ...defaults,
  title: "Lord Journal of Computer Science & Engineering",
  shortDescription:
    "A peer-reviewed, open-access international journal for computer science, software systems, AI, data science, networks, cybersecurity, and emerging digital technologies.",
  about: [
    "The Lord Journal of Computer Science & Engineering (LJCSE) is an open-access, peer-reviewed international journal published by Lord-Tech Datus Sol Pvt. Ltd. It is dedicated to publishing high-quality research that advances theoretical foundations, practical methodologies, and emerging technologies across the vast domain of computer science and engineering.",
    "LJCSE provides a scholarly forum for academicians, researchers, software professionals, and technology leaders to exchange ideas, present breakthroughs, and explore interdisciplinary solutions to complex computational challenges.",
    "With a commitment to global dissemination, editorial excellence, and rigorous peer-review standards, the journal serves as a bridge between academic research and industry innovation, supporting the growth of intelligent, secure, and sustainable digital systems.",
  ],
  scope: [
    "The Lord Journal of Computer Science & Engineering seeks to foster innovation and knowledge-sharing by publishing original research, review papers, and technical reports in both foundational areas and emerging trends of computer science and engineering.",
    "Submissions may span theoretical, experimental, computational, or applied studies that contribute to advancing the digital frontier.",
    topicsParagraph([
      "artificial intelligence and machine learning",
      "data science and big data analytics",
      "computer networks and cybersecurity",
      "software engineering",
      "human-computer interaction",
      "theoretical computer science",
      "computer vision",
      "embedded systems and IoT",
      "cloud, edge, and distributed computing",
      "robotics and autonomous systems",
    ]),
    "The aim of the journal is to encourage rigorous and practical computing research that supports secure, intelligent, and sustainable digital transformation.",
  ],
  editorialBoard: [["Dr. Priyanka Gupta", "Editor-in-Chief", ""]],
};

export const appliedScienceInfo = {
  ...defaults,
  title: "Lord Journal of Applied Science",
  shortDescription:
    "A peer-reviewed, open-access international journal for applied scientific research that connects theory, experimentation, technology, and real-world solutions.",
  about: [
    "The Lord Journal of Applied Science (LJAS) is a peer-reviewed, open-access international journal published by Lord-Tech Datus Sol Pvt. Ltd. It is devoted to the dissemination of significant and original scientific research that bridges theory with real-world applications across a wide spectrum of applied sciences.",
    "LJAS provides a multidisciplinary platform for academicians, researchers, technologists, practitioners, and policymakers to share research outcomes that have practical relevance and societal impact. The journal encourages studies that integrate scientific innovation with technological application, supporting sustainable solutions and scientific advancements.",
    "Committed to editorial integrity, scholarly rigor, and global accessibility, LJAS plays a pivotal role in fostering the exchange of applied scientific knowledge across domains and regions.",
  ],
  scope: [
    "The Lord Journal of Applied Science aims to advance the frontiers of applied research by publishing original papers, comprehensive reviews, and technical notes that demonstrate innovative approaches to real-world challenges through science and technology.",
    "LJAS invites contributions across all branches of applied sciences that emphasize interdisciplinary perspectives, experimental results, and practical implementation.",
    topicsParagraph([
      "applied physics",
      "applied chemistry",
      "biotechnology and life sciences",
      "environmental and earth sciences",
      "mathematical and computational sciences",
      "food and agricultural sciences",
      "applied materials science",
      "forensic and health sciences",
      "instrumentation and measurement",
      "energy and sustainable technologies",
    ]),
    "The aim of the journal is to promote applied scientific research that produces practical, interdisciplinary, and socially useful outcomes.",
  ],
  editorialBoard: [],
};

export const aimldsInfo = {
  ...defaults,
  title: "Lord Journal of Artificial Intelligence, Machine Learning & Data Science",
  shortDescription:
    "A peer-reviewed, open-access international journal for artificial intelligence, machine learning, data science, intelligent systems, and data-driven decision research.",
  about: [
    "The Lord Journal of Artificial Intelligence, Machine Learning & Data Science (LJAIMLDS) is a peer-reviewed, open-access international journal published by Lord-Tech Datus Sol Pvt. Ltd. It is dedicated to fostering and disseminating high-impact research in the rapidly evolving domains of AI, ML, and data-driven decision science.",
    "LJAIMLDS provides a prestigious platform for researchers, data scientists, engineers, academicians, and industry professionals to publish breakthroughs, develop theories, and showcase applications that solve real-world problems using intelligent systems.",
    "The journal emphasizes interdisciplinary research, ethical AI development, and technological innovation, and is committed to maintaining the highest standards in peer review, academic integrity, and global accessibility.",
  ],
  scope: [
    "LJAIMLDS aims to contribute to the advancement of intelligent technologies and data science methodologies by publishing original research, review articles, and case studies that are theoretical, empirical, or applied in nature.",
    "The journal welcomes submissions that highlight novel algorithms, intelligent systems, and data-driven applications across diverse fields including healthcare, finance, robotics, climate science, and more.",
    topicsParagraph([
      "artificial intelligence",
      "machine learning",
      "data science and analytics",
      "natural language processing",
      "computer vision",
      "robotics and automation",
      "ethical, legal, and social implications of AI",
      "AI and ML in healthcare",
      "AI for cybersecurity and privacy",
      "business intelligence and decision sciences",
    ]),
    "The aim of the journal is to advance responsible, explainable, and impactful intelligent technologies across research and professional practice.",
  ],
  editorialBoard: [["Dr. Kamal Sharma", "Editor-in-Chief", ""]],
};

export const lawSocialScienceInfo = {
  ...defaults,
  title: "Lord Journal of Law & Social Science",
  shortDescription:
    "A peer-reviewed, open-access international journal for legal studies, governance, human rights, public policy, and interdisciplinary social science research.",
  about: [
    "The Lord Journal of Law & Social Science (LJLSS) is a peer-reviewed, open-access international journal published by Lord-Tech Datus Sol Pvt. Ltd. It is devoted to the interdisciplinary exploration of legal systems, governance, human rights, and societal structures, offering a scholarly platform that merges legal scholarship with social science inquiry.",
    "LJLSS serves academicians, legal practitioners, policymakers, sociologists, and researchers by encouraging original research and critical analysis that address pressing legal and social issues from global and regional perspectives.",
    "The journal is committed to academic integrity, diversity of thought, and open access to knowledge, promoting scholarship that contributes to inclusive policy, social justice, and rule of law in a rapidly changing world.",
  ],
  scope: [
    "The Lord Journal of Law & Social Science aims to publish original articles, theoretical analyses, case studies, and critical reviews that explore intersections of law, policy, and social development.",
    "The journal encourages submissions from both disciplinary and interdisciplinary perspectives that bring new insights into the ways legal systems interact with social change.",
    topicsParagraph([
      "constitutional and administrative law",
      "human rights and international law",
      "criminal justice and criminology",
      "legal theory and jurisprudence",
      "socio-legal studies",
      "gender, law, and society",
      "law and technology",
      "environmental and climate law",
      "social policy and welfare",
      "cultural studies and identity politics",
    ]),
    "The aim of the journal is to promote research that supports justice, policy reform, social inclusion, and critical understanding of law in society.",
  ],
  editorialBoard: [["Dr. Amrish Kumar Sharma", "Editor-in-Chief", ""]],
};

export const educationInfo = {
  ...defaults,
  title: "Lord Journal of Education",
  shortDescription:
    "A peer-reviewed, open-access international journal for education research, pedagogy, learning technologies, educational leadership, and inclusive practice.",
  about: [
    "The Lord Journal of Education (LJE) is a peer-reviewed, open-access international journal published by Lord-Tech Datus Sol Pvt. Ltd. It is devoted to advancing research and innovation in the field of education, serving as a dynamic platform for educators, researchers, policymakers, and practitioners.",
    "LJE promotes interdisciplinary scholarship that addresses the evolving needs of educational systems, pedagogical practices, and learning technologies across global contexts. The journal encourages dialogue between theory and practice, fostering inclusive and evidence-based educational reform.",
    "With a commitment to scholarly rigor, editorial excellence, and open accessibility, LJE aims to shape the future of education by supporting research that empowers learners and enhances teaching across all levels.",
  ],
  scope: [
    "The Lord Journal of Education aims to publish original research, review articles, case studies, and educational innovations that contribute to the theory and practice of teaching, learning, and educational leadership.",
    "LJE welcomes contributions from diverse educational contexts, including formal, informal, and non-formal learning environments, and encourages interdisciplinary and cross-cultural perspectives.",
    topicsParagraph([
      "curriculum and instruction",
      "educational technology",
      "teacher education and professional development",
      "educational leadership and management",
      "inclusive and special education",
      "assessment and evaluation",
      "early childhood and primary education",
      "higher education and research training",
      "sociology and philosophy of education",
      "lifelong learning and adult education",
    ]),
    "The aim of the journal is to advance evidence-based, inclusive, and innovative educational practice across diverse learning environments.",
  ],
  editorialBoard: [],
};

export const managementInfo = {
  ...defaults,
  title: "Lord Journal of Management",
  shortDescription:
    "A peer-reviewed, open-access international journal for management research, business strategy, organizational studies, leadership, finance, and innovation.",
  about: [
    "The Lord Journal of Management (LJM) is a peer-reviewed, open-access international journal published by Lord-Tech Datus Sol Pvt. Ltd. It is committed to publishing impactful research and insightful analyses that shape contemporary management practices and theories across industries and cultures.",
    "LJM provides a critical platform for academics, business leaders, consultants, and policymakers to share evidence-based insights, case studies, and emerging trends that enhance organizational effectiveness and strategic leadership in the 21st century.",
    "The journal fosters a strong connection between research and practice, advocating for ethical leadership, sustainable enterprise, and innovative thinking. With rigorous editorial and peer-review standards, LJM promotes global knowledge exchange in the field of management.",
  ],
  scope: [
    "The Lord Journal of Management aims to support the advancement of management science, organizational studies, and business strategy by publishing original research, conceptual papers, and case analyses with practical and theoretical relevance.",
    "LJM welcomes interdisciplinary, international, and comparative studies that reflect the dynamic challenges of modern business and institutional environments.",
    topicsParagraph([
      "strategic management and leadership",
      "human resource management",
      "marketing and consumer behavior",
      "finance and accounting",
      "operations and supply chain management",
      "entrepreneurship and innovation",
      "organizational development and change",
      "business analytics and decision sciences",
      "corporate social responsibility and sustainability",
      "international business and global strategy",
    ]),
    "The aim of the journal is to promote management research that is academically rigorous, ethically grounded, and useful for contemporary organizations.",
  ],
  editorialBoard: [],
};

export const builtEnvironmentSustainabilityInfo = {
  ...defaults,
  title: "Lord Journal of Built Environment & Sustainability",
  shortDescription:
    "An international peer-reviewed journal for sustainable development, green infrastructure, smart cities, environmental planning, and resilient built environments.",
  about: [
    "The Lord Journal of Built Environment & Sustainability is an international peer-reviewed journal dedicated to advancing knowledge and innovation in sustainable development, resilient infrastructure, environmental planning, green buildings, smart cities, and climate-responsive built environments.",
    "The journal publishes original research articles, review papers, technical notes, case studies, and policy-oriented contributions that support practical and research-based solutions for sustainable built environment development.",
  ],
  scope: [
    "The Lord Journal of Built Environment & Sustainability aims to publish high-quality research on sustainable development, green infrastructure, environmental planning, and resilient built environments.",
    topicsParagraph([
      "sustainable architecture",
      "green buildings and green construction",
      "urban planning and development",
      "smart cities and digital infrastructure",
      "climate change adaptation",
      "energy-efficient buildings",
      "net-zero energy systems",
      "environmental impact assessment",
      "waste management and circular economy",
      "building performance analysis",
      "transportation and sustainable mobility",
      "water-efficient urban systems",
      "GIS and remote sensing applications",
      "construction management and sustainability",
      "resilient infrastructure systems",
    ]),
    "The journal publishes research articles, review papers, case studies, short communications, technical notes, and perspective articles.",
    "The aim of the journal is to support practical, policy-relevant, and research-based solutions for sustainable and climate-responsive built environment development.",
  ],
  editorialBoard: [],
};

export const medicalScienceInfo = {
  ...defaults,
  title: "Lord Journal of Medical Science",
  shortDescription:
    "An international peer-reviewed journal for clinical medicine, biomedical sciences, public health, healthcare systems, and medical research.",
  about: [
    "The Lord Journal of Medical Science is an international peer-reviewed journal dedicated to publishing scholarly research in clinical medicine, biomedical sciences, healthcare practice, public health, and allied medical disciplines.",
    "The journal welcomes original research articles, review papers, case reports, clinical studies, and policy-oriented contributions that advance medical knowledge and improve healthcare outcomes.",
  ],
  scope: [
    "The Lord Journal of Medical Science aims to publish high-quality research in clinical medicine, biomedical sciences, public health, healthcare systems, and allied medical disciplines.",
    topicsParagraph([
      "clinical medicine",
      "public health",
      "medical research",
      "biomedical sciences",
      "community medicine",
      "healthcare management",
      "medical education",
      "pharmacology",
      "pathology",
      "microbiology",
      "nursing and allied health sciences",
      "epidemiology",
      "preventive medicine",
      "hospital administration",
      "digital health and telemedicine",
    ]),
    "The journal publishes research articles, review papers, case reports, clinical studies, short communications, and technical notes.",
    "The aim of the journal is to advance medical knowledge, support ethical clinical practice, and improve healthcare outcomes through rigorous scholarly communication.",
  ],
  editorialBoard: [],
};

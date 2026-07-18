const tags = [
  {
    id: 1,
    name: "HTML",
    description: "Markup language used for creating the structure of web pages."
  },
  {
    id: 2,
    name: "CSS",
    description: "Styling language used for designing web pages and user interfaces."
  },
  {
    id: 3,
    name: "JavaScript",
    description: "Programming language for building interactive web applications."
  },
  {
    id: 4,
    name: "TypeScript",
    description: "Strongly typed programming language built on JavaScript."
  },
  {
    id: 5,
    name: "React",
    description: "JavaScript library for building modern user interfaces."
  },
  {
    id: 6,
    name: "Next.js",
    description: "React framework for production-ready web applications."
  },
  {
    id: 7,
    name: "Vue.js",
    description: "Progressive JavaScript framework for building user interfaces."
  },
  {
    id: 8,
    name: "Angular",
    description: "Frontend framework for developing scalable web applications."
  },
  {
    id: 9,
    name: "Node.js",
    description: "Runtime environment for executing JavaScript on servers."
  },
  {
    id: 10,
    name: "Express.js",
    description: "Backend framework for building APIs with Node.js."
  },
  {
    id: 11,
    name: "Django",
    description: "Python framework for building secure web applications."
  },
  {
    id: 12,
    name: "Flask",
    description: "Lightweight Python web framework."
  },
  {
    id: 13,
    name: "Laravel",
    description: "PHP framework for modern web application development."
  },
  {
    id: 14,
    name: "PHP",
    description: "Server-side scripting language for web development."
  },
  {
    id: 15,
    name: "Python",
    description: "General-purpose programming language widely used in software and AI."
  },
  {
    id: 16,
    name: "Java",
    description: "Object-oriented programming language used for enterprise applications."
  },
  {
    id: 17,
    name: "C Programming",
    description: "Foundational programming language for system development."
  },
  {
    id: 18,
    name: "C++",
    description: "Programming language used for software, games, and competitive programming."
  },
  {
    id: 19,
    name: "C#",
    description: "Programming language used for .NET applications and game development."
  },
  {
    id: 20,
    name: "Go",
    description: "Programming language designed for scalable backend systems."
  },
  {
    id: 21,
    name: "Rust",
    description: "Systems programming language focused on safety and performance."
  },
  {
    id: 22,
    name: "SQL",
    description: "Language used for managing and querying relational databases."
  },
  {
    id: 23,
    name: "PostgreSQL",
    description: "Advanced open-source relational database system."
  },
  {
    id: 24,
    name: "MySQL",
    description: "Popular relational database management system."
  },
  {
    id: 25,
    name: "MongoDB",
    description: "NoSQL document-based database system."
  },
  {
    id: 26,
    name: "Redis",
    description: "In-memory data store used for caching and fast applications."
  },
  {
    id: 27,
    name: "Data Structures",
    description: "Fundamental concepts for organizing and managing data efficiently."
  },
  {
    id: 28,
    name: "Algorithms",
    description: "Problem-solving techniques for computer science and programming."
  },
  {
    id: 29,
    name: "Competitive Programming",
    description: "Programming competitions focused on algorithms and optimization."
  },
  {
    id: 30,
    name: "Machine Learning",
    description: "Techniques for building systems that learn from data."
  },
  {
    id: 31,
    name: "Deep Learning",
    description: "AI technique using neural networks for complex problems."
  },
  {
    id: 32,
    name: "Artificial Intelligence",
    description: "Technology focused on creating intelligent computer systems."
  },
  {
    id: 33,
    name: "Generative AI",
    description: "AI systems capable of creating text, images, and other content."
  },
  {
    id: 34,
    name: "Large Language Models",
    description: "AI models trained on large datasets to understand and generate text."
  },
  {
    id: 35,
    name: "Prompt Engineering",
    description: "Skill of designing effective prompts for AI models."
  },
  {
    id: 36,
    name: "Data Analytics",
    description: "Process of analyzing data to gain insights."
  },
  {
    id: 37,
    name: "Data Visualization",
    description: "Techniques for representing data visually."
  },
  {
    id: 38,
    name: "Pandas",
    description: "Python library for data manipulation and analysis."
  },
  {
    id: 39,
    name: "NumPy",
    description: "Python library for numerical computing."
  },
  {
    id: 40,
    name: "TensorFlow",
    description: "Machine learning framework developed by Google."
  },
  {
    id: 41,
    name: "PyTorch",
    description: "Deep learning framework used for AI research and development."
  },
  {
    id: 42,
    name: "AWS",
    description: "Cloud computing platform provided by Amazon."
  },
  {
    id: 43,
    name: "Microsoft Azure",
    description: "Cloud computing platform by Microsoft."
  },
  {
    id: 44,
    name: "Google Cloud",
    description: "Cloud services platform by Google."
  },
  {
    id: 45,
    name: "Docker",
    description: "Platform for building and running containerized applications."
  },
  {
    id: 46,
    name: "Kubernetes",
    description: "Platform for managing containerized applications."
  },
  {
    id: 47,
    name: "CI/CD",
    description: "Practices for automating software development and deployment."
  },
  {
    id: 48,
    name: "Linux",
    description: "Open-source operating system widely used in servers."
  },
  {
    id: 49,
    name: "Cyber Security",
    description: "Practices for protecting systems and networks from threats."
  },
  {
    id: 50,
    name: "Ethical Hacking",
    description: "Authorized security testing to identify vulnerabilities."
  },
  {
    id: 51,
    name: "Penetration Testing",
    description: "Security testing method to find system weaknesses."
  },
  {
    id: 52,
    name: "Network Security",
    description: "Protection of computer networks from unauthorized access."
  },
  {
    id: 53,
    name: "Cryptography",
    description: "Study of secure communication techniques."
  },
  {
    id: 54,
    name: "UI Design",
    description: "Design principles for creating user interfaces."
  },
  {
    id: 55,
    name: "UX Design",
    description: "User experience design focused on usability."
  },
  {
    id: 56,
    name: "Figma",
    description: "Design tool for creating interfaces and prototypes."
  },
  {
    id: 57,
    name: "Adobe Photoshop",
    description: "Graphics editing software for designers."
  },
  {
    id: 58,
    name: "Graphic Design",
    description: "Visual communication through typography and images."
  },
  {
    id: 59,
    name: "Digital Marketing",
    description: "Marketing strategies using digital channels."
  },
  {
    id: 60,
    name: "SEO",
    description: "Techniques for improving website visibility in search engines."
  },
  {
    id: 61,
    name: "Social Media Marketing",
    description: "Marketing through social media platforms."
  },
  {
    id: 62,
    name: "Content Marketing",
    description: "Marketing strategy based on valuable content creation."
  },
  {
    id: 63,
    name: "Project Management",
    description: "Planning and managing projects effectively."
  },
  {
    id: 64,
    name: "Agile",
    description: "Flexible software development and project management approach."
  },
  {
    id: 65,
    name: "Scrum",
    description: "Agile framework for managing software projects."
  },
  {
    id: 66,
    name: "Leadership",
    description: "Skills for managing teams and organizations."
  },
  {
    id: 67,
    name: "Interview Preparation",
    description: "Resources for technical and professional interviews."
  },
  {
    id: 68,
    name: "Resume Building",
    description: "Skills for creating effective professional resumes."
  },
  {
    id: 69,
    name: "Communication Skills",
    description: "Skills for effective professional communication."
  },
  {
    id: 70,
    name: "Problem Solving",
    description: "Ability to analyze problems and develop solutions."
  }
];

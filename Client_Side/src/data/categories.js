const categories = [
  {
    id: 1,
    name: "Web Development",
    description: "Learn to build modern websites and web applications using frontend and backend technologies."
  },
  {
    id: 2,
    name: "Frontend Development",
    description: "Create responsive and interactive user interfaces with HTML, CSS, JavaScript, and modern frameworks."
  },
  {
    id: 3,
    name: "Backend Development",
    description: "Develop scalable server-side applications, APIs, and databases."
  },
  {
    id: 4,
    name: "Full Stack Development",
    description: "Master both frontend and backend development to build complete web applications."
  },
  {
    id: 5,
    name: "Mobile Development",
    description: "Build native and cross-platform mobile applications for Android and iOS."
  },
  {
    id: 6,
    name: "Game Development",
    description: "Design and develop games using popular game engines and programming languages."
  },
  {
    id: 7,
    name: "Desktop Development",
    description: "Create desktop applications for Windows, macOS, and Linux."
  },
  {
    id: 8,
    name: "Cloud Computing",
    description: "Learn cloud platforms, deployment strategies, and scalable infrastructure."
  },
  {
    id: 9,
    name: "DevOps",
    description: "Automate software delivery using CI/CD, containers, and infrastructure as code."
  },
  {
    id: 10,
    name: "Cyber Security",
    description: "Protect systems, networks, and applications from cyber threats and attacks."
  },
  {
    id: 11,
    name: "Networking",
    description: "Understand computer networks, protocols, and network administration."
  },
  {
    id: 12,
    name: "Data Science",
    description: "Analyze data, build predictive models, and extract valuable insights."
  },
  {
    id: 13,
    name: "Data Analytics",
    description: "Transform raw data into actionable insights using analytical tools and techniques."
  },
  {
    id: 14,
    name: "Artificial Intelligence",
    description: "Build intelligent systems capable of solving complex real-world problems."
  },
  {
    id: 15,
    name: "Machine Learning",
    description: "Train models that learn from data to make predictions and decisions."
  },
  {
    id: 16,
    name: "Deep Learning",
    description: "Explore neural networks and advanced AI techniques for complex tasks."
  },
  {
    id: 17,
    name: "Generative AI",
    description: "Create AI-powered applications that generate text, images, audio, and more."
  },
  {
    id: 18,
    name: "Prompt Engineering",
    description: "Learn how to design effective prompts for AI language models."
  },
  {
    id: 19,
    name: "Database Management",
    description: "Design, optimize, and manage relational and NoSQL databases."
  },
  {
    id: 20,
    name: "Software Engineering",
    description: "Apply software development principles, architecture, and best practices."
  },
  {
    id: 21,
    name: "System Design",
    description: "Learn how to design scalable, reliable, and high-performance software systems."
  },
  {
    id: 22,
    name: "Programming Languages",
    description: "Master popular programming languages for software development."
  },
  {
    id: 23,
    name: "UI/UX Design",
    description: "Design intuitive, user-friendly, and visually appealing digital experiences."
  },
  {
    id: 24,
    name: "Graphic Design",
    description: "Create visual content for branding, marketing, and digital media."
  },
  {
    id: 25,
    name: "Video Editing",
    description: "Edit and produce professional-quality videos using industry-standard tools."
  },
  {
    id: 26,
    name: "Animation",
    description: "Learn 2D and 3D animation techniques for creative storytelling."
  },
  {
    id: 27,
    name: "Digital Marketing",
    description: "Promote products and services using digital channels and online strategies."
  },
  {
    id: 28,
    name: "SEO",
    description: "Optimize websites to improve visibility and rankings in search engines."
  },
  {
    id: 29,
    name: "Content Writing",
    description: "Write engaging content for blogs, websites, and digital platforms."
  },
  {
    id: 30,
    name: "Business",
    description: "Develop business knowledge, strategy, and management skills."
  },
  {
    id: 31,
    name: "Entrepreneurship",
    description: "Learn how to build, launch, and grow successful businesses."
  },
  {
    id: 32,
    name: "Finance",
    description: "Understand financial planning, investing, and corporate finance."
  },
  {
    id: 33,
    name: "Accounting",
    description: "Master accounting principles, bookkeeping, and financial reporting."
  },
  {
    id: 34,
    name: "Project Management",
    description: "Plan, execute, and deliver projects successfully using modern methodologies."
  },
  {
    id: 35,
    name: "Product Management",
    description: "Learn to manage product development from idea to launch."
  },
  {
    id: 36,
    name: "Human Resources",
    description: "Manage recruitment, employee engagement, and workplace development."
  },
  {
    id: 37,
    name: "Communication Skills",
    description: "Improve verbal, written, and interpersonal communication abilities."
  },
  {
    id: 38,
    name: "Soft Skills",
    description: "Develop teamwork, leadership, adaptability, and problem-solving skills."
  },
  {
    id: 39,
    name: "Career Development",
    description: "Build the skills and strategies needed for long-term career growth."
  },
  {
    id: 40,
    name: "Interview Preparation",
    description: "Prepare for technical and non-technical interviews with confidence."
  },
  {
    id: 41,
    name: "Resume Building",
    description: "Create professional resumes that stand out to employers."
  },
  {
    id: 42,
    name: "English Language",
    description: "Improve English speaking, writing, reading, and listening skills."
  },
  {
    id: 43,
    name: "Foreign Languages",
    description: "Learn new languages for travel, education, or professional growth."
  },
  {
    id: 44,
    name: "Mathematics",
    description: "Build a strong foundation in mathematical concepts and problem-solving."
  },
  {
    id: 45,
    name: "Physics",
    description: "Study the principles governing matter, energy, and the universe."
  },
  {
    id: 46,
    name: "Chemistry",
    description: "Explore chemical reactions, compounds, and laboratory techniques."
  },
  {
    id: 47,
    name: "Biology",
    description: "Understand living organisms, ecosystems, and biological sciences."
  },
  {
    id: 48,
    name: "Engineering",
    description: "Learn engineering principles across various disciplines."
  },
  {
    id: 49,
    name: "Medical & Healthcare",
    description: "Study healthcare practices, medicine, and patient care fundamentals."
  },
  {
    id: 50,
    name: "Law",
    description: "Learn legal principles, regulations, and judicial systems."
  },
  {
    id: 51,
    name: "Civil Services",
    description: "Prepare for government and public service examinations."
  },
  {
    id: 52,
    name: "Teaching & Education",
    description: "Develop teaching strategies, educational methods, and classroom skills."
  },
  {
    id: 53,
    name: "Photography",
    description: "Capture and edit professional-quality photographs."
  },
  {
    id: 54,
    name: "Music",
    description: "Learn music theory, instruments, singing, and music production."
  },
  {
    id: 55,
    name: "Health & Fitness",
    description: "Improve physical health, nutrition, and overall wellness."
  },
  {
    id: 56,
    name: "Personal Development",
    description: "Build confidence, productivity, and lifelong personal growth skills."
  },
  {
    id: 57,
    name: "Blockchain",
    description: "Learn decentralized technologies, smart contracts, and blockchain development."
  },
  {
    id: 58,
    name: "Web3",
    description: "Explore decentralized applications, cryptocurrencies, and the future of the web."
  },
  {
    id: 59,
    name: "Internet of Things (IoT)",
    description: "Connect devices and build smart systems using IoT technologies."
  },
  {
    id: 60,
    name: "Robotics",
    description: "Design, build, and program robotic systems for various applications."
  },
  {
    id: 61,
    name: "Electronics",
    description: "Study electronic circuits, components, and embedded systems."
  },
  {
    id: 62,
    name: "Ethical Hacking",
    description: "Identify and fix security vulnerabilities through authorized penetration testing."
  },
  {
    id: 63,
    name: "Competitive Programming",
    description: "Improve coding and algorithmic skills through programming competitions."
  },
  {
    id: 64,
    name: "Computer Science Fundamentals",
    description: "Learn the core concepts of computer science, including algorithms, operating systems, and networking."
  },
  {
    id: 65,
    name: "Operating Systems",
    description: "Understand how operating systems manage hardware, processes, and memory."
  },
  {
    id: 66,
    name: "Data Structures & Algorithms",
    description: "Master essential data structures and algorithms for technical interviews and software development."
  },
  {
    id: 67,
    name: "Quality Assurance & Testing",
    description: "Ensure software quality through manual and automated testing practices."
  },
  {
    id: 68,
    name: "No-Code & Low-Code",
    description: "Build applications quickly using visual development platforms with minimal coding."
  }
];

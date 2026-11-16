export type ToolkitCategory =
  | "All"
  | "Core"
  | "Frontend"
  | "Backend"
  | "Data"
  | "AI / ML"
  | "Tools";

export type ToolkitItem = {
  name: string;
  category: Exclude<ToolkitCategory, "All">;
  icon: string;
  note: string;
};

export const toolkitCategories: ToolkitCategory[] = [
  "All",
  "Core",
  "Frontend",
  "Backend",
  "Data",
  "AI / ML",
  "Tools",
];

export const toolkit: ToolkitItem[] = [
  { name: "Python", category: "Core", icon: "python", note: "Scripting, application logic, and data workflows." },
  { name: "JavaScript", category: "Core", icon: "javascript", note: "Interactive interfaces and server-side application code." },
  { name: "TypeScript", category: "Core", icon: "typescript", note: "JavaScript with a static type system." },
  { name: "PHP", category: "Core", icon: "php", note: "A server-side language used for web applications." },
  { name: "Java", category: "Core", icon: "java", note: "Object-oriented programming and application development." },
  { name: "SQL", category: "Core", icon: "database", note: "Querying and shaping relational data." },
  { name: "OOP", category: "Core", icon: "code", note: "Structuring code around objects and their responsibilities." },
  { name: "Data Structures & Algorithms", category: "Core", icon: "braces", note: "Problem solving through data organization and algorithms." },
  { name: "LLM Fundamentals", category: "Core", icon: "brain", note: "Core concepts behind large language model applications." },

  { name: "React", category: "Frontend", icon: "react", note: "Component-based user interfaces." },
  { name: "Next.js", category: "Frontend", icon: "nextjs", note: "React framework for routed and server-rendered applications." },
  { name: "HTML", category: "Frontend", icon: "html", note: "Semantic structure for web documents." },
  { name: "CSS", category: "Frontend", icon: "css", note: "Responsive layouts, visual systems, and interaction states." },
  { name: "Tailwind CSS", category: "Frontend", icon: "tailwind", note: "Utility-first styling for web interfaces." },
  { name: "Responsive Design", category: "Frontend", icon: "layout", note: "Interfaces that adapt to different screen sizes and input modes." },
  { name: "Accessibility", category: "Frontend", icon: "accessibility", note: "Keyboard, semantic, and assistive-technology considerations." },

  { name: "Node.js", category: "Backend", icon: "node", note: "JavaScript runtime for server-side applications." },
  { name: "Express.js", category: "Backend", icon: "express", note: "HTTP routing and middleware for Node.js services." },
  { name: "FastAPI", category: "Backend", icon: "fastapi", note: "Python framework for typed APIs." },
  { name: "Laravel", category: "Backend", icon: "laravel", note: "PHP framework for web applications and APIs." },
  { name: "REST APIs", category: "Backend", icon: "api", note: "Resource-oriented interfaces over HTTP." },
  { name: "Authentication", category: "Backend", icon: "key", note: "Identity and access-control patterns." },
  { name: "JWT", category: "Backend", icon: "jwt", note: "Token format commonly used in stateless authentication." },
  { name: "MongoDB", category: "Backend", icon: "mongodb", note: "Document-oriented data storage." },
  { name: "MySQL", category: "Backend", icon: "mysql", note: "Relational database and SQL querying." },
  { name: "PostgreSQL", category: "Backend", icon: "postgresql", note: "Relational database with rich SQL capabilities." },
  { name: "Redis", category: "Backend", icon: "redis", note: "In-memory data structure store." },

  { name: "NumPy", category: "Data", icon: "numpy", note: "Numerical operations on multidimensional arrays." },
  { name: "Pandas", category: "Data", icon: "pandas", note: "Tabular data transformation and analysis." },
  { name: "Matplotlib", category: "Data", icon: "chart", note: "Plotting and data visualization in Python." },
  { name: "Seaborn", category: "Data", icon: "chart", note: "Statistical visualization built around Matplotlib." },
  { name: "Scikit-learn", category: "Data", icon: "scikitlearn", note: "Classical machine-learning tools for Python." },
  { name: "Jupyter", category: "Data", icon: "jupyter", note: "Interactive notebooks for code, notes, and analysis." },
  { name: "ETL", category: "Data", icon: "etl", note: "Extracting, transforming, and loading data between systems." },

  { name: "Machine Learning", category: "AI / ML", icon: "brain", note: "Models that learn patterns from data." },
  { name: "Deep Learning", category: "AI / ML", icon: "pytorch", note: "Neural-network methods for representation and prediction." },
  { name: "NLP", category: "AI / ML", icon: "nlp", note: "Methods for working with human language." },
  { name: "LLM Fundamentals", category: "AI / ML", icon: "brain", note: "How language models are used in application workflows." },
  { name: "Prompt Engineering", category: "AI / ML", icon: "prompt", note: "Designing instructions and context for model interactions." },
  { name: "RAG", category: "AI / ML", icon: "rag", note: "Retrieval-augmented generation: retrieve context before generation." },
  { name: "Embeddings", category: "AI / ML", icon: "embeddings", note: "Vector representations used to compare semantic content." },
  { name: "OpenAI API", category: "AI / ML", icon: "openai", note: "API for integrating OpenAI models into applications." },
  { name: "Hugging Face", category: "AI / ML", icon: "huggingface", note: "Model and dataset ecosystem for machine learning." },
  { name: "Ollama", category: "AI / ML", icon: "ollama", note: "Local model runtime and API." },
  { name: "PyTorch", category: "AI / ML", icon: "pytorch", note: "Tensor library and deep-learning framework." },
  { name: "TensorFlow", category: "AI / ML", icon: "tensorflow", note: "Machine-learning platform for model development and inference." },

  { name: "Git", category: "Tools", icon: "git", note: "Version control for tracking and collaborating on code." },
  { name: "GitHub", category: "Tools", icon: "github", note: "Repository hosting and collaborative development." },
  { name: "VS Code", category: "Tools", icon: "vscode", note: "Code editor and development environment." },
  { name: "Docker", category: "Tools", icon: "docker", note: "Container tooling for packaging and running applications." },
  { name: "Postman", category: "Tools", icon: "postman", note: "API request authoring and testing." },
];

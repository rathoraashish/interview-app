create database interviewStack;

use interviewStack;
CREATE TABLE subjects (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL
);

CREATE TABLE questions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    subject_id INT NOT NULL,
    question TEXT NOT NULL,
    option_a VARCHAR(255) NOT NULL,
    option_b VARCHAR(255) NOT NULL,
    option_c VARCHAR(255) NOT NULL,
    option_d VARCHAR(255) NOT NULL,
    correct_option ENUM('A', 'B', 'C', 'D') NOT NULL,
    FOREIGN KEY (subject_id) REFERENCES subjects(id) ON DELETE CASCADE
);

ALTER TABLE subjects
ADD COLUMN description TEXT NULL AFTER name;

-- Inserting subjects into the subjects table
INSERT INTO subjects (name, description, slug) VALUES
('Node.js Basics', 'Introduction to Node.js, including setup, event-driven architecture, and basic modules.', 'nodejs-basics'),
('Node.js Advanced', 'Advanced Node.js topics, including asynchronous patterns, streams, and performance optimization.', 'nodejs-advanced'),
('React', 'Fundamentals of React.js, including components, hooks, and state management.', 'react'),
('AWS', 'Amazon Web Services (AWS) fundamentals, including EC2, S3, and other core services.', 'aws'),
('MySQL', 'Relational database management with MySQL, including queries, joins, and optimizations.', 'mysql');

-- Inserting questions for Node.js Basics
INSERT INTO questions (subject_id, question, option_a, option_b, option_c, option_d, correct_option) VALUES
((SELECT id FROM subjects WHERE slug = 'nodejs-basics'), 'What is Node.js?', 'A JavaScript library', 'A JavaScript runtime environment', 'A JavaScript framework', 'A web server', 'B'),
((SELECT id FROM subjects WHERE slug = 'nodejs-basics'), 'Which module is used to create a web server in Node.js?', 'http', 'fs', 'os', 'path', 'A'),
((SELECT id FROM subjects WHERE slug = 'nodejs-basics'), 'Which method is used to read a file in Node.js?', 'readFile()', 'read()', 'getFile()', 'loadFile()', 'A'),
((SELECT id FROM subjects WHERE slug = 'nodejs-basics'), 'Which object is used to manage events in Node.js?', 'EventListener', 'Event', 'Emitter', 'EventEmitter', 'D'),
((SELECT id FROM subjects WHERE slug = 'nodejs-basics'), 'What is npm?', 'Node Package Manager', 'Node Program Manager', 'Network Package Manager', 'Nodejs Process Manager', 'A'),
((SELECT id FROM subjects WHERE slug = 'nodejs-basics'), 'Which of the following is true about Node.js?', 'It is single-threaded', 'It is multi-threaded', 'It is synchronous', 'None of the above', 'A'),
((SELECT id FROM subjects WHERE slug = 'nodejs-basics'), 'Which of the following is not a built-in module in Node.js?', 'http', 'fs', 'crypto', 'jQuery', 'D'),
((SELECT id FROM subjects WHERE slug = 'nodejs-basics'), 'Which command is used to initialize a Node.js project?', 'node init', 'npm init', 'node start', 'npm start', 'B'),
((SELECT id FROM subjects WHERE slug = 'nodejs-basics'), 'How can you import a module in Node.js?', 'import', 'require', 'include', 'get', 'B'),
((SELECT id FROM subjects WHERE slug = 'nodejs-basics'), 'Which method is used to write to a file in Node.js?', 'write()', 'writeFile()', 'sendFile()', 'outputFile()', 'B');


-- Inserting questions for Node.js Advanced
INSERT INTO questions (subject_id, question, option_a, option_b, option_c, option_d, correct_option) VALUES
((SELECT id FROM subjects WHERE slug = 'nodejs-advanced'), 'What is a stream in Node.js?', 'A collection of data', 'An array of bytes', 'A sequence of events', 'A continuous flow of data', 'D'),
((SELECT id FROM subjects WHERE slug = 'nodejs-advanced'), 'Which of the following is a type of stream in Node.js?', 'Writable', 'Readable', 'Duplex', 'All of the above', 'D'),
((SELECT id FROM subjects WHERE slug = 'nodejs-advanced'), 'What is the purpose of the cluster module in Node.js?', 'To manage child processes', 'To enable multi-threading', 'To distribute load across multiple CPU cores', 'To handle network events', 'C'),
((SELECT id FROM subjects WHERE slug = 'nodejs-advanced'), 'How can you handle uncaught exceptions in Node.js?', 'Using process.on()', 'Using try...catch', 'Using event.on()', 'Using errorHandler()', 'A'),
((SELECT id FROM subjects WHERE slug = 'nodejs-advanced'), 'Which of the following is a way to handle asynchronous code in Node.js?', 'Callbacks', 'Promises', 'Async/Await', 'All of the above', 'D'),
((SELECT id FROM subjects WHERE slug = 'nodejs-advanced'), 'What is a middleware in Express.js?', 'A function that handles requests and responses', 'A built-in module', 'A database driver', 'A template engine', 'A'),
((SELECT id FROM subjects WHERE slug = 'nodejs-advanced'), 'What is the default scope of npm packages?', 'Private', 'Public', 'Protected', 'Scoped', 'B'),
((SELECT id FROM subjects WHERE slug = 'nodejs-advanced'), 'Which module is used for stream compression in Node.js?', 'crypto', 'gzip', 'zlib', 'stream', 'C'),
((SELECT id FROM subjects WHERE slug = 'nodejs-advanced'), 'What does process.nextTick() do in Node.js?', 'Adds an event to the next event loop cycle', 'Immediately stops execution', 'Schedules an event for the next tick', 'Runs the next event in the current loop', 'A'),
((SELECT id FROM subjects WHERE slug = 'nodejs-advanced'), 'How can you improve Node.js performance?', 'Using child processes', 'Optimizing event loops', 'Caching data', 'All of the above', 'D');

-- Inserting questions for React
INSERT INTO questions (subject_id, question, option_a, option_b, option_c, option_d, correct_option) VALUES
((SELECT id FROM subjects WHERE slug = 'react'), 'What is JSX in React?', 'JavaScript Syntax Extension', 'JavaScript Syntax Enhancement', 'JavaScript XML', 'JavaScript Extension', 'C'),
((SELECT id FROM subjects WHERE slug = 'react'), 'What is the use of useState hook in React?', 'To manage the state of components', 'To create new components', 'To perform side effects', 'To navigate between pages', 'A'),
((SELECT id FROM subjects WHERE slug = 'react'), 'What is the virtual DOM in React?', 'A lightweight copy of the actual DOM', 'A virtual representation of HTML elements', 'A data structure that holds components', 'None of the above', 'A'),
((SELECT id FROM subjects WHERE slug = 'react'), 'Which of the following is a lifecycle method in React class components?', 'useEffect', 'componentDidMount', 'useState', 'renderEffect', 'B'),
((SELECT id FROM subjects WHERE slug = 'react'), 'What is the purpose of props in React?', 'To manage component state', 'To pass data between components', 'To store global variables', 'To define routing', 'B'),
((SELECT id FROM subjects WHERE slug = 'react'), 'What does useEffect hook do?', 'Handles HTTP requests', 'Manages state transitions', 'Runs side effects in functional components', 'Handles component mounting', 'C'),
((SELECT id FROM subjects WHERE slug = 'react'), 'How can you pass data from parent to child component?', 'Using refs', 'Using props', 'Using state', 'Using context', 'B'),
((SELECT id FROM subjects WHERE slug = 'react'), 'Which hook is used to manage side effects in functional components?', 'useState', 'useEffect', 'useContext', 'useReducer', 'B'),
((SELECT id FROM subjects WHERE slug = 'react'), 'What is React.Fragment used for?', 'To group a list of children without adding extra nodes to the DOM', 'To manage errors', 'To define routing paths', 'None of the above', 'A'),
((SELECT id FROM subjects WHERE slug = 'react'), 'Which command is used to create a new React project?', 'npm install create-react-app', 'npx create-react-app', 'npm init react', 'npx init react-app', 'B');

-- Inserting questions for AWS
INSERT INTO questions (subject_id, question, option_a, option_b, option_c, option_d, correct_option) VALUES
((SELECT id FROM subjects WHERE slug = 'aws'), 'What is EC2 in AWS?', 'A serverless compute service', 'A virtual machine service', 'A database service', 'An object storage service', 'B'),
((SELECT id FROM subjects WHERE slug = 'aws'), 'What does S3 stand for?', 'Simple Storage Service', 'Secure Storage Service', 'Service Storage System', 'Scalable Storage Solution', 'A'),
((SELECT id FROM subjects WHERE slug = 'aws'), 'What is the purpose of AWS Lambda?', 'To run code without provisioning servers', 'To manage databases', 'To store large amounts of data', 'To host static websites', 'A'),
((SELECT id FROM subjects WHERE slug = 'aws'), 'Which AWS service is used for DNS management?', 'RDS', 'S3', 'Route 53', 'EC2', 'C'),
((SELECT id FROM subjects WHERE slug = 'aws'), 'What does IAM stand for?', 'Identity and Access Management', 'Infrastructure as a Model', 'Identity Authentication Manager', 'Instance Access Model', 'A'),
((SELECT id FROM subjects WHERE slug = 'aws'), 'Which of the following is a database service provided by AWS?', 'DynamoDB', 'CloudWatch', 'EC2', 'SNS', 'A'),
((SELECT id FROM subjects WHERE slug = 'aws'), 'What is the use of AWS CloudFront?', 'Content delivery network', 'Load balancing', 'Database management', 'Virtual private cloud', 'A'),
((SELECT id FROM subjects WHERE slug = 'aws'), 'What is the use of AWS RDS?', 'Relational database service', 'Object storage service', 'Virtual machine service', 'Serverless compute service', 'A'),
((SELECT id FROM subjects WHERE slug = 'aws'), 'What is an AWS VPC?', 'A virtual server', 'A virtual private cloud', 'A version control system', 'A virtual machine', 'B'),
((SELECT id FROM subjects WHERE slug = 'aws'), 'Which of the following is a serverless service in AWS?', 'EC2', 'RDS', 'Lambda', 'S3', 'C');

-- Inserting questions for MySQL
INSERT INTO questions (subject_id, question, option_a, option_b, option_c, option_d, correct_option) VALUES
((SELECT id FROM subjects WHERE slug = 'mysql'), 'What is MySQL?', 'A programming language', 'A relational database management system', 'A NoSQL database', 'A framework', 'B'),
((SELECT id FROM subjects WHERE slug = 'mysql'), 'Which of the following is used to retrieve data from a MySQL database?', 'INSERT', 'UPDATE', 'SELECT', 'DELETE', 'C'),
((SELECT id FROM subjects WHERE slug = 'mysql'), 'What does the JOIN clause do?', 'Combines data from multiple tables', 'Deletes records from a table', 'Updates data in a table', 'Inserts data into a table', 'A'),
((SELECT id FROM subjects WHERE slug = 'mysql'), 'What is the use of the WHERE clause in SQL?', 'To filter records', 'To insert records', 'To update records', 'To delete records', 'A'),
((SELECT id FROM subjects WHERE slug = 'mysql'), 'Which command is used to delete a table in MySQL?', 'DROP TABLE', 'DELETE TABLE', 'REMOVE TABLE', 'CLEAR TABLE', 'A'),
((SELECT id FROM subjects WHERE slug = 'mysql'), 'How can you create a new table in MySQL?', 'ADD TABLE', 'NEW TABLE', 'CREATE TABLE', 'INSERT TABLE', 'C'),
((SELECT id FROM subjects WHERE slug = 'mysql'), 'What is a foreign key in MySQL?', 'A key used to identify records uniquely', 'A key used to link two tables', 'A key used to delete records', 'A key used to insert data', 'B'),
((SELECT id FROM subjects WHERE slug = 'mysql'), 'Which of the following is used to limit the number of rows returned in a query?', 'LIMIT', 'ROWCOUNT', 'FETCH', 'MAXROWS', 'A'),
((SELECT id FROM subjects WHERE slug = 'mysql'), 'Which command is used to modify an existing table?', 'ALTER TABLE', 'MODIFY TABLE', 'CHANGE TABLE', 'UPDATE TABLE', 'A'),
((SELECT id FROM subjects WHERE slug = 'mysql'), 'What is the purpose of the GROUP BY clause in SQL?', 'To group rows that have the same values', 'To update data in groups', 'To delete groups of records', 'To insert groups of records', 'A');


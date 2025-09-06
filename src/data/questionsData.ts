export interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  unit: string;
  topic: string;
}

export const questionsData: Question[] = [
  // Unit I: Multithreading and Exception Handling
  {
    id: 'q1',
    question: 'Which method is used to start a thread in Java?',
    options: ['run()', 'start()', 'execute()', 'begin()'],
    correctAnswer: 1,
    explanation: 'The start() method is used to begin thread execution. It creates a new thread and calls the run() method in that new thread context.',
    difficulty: 'Easy',
    unit: 'Unit I',
    topic: 'Multithreading'
  },
  {
    id: 'q2',
    question: 'What is the difference between extending Thread class and implementing Runnable interface?',
    options: [
      'No difference, both are identical',
      'Extending Thread allows multiple inheritance, Runnable does not',
      'Implementing Runnable allows multiple inheritance, extending Thread does not',
      'Extending Thread is faster than implementing Runnable'
    ],
    correctAnswer: 2,
    explanation: 'Implementing Runnable interface is preferred because Java supports single inheritance. A class can implement multiple interfaces but can extend only one class.',
    difficulty: 'Medium',
    unit: 'Unit I',
    topic: 'Multithreading'
  },
  {
    id: 'q3',
    question: 'Which thread state indicates that a thread is waiting for a monitor lock?',
    options: ['WAITING', 'BLOCKED', 'TIMED_WAITING', 'RUNNABLE'],
    correctAnswer: 1,
    explanation: 'BLOCKED state indicates that a thread is waiting to acquire a monitor lock to enter or re-enter a synchronized block/method.',
    difficulty: 'Medium',
    unit: 'Unit I',
    topic: 'Multithreading'
  },
  {
    id: 'q4',
    question: 'What happens when Thread.sleep() is called?',
    options: [
      'Thread terminates permanently',
      'Thread enters TIMED_WAITING state',
      'Thread enters BLOCKED state',
      'Thread continues execution'
    ],
    correctAnswer: 1,
    explanation: 'Thread.sleep() causes the current thread to enter TIMED_WAITING state for the specified duration.',
    difficulty: 'Easy',
    unit: 'Unit I',
    topic: 'Multithreading'
  },
  {
    id: 'q5',
    question: 'Which keyword is used to handle exceptions in Java?',
    options: ['handle', 'catch', 'except', 'trap'],
    correctAnswer: 1,
    explanation: 'The catch keyword is used to handle exceptions in Java. It must be used with a try block.',
    difficulty: 'Easy',
    unit: 'Unit I',
    topic: 'Exception Handling'
  },
  {
    id: 'q6',
    question: 'What is the parent class of all exceptions in Java?',
    options: ['Exception', 'RuntimeException', 'Throwable', 'Error'],
    correctAnswer: 2,
    explanation: 'Throwable is the parent class of all exceptions and errors in Java. Exception and Error both extend Throwable.',
    difficulty: 'Medium',
    unit: 'Unit I',
    topic: 'Exception Handling'
  },
  {
    id: 'q7',
    question: 'Which of the following is a checked exception?',
    options: ['NullPointerException', 'IOException', 'ArrayIndexOutOfBoundsException', 'IllegalArgumentException'],
    correctAnswer: 1,
    explanation: 'IOException is a checked exception that must be either caught or declared in the method signature using throws.',
    difficulty: 'Medium',
    unit: 'Unit I',
    topic: 'Exception Handling'
  },
  {
    id: 'q8',
    question: 'What is the purpose of the finally block?',
    options: [
      'To handle exceptions',
      'To execute code that must run regardless of exceptions',
      'To throw exceptions',
      'To catch multiple exceptions'
    ],
    correctAnswer: 1,
    explanation: 'The finally block contains code that executes regardless of whether an exception occurs or not. It\'s typically used for cleanup operations.',
    difficulty: 'Easy',
    unit: 'Unit I',
    topic: 'Exception Handling'
  },
  {
    id: 'q9',
    question: 'Which method is used to wait for a thread to complete its execution?',
    options: ['wait()', 'join()', 'sleep()', 'yield()'],
    correctAnswer: 1,
    explanation: 'The join() method causes the current thread to wait until the thread on which join() is called completes its execution.',
    difficulty: 'Medium',
    unit: 'Unit I',
    topic: 'Multithreading'
  },
  {
    id: 'q10',
    question: 'What is thread synchronization?',
    options: [
      'Running multiple threads simultaneously',
      'Controlling access to shared resources by multiple threads',
      'Creating new threads',
      'Terminating threads'
    ],
    correctAnswer: 1,
    explanation: 'Thread synchronization is the mechanism to control access to shared resources by multiple threads to prevent data corruption and ensure thread safety.',
    difficulty: 'Medium',
    unit: 'Unit I',
    topic: 'Multithreading'
  },

  // Unit II: File I/O and Collections
  {
    id: 'q11',
    question: 'Which class is used to read characters from a file?',
    options: ['FileInputStream', 'FileReader', 'BufferedInputStream', 'DataInputStream'],
    correctAnswer: 1,
    explanation: 'FileReader is used to read character data from files. It extends InputStreamReader and is designed for reading character streams.',
    difficulty: 'Easy',
    unit: 'Unit II',
    topic: 'File I/O'
  },
  {
    id: 'q12',
    question: 'What is the difference between FileInputStream and FileReader?',
    options: [
      'No difference',
      'FileInputStream reads bytes, FileReader reads characters',
      'FileReader reads bytes, FileInputStream reads characters',
      'Both read the same data type'
    ],
    correctAnswer: 1,
    explanation: 'FileInputStream is for reading raw bytes from files, while FileReader is for reading character data with proper encoding handling.',
    difficulty: 'Medium',
    unit: 'Unit II',
    topic: 'File I/O'
  },
  {
    id: 'q13',
    question: 'Which collection allows duplicate elements and maintains insertion order?',
    options: ['HashSet', 'TreeSet', 'ArrayList', 'HashMap'],
    correctAnswer: 2,
    explanation: 'ArrayList allows duplicate elements and maintains the insertion order. It\'s implemented as a resizable array.',
    difficulty: 'Easy',
    unit: 'Unit II',
    topic: 'Collections'
  },
  {
    id: 'q14',
    question: 'Which collection does NOT allow duplicate elements?',
    options: ['ArrayList', 'LinkedList', 'HashSet', 'Vector'],
    correctAnswer: 2,
    explanation: 'HashSet does not allow duplicate elements. It uses the equals() and hashCode() methods to determine uniqueness.',
    difficulty: 'Easy',
    unit: 'Unit II',
    topic: 'Collections'
  },
  {
    id: 'q15',
    question: 'What is the time complexity of adding an element to ArrayList?',
    options: ['O(1)', 'O(log n)', 'O(n)', 'O(n²)'],
    correctAnswer: 0,
    explanation: 'Adding an element to ArrayList is O(1) amortized time complexity, though it can be O(n) in worst case when resizing is needed.',
    difficulty: 'Hard',
    unit: 'Unit II',
    topic: 'Collections'
  },
  {
    id: 'q16',
    question: 'Which interface is implemented by both ArrayList and LinkedList?',
    options: ['Set', 'Map', 'List', 'Queue'],
    correctAnswer: 2,
    explanation: 'Both ArrayList and LinkedList implement the List interface, which provides ordered collection functionality.',
    difficulty: 'Medium',
    unit: 'Unit II',
    topic: 'Collections'
  },
  {
    id: 'q17',
    question: 'What is the purpose of BufferedReader?',
    options: [
      'To read binary data',
      'To improve reading performance by buffering',
      'To write data to files',
      'To compress data'
    ],
    correctAnswer: 1,
    explanation: 'BufferedReader improves reading performance by buffering characters in memory, reducing the number of I/O operations.',
    difficulty: 'Medium',
    unit: 'Unit II',
    topic: 'File I/O'
  },
  {
    id: 'q18',
    question: 'Which Map implementation maintains insertion order?',
    options: ['HashMap', 'TreeMap', 'LinkedHashMap', 'Hashtable'],
    correctAnswer: 2,
    explanation: 'LinkedHashMap maintains insertion order by using a doubly-linked list to track the order of entries.',
    difficulty: 'Medium',
    unit: 'Unit II',
    topic: 'Collections'
  },
  {
    id: 'q19',
    question: 'What happens when you try to add a duplicate key to a HashMap?',
    options: [
      'Exception is thrown',
      'Duplicate key is ignored',
      'Old value is replaced with new value',
      'Both values are stored'
    ],
    correctAnswer: 2,
    explanation: 'When a duplicate key is added to HashMap, the old value is replaced with the new value, and the old value is returned.',
    difficulty: 'Medium',
    unit: 'Unit II',
    topic: 'Collections'
  },
  {
    id: 'q20',
    question: 'Which method is used to close a file stream?',
    options: ['end()', 'close()', 'finish()', 'stop()'],
    correctAnswer: 1,
    explanation: 'The close() method is used to close file streams and release system resources. It should always be called when done with a stream.',
    difficulty: 'Easy',
    unit: 'Unit II',
    topic: 'File I/O'
  },

  // Unit III: GUI Programming
  {
    id: 'q21',
    question: 'Which is the top-level container in Swing?',
    options: ['JPanel', 'JFrame', 'JComponent', 'JContainer'],
    correctAnswer: 1,
    explanation: 'JFrame is a top-level container in Swing that represents a window with title bar, border, and other window decorations.',
    difficulty: 'Easy',
    unit: 'Unit III',
    topic: 'GUI Components'
  },
  {
    id: 'q22',
    question: 'Which layout manager divides the container into five regions?',
    options: ['FlowLayout', 'GridLayout', 'BorderLayout', 'BoxLayout'],
    correctAnswer: 2,
    explanation: 'BorderLayout divides the container into five regions: NORTH, SOUTH, EAST, WEST, and CENTER.',
    difficulty: 'Easy',
    unit: 'Unit III',
    topic: 'Layout Managers'
  },
  {
    id: 'q23',
    question: 'What is the default layout manager for JPanel?',
    options: ['BorderLayout', 'FlowLayout', 'GridLayout', 'BoxLayout'],
    correctAnswer: 1,
    explanation: 'FlowLayout is the default layout manager for JPanel. It arranges components in a left-to-right flow.',
    difficulty: 'Easy',
    unit: 'Unit III',
    topic: 'Layout Managers'
  },
  {
    id: 'q24',
    question: 'Which event is generated when a button is clicked?',
    options: ['MouseEvent', 'ActionEvent', 'KeyEvent', 'WindowEvent'],
    correctAnswer: 1,
    explanation: 'ActionEvent is generated when a button is clicked. It represents a semantic event indicating that a component-defined action occurred.',
    difficulty: 'Easy',
    unit: 'Unit III',
    topic: 'Event Handling'
  },
  {
    id: 'q25',
    question: 'Which interface must be implemented to handle button click events?',
    options: ['MouseListener', 'ActionListener', 'KeyListener', 'WindowListener'],
    correctAnswer: 1,
    explanation: 'ActionListener interface must be implemented to handle button click events. It has one method: actionPerformed().',
    difficulty: 'Easy',
    unit: 'Unit III',
    topic: 'Event Handling'
  },
  {
    id: 'q26',
    question: 'What is the purpose of SwingUtilities.invokeLater()?',
    options: [
      'To delay execution',
      'To run code on Event Dispatch Thread',
      'To create new threads',
      'To handle exceptions'
    ],
    correctAnswer: 1,
    explanation: 'SwingUtilities.invokeLater() ensures that GUI code runs on the Event Dispatch Thread (EDT), which is required for thread safety in Swing.',
    difficulty: 'Hard',
    unit: 'Unit III',
    topic: 'Event Handling'
  },
  {
    id: 'q27',
    question: 'Which layout manager arranges components in a rectangular grid?',
    options: ['FlowLayout', 'BorderLayout', 'GridLayout', 'CardLayout'],
    correctAnswer: 2,
    explanation: 'GridLayout arranges components in a rectangular grid where all components are the same size.',
    difficulty: 'Easy',
    unit: 'Unit III',
    topic: 'Layout Managers'
  },
  {
    id: 'q28',
    question: 'What is the difference between JTextField and JTextArea?',
    options: [
      'No difference',
      'JTextField is for single line, JTextArea is for multiple lines',
      'JTextArea is for single line, JTextField is for multiple lines',
      'Both are identical'
    ],
    correctAnswer: 1,
    explanation: 'JTextField is designed for single-line text input, while JTextArea is designed for multi-line text input and display.',
    difficulty: 'Easy',
    unit: 'Unit III',
    topic: 'GUI Components'
  },
  {
    id: 'q29',
    question: 'Which method is used to set the size of a JFrame?',
    options: ['setDimension()', 'setSize()', 'setBounds()', 'setArea()'],
    correctAnswer: 1,
    explanation: 'setSize() method is used to set the width and height of a JFrame. setBounds() can also be used to set both position and size.',
    difficulty: 'Easy',
    unit: 'Unit III',
    topic: 'GUI Components'
  },
  {
    id: 'q30',
    question: 'What is the purpose of the pack() method in JFrame?',
    options: [
      'To minimize the window',
      'To resize the window to fit its components',
      'To close the window',
      'To hide the window'
    ],
    correctAnswer: 1,
    explanation: 'The pack() method resizes the JFrame to fit the preferred sizes of its components, creating an optimal layout.',
    difficulty: 'Medium',
    unit: 'Unit III',
    topic: 'GUI Components'
  },

  // Unit IV: JDBC
  {
    id: 'q31',
    question: 'What does JDBC stand for?',
    options: [
      'Java Database Connection',
      'Java Database Connectivity',
      'Java Data Base Control',
      'Java Database Communication'
    ],
    correctAnswer: 1,
    explanation: 'JDBC stands for Java Database Connectivity. It is an API that provides a standard interface for connecting Java applications to databases.',
    difficulty: 'Easy',
    unit: 'Unit IV',
    topic: 'JDBC Basics'
  },
  {
    id: 'q32',
    question: 'Which JDBC driver type is written entirely in Java?',
    options: ['Type 1', 'Type 2', 'Type 3', 'Type 4'],
    correctAnswer: 3,
    explanation: 'Type 4 (Thin Driver) is written entirely in Java and communicates directly with the database using the database\'s native protocol.',
    difficulty: 'Medium',
    unit: 'Unit IV',
    topic: 'JDBC Drivers'
  },
  {
    id: 'q33',
    question: 'Which interface is used to execute SQL statements?',
    options: ['Connection', 'Statement', 'ResultSet', 'DriverManager'],
    correctAnswer: 1,
    explanation: 'Statement interface is used to execute SQL statements. PreparedStatement and CallableStatement are specialized versions of Statement.',
    difficulty: 'Easy',
    unit: 'Unit IV',
    topic: 'JDBC Interfaces'
  },
  {
    id: 'q34',
    question: 'What is the advantage of PreparedStatement over Statement?',
    options: [
      'Faster execution for repeated queries',
      'Prevents SQL injection',
      'Better performance',
      'All of the above'
    ],
    correctAnswer: 3,
    explanation: 'PreparedStatement offers all these advantages: faster execution for repeated queries, SQL injection prevention, and better performance due to pre-compilation.',
    difficulty: 'Medium',
    unit: 'Unit IV',
    topic: 'JDBC Interfaces'
  },
  {
    id: 'q35',
    question: 'Which method is used to establish a database connection?',
    options: [
      'DriverManager.connect()',
      'DriverManager.getConnection()',
      'Connection.create()',
      'Database.connect()'
    ],
    correctAnswer: 1,
    explanation: 'DriverManager.getConnection() is used to establish a connection to the database using the provided URL, username, and password.',
    difficulty: 'Easy',
    unit: 'Unit IV',
    topic: 'JDBC Connection'
  },
  {
    id: 'q36',
    question: 'What is the purpose of ResultSet in JDBC?',
    options: [
      'To execute queries',
      'To store query results',
      'To establish connections',
      'To manage transactions'
    ],
    correctAnswer: 1,
    explanation: 'ResultSet represents the result set of a database query. It provides methods to navigate through and extract data from query results.',
    difficulty: 'Easy',
    unit: 'Unit IV',
    topic: 'JDBC Interfaces'
  },
  {
    id: 'q37',
    question: 'Which method is used to move to the next row in ResultSet?',
    options: ['moveNext()', 'next()', 'forward()', 'advance()'],
    correctAnswer: 1,
    explanation: 'The next() method moves the cursor to the next row in the ResultSet and returns true if there are more rows.',
    difficulty: 'Easy',
    unit: 'Unit IV',
    topic: 'ResultSet Navigation'
  },
  {
    id: 'q38',
    question: 'What is a transaction in database context?',
    options: [
      'A single SQL statement',
      'A group of SQL statements that execute as a unit',
      'A database connection',
      'A table operation'
    ],
    correctAnswer: 1,
    explanation: 'A transaction is a group of SQL statements that are executed as a single unit. Either all statements succeed (commit) or all fail (rollback).',
    difficulty: 'Medium',
    unit: 'Unit IV',
    topic: 'Transactions'
  },
  {
    id: 'q39',
    question: 'Which method is used to commit a transaction?',
    options: ['save()', 'commit()', 'apply()', 'execute()'],
    correctAnswer: 1,
    explanation: 'The commit() method is used to make all changes made in the current transaction permanent.',
    difficulty: 'Easy',
    unit: 'Unit IV',
    topic: 'Transactions'
  },
  {
    id: 'q40',
    question: 'What happens when autocommit is set to true?',
    options: [
      'Transactions must be manually committed',
      'Each SQL statement is automatically committed',
      'No transactions are allowed',
      'All statements are rolled back'
    ],
    correctAnswer: 1,
    explanation: 'When autocommit is true (default), each SQL statement is automatically committed immediately after execution.',
    difficulty: 'Medium',
    unit: 'Unit IV',
    topic: 'Transactions'
  },

  // Additional questions for comprehensive coverage
  {
    id: 'q41',
    question: 'Which exception is thrown when a thread is interrupted while waiting?',
    options: ['ThreadException', 'InterruptedException', 'WaitException', 'SleepException'],
    correctAnswer: 1,
    explanation: 'InterruptedException is thrown when a thread is interrupted while it is in a waiting, sleeping, or blocked state.',
    difficulty: 'Medium',
    unit: 'Unit I',
    topic: 'Multithreading'
  },
  {
    id: 'q42',
    question: 'What is the difference between throw and throws in Java?',
    options: [
      'No difference',
      'throw is used to throw exceptions, throws is used to declare exceptions',
      'throws is used to throw exceptions, throw is used to declare exceptions',
      'Both are used to catch exceptions'
    ],
    correctAnswer: 1,
    explanation: 'throw is used to explicitly throw an exception, while throws is used in method signature to declare that the method may throw certain exceptions.',
    difficulty: 'Medium',
    unit: 'Unit I',
    topic: 'Exception Handling'
  },
  {
    id: 'q43',
    question: 'Which collection is best for frequent insertions and deletions in the middle?',
    options: ['ArrayList', 'LinkedList', 'Vector', 'Stack'],
    correctAnswer: 1,
    explanation: 'LinkedList is best for frequent insertions and deletions in the middle because it uses a doubly-linked list structure, making these operations O(1) when you have a reference to the node.',
    difficulty: 'Hard',
    unit: 'Unit II',
    topic: 'Collections'
  },
  {
    id: 'q44',
    question: 'What is serialization in Java?',
    options: [
      'Converting objects to XML',
      'Converting objects to byte streams',
      'Converting strings to objects',
      'Converting arrays to lists'
    ],
    correctAnswer: 1,
    explanation: 'Serialization is the process of converting Java objects into byte streams so they can be saved to files, sent over networks, or stored in databases.',
    difficulty: 'Medium',
    unit: 'Unit II',
    topic: 'File I/O'
  },
  {
    id: 'q45',
    question: 'Which Swing component is used to display a list of items?',
    options: ['JComboBox', 'JList', 'JTable', 'JTree'],
    correctAnswer: 1,
    explanation: 'JList is used to display a list of items where users can select one or more items. JComboBox is for dropdown selection.',
    difficulty: 'Easy',
    unit: 'Unit III',
    topic: 'GUI Components'
  },
  {
    id: 'q46',
    question: 'What is the Event Dispatch Thread (EDT)?',
    options: [
      'A thread for database operations',
      'A thread for handling GUI events',
      'A thread for file I/O',
      'A thread for network operations'
    ],
    correctAnswer: 1,
    explanation: 'The Event Dispatch Thread (EDT) is a special thread in Swing that handles all GUI events and updates. All Swing components must be accessed from the EDT.',
    difficulty: 'Hard',
    unit: 'Unit III',
    topic: 'Event Handling'
  },
  {
    id: 'q47',
    question: 'Which SQL command is used to retrieve data from a database?',
    options: ['INSERT', 'UPDATE', 'SELECT', 'DELETE'],
    correctAnswer: 2,
    explanation: 'SELECT command is used to retrieve data from database tables. It is the most commonly used SQL command for querying data.',
    difficulty: 'Easy',
    unit: 'Unit IV',
    topic: 'SQL Operations'
  },
  {
    id: 'q48',
    question: 'What is connection pooling?',
    options: [
      'Creating multiple databases',
      'Reusing database connections to improve performance',
      'Connecting to multiple databases simultaneously',
      'Backing up database connections'
    ],
    correctAnswer: 1,
    explanation: 'Connection pooling is a technique where a pool of database connections is maintained and reused, improving application performance by avoiding the overhead of creating new connections.',
    difficulty: 'Hard',
    unit: 'Unit IV',
    topic: 'Connection Management'
  },
  {
    id: 'q49',
    question: 'Which method is used to execute SELECT queries in JDBC?',
    options: ['executeUpdate()', 'executeQuery()', 'execute()', 'select()'],
    correctAnswer: 1,
    explanation: 'executeQuery() method is used to execute SELECT queries that return a ResultSet containing the query results.',
    difficulty: 'Easy',
    unit: 'Unit IV',
    topic: 'JDBC Operations'
  },
  {
    id: 'q50',
    question: 'What is the purpose of the synchronized keyword?',
    options: [
      'To make methods faster',
      'To prevent multiple threads from accessing a resource simultaneously',
      'To create new threads',
      'To handle exceptions'
    ],
    correctAnswer: 1,
    explanation: 'The synchronized keyword is used to control access to methods or blocks by multiple threads, ensuring that only one thread can access the synchronized code at a time.',
    difficulty: 'Medium',
    unit: 'Unit I',
    topic: 'Multithreading'
  },

  // More comprehensive questions
  {
    id: 'q51',
    question: 'What is deadlock in multithreading?',
    options: [
      'When a thread stops executing',
      'When two or more threads wait for each other indefinitely',
      'When a thread executes too slowly',
      'When a thread throws an exception'
    ],
    correctAnswer: 1,
    explanation: 'Deadlock occurs when two or more threads are blocked forever, waiting for each other to release resources they need.',
    difficulty: 'Hard',
    unit: 'Unit I',
    topic: 'Multithreading'
  },
  {
    id: 'q52',
    question: 'Which exception is unchecked in Java?',
    options: ['IOException', 'SQLException', 'RuntimeException', 'ClassNotFoundException'],
    correctAnswer: 2,
    explanation: 'RuntimeException and its subclasses are unchecked exceptions. They don\'t need to be declared in method signatures or caught explicitly.',
    difficulty: 'Medium',
    unit: 'Unit I',
    topic: 'Exception Handling'
  },
  {
    id: 'q53',
    question: 'What is the difference between Iterator and ListIterator?',
    options: [
      'No difference',
      'Iterator is bidirectional, ListIterator is unidirectional',
      'ListIterator is bidirectional, Iterator is unidirectional',
      'Both are identical'
    ],
    correctAnswer: 2,
    explanation: 'ListIterator is bidirectional (can traverse forward and backward) and allows modification during iteration, while Iterator is unidirectional.',
    difficulty: 'Hard',
    unit: 'Unit II',
    topic: 'Collections'
  },
  {
    id: 'q54',
    question: 'Which stream class is used for reading primitive data types?',
    options: ['FileInputStream', 'DataInputStream', 'BufferedInputStream', 'ObjectInputStream'],
    correctAnswer: 1,
    explanation: 'DataInputStream is used for reading primitive data types (int, double, boolean, etc.) from an input stream in a machine-independent way.',
    difficulty: 'Medium',
    unit: 'Unit II',
    topic: 'File I/O'
  },
  {
    id: 'q55',
    question: 'What is the purpose of CardLayout?',
    options: [
      'To arrange components in a grid',
      'To show one component at a time from a stack',
      'To arrange components in a flow',
      'To divide container into regions'
    ],
    correctAnswer: 1,
    explanation: 'CardLayout manages multiple components by showing only one component at a time, like a stack of cards where only the top card is visible.',
    difficulty: 'Medium',
    unit: 'Unit III',
    topic: 'Layout Managers'
  },
  {
    id: 'q56',
    question: 'Which event is generated when a window is closed?',
    options: ['ActionEvent', 'WindowEvent', 'ComponentEvent', 'ContainerEvent'],
    correctAnswer: 1,
    explanation: 'WindowEvent is generated when window operations occur, including opening, closing, activating, and deactivating windows.',
    difficulty: 'Easy',
    unit: 'Unit III',
    topic: 'Event Handling'
  },
  {
    id: 'q57',
    question: 'What is a CallableStatement used for?',
    options: [
      'Executing simple SQL statements',
      'Executing prepared statements',
      'Executing stored procedures',
      'Managing connections'
    ],
    correctAnswer: 2,
    explanation: 'CallableStatement is used to execute stored procedures in the database. It extends PreparedStatement and can handle IN, OUT, and INOUT parameters.',
    difficulty: 'Hard',
    unit: 'Unit IV',
    topic: 'JDBC Interfaces'
  },
  {
    id: 'q58',
    question: 'What is the purpose of rollback() in JDBC?',
    options: [
      'To commit changes',
      'To undo changes made in current transaction',
      'To close connection',
      'To execute queries'
    ],
    correctAnswer: 1,
    explanation: 'rollback() is used to undo all changes made in the current transaction and restore the database to its previous state.',
    difficulty: 'Easy',
    unit: 'Unit IV',
    topic: 'Transactions'
  },
  {
    id: 'q59',
    question: 'Which collection maintains elements in sorted order?',
    options: ['HashSet', 'LinkedHashSet', 'TreeSet', 'ArrayList'],
    correctAnswer: 2,
    explanation: 'TreeSet maintains elements in sorted order using a Red-Black tree implementation. Elements must be Comparable or a Comparator must be provided.',
    difficulty: 'Easy',
    unit: 'Unit II',
    topic: 'Collections'
  },
  {
    id: 'q60',
    question: 'What is the difference between wait() and sleep()?',
    options: [
      'No difference',
      'wait() releases lock, sleep() does not',
      'sleep() releases lock, wait() does not',
      'Both release locks'
    ],
    correctAnswer: 1,
    explanation: 'wait() releases the object lock and must be called within synchronized context, while sleep() does not release any locks and can be called anywhere.',
    difficulty: 'Hard',
    unit: 'Unit I',
    topic: 'Multithreading'
  }
];

export default questionsData;
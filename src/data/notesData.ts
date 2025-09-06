export interface CodeExample {
  title: string;
  explanation: string;
  code: string;
}

export interface Topic {
  id: string;
  title: string;
  description: string;
  content: string;
  examples: CodeExample[];
  keyPoints: string[];
}

export interface Unit {
  id: string;
  title: string;
  description: string;
  duration: string;
  topics: Topic[];
}

export const notesData: Unit[] = [
  {
    id: 'unit1',
    title: 'Unit I: Multithreading and Exception Handling',
    description: 'Learn about concurrent programming with threads and robust error handling mechanisms in Java.',
    duration: '10 Hours',
    topics: [
      {
        id: 'multithreading-intro',
        title: 'Introduction to Multithreading',
        description: 'Understanding the basics of concurrent programming and threads',
        content: `
          <h3>What is Multithreading?</h3>
          <p>Multithreading is a Java feature that allows concurrent execution of multiple threads within a single program. This enables programs to perform multiple tasks simultaneously, improving performance and user experience.</p>
          
          <h4>Key Concepts:</h4>
          <ul>
            <li><strong>Thread:</strong> A lightweight subprocess that can run concurrently with other threads</li>
            <li><strong>Process:</strong> A program in execution that can contain multiple threads</li>
            <li><strong>Concurrency:</strong> The ability to execute multiple threads simultaneously</li>
            <li><strong>Parallelism:</strong> Actual simultaneous execution on multiple CPU cores</li>
          </ul>
          
          <h4>Advantages of Multithreading:</h4>
          <ol>
            <li>Improved application performance</li>
            <li>Better resource utilization</li>
            <li>Enhanced user experience with responsive interfaces</li>
            <li>Simplified program structure for complex tasks</li>
          </ol>
          
          <h4>Thread States:</h4>
          <p>A thread can be in one of several states during its lifecycle:</p>
          <ul>
            <li><strong>NEW:</strong> Thread object created but not started</li>
            <li><strong>RUNNABLE:</strong> Thread is executing or ready to execute</li>
            <li><strong>BLOCKED:</strong> Thread is waiting for a monitor lock</li>
            <li><strong>WAITING:</strong> Thread is waiting indefinitely for another thread</li>
            <li><strong>TIMED_WAITING:</strong> Thread is waiting for a specified period</li>
            <li><strong>TERMINATED:</strong> Thread has completed execution</li>
          </ul>
        `,
        examples: [
          {
            title: 'Creating a Thread by Extending Thread Class',
            explanation: 'This example shows how to create a thread by extending the Thread class and overriding the run() method.',
            code: `// Creating thread by extending Thread class
class MyThread extends Thread {
    private String threadName;
    
    public MyThread(String name) {
        this.threadName = name;
    }
    
    @Override
    public void run() {
        for (int i = 1; i <= 5; i++) {
            System.out.println(threadName + " - Count: " + i);
            try {
                Thread.sleep(1000); // Sleep for 1 second
            } catch (InterruptedException e) {
                System.out.println(threadName + " interrupted");
            }
        }
        System.out.println(threadName + " finished execution");
    }
}

public class ThreadExample1 {
    public static void main(String[] args) {
        MyThread thread1 = new MyThread("Thread-1");
        MyThread thread2 = new MyThread("Thread-2");
        
        thread1.start(); // Start the thread
        thread2.start();
        
        System.out.println("Main thread finished");
    }
}`
          },
          {
            title: 'Creating a Thread by Implementing Runnable Interface',
            explanation: 'This example demonstrates creating threads using the Runnable interface, which is the preferred approach.',
            code: `// Creating thread by implementing Runnable interface
class MyRunnable implements Runnable {
    private String threadName;
    private int count;
    
    public MyRunnable(String name, int count) {
        this.threadName = name;
        this.count = count;
    }
    
    @Override
    public void run() {
        for (int i = 1; i <= count; i++) {
            System.out.println(threadName + " - Iteration: " + i);
            try {
                Thread.sleep(500);
            } catch (InterruptedException e) {
                System.out.println(threadName + " interrupted");
                return;
            }
        }
    }
}

public class RunnableExample {
    public static void main(String[] args) {
        // Create Runnable objects
        MyRunnable task1 = new MyRunnable("Worker-1", 3);
        MyRunnable task2 = new MyRunnable("Worker-2", 4);
        
        // Create Thread objects
        Thread thread1 = new Thread(task1);
        Thread thread2 = new Thread(task2);
        
        // Start threads
        thread1.start();
        thread2.start();
        
        // Wait for threads to complete
        try {
            thread1.join(); // Wait for thread1 to finish
            thread2.join(); // Wait for thread2 to finish
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        
        System.out.println("All threads completed");
    }
}`
          }
        ],
        keyPoints: [
          'Threads share the same memory space within a process',
          'Use Thread.start() to begin thread execution, not Thread.run()',
          'Implementing Runnable is preferred over extending Thread class',
          'Thread.sleep() can throw InterruptedException',
          'Use Thread.join() to wait for a thread to complete'
        ]
      },
      {
        id: 'thread-lifecycle',
        title: 'Thread Lifecycle and Management',
        description: 'Understanding thread states, lifecycle, and management techniques',
        content: `
          <h3>Thread Lifecycle</h3>
          <p>Every thread in Java goes through various states during its lifetime. Understanding these states is crucial for effective thread management.</p>
          
          <h4>Detailed Thread States:</h4>
          
          <h5>1. NEW State</h5>
          <p>A thread is in NEW state when it's created but not yet started. The thread object exists but the start() method hasn't been called.</p>
          
          <h5>2. RUNNABLE State</h5>
          <p>After calling start(), the thread enters RUNNABLE state. This includes:</p>
          <ul>
            <li><strong>Ready:</strong> Thread is ready to run but waiting for CPU allocation</li>
            <li><strong>Running:</strong> Thread is currently executing</li>
          </ul>
          
          <h5>3. BLOCKED State</h5>
          <p>Thread is waiting to acquire a monitor lock to enter or re-enter a synchronized block/method.</p>
          
          <h5>4. WAITING State</h5>
          <p>Thread is waiting indefinitely for another thread to perform a particular action. Methods that cause WAITING:</p>
          <ul>
            <li>Object.wait() without timeout</li>
            <li>Thread.join() without timeout</li>
            <li>LockSupport.park()</li>
          </ul>
          
          <h5>5. TIMED_WAITING State</h5>
          <p>Thread is waiting for a specified period. Methods that cause TIMED_WAITING:</p>
          <ul>
            <li>Thread.sleep()</li>
            <li>Object.wait() with timeout</li>
            <li>Thread.join() with timeout</li>
          </ul>
          
          <h5>6. TERMINATED State</h5>
          <p>Thread has completed its execution or terminated due to an exception.</p>
          
          <h4>Thread Methods:</h4>
          <ul>
            <li><strong>start():</strong> Starts thread execution</li>
            <li><strong>run():</strong> Contains the thread's execution code</li>
            <li><strong>sleep():</strong> Pauses thread for specified time</li>
            <li><strong>join():</strong> Waits for thread to complete</li>
            <li><strong>interrupt():</strong> Interrupts a thread</li>
            <li><strong>isAlive():</strong> Checks if thread is alive</li>
            <li><strong>getName():</strong> Gets thread name</li>
            <li><strong>setName():</strong> Sets thread name</li>
          </ul>
        `,
        examples: [
          {
            title: 'Thread State Monitoring',
            explanation: 'This example demonstrates how to monitor thread states and lifecycle.',
            code: `public class ThreadLifecycleExample {
    public static void main(String[] args) {
        Thread workerThread = new Thread(new Worker(), "WorkerThread");
        
        System.out.println("Thread state after creation: " + workerThread.getState());
        
        workerThread.start();
        System.out.println("Thread state after start(): " + workerThread.getState());
        
        // Monitor thread state
        while (workerThread.isAlive()) {
            System.out.println("Thread state: " + workerThread.getState());
            try {
                Thread.sleep(100);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }
        
        System.out.println("Final thread state: " + workerThread.getState());
    }
}

class Worker implements Runnable {
    @Override
    public void run() {
        System.out.println("Worker started: " + Thread.currentThread().getName());
        
        try {
            // Simulate work
            for (int i = 1; i <= 3; i++) {
                System.out.println("Working... " + i);
                Thread.sleep(1000);
            }
            
            // Wait state demonstration
            synchronized(this) {
                System.out.println("Entering wait state");
                wait(2000); // TIMED_WAITING state
            }
            
        } catch (InterruptedException e) {
            System.out.println("Worker interrupted");
        }
        
        System.out.println("Worker finished");
    }
}`
          },
          {
            title: 'Thread Priority and Daemon Threads',
            explanation: 'Understanding thread priorities and daemon threads.',
            code: `public class ThreadPriorityExample {
    public static void main(String[] args) {
        // Create threads with different priorities
        Thread highPriorityThread = new Thread(new PriorityTask("HIGH"), "HighPriority");
        Thread normalPriorityThread = new Thread(new PriorityTask("NORMAL"), "NormalPriority");
        Thread lowPriorityThread = new Thread(new PriorityTask("LOW"), "LowPriority");
        
        // Set priorities
        highPriorityThread.setPriority(Thread.MAX_PRIORITY);  // 10
        normalPriorityThread.setPriority(Thread.NORM_PRIORITY); // 5
        lowPriorityThread.setPriority(Thread.MIN_PRIORITY);   // 1
        
        // Create a daemon thread
        Thread daemonThread = new Thread(new DaemonTask(), "DaemonThread");
        daemonThread.setDaemon(true); // Set as daemon thread
        
        System.out.println("Main thread priority: " + Thread.currentThread().getPriority());
        
        // Start all threads
        highPriorityThread.start();
        normalPriorityThread.start();
        lowPriorityThread.start();
        daemonThread.start();
        
        // Main thread waits for non-daemon threads
        try {
            Thread.sleep(3000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        
        System.out.println("Main thread ending...");
    }
}

class PriorityTask implements Runnable {
    private String priority;
    
    public PriorityTask(String priority) {
        this.priority = priority;
    }
    
    @Override
    public void run() {
        for (int i = 1; i <= 5; i++) {
            System.out.println(priority + " Priority Thread - " + i);
            try {
                Thread.sleep(500);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }
    }
}

class DaemonTask implements Runnable {
    @Override
    public void run() {
        while (true) {
            System.out.println("Daemon thread running...");
            try {
                Thread.sleep(1000);
            } catch (InterruptedException e) {
                break;
            }
        }
    }
}`
          }
        ],
        keyPoints: [
          'Thread states can be checked using getState() method',
          'NEW threads must call start() to become RUNNABLE',
          'BLOCKED threads are waiting for synchronization locks',
          'WAITING and TIMED_WAITING are different forms of thread suspension',
          'Daemon threads terminate when all user threads finish',
          'Thread priority is a hint to the scheduler, not a guarantee'
        ]
      },
      {
        id: 'exception-handling',
        title: 'Exception Handling',
        description: 'Comprehensive guide to handling exceptions and errors in Java',
        content: `
          <h3>Exception Handling in Java</h3>
          <p>Exception handling is a mechanism to handle runtime errors, maintaining the normal flow of application execution. Java provides a robust exception handling framework using try-catch-finally blocks.</p>
          
          <h4>Exception Hierarchy:</h4>
          <p>All exceptions in Java are objects derived from the Throwable class:</p>
          <ul>
            <li><strong>Throwable</strong> (Root class)
              <ul>
                <li><strong>Error</strong> - System errors (OutOfMemoryError, StackOverflowError)</li>
                <li><strong>Exception</strong>
                  <ul>
                    <li><strong>Checked Exceptions</strong> - Must be handled (IOException, SQLException)</li>
                    <li><strong>Unchecked Exceptions (RuntimeException)</strong> - Optional handling (NullPointerException, ArrayIndexOutOfBoundsException)</li>
                  </ul>
                </li>
              </ul>
            </li>
          </ul>
          
          <h4>Types of Exceptions:</h4>
          
          <h5>1. Checked Exceptions</h5>
          <p>These are exceptions that must be either caught or declared in the method signature. Examples include:</p>
          <ul>
            <li>IOException - Input/output operations</li>
            <li>SQLException - Database operations</li>
            <li>ClassNotFoundException - Class loading</li>
            <li>InterruptedException - Thread operations</li>
          </ul>
          
          <h5>2. Unchecked Exceptions</h5>
          <p>These are runtime exceptions that don't need to be explicitly handled:</p>
          <ul>
            <li>NullPointerException - Accessing null reference</li>
            <li>ArrayIndexOutOfBoundsException - Invalid array index</li>
            <li>IllegalArgumentException - Invalid method arguments</li>
            <li>NumberFormatException - Invalid number conversion</li>
          </ul>
          
          <h4>Exception Handling Keywords:</h4>
          <ul>
            <li><strong>try:</strong> Block containing code that might throw an exception</li>
            <li><strong>catch:</strong> Block that handles specific exceptions</li>
            <li><strong>finally:</strong> Block that always executes (cleanup code)</li>
            <li><strong>throw:</strong> Manually throw an exception</li>
            <li><strong>throws:</strong> Declare exceptions in method signature</li>
          </ul>
          
          <h4>Best Practices:</h4>
          <ol>
            <li>Catch specific exceptions rather than generic Exception</li>
            <li>Use finally block for cleanup operations</li>
            <li>Don't ignore exceptions</li>
            <li>Create meaningful error messages</li>
            <li>Log exceptions appropriately</li>
            <li>Use try-with-resources for automatic resource management</li>
          </ol>
        `,
        examples: [
          {
            title: 'Basic Exception Handling',
            explanation: 'Demonstrates basic try-catch-finally blocks with different exception types.',
            code: `public class BasicExceptionHandling {
    public static void main(String[] args) {
        // Example 1: Handling ArithmeticException
        try {
            int result = divideNumbers(10, 0);
            System.out.println("Result: " + result);
        } catch (ArithmeticException e) {
            System.out.println("Error: Cannot divide by zero!");
            System.out.println("Exception message: " + e.getMessage());
        } finally {
            System.out.println("Division operation completed");
        }
        
        // Example 2: Handling ArrayIndexOutOfBoundsException
        int[] numbers = {1, 2, 3, 4, 5};
        try {
            System.out.println("Accessing element at index 10: " + numbers[10]);
        } catch (ArrayIndexOutOfBoundsException e) {
            System.out.println("Error: Array index out of bounds!");
            System.out.println("Array length: " + numbers.length);
        }
        
        // Example 3: Handling NullPointerException
        String text = null;
        try {
            int length = text.length();
            System.out.println("Text length: " + length);
        } catch (NullPointerException e) {
            System.out.println("Error: Text is null!");
        }
        
        // Example 4: Multiple catch blocks
        try {
            String numberStr = "abc";
            int number = Integer.parseInt(numberStr);
            System.out.println("Parsed number: " + number);
        } catch (NumberFormatException e) {
            System.out.println("Error: Invalid number format!");
        } catch (Exception e) {
            System.out.println("Unexpected error occurred!");
        }
    }
    
    public static int divideNumbers(int a, int b) {
        return a / b;
    }
}`
          },
          {
            title: 'Custom Exception and Throws Declaration',
            explanation: 'Creating custom exceptions and using throws keyword to declare exceptions.',
            code: `// Custom Exception Class
class InsufficientFundsException extends Exception {
    private double amount;
    
    public InsufficientFundsException(double amount) {
        super("Insufficient funds for withdrawal: $" + amount);
        this.amount = amount;
    }
    
    public double getAmount() {
        return amount;
    }
}

// Bank Account Class
class BankAccount {
    private double balance;
    private String accountNumber;
    
    public BankAccount(String accountNumber, double balance) {
        this.accountNumber = accountNumber;
        this.balance = balance;
    }
    
    // Method that throws custom exception
    public void withdraw(double amount) throws InsufficientFundsException {
        if (amount > balance) {
            throw new InsufficientFundsException(amount - balance);
        }
        balance -= amount;
        System.out.println("Withdrawal successful: $" + amount);
        System.out.println("Remaining balance: $" + balance);
    }
    
    public void deposit(double amount) {
        balance += amount;
        System.out.println("Deposit successful: $" + amount);
    }
    
    public double getBalance() {
        return balance;
    }
}

public class CustomExceptionExample {
    public static void main(String[] args) {
        BankAccount account = new BankAccount("ACC001", 1000.0);
        
        try {
            System.out.println("Initial balance: $" + account.getBalance());
            
            // Valid withdrawal
            account.withdraw(500.0);
            
            // Invalid withdrawal - will throw exception
            account.withdraw(800.0);
            
        } catch (InsufficientFundsException e) {
            System.out.println("Transaction failed: " + e.getMessage());
            System.out.println("Shortage amount: $" + e.getAmount());
        } finally {
            System.out.println("Final balance: $" + account.getBalance());
        }
        
        // Demonstrate method with throws declaration
        try {
            performBankingOperations();
        } catch (Exception e) {
            System.out.println("Banking operation failed: " + e.getMessage());
        }
    }
    
    // Method that declares multiple exceptions
    public static void performBankingOperations() throws InsufficientFundsException, IllegalArgumentException {
        BankAccount account = new BankAccount("ACC002", 500.0);
        
        // This might throw IllegalArgumentException
        if (Math.random() > 0.5) {
            throw new IllegalArgumentException("Invalid operation parameters");
        }
        
        // This might throw InsufficientFundsException
        account.withdraw(600.0);
    }
}`
          },
          {
            title: 'Try-with-Resources and Exception Chaining',
            explanation: 'Demonstrates automatic resource management and exception chaining.',
            code: `import java.io.*;
import java.util.Scanner;

public class AdvancedExceptionHandling {
    
    // Custom exception for file processing
    static class FileProcessingException extends Exception {
        public FileProcessingException(String message, Throwable cause) {
            super(message, cause);
        }
    }
    
    public static void main(String[] args) {
        // Example 1: Try-with-resources
        System.out.println("=== Try-with-Resources Example ===");
        tryWithResourcesExample();
        
        // Example 2: Exception chaining
        System.out.println("\\n=== Exception Chaining Example ===");
        try {
            processFile("nonexistent.txt");
        } catch (FileProcessingException e) {
            System.out.println("Main exception: " + e.getMessage());
            System.out.println("Root cause: " + e.getCause().getMessage());
            
            // Print full stack trace
            e.printStackTrace();
        }
    }
    
    // Try-with-resources automatically closes resources
    public static void tryWithResourcesExample() {
        // Multiple resources in try-with-resources
        try (
            ByteArrayInputStream input = new ByteArrayInputStream("Hello World".getBytes());
            Scanner scanner = new Scanner(input)
        ) {
            while (scanner.hasNextLine()) {
                System.out.println("Read: " + scanner.nextLine());
            }
        } catch (Exception e) {
            System.out.println("Error reading data: " + e.getMessage());
        }
        // Resources are automatically closed here
        
        // Traditional approach (not recommended)
        FileWriter writer = null;
        try {
            writer = new FileWriter("temp.txt");
            writer.write("Some content");
        } catch (IOException e) {
            System.out.println("Write error: " + e.getMessage());
        } finally {
            // Manual cleanup required
            if (writer != null) {
                try {
                    writer.close();
                } catch (IOException e) {
                    System.out.println("Error closing writer: " + e.getMessage());
                }
            }
        }
    }
    
    // Exception chaining example
    public static void processFile(String filename) throws FileProcessingException {
        try {
            // This will throw FileNotFoundException
            FileReader reader = new FileReader(filename);
            BufferedReader bufferedReader = new BufferedReader(reader);
            
            // Process file content
            String line = bufferedReader.readLine();
            System.out.println("First line: " + line);
            
        } catch (FileNotFoundException e) {
            // Chain the original exception
            throw new FileProcessingException(
                "Failed to process file: " + filename, e
            );
        } catch (IOException e) {
            // Chain different type of exception
            throw new FileProcessingException(
                "I/O error while processing file: " + filename, e
            );
        }
    }
}`
          }
        ],
        keyPoints: [
          'Always catch the most specific exception first in multiple catch blocks',
          'Use finally block for cleanup operations that must always execute',
          'Try-with-resources automatically manages resource cleanup',
          'Custom exceptions should extend Exception (checked) or RuntimeException (unchecked)',
          'Exception chaining helps preserve the original cause of an error',
          'Never catch Exception and do nothing - at least log the error'
        ]
      }
    ]
  },
  {
    id: 'unit2',
    title: 'Unit II: Managing Input/Output Files, Java Collection Framework',
    description: 'Master file handling, streams, and Java collections for data management.',
    duration: '10 Hours',
    topics: [
      {
        id: 'file-io-streams',
        title: 'File I/O and Streams',
        description: 'Understanding Java I/O operations with streams for file handling',
        content: `
          <h3>Java I/O and Streams</h3>
          <p>Java I/O (Input/Output) is used to process the input and produce the output. Java uses streams to handle input/output operations efficiently. A stream is a sequence of data that can be read from or written to.</p>
          
          <h4>Types of Streams:</h4>
          
          <h5>1. Based on Data Type:</h5>
          <ul>
            <li><strong>Byte Streams:</strong> Handle raw binary data (8-bit bytes)
              <ul>
                <li>InputStream, OutputStream classes</li>
                <li>Used for images, videos, executable files</li>
              </ul>
            </li>
            <li><strong>Character Streams:</strong> Handle character data (16-bit Unicode)
              <ul>
                <li>Reader, Writer classes</li>
                <li>Used for text files</li>
              </ul>
            </li>
          </ul>
          
          <h5>2. Based on Direction:</h5>
          <ul>
            <li><strong>Input Streams:</strong> Read data from source</li>
            <li><strong>Output Streams:</strong> Write data to destination</li>
          </ul>
          
          <h4>Stream Classes Hierarchy:</h4>
          
          <h5>Byte Stream Classes:</h5>
          <ul>
            <li><strong>InputStream (Abstract):</strong> FileInputStream, BufferedInputStream, ObjectInputStream</li>
            <li><strong>OutputStream (Abstract):</strong> FileOutputStream, BufferedOutputStream, ObjectOutputStream</li>
          </ul>
          
          <h5>Character Stream Classes:</h5>
          <ul>
            <li><strong>Reader (Abstract):</strong> FileReader, BufferedReader, StringReader</li>
            <li><strong>Writer (Abstract):</strong> FileWriter, BufferedWriter, PrintWriter</li>
          </ul>
          
          <h4>File Operations:</h4>
          <p>Java provides several classes for file operations:</p>
          <ul>
            <li><strong>File class:</strong> Represents file and directory pathnames</li>
            <li><strong>Files class:</strong> Utility class for file operations (Java 7+)</li>
            <li><strong>Path interface:</strong> Represents file system paths (Java 7+)</li>
          </ul>
          
          <h4>Key Concepts:</h4>
          <ul>
            <li><strong>Buffering:</strong> Improves I/O performance by reducing system calls</li>
            <li><strong>Serialization:</strong> Converting objects to byte streams</li>
            <li><strong>Random Access:</strong> Reading/writing at any position in file</li>
            <li><strong>NIO (New I/O):</strong> Enhanced I/O operations with channels and buffers</li>
          </ul>
        `,
        examples: [
          {
            title: 'File Operations with File Class',
            explanation: 'Basic file operations using the File class to create, check, and manipulate files and directories.',
            code: `import java.io.File;
import java.io.IOException;

public class FileOperationsExample {
    public static void main(String[] args) {
        // Create File objects
        File file = new File("example.txt");
        File directory = new File("testDir");
        File fileInDir = new File("testDir/nested.txt");
        
        try {
            // File creation and checking
            System.out.println("=== File Creation ===");
            if (file.createNewFile()) {
                System.out.println("File created: " + file.getName());
            } else {
                System.out.println("File already exists: " + file.getName());
            }
            
            // Directory creation
            System.out.println("\\n=== Directory Creation ===");
            if (directory.mkdir()) {
                System.out.println("Directory created: " + directory.getName());
            } else {
                System.out.println("Directory already exists or creation failed");
            }
            
            // File information
            System.out.println("\\n=== File Information ===");
            if (file.exists()) {
                System.out.println("File name: " + file.getName());
                System.out.println("Absolute path: " + file.getAbsolutePath());
                System.out.println("Parent directory: " + file.getParent());
                System.out.println("File size: " + file.length() + " bytes");
                System.out.println("Is file: " + file.isFile());
                System.out.println("Is directory: " + file.isDirectory());
                System.out.println("Can read: " + file.canRead());
                System.out.println("Can write: " + file.canWrite());
                System.out.println("Can execute: " + file.canExecute());
                System.out.println("Is hidden: " + file.isHidden());
                System.out.println("Last modified: " + file.lastModified());
            }
            
            // Directory listing
            System.out.println("\\n=== Directory Listing ===");
            File currentDir = new File(".");
            String[] files = currentDir.list();
            if (files != null) {
                System.out.println("Files in current directory:");
                for (String fileName : files) {
                    File f = new File(fileName);
                    String type = f.isDirectory() ? "[DIR]" : "[FILE]";
                    System.out.println(type + " " + fileName);
                }
            }
            
            // File filtering
            System.out.println("\\n=== File Filtering ===");
            File[] javaFiles = currentDir.listFiles((dir, name) -> name.endsWith(".java"));
            if (javaFiles != null) {
                System.out.println("Java files found:");
                for (File javaFile : javaFiles) {
                    System.out.println("  " + javaFile.getName());
                }
            }
            
        } catch (IOException e) {
            System.out.println("I/O Error: " + e.getMessage());
        } finally {
            // Cleanup (optional)
            System.out.println("\\n=== Cleanup ===");
            if (file.exists() && file.delete()) {
                System.out.println("File deleted: " + file.getName());
            }
            if (directory.exists() && directory.delete()) {
                System.out.println("Directory deleted: " + directory.getName());
            }
        }
    }
}`
          },
          {
            title: 'Character Streams - Reading and Writing Text Files',
            explanation: 'Using FileReader, FileWriter, BufferedReader, and BufferedWriter for efficient text file operations.',
            code: `import java.io.*;
import java.util.ArrayList;
import java.util.List;

public class CharacterStreamExample {
    public static void main(String[] args) {
        String fileName = "student_data.txt";
        
        // Write data to file
        writeToFile(fileName);
        
        // Read data from file
        readFromFile(fileName);
        
        // Append data to file
        appendToFile(fileName);
        
        // Read with BufferedReader for better performance
        readWithBufferedReader(fileName);
        
        // Process file line by line
        processFileLines(fileName);
    }
    
    // Writing to file using FileWriter
    public static void writeToFile(String fileName) {
        try (FileWriter writer = new FileWriter(fileName)) {
            writer.write("Student Information\\n");
            writer.write("==================\\n");
            writer.write("1. John Doe - Computer Science\\n");
            writer.write("2. Jane Smith - Mathematics\\n");
            writer.write("3. Bob Johnson - Physics\\n");
            System.out.println("Data written to file successfully");
        } catch (IOException e) {
            System.out.println("Error writing to file: " + e.getMessage());
        }
    }
    
    // Reading from file using FileReader
    public static void readFromFile(String fileName) {
        System.out.println("\\n=== Reading with FileReader ===");
        try (FileReader reader = new FileReader(fileName)) {
            int character;
            StringBuilder content = new StringBuilder();
            
            while ((character = reader.read()) != -1) {
                content.append((char) character);
            }
            
            System.out.println("File content:");
            System.out.println(content.toString());
        } catch (FileNotFoundException e) {
            System.out.println("File not found: " + fileName);
        } catch (IOException e) {
            System.out.println("Error reading file: " + e.getMessage());
        }
    }
    
    // Appending to file
    public static void appendToFile(String fileName) {
        try (FileWriter writer = new FileWriter(fileName, true)) { // true for append mode
            writer.write("4. Alice Brown - Chemistry\\n");
            writer.write("5. Charlie Wilson - Biology\\n");
            System.out.println("Data appended to file successfully");
        } catch (IOException e) {
            System.out.println("Error appending to file: " + e.getMessage());
        }
    }
    
    // Reading with BufferedReader for better performance
    public static void readWithBufferedReader(String fileName) {
        System.out.println("\\n=== Reading with BufferedReader ===");
        try (BufferedReader reader = new BufferedReader(new FileReader(fileName))) {
            String line;
            int lineNumber = 1;
            
            while ((line = reader.readLine()) != null) {
                System.out.println("Line " + lineNumber + ": " + line);
                lineNumber++;
            }
        } catch (IOException e) {
            System.out.println("Error reading file: " + e.getMessage());
        }
    }
    
    // Processing file lines into data structure
    public static void processFileLines(String fileName) {
        System.out.println("\\n=== Processing File Data ===");
        List<Student> students = new ArrayList<>();
        
        try (BufferedReader reader = new BufferedReader(new FileReader(fileName))) {
            String line;
            
            while ((line = reader.readLine()) != null) {
                // Skip header lines
                if (line.matches("\\d+\\..*")) {
                    String[] parts = line.split(" - ");
                    if (parts.length == 2) {
                        String name = parts[0].substring(3); // Remove number and dot
                        String major = parts[1];
                        students.add(new Student(name, major));
                    }
                }
            }
            
            System.out.println("Processed Students:");
            for (Student student : students) {
                System.out.println("  " + student);
            }
            
        } catch (IOException e) {
            System.out.println("Error processing file: " + e.getMessage());
        }
    }
}

// Simple Student class for data processing
class Student {
    private String name;
    private String major;
    
    public Student(String name, String major) {
        this.name = name;
        this.major = major;
    }
    
    @Override
    public String toString() {
        return name + " (Major: " + major + ")";
    }
    
    // Getters
    public String getName() { return name; }
    public String getMajor() { return major; }
}`
          },
          {
            title: 'Byte Streams and Object Serialization',
            explanation: 'Working with byte streams for binary data and object serialization.',
            code: `import java.io.*;
import java.util.ArrayList;
import java.util.List;

// Serializable class for demonstration
class Employee implements Serializable {
    private static final long serialVersionUID = 1L;
    
    private String name;
    private int id;
    private double salary;
    private transient String password; // transient field won't be serialized
    
    public Employee(String name, int id, double salary, String password) {
        this.name = name;
        this.id = id;
        this.salary = salary;
        this.password = password;
    }
    
    @Override
    public String toString() {
        return String.format("Employee{name='%s', id=%d, salary=%.2f, password=%s}", 
                           name, id, salary, password);
    }
    
    // Getters and setters
    public String getName() { return name; }
    public int getId() { return id; }
    public double getSalary() { return salary; }
    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }
}

public class ByteStreamExample {
    public static void main(String[] args) {
        // Binary file operations
        binaryFileOperations();
        
        // Object serialization
        objectSerializationExample();
        
        // Copy files using byte streams
        copyFileExample();
    }
    
    // Basic binary file operations
    public static void binaryFileOperations() {
        System.out.println("=== Binary File Operations ===");
        String fileName = "binary_data.dat";
        
        // Write binary data
        try (FileOutputStream fos = new FileOutputStream(fileName);
             DataOutputStream dos = new DataOutputStream(fos)) {
            
            // Write different data types
            dos.writeInt(42);
            dos.writeDouble(3.14159);
            dos.writeUTF("Hello Binary World");
            dos.writeBoolean(true);
            dos.writeLong(1234567890L);
            
            System.out.println("Binary data written successfully");
            
        } catch (IOException e) {
            System.out.println("Error writing binary data: " + e.getMessage());
        }
        
        // Read binary data
        try (FileInputStream fis = new FileInputStream(fileName);
             DataInputStream dis = new DataInputStream(fis)) {
            
            int intValue = dis.readInt();
            double doubleValue = dis.readDouble();
            String stringValue = dis.readUTF();
            boolean booleanValue = dis.readBoolean();
            long longValue = dis.readLong();
            
            System.out.println("Read binary data:");
            System.out.println("  Integer: " + intValue);
            System.out.println("  Double: " + doubleValue);
            System.out.println("  String: " + stringValue);
            System.out.println("  Boolean: " + booleanValue);
            System.out.println("  Long: " + longValue);
            
        } catch (IOException e) {
            System.out.println("Error reading binary data: " + e.getMessage());
        }
    }
    
    // Object serialization and deserialization
    public static void objectSerializationExample() {
        System.out.println("\\n=== Object Serialization ===");
        String fileName = "employees.ser";
        
        // Create sample data
        List<Employee> employees = new ArrayList<>();
        employees.add(new Employee("John Doe", 1001, 75000.0, "secret123"));
        employees.add(new Employee("Jane Smith", 1002, 80000.0, "password456"));
        employees.add(new Employee("Bob Johnson", 1003, 70000.0, "mypass789"));
        
        // Serialize objects
        try (FileOutputStream fos = new FileOutputStream(fileName);
             ObjectOutputStream oos = new ObjectOutputStream(fos)) {
            
            oos.writeObject(employees);
            System.out.println("Employees serialized successfully");
            
        } catch (IOException e) {
            System.out.println("Error serializing objects: " + e.getMessage());
        }
        
        // Deserialize objects
        try (FileInputStream fis = new FileInputStream(fileName);
             ObjectInputStream ois = new ObjectInputStream(fis)) {
            
            @SuppressWarnings("unchecked")
            List<Employee> deserializedEmployees = (List<Employee>) ois.readObject();
            
            System.out.println("Deserialized employees:");
            for (Employee emp : deserializedEmployees) {
                System.out.println("  " + emp);
                // Note: password field is null because it's transient
            }
            
        } catch (IOException | ClassNotFoundException e) {
            System.out.println("Error deserializing objects: " + e.getMessage());
        }
    }
    
    // File copying using buffered streams
    public static void copyFileExample() {
        System.out.println("\\n=== File Copy Example ===");
        String sourceFile = "binary_data.dat";
        String destinationFile = "binary_data_copy.dat";
        
        try (FileInputStream fis = new FileInputStream(sourceFile);
             BufferedInputStream bis = new BufferedInputStream(fis);
             FileOutputStream fos = new FileOutputStream(destinationFile);
             BufferedOutputStream bos = new BufferedOutputStream(fos)) {
            
            byte[] buffer = new byte[1024]; // 1KB buffer
            int bytesRead;
            long totalBytes = 0;
            
            while ((bytesRead = bis.read(buffer)) != -1) {
                bos.write(buffer, 0, bytesRead);
                totalBytes += bytesRead;
            }
            
            System.out.println("File copied successfully");
            System.out.println("Total bytes copied: " + totalBytes);
            
        } catch (IOException e) {
            System.out.println("Error copying file: " + e.getMessage());
        }
        
        // Verify the copy
        verifyFileCopy(sourceFile, destinationFile);
    }
    
    // Helper method to verify file copy
    private static void verifyFileCopy(String sourceFile, String destinationFile) {
        File source = new File(sourceFile);
        File destination = new File(destinationFile);
        
        if (source.exists() && destination.exists()) {
            if (source.length() == destination.length()) {
                System.out.println("File copy verified: sizes match");
            } else {
                System.out.println("File copy verification failed: size mismatch");
            }
        }
    }
}`
          }
        ],
        keyPoints: [
          'Always use try-with-resources for automatic resource management',
          'BufferedReader/Writer provide better performance for large files',
          'Byte streams handle binary data, character streams handle text',
          'Serialization requires implementing Serializable interface',
          'transient keyword excludes fields from serialization',
          'Use appropriate buffer sizes for optimal I/O performance'
        ]
      },
      {
        id: 'collection-framework',
        title: 'Java Collection Framework',
        description: 'Comprehensive guide to Java collections including List, Set, Map, and Queue interfaces',
        content: `
          <h3>Java Collection Framework</h3>
          <p>The Java Collection Framework is a set of classes and interfaces that implement commonly reusable collection data structures. It provides a unified architecture for representing and manipulating collections, allowing them to be manipulated independently of implementation details.</p>
          
          <h4>Collection Framework Hierarchy:</h4>
          
          <h5>Core Interfaces:</h5>
          <ul>
            <li><strong>Collection:</strong> Root interface for most collection classes</li>
            <li><strong>List:</strong> Ordered collection (sequence) that allows duplicates</li>
            <li><strong>Set:</strong> Collection that doesn't allow duplicates</li>
            <li><strong>Queue:</strong> Collection for holding elements prior to processing</li>
            <li><strong>Map:</strong> Object that maps keys to values (not part of Collection hierarchy)</li>
          </ul>
          
          <h4>List Interface Implementations:</h4>
          <ul>
            <li><strong>ArrayList:</strong> Resizable array, good for random access</li>
            <li><strong>LinkedList:</strong> Doubly-linked list, good for frequent insertions/deletions</li>
            <li><strong>Vector:</strong> Synchronized version of ArrayList (legacy)</li>
            <li><strong>Stack:</strong> LIFO (Last In First Out) stack implementation</li>
          </ul>
          
          <h4>Set Interface Implementations:</h4>
          <ul>
            <li><strong>HashSet:</strong> Hash table implementation, no ordering</li>
            <li><strong>LinkedHashSet:</strong> Hash table with linked list, maintains insertion order</li>
            <li><strong>TreeSet:</strong> Red-Black tree implementation, sorted order</li>
          </ul>
          
          <h4>Queue Interface Implementations:</h4>
          <ul>
            <li><strong>PriorityQueue:</strong> Priority heap implementation</li>
            <li><strong>ArrayDeque:</strong> Resizable array implementation of Deque</li>
            <li><strong>LinkedList:</strong> Also implements Queue interface</li>
          </ul>
          
          <h4>Map Interface Implementations:</h4>
          <ul>
            <li><strong>HashMap:</strong> Hash table implementation, no ordering</li>
            <li><strong>LinkedHashMap:</strong> Hash table with linked list, maintains order</li>
            <li><strong>TreeMap:</strong> Red-Black tree implementation, sorted by keys</li>
            <li><strong>Hashtable:</strong> Synchronized version of HashMap (legacy)</li>
          </ul>
          
          <h4>Key Features:</h4>
          <ul>
            <li><strong>Type Safety:</strong> Generics ensure compile-time type checking</li>
            <li><strong>Performance:</strong> Optimized implementations for different use cases</li>
            <li><strong>Interoperability:</strong> Collections work well together</li>
            <li><strong>Algorithms:</strong> Utility methods in Collections class</li>
          </ul>
          
          <h4>When to Use Which Collection:</h4>
          <ul>
            <li><strong>ArrayList:</strong> When you need fast random access and don't modify frequently</li>
            <li><strong>LinkedList:</strong> When you frequently insert/delete in middle</li>
            <li><strong>HashSet:</strong> When you need fast lookups and no duplicates</li>
            <li><strong>TreeSet:</strong> When you need sorted unique elements</li>
            <li><strong>HashMap:</strong> When you need fast key-value lookups</li>
            <li><strong>TreeMap:</strong> When you need sorted key-value pairs</li>
          </ul>
        `,
        examples: [
          {
            title: 'ArrayList vs LinkedList Comparison',
            explanation: 'Comparing ArrayList and LinkedList performance and use cases with practical examples.',
            code: `import java.util.*;
import java.util.function.Consumer;

public class ListComparisonExample {
    public static void main(String[] args) {
        // Create and populate lists
        List<String> arrayList = new ArrayList<>();
        List<String> linkedList = new LinkedList<>();
        
        // Add sample data
        System.out.println("=== Adding Elements ===");
        addElements(arrayList, "ArrayList");
        addElements(linkedList, "LinkedList");
        
        // Random access performance
        System.out.println("\\n=== Random Access Performance ===");
        testRandomAccess(arrayList, "ArrayList");
        testRandomAccess(linkedList, "LinkedList");
        
        // Insertion performance
        System.out.println("\\n=== Insertion Performance ===");
        testInsertion(new ArrayList<>(arrayList), "ArrayList");
        testInsertion(new LinkedList<>(linkedList), "LinkedList");
        
        // Memory usage comparison
        System.out.println("\\n=== Memory and Features Comparison ===");
        compareFeatures();
        
        // Practical examples
        System.out.println("\\n=== Practical Usage Examples ===");
        practicalArrayListExample();
        practicalLinkedListExample();
    }
    
    private static void addElements(List<String> list, String type) {
        String[] data = {"Apple", "Banana", "Orange", "Grape", "Kiwi", "Mango", "Pineapple"};
        
        long startTime = System.nanoTime();
        Collections.addAll(list, data);
        long endTime = System.nanoTime();
        
        System.out.println(type + " - Added " + list.size() + " elements");
        System.out.println("  Time taken: " + (endTime - startTime) + " nanoseconds");
    }
    
    private static void testRandomAccess(List<String> list, String type) {
        long startTime = System.nanoTime();
        
        // Access random elements
        for (int i = 0; i < 1000; i++) {
            int randomIndex = (int) (Math.random() * list.size());
            String element = list.get(randomIndex);
        }
        
        long endTime = System.nanoTime();
        System.out.println(type + " - Random access time: " + (endTime - startTime) + " nanoseconds");
    }
    
    private static void testInsertion(List<String> list, String type) {
        long startTime = System.nanoTime();
        
        // Insert elements at beginning and middle
        for (int i = 0; i < 100; i++) {
            list.add(0, "New-" + i); // Insert at beginning
            if (list.size() > 10) {
                list.add(list.size() / 2, "Mid-" + i); // Insert at middle
            }
        }
        
        long endTime = System.nanoTime();
        System.out.println(type + " - Insertion time: " + (endTime - startTime) + " nanoseconds");
        System.out.println("  Final size: " + list.size());
    }
    
    private static void compareFeatures() {
        System.out.println("ArrayList characteristics:");
        System.out.println("  - Based on dynamic array");
        System.out.println("  - Fast random access O(1)");
        System.out.println("  - Slow insertion/deletion at beginning/middle O(n)");
        System.out.println("  - Less memory per element");
        System.out.println("  - Cache-friendly (contiguous memory)");
        
        System.out.println("\\nLinkedList characteristics:");
        System.out.println("  - Based on doubly linked list");
        System.out.println("  - Slow random access O(n)");
        System.out.println("  - Fast insertion/deletion anywhere O(1)");
        System.out.println("  - More memory per element (node overhead)");
        System.out.println("  - Implements both List and Deque interfaces");
    }
    
    private static void practicalArrayListExample() {
        System.out.println("\\nArrayList - Student Grade Management:");
        List<Integer> grades = new ArrayList<>(Arrays.asList(85, 92, 78, 96, 88, 91, 83));
        
        // Calculate statistics
        int sum = grades.stream().mapToInt(Integer::intValue).sum();
        double average = (double) sum / grades.size();
        int max = Collections.max(grades);
        int min = Collections.min(grades);
        
        System.out.println("  Grades: " + grades);
        System.out.println("  Average: " + String.format("%.2f", average));
        System.out.println("  Highest: " + max);
        System.out.println("  Lowest: " + min);
        
        // Sort grades
        Collections.sort(grades);
        System.out.println("  Sorted: " + grades);
        
        // Find grades above average
        List<Integer> aboveAverage = new ArrayList<>();
        for (Integer grade : grades) {
            if (grade > average) {
                aboveAverage.add(grade);
            }
        }
        System.out.println("  Above average: " + aboveAverage);
    }
    
    private static void practicalLinkedListExample() {
        System.out.println("\\nLinkedList - Music Playlist:");
        LinkedList<String> playlist = new LinkedList<>();
        
        // Add songs
        playlist.add("Song A");
        playlist.add("Song B");
        playlist.add("Song C");
        playlist.add("Song D");
        
        System.out.println("  Original playlist: " + playlist);
        
        // Add songs at specific positions
        playlist.addFirst("Intro Music");
        playlist.addLast("Outro Music");
        playlist.add(2, "Featured Song");
        
        System.out.println("  Modified playlist: " + playlist);
        
        // Simulate playlist navigation
        System.out.println("  Now playing: " + playlist.peekFirst());
        System.out.println("  Next song: " + playlist.get(1));
        System.out.println("  Last song: " + playlist.peekLast());
        
        // Remove and add songs (queue-like operations)
        String currentSong = playlist.removeFirst();
        System.out.println("  Finished playing: " + currentSong);
        playlist.addLast("New Song");
        System.out.println("  Updated playlist: " + playlist);
    }
}`
          },
          {
            title: 'HashSet, LinkedHashSet, and TreeSet Comparison',
            explanation: 'Understanding different Set implementations and their characteristics.',
            code: `import java.util.*;
import java.util.stream.Collectors;

public class SetComparisonExample {
    public static void main(String[] args) {
        // Create different set implementations
        Set<String> hashSet = new HashSet<>();
        Set<String> linkedHashSet = new LinkedHashSet<>();
        Set<String> treeSet = new TreeSet<>();
        
        // Sample data
        String[] fruits = {"Banana", "Apple", "Orange", "Apple", "Grape", "Banana", "Kiwi", "Mango"};
        
        System.out.println("=== Adding Elements to Sets ===");
        System.out.println("Original array: " + Arrays.toString(fruits));
        
        // Add elements to all sets
        Collections.addAll(hashSet, fruits);
        Collections.addAll(linkedHashSet, fruits);
        Collections.addAll(treeSet, fruits);
        
        // Display results
        System.out.println("\\nHashSet (no order guarantee): " + hashSet);
        System.out.println("LinkedHashSet (insertion order): " + linkedHashSet);
        System.out.println("TreeSet (sorted order): " + treeSet);
        
        // Performance comparison
        performanceTest();
        
        // Practical examples
        practicalExamples();
        
        // Set operations
        setOperations();
        
        // Custom object examples
        customObjectExample();
    }
    
    private static void performanceTest() {
        System.out.println("\\n=== Performance Test ===");
        int testSize = 10000;
        
        // Test HashSet
        Set<Integer> hashSet = new HashSet<>();
        long startTime = System.nanoTime();
        for (int i = 0; i < testSize; i++) {
            hashSet.add(i);
        }
        long hashSetTime = System.nanoTime() - startTime;
        
        // Test TreeSet
        Set<Integer> treeSet = new TreeSet<>();
        startTime = System.nanoTime();
        for (int i = 0; i < testSize; i++) {
            treeSet.add(i);
        }
        long treeSetTime = System.nanoTime() - startTime;
        
        // Test LinkedHashSet
        Set<Integer> linkedHashSet = new LinkedHashSet<>();
        startTime = System.nanoTime();
        for (int i = 0; i < testSize; i++) {
            linkedHashSet.add(i);
        }
        long linkedHashSetTime = System.nanoTime() - startTime;
        
        System.out.println("Insertion time for " + testSize + " elements:");
        System.out.println("  HashSet: " + hashSetTime + " nanoseconds");
        System.out.println("  LinkedHashSet: " + linkedHashSetTime + " nanoseconds");
        System.out.println("  TreeSet: " + treeSetTime + " nanoseconds");
        
        // Test lookup performance
        testLookupPerformance(hashSet, treeSet, linkedHashSet);
    }
    
    private static void testLookupPerformance(Set<Integer> hashSet, Set<Integer> treeSet, Set<Integer> linkedHashSet) {
        int lookups = 1000;
        Random random = new Random();
        
        // HashSet lookup
        long startTime = System.nanoTime();
        for (int i = 0; i < lookups; i++) {
            hashSet.contains(random.nextInt(10000));
        }
        long hashSetLookupTime = System.nanoTime() - startTime;
        
        // TreeSet lookup
        startTime = System.nanoTime();
        for (int i = 0; i < lookups; i++) {
            treeSet.contains(random.nextInt(10000));
        }
        long treeSetLookupTime = System.nanoTime() - startTime;
        
        // LinkedHashSet lookup
        startTime = System.nanoTime();
        for (int i = 0; i < lookups; i++) {
            linkedHashSet.contains(random.nextInt(10000));
        }
        long linkedHashSetLookupTime = System.nanoTime() - startTime;
        
        System.out.println("\\nLookup time for " + lookups + " operations:");
        System.out.println("  HashSet: " + hashSetLookupTime + " nanoseconds");
        System.out.println("  LinkedHashSet: " + linkedHashSetLookupTime + " nanoseconds");
        System.out.println("  TreeSet: " + treeSetLookupTime + " nanoseconds");
    }
    
    private static void practicalExamples() {
        System.out.println("\\n=== Practical Examples ===");
        
        // Email validation system
        System.out.println("Email Validation System (HashSet):");
        Set<String> registeredEmails = new HashSet<>();
        String[] emails = {"user1@email.com", "user2@email.com", "user1@email.com", "user3@email.com"};
        
        for (String email : emails) {
            if (registeredEmails.add(email)) {
                System.out.println("  Registered: " + email);
            } else {
                System.out.println("  Duplicate email rejected: " + email);
            }
        }
        System.out.println("  Total unique emails: " + registeredEmails.size());
        
        // Web browsing history (LinkedHashSet)
        System.out.println("\\nBrowsing History (LinkedHashSet):");
        Set<String> browsingHistory = new LinkedHashSet<>();
        String[] sites = {"google.com", "github.com", "stackoverflow.com", "google.com", "youtube.com", "github.com"};
        
        for (String site : sites) {
            browsingHistory.remove(site); // Remove if exists
            browsingHistory.add(site); // Add to end
        }
        System.out.println("  Recent sites (in order): " + browsingHistory);
        
        // Student ranking system (TreeSet)
        System.out.println("\\nStudent Ranking System (TreeSet):");
        TreeSet<Student> students = new TreeSet<>();
        students.add(new Student("Alice", 95));
        students.add(new Student("Bob", 87));
        students.add(new Student("Charlie", 92));
        students.add(new Student("Diana", 88));
        
        System.out.println("  Students by score (highest first):");
        students.descendingSet().forEach(s -> System.out.println("    " + s));
    }
    
    private static void setOperations() {
        System.out.println("\\n=== Set Operations ===");
        
        Set<String> set1 = new HashSet<>(Arrays.asList("A", "B", "C", "D"));
        Set<String> set2 = new HashSet<>(Arrays.asList("C", "D", "E", "F"));
        
        System.out.println("Set 1: " + set1);
        System.out.println("Set 2: " + set2);
        
        // Union
        Set<String> union = new HashSet<>(set1);
        union.addAll(set2);
        System.out.println("Union: " + union);
        
        // Intersection
        Set<String> intersection = new HashSet<>(set1);
        intersection.retainAll(set2);
        System.out.println("Intersection: " + intersection);
        
        // Difference
        Set<String> difference = new HashSet<>(set1);
        difference.removeAll(set2);
        System.out.println("Difference (Set1 - Set2): " + difference);
        
        // Symmetric difference
        Set<String> symmetricDiff = new HashSet<>(union);
        symmetricDiff.removeAll(intersection);
        System.out.println("Symmetric Difference: " + symmetricDiff);
    }
    
    private static void customObjectExample() {
        System.out.println("\\n=== Custom Object in Sets ===");
        
        // HashSet with custom objects
        Set<Person> people = new HashSet<>();
        people.add(new Person("John", 25));
        people.add(new Person("Jane", 30));
        people.add(new Person("John", 25)); // Duplicate based on equals/hashCode
        people.add(new Person("Bob", 35));
        
        System.out.println("People in HashSet:");
        people.forEach(p -> System.out.println("  " + p));
        System.out.println("Size: " + people.size()); // Should be 3
    }
}

// Student class for TreeSet example
class Student implements Comparable<Student> {
    private String name;
    private int score;
    
    public Student(String name, int score) {
        this.name = name;
        this.score = score;
    }
    
    @Override
    public int compareTo(Student other) {
        return Integer.compare(this.score, other.score); // Sort by score
    }
    
    @Override
    public String toString() {
        return name + " (" + score + ")";
    }
}

// Person class for HashSet example
class Person {
    private String name;
    private int age;
    
    public Person(String name, int age) {
        this.name = name;
        this.age = age;
    }
    
    @Override
    public boolean equals(Object obj) {
        if (this == obj) return true;
        if (obj == null || getClass() != obj.getClass()) return false;
        Person person = (Person) obj;
        return age == person.age && Objects.equals(name, person.name);
    }
    
    @Override
    public int hashCode() {
        return Objects.hash(name, age);
    }
    
    @Override
    public String toString() {
        return name + " (" + age + ")";
    }
}`
          },
          {
            title: 'HashMap, LinkedHashMap, and TreeMap Complete Guide',
            explanation: 'Comprehensive comparison of Map implementations with real-world examples.',
            code: `import java.util.*;
import java.util.stream.Collectors;

public class MapComparisonExample {
    public static void main(String[] args) {
        // Basic map operations
        basicMapOperations();
        
        // Performance comparison
        performanceComparison();
        
        // Practical applications
        practicalApplications();
        
        // Advanced map operations
        advancedOperations();
    }
    
    private static void basicMapOperations() {
        System.out.println("=== Basic Map Operations ===");
        
        // Create different map implementations
        Map<String, Integer> hashMap = new HashMap<>();
        Map<String, Integer> linkedHashMap = new LinkedHashMap<>();
        Map<String, Integer> treeMap = new TreeMap<>();
        
        // Add data
        String[] keys = {"Zebra", "Apple", "Dog", "Cat", "Bird"};
        int[] values = {26, 1, 4, 3, 2};
        
        for (int i = 0; i < keys.length; i++) {
            hashMap.put(keys[i], values[i]);
            linkedHashMap.put(keys[i], values[i]);
            treeMap.put(keys[i], values[i]);
        }
        
        System.out.println("HashMap (no order): " + hashMap);
        System.out.println("LinkedHashMap (insertion order): " + linkedHashMap);
        System.out.println("TreeMap (sorted by key): " + treeMap);
        
        // Common operations
        System.out.println("\\nCommon Operations:");
        System.out.println("Get 'Cat': " + hashMap.get("Cat"));
        System.out.println("Contains 'Dog': " + hashMap.containsKey("Dog"));
        System.out.println("Contains value 5: " + hashMap.containsValue(5));
        System.out.println("Size: " + hashMap.size());
        
        // Iteration
        System.out.println("\\nIteration examples:");
        System.out.println("Keys: " + hashMap.keySet());
        System.out.println("Values: " + hashMap.values());
        System.out.println("Entries:");
        for (Map.Entry<String, Integer> entry : hashMap.entrySet()) {
            System.out.println("  " + entry.getKey() + " -> " + entry.getValue());
        }
    }
    
    private static void performanceComparison() {
        System.out.println("\\n=== Performance Comparison ===");
        int testSize = 10000;
        
        // Test insertion performance
        Map<Integer, String> hashMap = new HashMap<>();
        Map<Integer, String> linkedHashMap = new LinkedHashMap<>();
        Map<Integer, String> treeMap = new TreeMap<>();
        
        // HashMap insertion
        long startTime = System.nanoTime();
        for (int i = 0; i < testSize; i++) {
            hashMap.put(i, "Value" + i);
        }
        long hashMapTime = System.nanoTime() - startTime;
        
        // LinkedHashMap insertion
        startTime = System.nanoTime();
        for (int i = 0; i < testSize; i++) {
            linkedHashMap.put(i, "Value" + i);
        }
        long linkedHashMapTime = System.nanoTime() - startTime;
        
        // TreeMap insertion
        startTime = System.nanoTime();
        for (int i = 0; i < testSize; i++) {
            treeMap.put(i, "Value" + i);
        }
        long treeMapTime = System.nanoTime() - startTime;
        
        System.out.println("Insertion time for " + testSize + " elements:");
        System.out.println("  HashMap: " + hashMapTime + " nanoseconds");
        System.out.println("  LinkedHashMap: " + linkedHashMapTime + " nanoseconds");
        System.out.println("  TreeMap: " + treeMapTime + " nanoseconds");
        
        // Test lookup performance
        Random random = new Random();
        int lookups = 1000;
        
        startTime = System.nanoTime();
        for (int i = 0; i < lookups; i++) {
            hashMap.get(random.nextInt(testSize));
        }
        long hashMapLookup = System.nanoTime() - startTime;
        
        startTime = System.nanoTime();
        for (int i = 0; i < lookups; i++) {
            treeMap.get(random.nextInt(testSize));
        }
        long treeMapLookup = System.nanoTime() - startTime;
        
        System.out.println("\\nLookup time for " + lookups + " operations:");
        System.out.println("  HashMap: " + hashMapLookup + " nanoseconds");
        System.out.println("  TreeMap: " + treeMapLookup + " nanoseconds");
    }
    
    private static void practicalApplications() {
        System.out.println("\\n=== Practical Applications ===");
        
        // 1. Word frequency counter (HashMap)
        wordFrequencyExample();
        
        // 2. LRU Cache simulation (LinkedHashMap)
        lruCacheExample();
        
        // 3. Student grade book (TreeMap)
        gradeBookExample();
        
        // 4. Configuration manager
        configurationExample();
    }
    
    private static void wordFrequencyExample() {
        System.out.println("\\n1. Word Frequency Counter (HashMap):");
        String text = "the quick brown fox jumps over the lazy dog the fox is quick";
        String[] words = text.toLowerCase().split("\\\\s+");
        
        Map<String, Integer> wordCount = new HashMap<>();
        for (String word : words) {
            wordCount.put(word, wordCount.getOrDefault(word, 0) + 1);
        }
        
        System.out.println("  Word frequencies:");
        wordCount.entrySet().stream()
            .sorted(Map.Entry.<String, Integer>comparingByValue().reversed())
            .forEach(entry -> System.out.println("    " + entry.getKey() + ": " + entry.getValue()));
    }
    
    private static void lruCacheExample() {
        System.out.println("\\n2. LRU Cache Simulation (LinkedHashMap):");
        
        // Custom LRU Cache implementation
        class LRUCache<K, V> extends LinkedHashMap<K, V> {
            private final int maxSize;
            
            public LRUCache(int maxSize) {
                super(16, 0.75f, true); // true for access-order
                this.maxSize = maxSize;
            }
            
            @Override
            protected boolean removeEldestEntry(Map.Entry<K, V> eldest) {
                return size() > maxSize;
            }
        }
        
        LRUCache<String, String> cache = new LRUCache<>(3);
        
        // Add items
        cache.put("page1", "Content 1");
        cache.put("page2", "Content 2");
        cache.put("page3", "Content 3");
        System.out.println("  Cache after adding 3 pages: " + cache.keySet());
        
        // Access page1 (moves to end)
        cache.get("page1");
        System.out.println("  After accessing page1: " + cache.keySet());
        
        // Add new page (should remove page2)
        cache.put("page4", "Content 4");
        System.out.println("  After adding page4: " + cache.keySet());
    }
    
    private static void gradeBookExample() {
        System.out.println("\\n3. Student Grade Book (TreeMap):");
        
        TreeMap<String, Double> grades = new TreeMap<>();
        grades.put("Smith", 87.5);
        grades.put("Johnson", 92.0);
        grades.put("Williams", 78.5);
        grades.put("Brown", 95.5);
        grades.put("Davis", 83.0);
        
        System.out.println("  All students (alphabetically):");
        grades.forEach((name, grade) -> 
            System.out.println("    " + name + ": " + grade));
        
        System.out.println("\\n  Students with grades >= 85:");
        grades.entrySet().stream()
            .filter(entry -> entry.getValue() >= 85)
            .forEach(entry -> 
                System.out.println("    " + entry.getKey() + ": " + entry.getValue()));
        
        System.out.println("\\n  Grade range from Johnson to Williams:");
        TreeMap<String, Double> subMap = new TreeMap<>(grades.subMap("Johnson", true, "Williams", true));
        subMap.forEach((name, grade) -> 
            System.out.println("    " + name + ": " + grade));
    }
    
    private static void configurationExample() {
        System.out.println("\\n4. Configuration Manager:");
        
        Map<String, String> config = new HashMap<>();
        config.put("database.url", "jdbc:mysql://localhost:3306/mydb");
        config.put("database.username", "admin");
        config.put("database.password", "secret");
        config.put("server.port", "8080");
        config.put("logging.level", "INFO");
        
        // Group configurations by prefix
        Map<String, Map<String, String>> groupedConfig = config.entrySet().stream()
            .collect(Collectors.groupingBy(
                entry -> entry.getKey().split("\\\\.")[0],
                Collectors.toMap(
                    entry -> entry.getKey().substring(entry.getKey().indexOf('.') + 1),
                    Map.Entry::getValue
                )
            ));
        
        System.out.println("  Grouped configuration:");
        groupedConfig.forEach((group, settings) -> {
            System.out.println("    " + group + ":");
            settings.forEach((key, value) -> 
                System.out.println("      " + key + " = " + value));
        });
    }
    
    private static void advancedOperations() {
        System.out.println("\\n=== Advanced Map Operations ===");
        
        Map<String, List<String>> studentCourses = new HashMap<>();
        
        // Using computeIfAbsent for complex operations
        studentCourses.computeIfAbsent("John", k -> new ArrayList<>()).add("Math");
        studentCourses.computeIfAbsent("John", k -> new ArrayList<>()).add("Physics");
        studentCourses.computeIfAbsent("Jane", k -> new ArrayList<>()).add("Chemistry");
        studentCourses.computeIfAbsent("Jane", k -> new ArrayList<>()).add("Biology");
        
        System.out.println("Student courses:");
        studentCourses.forEach((student, courses) -> 
            System.out.println("  " + student + ": " + courses));
        
        // Merge operation
        Map<String, Integer> scores1 = new HashMap<>();
        scores1.put("Alice", 85);
        scores1.put("Bob", 90);
        
        Map<String, Integer> scores2 = new HashMap<>();
        scores2.put("Bob", 95);
        scores2.put("Charlie", 88);
        
        // Merge maps (taking maximum score)
        scores2.forEach((key, value) -> 
            scores1.merge(key, value, Integer::max));
        
        System.out.println("\\nMerged scores (max values): " + scores1);
        
        // Replace operations
        Map<String, String> statusMap = new HashMap<>();
        statusMap.put("server1", "running");
        statusMap.put("server2", "stopped");
        statusMap.put("server3", "running");
        
        // Replace specific value
        statusMap.replaceAll((key, value) -> 
            value.equals("stopped") ? "restarting" : value);
        
        System.out.println("\\nServer status after replacement: " + statusMap);
    }
}`
          }
        ],
        keyPoints: [
          'Choose ArrayList for frequent random access, LinkedList for frequent insertions/deletions',
          'HashSet provides O(1) operations, TreeSet provides O(log n) with sorting',
          'HashMap is fastest for lookups, TreeMap maintains sorted order',
          'LinkedHashMap/LinkedHashSet maintain insertion or access order',
          'Always override equals() and hashCode() for custom objects in hash-based collections',
          'Use appropriate initial capacity to avoid frequent resizing'
        ]
      }
    ]
  },
  {
    id: 'unit3',
    title: 'Unit III: Event and GUI Programming',
    description: 'Learn GUI development with Swing and JavaFX, including event handling and user interface design.',
    duration: '15 Hours',
    topics: [
      {
        id: 'gui-basics',
        title: 'GUI Programming Fundamentals',
        description: 'Introduction to GUI programming concepts and Java Swing framework',
        content: `
          <h3>GUI Programming Fundamentals</h3>
          <p>Graphical User Interface (GUI) programming involves creating interactive applications with visual components that users can interact with using mouse and keyboard. Java provides powerful frameworks for GUI development including Swing and JavaFX.</p>
          
          <h4>Key GUI Concepts:</h4>
          <ul>
            <li><strong>Components:</strong> Visual elements like buttons, text fields, labels</li>
            <li><strong>Containers:</strong> Objects that hold and organize components</li>
            <li><strong>Layout Managers:</strong> Control how components are arranged</li>
            <li><strong>Events:</strong> User actions like clicks, key presses</li>
            <li><strong>Event Listeners:</strong> Code that responds to events</li>
          </ul>
          
          <h4>Java Swing Framework:</h4>
          <p>Swing is Java's primary GUI toolkit that provides a rich set of components for creating desktop applications. It's built on top of AWT (Abstract Window Toolkit) but provides more sophisticated components.</p>
          
          <h4>Swing Component Hierarchy:</h4>
          <ul>
            <li><strong>JComponent:</strong> Base class for all Swing components</li>
            <li><strong>JFrame:</strong> Top-level window container</li>
            <li><strong>JPanel:</strong> General-purpose container</li>
            <li><strong>JButton, JLabel, JTextField:</strong> Basic interactive components</li>
            <li><strong>JList, JTable, JTree:</strong> Complex data display components</li>
          </ul>
          
          <h4>Layout Managers:</h4>
          <ul>
            <li><strong>FlowLayout:</strong> Arranges components in a flow, left to right</li>
            <li><strong>BorderLayout:</strong> Divides container into five regions</li>
            <li><strong>GridLayout:</strong> Arranges components in a rectangular grid</li>
            <li><strong>BoxLayout:</strong> Arranges components along a single axis</li>
            <li><strong>GridBagLayout:</strong> Most flexible but complex layout</li>
          </ul>
          
          <h4>Event Handling Model:</h4>
          <p>Java uses a delegation event model where:</p>
          <ol>
            <li>Event sources generate events</li>
            <li>Event listeners receive and handle events</li>
            <li>Events are objects containing information about what happened</li>
          </ol>
          
          <h4>Common Event Types:</h4>
          <ul>
            <li><strong>ActionEvent:</strong> Button clicks, menu selections</li>
            <li><strong>MouseEvent:</strong> Mouse clicks, movements</li>
            <li><strong>KeyEvent:</strong> Key presses and releases</li>
            <li><strong>WindowEvent:</strong> Window opening, closing</li>
            <li><strong>FocusEvent:</strong> Component gaining/losing focus</li>
          </ul>
        `,
        examples: [
          {
            title: 'Basic Swing Application with Components',
            explanation: 'Creating a simple Swing application with various components and basic layout.',
            code: `import javax.swing.*;
import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

public class BasicSwingApplication extends JFrame implements ActionListener {
    // Component declarations
    private JTextField nameField, emailField;
    private JButton submitButton, clearButton, exitButton;
    private JLabel nameLabel, emailLabel, statusLabel;
    private JTextArea outputArea;
    private JCheckBox subscribeCheckBox;
    private JRadioButton maleRadio, femaleRadio;
    private ButtonGroup genderGroup;
    private JComboBox<String> countryCombo;
    
    public BasicSwingApplication() {
        initializeComponents();
        setupLayout();
        addEventHandlers();
        configureFrame();
    }
    
    private void initializeComponents() {
        // Create labels
        nameLabel = new JLabel("Name:");
        emailLabel = new JLabel("Email:");
        statusLabel = new JLabel("Ready");
        
        // Create text components
        nameField = new JTextField(20);
        emailField = new JTextField(20);
        outputArea = new JTextArea(8, 30);
        outputArea.setEditable(false);
        outputArea.setBackground(Color.LIGHT_GRAY);
        
        // Create buttons
        submitButton = new JButton("Submit");
        clearButton = new JButton("Clear");
        exitButton = new JButton("Exit");
        
        // Create checkbox
        subscribeCheckBox = new JCheckBox("Subscribe to newsletter");
        
        // Create radio buttons
        maleRadio = new JRadioButton("Male");
        femaleRadio = new JRadioButton("Female");
        genderGroup = new ButtonGroup();
        genderGroup.add(maleRadio);
        genderGroup.add(femaleRadio);
        maleRadio.setSelected(true); // Default selection
        
        // Create combo box
        String[] countries = {"USA", "Canada", "UK", "Australia", "India", "Germany", "Japan"};
        countryCombo = new JComboBox<>(countries);
    }
    
    private void setupLayout() {
        setLayout(new BorderLayout());
        
        // Create main panel with form components
        JPanel formPanel = new JPanel(new GridBagLayout());
        GridBagConstraints gbc = new GridBagConstraints();
        gbc.insets = new Insets(5, 5, 5, 5);
        gbc.anchor = GridBagConstraints.WEST;
        
        // Row 0: Name
        gbc.gridx = 0; gbc.gridy = 0;
        formPanel.add(nameLabel, gbc);
        gbc.gridx = 1;
        formPanel.add(nameField, gbc);
        
        // Row 1: Email
        gbc.gridx = 0; gbc.gridy = 1;
        formPanel.add(emailLabel, gbc);
        gbc.gridx = 1;
        formPanel.add(emailField, gbc);
        
        // Row 2: Gender
        gbc.gridx = 0; gbc.gridy = 2;
        formPanel.add(new JLabel("Gender:"), gbc);
        gbc.gridx = 1;
        JPanel genderPanel = new JPanel(new FlowLayout(FlowLayout.LEFT));
        genderPanel.add(maleRadio);
        genderPanel.add(femaleRadio);
        formPanel.add(genderPanel, gbc);
        
        // Row 3: Country
        gbc.gridx = 0; gbc.gridy = 3;
        formPanel.add(new JLabel("Country:"), gbc);
        gbc.gridx = 1;
        formPanel.add(countryCombo, gbc);
        
        // Row 4: Subscribe checkbox
        gbc.gridx = 0; gbc.gridy = 4;
        gbc.gridwidth = 2;
        formPanel.add(subscribeCheckBox, gbc);
        
        // Create button panel
        JPanel buttonPanel = new JPanel(new FlowLayout());
        buttonPanel.add(submitButton);
        buttonPanel.add(clearButton);
        buttonPanel.add(exitButton);
        
        // Create output panel
        JPanel outputPanel = new JPanel(new BorderLayout());
        outputPanel.setBorder(BorderFactory.createTitledBorder("Output"));
        outputPanel.add(new JScrollPane(outputArea), BorderLayout.CENTER);
        
        // Add panels to frame
        add(formPanel, BorderLayout.NORTH);
        add(buttonPanel, BorderLayout.CENTER);
        add(outputPanel, BorderLayout.SOUTH);
        add(statusLabel, BorderLayout.PAGE_END);
    }
    
    private void addEventHandlers() {
        submitButton.addActionListener(this);
        clearButton.addActionListener(this);
        exitButton.addActionListener(this);
        
        // Add item listener to combo box
        countryCombo.addItemListener(e -> {
            statusLabel.setText("Country changed to: " + countryCombo.getSelectedItem());
        });
        
        // Add action listener to checkbox
        subscribeCheckBox.addActionListener(e -> {
            statusLabel.setText("Subscription: " + (subscribeCheckBox.isSelected() ? "Yes" : "No"));
        });
    }
    
    private void configureFrame() {
        setTitle("Basic Swing Application");
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        setSize(500, 600);
        setLocationRelativeTo(null); // Center the frame
        setResizable(true);
        
        // Set application icon (optional)
        // setIconImage(new ImageIcon("icon.png").getImage());
    }
    
    @Override
    public void actionPerformed(ActionEvent e) {
        if (e.getSource() == submitButton) {
            handleSubmit();
        } else if (e.getSource() == clearButton) {
            handleClear();
        } else if (e.getSource() == exitButton) {
            handleExit();
        }
    }
    
    private void handleSubmit() {
        String name = nameField.getText().trim();
        String email = emailField.getText().trim();
        
        if (name.isEmpty() || email.isEmpty()) {
            JOptionPane.showMessageDialog(this, 
                "Please fill in all required fields!", 
                "Validation Error", 
                JOptionPane.ERROR_MESSAGE);
            return;
        }
        
        // Collect form data
        StringBuilder output = new StringBuilder();
        output.append("Form Submitted:\\n");
        output.append("===============\\n");
        output.append("Name: ").append(name).append("\\n");
        output.append("Email: ").append(email).append("\\n");
        output.append("Gender: ").append(maleRadio.isSelected() ? "Male" : "Female").append("\\n");
        output.append("Country: ").append(countryCombo.getSelectedItem()).append("\\n");
        output.append("Newsletter: ").append(subscribeCheckBox.isSelected() ? "Yes" : "No").append("\\n");
        output.append("Timestamp: ").append(new java.util.Date()).append("\\n\\n");
        
        outputArea.append(output.toString());
        statusLabel.setText("Form submitted successfully!");
        
        // Auto-scroll to bottom
        outputArea.setCaretPosition(outputArea.getDocument().getLength());
    }
    
    private void handleClear() {
        int choice = JOptionPane.showConfirmDialog(this,
            "Are you sure you want to clear all fields?",
            "Confirm Clear",
            JOptionPane.YES_NO_OPTION);
            
        if (choice == JOptionPane.YES_OPTION) {
            nameField.setText("");
            emailField.setText("");
            maleRadio.setSelected(true);
            countryCombo.setSelectedIndex(0);
            subscribeCheckBox.setSelected(false);
            outputArea.setText("");
            statusLabel.setText("Form cleared");
            nameField.requestFocus();
        }
    }
    
    private void handleExit() {
        int choice = JOptionPane.showConfirmDialog(this,
            "Are you sure you want to exit?",
            "Confirm Exit",
            JOptionPane.YES_NO_OPTION);
            
        if (choice == JOptionPane.YES_OPTION) {
            System.exit(0);
        }
    }
    
    public static void main(String[] args) {
        // Set look and feel
        try {
            UIManager.setLookAndFeel(UIManager.getSystemLookAndFeel());
        } catch (Exception e) {
            e.printStackTrace();
        }
        
        // Create and show GUI on EDT
        SwingUtilities.invokeLater(() -> {
            new BasicSwingApplication().setVisible(true);
        });
    }
}`
          },
          {
            title: 'Layout Managers Demonstration',
            explanation: 'Comprehensive example showing different layout managers and their characteristics.',
            code: `import javax.swing.*;
import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

public class LayoutManagerDemo extends JFrame {
    private JPanel contentPanel;
    private CardLayout cardLayout;
    
    public LayoutManagerDemo() {
        initializeFrame();
        createMenuBar();
        setupCardLayout();
        createLayoutDemos();
    }
    
    private void initializeFrame() {
        setTitle("Layout Manager Demonstration");
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        setSize(800, 600);
        setLocationRelativeTo(null);
    }
    
    private void createMenuBar() {
        JMenuBar menuBar = new JMenuBar();
        JMenu layoutMenu = new JMenu("Layout Managers");
        
        String[] layouts = {"FlowLayout", "BorderLayout", "GridLayout", 
                           "BoxLayout", "GridBagLayout", "CardLayout"};
        
        for (String layout : layouts) {
            JMenuItem menuItem = new JMenuItem(layout);
            menuItem.addActionListener(e -> showLayout(layout));
            layoutMenu.add(menuItem);
        }
        
        menuBar.add(layoutMenu);
        setJMenuBar(menuBar);
    }
    
    private void setupCardLayout() {
        cardLayout = new CardLayout();
        contentPanel = new JPanel(cardLayout);
        add(contentPanel, BorderLayout.CENTER);
        
        // Add instruction panel
        JPanel instructionPanel = new JPanel(new BorderLayout());
        JLabel instructionLabel = new JLabel(
            "<html><center><h2>Layout Manager Demo</h2>" +
            "<p>Use the menu above to see different layout managers in action.</p>" +
            "<p>Each layout manager has different characteristics for organizing components.</p></center></html>",
            JLabel.CENTER);
        instructionPanel.add(instructionLabel);
        contentPanel.add(instructionPanel, "Instructions");
    }
    
    private void createLayoutDemos() {
        // FlowLayout Demo
        contentPanel.add(createFlowLayoutDemo(), "FlowLayout");
        
        // BorderLayout Demo
        contentPanel.add(createBorderLayoutDemo(), "BorderLayout");
        
        // GridLayout Demo
        contentPanel.add(createGridLayoutDemo(), "GridLayout");
        
        // BoxLayout Demo
        contentPanel.add(createBoxLayoutDemo(), "BoxLayout");
        
        // GridBagLayout Demo
        contentPanel.add(createGridBagLayoutDemo(), "GridBagLayout");
        
        // CardLayout Demo
        contentPanel.add(createCardLayoutDemo(), "CardLayout");
    }
    
    private JPanel createFlowLayoutDemo() {
        JPanel panel = new JPanel(new BorderLayout());
        
        // Description
        JTextArea description = new JTextArea(
            "FlowLayout arranges components in a left-to-right flow, wrapping to the next line when needed.\\n" +
            "It's the default layout for JPanel. Components maintain their preferred size.");
        description.setEditable(false);
        description.setRows(3);
        panel.add(new JScrollPane(description), BorderLayout.NORTH);
        
        // Demo area with FlowLayout
        JPanel flowPanel = new JPanel(new FlowLayout(FlowLayout.CENTER, 10, 10));
        flowPanel.setBorder(BorderFactory.createTitledBorder("FlowLayout Demo"));
        
        // Add various components
        for (int i = 1; i <= 8; i++) {
            JButton button = new JButton("Button " + i);
            if (i % 3 == 0) button.setPreferredSize(new Dimension(120, 40));
            flowPanel.add(button);
        }
        
        flowPanel.add(new JTextField("Text Field", 10));
        flowPanel.add(new JCheckBox("Checkbox"));
        flowPanel.add(new JLabel("Label"));
        
        panel.add(flowPanel, BorderLayout.CENTER);
        
        // Control panel
        JPanel controlPanel = new JPanel(new FlowLayout());
        JButton addButton = new JButton("Add Component");
        addButton.addActionListener(e -> {
            flowPanel.add(new JButton("New Button"));
            flowPanel.revalidate();
            flowPanel.repaint();
        });
        controlPanel.add(addButton);
        panel.add(controlPanel, BorderLayout.SOUTH);
        
        return panel;
    }
    
    private JPanel createBorderLayoutDemo() {
        JPanel panel = new JPanel(new BorderLayout());
        
        // Description
        JTextArea description = new JTextArea(
            "BorderLayout divides the container into five regions: NORTH, SOUTH, EAST, WEST, and CENTER.\\n" +
            "The center region takes up the remaining space after other regions are placed.");
        description.setEditable(false);
        description.setRows(3);
        panel.add(new JScrollPane(description), BorderLayout.NORTH);
        
        // Demo area with BorderLayout
        JPanel borderPanel = new JPanel(new BorderLayout(5, 5));
        borderPanel.setBorder(BorderFactory.createTitledBorder("BorderLayout Demo"));
        
        borderPanel.add(new JButton("NORTH"), BorderLayout.NORTH);
        borderPanel.add(new JButton("SOUTH"), BorderLayout.SOUTH);
        borderPanel.add(new JButton("EAST"), BorderLayout.EAST);
        borderPanel.add(new JButton("WEST"), BorderLayout.WEST);
        
        JTextArea centerArea = new JTextArea("CENTER\\n\\nThis area expands to fill\\nthe remaining space.");
        centerArea.setEditable(false);
        centerArea.setBackground(Color.LIGHT_GRAY);
        borderPanel.add(new JScrollPane(centerArea), BorderLayout.CENTER);
        
        panel.add(borderPanel, BorderLayout.CENTER);
        return panel;
    }
    
    private JPanel createGridLayoutDemo() {
        JPanel panel = new JPanel(new BorderLayout());
        
        // Description
        JTextArea description = new JTextArea(
            "GridLayout arranges components in a rectangular grid. All components are the same size.\\n" +
            "You specify the number of rows and columns.");
        description.setEditable(false);
        description.setRows(2);
        panel.add(new JScrollPane(description), BorderLayout.NORTH);
        
        // Demo area with GridLayout
        JPanel gridPanel = new JPanel(new GridLayout(3, 4, 5, 5));
        gridPanel.setBorder(BorderFactory.createTitledBorder("GridLayout Demo (3x4)"));
        
        // Create calculator-like buttons
        String[] buttons = {
            "1", "2", "3", "+",
            "4", "5", "6", "-",
            "7", "8", "9", "*"
        };
        
        for (String text : buttons) {
            JButton button = new JButton(text);
            if ("+-*/".contains(text)) {
                button.setBackground(Color.ORANGE);
                button.setOpaque(true);
            }
            gridPanel.add(button);
        }
        
        panel.add(gridPanel, BorderLayout.CENTER);
        
        // Control panel to change grid size
        JPanel controlPanel = new JPanel(new FlowLayout());
        JLabel rowLabel = new JLabel("Rows:");
        JSpinner rowSpinner = new JSpinner(new SpinnerNumberModel(3, 1, 10, 1));
        JLabel colLabel = new JLabel("Columns:");
        JSpinner colSpinner = new JSpinner(new SpinnerNumberModel(4, 1, 10, 1));
        JButton updateButton = new JButton("Update Grid");
        
        updateButton.addActionListener(e -> {
            int rows = (Integer) rowSpinner.getValue();
            int cols = (Integer) colSpinner.getValue();
            
            gridPanel.removeAll();
            gridPanel.setLayout(new GridLayout(rows, cols, 5, 5));
            
            for (int i = 1; i <= rows * cols; i++) {
                gridPanel.add(new JButton("" + i));
            }
            
            gridPanel.revalidate();
            gridPanel.repaint();
        });
        
        controlPanel.add(rowLabel);
        controlPanel.add(rowSpinner);
        controlPanel.add(colLabel);
        controlPanel.add(colSpinner);
        controlPanel.add(updateButton);
        
        panel.add(controlPanel, BorderLayout.SOUTH);
        return panel;
    }
    
    private JPanel createBoxLayoutDemo() {
        JPanel panel = new JPanel(new BorderLayout());
        
        // Description
        JTextArea description = new JTextArea(
            "BoxLayout arranges components along a single axis (X_AXIS or Y_AXIS).\\n" +
            "Components can have different sizes and alignment.");
        description.setEditable(false);
        description.setRows(2);
        panel.add(new JScrollPane(description), BorderLayout.NORTH);
        
        // Demo area
        JPanel demoPanel = new JPanel(new GridLayout(1, 2, 10, 0));
        
        // Vertical BoxLayout
        JPanel verticalBox = new JPanel();
        verticalBox.setLayout(new BoxLayout(verticalBox, BoxLayout.Y_AXIS));
        verticalBox.setBorder(BorderFactory.createTitledBorder("Y_AXIS"));
        
        verticalBox.add(new JButton("Button 1"));
        verticalBox.add(Box.createVerticalStrut(10)); // Spacer
        verticalBox.add(new JTextField("Text Field"));
        verticalBox.add(Box.createVerticalGlue()); // Flexible spacer
        verticalBox.add(new JCheckBox("Checkbox"));
        verticalBox.add(Box.createRigidArea(new Dimension(0, 20))); // Fixed spacer
        verticalBox.add(new JButton("Bottom Button"));
        
        // Horizontal BoxLayout
        JPanel horizontalBox = new JPanel();
        horizontalBox.setLayout(new BoxLayout(horizontalBox, BoxLayout.X_AXIS));
        horizontalBox.setBorder(BorderFactory.createTitledBorder("X_AXIS"));
        
        horizontalBox.add(new JButton("Left"));
        horizontalBox.add(Box.createHorizontalStrut(10));
        horizontalBox.add(new JTextField("Center", 8));
        horizontalBox.add(Box.createHorizontalGlue());
        horizontalBox.add(new JButton("Right"));
        
        // Vertical container for horizontal demo
        JPanel verticalContainer = new JPanel();
        verticalContainer.setLayout(new BoxLayout(verticalContainer, BoxLayout.Y_AXIS));
        verticalContainer.add(horizontalBox);
        verticalContainer.add(Box.createVerticalStrut(20));
        verticalContainer.add(new JTextArea("BoxLayout provides fine control\\nover component spacing and alignment.", 4, 20));
        
        demoPanel.add(verticalBox);
        demoPanel.add(verticalContainer);
        
        panel.add(demoPanel, BorderLayout.CENTER);
        return panel;
    }
    
    private JPanel createGridBagLayoutDemo() {
        JPanel panel = new JPanel(new BorderLayout());
        
        // Description
        JTextArea description = new JTextArea(
            "GridBagLayout is the most flexible layout manager. It allows precise control over\\n" +
            "component size, position, and how they behave when the container is resized.");
        description.setEditable(false);
        description.setRows(2);
        panel.add(new JScrollPane(description), BorderLayout.NORTH);
        
        // Demo area with GridBagLayout
        JPanel gridBagPanel = new JPanel(new GridBagLayout());
        gridBagPanel.setBorder(BorderFactory.createTitledBorder("GridBagLayout Demo - Contact Form"));
        GridBagConstraints gbc = new GridBagConstraints();
        
        // Name field
        gbc.gridx = 0; gbc.gridy = 0;
        gbc.anchor = GridBagConstraints.EAST;
        gbc.insets = new Insets(5, 5, 5, 5);
        gridBagPanel.add(new JLabel("Name:"), gbc);
        
        gbc.gridx = 1; gbc.fill = GridBagConstraints.HORIZONTAL;
        gbc.weightx = 1.0;
        gridBagPanel.add(new JTextField(15), gbc);
        
        // Email field
        gbc.gridx = 0; gbc.gridy = 1;
        gbc.fill = GridBagConstraints.NONE;
        gbc.weightx = 0;
        gridBagPanel.add(new JLabel("Email:"), gbc);
        
        gbc.gridx = 1; gbc.fill = GridBagConstraints.HORIZONTAL;
        gbc.weightx = 1.0;
        gridBagPanel.add(new JTextField(15), gbc);
        
        // Phone field
        gbc.gridx = 0; gbc.gridy = 2;
        gbc.fill = GridBagConstraints.NONE;
        gbc.weightx = 0;
        gridBagPanel.add(new JLabel("Phone:"), gbc);
        
        gbc.gridx = 1; gbc.fill = GridBagConstraints.HORIZONTAL;
        gbc.weightx = 1.0;
        gridBagPanel.add(new JTextField(15), gbc);
        
        // Message area
        gbc.gridx = 0; gbc.gridy = 3;
        gbc.fill = GridBagConstraints.NONE;
        gbc.weightx = 0;
        gbc.anchor = GridBagConstraints.NORTHEAST;
        gridBagPanel.add(new JLabel("Message:"), gbc);
        
        gbc.gridx = 1; gbc.fill = GridBagConstraints.BOTH;
        gbc.weightx = 1.0; gbc.weighty = 1.0;
        JTextArea messageArea = new JTextArea(5, 20);
        gridBagPanel.add(new JScrollPane(messageArea), gbc);
        
        // Button panel
        gbc.gridx = 0; gbc.gridy = 4;
        gbc.gridwidth = 2;
        gbc.fill = GridBagConstraints.NONE;
        gbc.weightx = 0; gbc.weighty = 0;
        gbc.anchor = GridBagConstraints.CENTER;
        
        JPanel buttonPanel = new JPanel(new FlowLayout());
        buttonPanel.add(new JButton("Submit"));
        buttonPanel.add(new JButton("Clear"));
        buttonPanel.add(new JButton("Cancel"));
        gridBagPanel.add(buttonPanel, gbc);
        
        panel.add(gridBagPanel, BorderLayout.CENTER);
        return panel;
    }
    
    private JPanel createCardLayoutDemo() {
        JPanel panel = new JPanel(new BorderLayout());
        
        // Description
        JTextArea description = new JTextArea(
            "CardLayout manages multiple panels, showing only one at a time.\\n" +
            "It's useful for creating wizards, tabbed interfaces, or multi-step forms.");
        description.setEditable(false);
        description.setRows(2);
        panel.add(new JScrollPane(description), BorderLayout.NORTH);
        
        // Card layout demo
        CardLayout demoCardLayout = new CardLayout();
        JPanel cardPanel = new JPanel(demoCardLayout);
        cardPanel.setBorder(BorderFactory.createTitledBorder("CardLayout Demo"));
        
        // Create cards
        for (int i = 1; i <= 4; i++) {
            JPanel card = new JPanel(new BorderLayout());
            card.setBackground(new Color(200 + i * 10, 150 + i * 20, 100 + i * 30));
            
            JLabel titleLabel = new JLabel("Card " + i, JLabel.CENTER);
            titleLabel.setFont(new Font("Arial", Font.BOLD, 24));
            card.add(titleLabel, BorderLayout.NORTH);
            
            JTextArea contentArea = new JTextArea(
                "This is the content of card " + i + ".\\n\\n" +
                "You can put any components here:\\n" +
                "- Forms\\n" +
                "- Tables\\n" +
                "- Images\\n" +
                "- Other panels\\n\\n" +
                "Use the buttons below to navigate between cards.");
            contentArea.setOpaque(false);
            contentArea.setEditable(false);
            card.add(contentArea, BorderLayout.CENTER);
            
            cardPanel.add(card, "Card" + i);
        }
        
        // Navigation buttons
        JPanel navPanel = new JPanel(new FlowLayout());
        JButton firstButton = new JButton("First");
        JButton prevButton = new JButton("Previous");
        JButton nextButton = new JButton("Next");
        JButton lastButton = new JButton("Last");
        
        firstButton.addActionListener(e -> demoCardLayout.first(cardPanel));
        prevButton.addActionListener(e -> demoCardLayout.previous(cardPanel));
        nextButton.addActionListener(e -> demoCardLayout.next(cardPanel));
        lastButton.addActionListener(e -> demoCardLayout.last(cardPanel));
        
        navPanel.add(firstButton);
        navPanel.add(prevButton);
        navPanel.add(nextButton);
        navPanel.add(lastButton);
        
        // Direct navigation
        JPanel directNavPanel = new JPanel(new FlowLayout());
        directNavPanel.add(new JLabel("Go to:"));
        for (int i = 1; i <= 4; i++) {
            JButton cardButton = new JButton("" + i);
            final int cardNum = i;
            cardButton.addActionListener(e -> demoCardLayout.show(cardPanel, "Card" + cardNum));
            directNavPanel.add(cardButton);
        }
        
        JPanel controlsPanel = new JPanel(new GridLayout(2, 1));
        controlsPanel.add(navPanel);
        controlsPanel.add(directNavPanel);
        
        panel.add(cardPanel, BorderLayout.CENTER);
        panel.add(controlsPanel, BorderLayout.SOUTH);
        
        return panel;
    }
    
    private void showLayout(String layoutName) {
        cardLayout.show(contentPanel, layoutName);
        setTitle("Layout Manager Demo - " + layoutName);
    }
    
    public static void main(String[] args) {
        SwingUtilities.invokeLater(() -> {
            try {
                UIManager.setLookAndFeel(UIManager.getSystemLookAndFeel());
            } catch (Exception e) {
                e.printStackTrace();
            }
            new LayoutManagerDemo().setVisible(true);
        });
    }
}`
          }
        ],
        keyPoints: [
          'Always run GUI code on the Event Dispatch Thread using SwingUtilities.invokeLater()',
          'Choose the appropriate layout manager based on your component arrangement needs',
          'Use ActionListener interface or lambda expressions for event handling',
          'JFrame, JPanel, and JComponent form the foundation of Swing applications',
          'BorderLayout is default for JFrame, FlowLayout is default for JPanel',
          'GridBagLayout offers the most flexibility but requires more complex setup'
        ]
      },
      {
        id: 'event-handling',
        title: 'Advanced Event Handling',
        description: 'Comprehensive guide to handling various types of events in GUI applications',
        content: `
          <h3>Advanced Event Handling in Java</h3>
          <p>Event handling is the mechanism that controls the user's interactions with the GUI and determines how the program should respond to these interactions. Java's event model is based on the delegation event model where events are objects and event handling is done through listeners.</p>
          
          <h4>Event Handling Components:</h4>
          <ul>
            <li><strong>Event Source:</strong> The component that generates the event</li>
            <li><strong>Event Object:</strong> Contains information about the event that occurred</li>
            <li><strong>Event Listener:</strong> Interface that receives and handles events</li>
          </ul>
          
          <h4>Types of Events:</h4>
          
          <h5>1. Low-Level Events:</h5>
          <ul>
            <li><strong>ComponentEvent:</strong> Component moved, resized, hidden, shown</li>
            <li><strong>FocusEvent:</strong> Component gained/lost focus</li>
            <li><strong>KeyEvent:</strong> Key pressed, released, typed</li>
            <li><strong>MouseEvent:</strong> Mouse clicked, pressed, released, moved</li>
            <li><strong>WindowEvent:</strong> Window opened, closed, activated</li>
          </ul>
          
          <h5>2. Semantic Events:</h5>
          <ul>
            <li><strong>ActionEvent:</strong> Button clicked, menu item selected</li>
            <li><strong>AdjustmentEvent:</strong> Scrollbar adjusted</li>
            <li><strong>ItemEvent:</strong> Checkbox, radio button state changed</li>
            <li><strong>TextEvent:</strong> Text component modified</li>
          </ul>
          
          <h4>Event Listener Interfaces:</h4>
          <ul>
            <li><strong>ActionListener:</strong> actionPerformed(ActionEvent e)</li>
            <li><strong>MouseListener:</strong> mouseClicked, mousePressed, mouseReleased, mouseEntered, mouseExited</li>
            <li><strong>MouseMotionListener:</strong> mouseDragged, mouseMoved</li>
            <li><strong>KeyListener:</strong> keyPressed, keyReleased, keyTyped</li>
            <li><strong>WindowListener:</strong> windowOpened, windowClosing, windowClosed, etc.</li>
          </ul>
          
          <h4>Event Handling Approaches:</h4>
          <ol>
            <li><strong>Implementing Listener Interfaces:</strong> Class implements the listener interface</li>
            <li><strong>Anonymous Inner Classes:</strong> Create listener on-the-fly</li>
            <li><strong>Lambda Expressions:</strong> Concise functional approach (Java 8+)</li>
            <li><strong>Adapter Classes:</strong> Extend adapter class and override needed methods</li>
          </ol>
          
          <h4>Event Propagation:</h4>
          <p>Events can be consumed to prevent further processing, or allowed to propagate through the component hierarchy. Some events are automatically consumed by Swing components.</p>
          
          <h4>Best Practices:</h4>
          <ul>
            <li>Keep event handlers lightweight - perform heavy operations in background threads</li>
            <li>Use appropriate listener type for the event you want to handle</li>
            <li>Consider using Action objects for reusable functionality</li>
            <li>Remove listeners when components are no longer needed to prevent memory leaks</li>
          </ul>
        `,
        examples: [
          {
            title: 'Comprehensive Event Handling Demo',
            explanation: 'Demonstrates various event types and handling techniques with interactive examples.',
            code: `import javax.swing.*;
import java.awt.*;
import java.awt.event.*;
import java.util.Date;

public class EventHandlingDemo extends JFrame {
    private JTextArea eventLog;
    private JLabel statusLabel;
    private JTextField textField;
    private JButton actionButton, mouseButton;
    private JCheckBox checkBox;
    private JRadioButton radio1, radio2;
    private JSlider slider;
    private JProgressBar progressBar;
    private Timer timer;
    private int eventCounter = 0;
    
    public EventHandlingDemo() {
        setupComponents();
        setupLayout();
        addEventHandlers();
        configureFrame();
    }
    
    private void setupComponents() {
        // Text area for event logging
        eventLog = new JTextArea(15, 50);
        eventLog.setEditable(false);
        eventLog.setFont(new Font(Font.MONOSPACED, Font.PLAIN, 11));
        eventLog.setBackground(Color.BLACK);
        eventLog.setForeground(Color.GREEN);
        
        // Status label
        statusLabel = new JLabel("Ready - Move mouse over components to see events");
        statusLabel.setBorder(BorderFactory.createLoweredBevelBorder());
        
        // Various components for event demonstration
        textField = new JTextField("Type here to see key events", 20);
        actionButton = new JButton("Click Me!");
        mouseButton = new JButton("Mouse Events");
        checkBox = new JCheckBox("Check for item events", false);
        
        // Radio buttons
        radio1 = new JRadioButton("Option 1", true);
        radio2 = new JRadioButton("Option 2", false);
        ButtonGroup radioGroup = new ButtonGroup();
        radioGroup.add(radio1);
        radioGroup.add(radio2);
        
        // Slider
        slider = new JSlider(0, 100, 50);
        slider.setMajorTickSpacing(25);
        slider.setMinorTickSpacing(5);
        slider.setPaintTicks(true);
        slider.setPaintLabels(true);
        
        // Progress bar
        progressBar = new JProgressBar(0, 100);
        progressBar.setValue(0);
        progressBar.setStringPainted(true);
    }
    
    private void setupLayout() {
        setLayout(new BorderLayout());
        
        // Main panel with demo components
        JPanel demoPanel = new JPanel(new GridBagLayout());
        GridBagConstraints gbc = new GridBagConstraints();
        gbc.insets = new Insets(5, 5, 5, 5);
        
        // Row 0: Text field
        gbc.gridx = 0; gbc.gridy = 0; gbc.gridwidth = 2;
        gbc.fill = GridBagConstraints.HORIZONTAL;
        demoPanel.add(new JLabel("Text Field (Key Events):"), gbc);
        
        gbc.gridy = 1;
        demoPanel.add(textField, gbc);
        
        // Row 2: Buttons
        gbc.gridy = 2; gbc.gridwidth = 1;
        gbc.fill = GridBagConstraints.NONE;
        demoPanel.add(actionButton, gbc);
        
        gbc.gridx = 1;
        demoPanel.add(mouseButton, gbc);
        
        // Row 3: Checkbox and radio buttons
        gbc.gridx = 0; gbc.gridy = 3; gbc.gridwidth = 2;
        demoPanel.add(checkBox, gbc);
        
        gbc.gridy = 4; gbc.gridwidth = 1;
        demoPanel.add(radio1, gbc);
        gbc.gridx = 1;
        demoPanel.add(radio2, gbc);
        
        // Row 5: Slider
        gbc.gridx = 0; gbc.gridy = 5; gbc.gridwidth = 2;
        gbc.fill = GridBagConstraints.HORIZONTAL;
        demoPanel.add(new JLabel("Slider (Change Events):"), gbc);
        
        gbc.gridy = 6;
        demoPanel.add(slider, gbc);
        
        // Row 7: Progress bar
        gbc.gridy = 7;
        demoPanel.add(progressBar, gbc);
        
        // Control buttons
        gbc.gridy = 8; gbc.gridwidth = 1;
        gbc.fill = GridBagConstraints.NONE;
        JButton clearButton = new JButton("Clear Log");
        JButton startTimerButton = new JButton("Start Timer Demo");
        
        clearButton.addActionListener(e -> {
            eventLog.setText("");
            eventCounter = 0;
            logEvent("Event log cleared");
        });
        
        startTimerButton.addActionListener(e -> startTimerDemo());
        
        demoPanel.add(clearButton, gbc);
        gbc.gridx = 1;
        demoPanel.add(startTimerButton, gbc);
        
        // Split pane
        JSplitPane splitPane = new JSplitPane(JSplitPane.HORIZONTAL_SPLIT);
        splitPane.setLeftComponent(demoPanel);
        splitPane.setRightComponent(new JScrollPane(eventLog));
        splitPane.setDividerLocation(400);
        
        add(splitPane, BorderLayout.CENTER);
        add(statusLabel, BorderLayout.SOUTH);
    }
    
    private void addEventHandlers() {
        // Action events
        actionButton.addActionListener(e -> {
            logEvent("ActionEvent: Button clicked - " + new Date());
            JOptionPane.showMessageDialog(this, "Button was clicked!\\nEvent source: " + 
                ((JButton)e.getSource()).getText(), "Action Event", JOptionPane.INFORMATION_MESSAGE);
        });
        
        // Mouse events (multiple approaches)
        mouseButton.addMouseListener(new MouseListener() {
            @Override
            public void mouseClicked(MouseEvent e) {
                logEvent("MouseEvent: Clicked at (" + e.getX() + ", " + e.getY() + ") " +
                        "Button: " + e.getButton() + " Click count: " + e.getClickCount());
            }
            
            @Override
            public void mousePressed(MouseEvent e) {
                logEvent("MouseEvent: Pressed " + getMouseButtonName(e.getButton()));
                mouseButton.setBackground(Color.YELLOW);
            }
            
            @Override
            public void mouseReleased(MouseEvent e) {
                logEvent("MouseEvent: Released " + getMouseButtonName(e.getButton()));
                mouseButton.setBackground(null);
            }
            
            @Override
            public void mouseEntered(MouseEvent e) {
                logEvent("MouseEvent: Entered component");
                statusLabel.setText("Mouse entered the mouse demo button");
                mouseButton.setBackground(Color.LIGHT_GRAY);
            }
            
            @Override
            public void mouseExited(MouseEvent e) {
                logEvent("MouseEvent: Exited component");
                statusLabel.setText("Mouse exited the mouse demo button");
                mouseButton.setBackground(null);
            }
        });
        
        // Mouse motion events
        mouseButton.addMouseMotionListener(new MouseMotionAdapter() {
            @Override
            public void mouseMoved(MouseEvent e) {
                statusLabel.setText("Mouse at (" + e.getX() + ", " + e.getY() + ") in mouse button");
            }
            
            @Override
            public void mouseDragged(MouseEvent e) {
                logEvent("MouseMotionEvent: Dragged to (" + e.getX() + ", " + e.getY() + ")");
            }
        });
        
        // Key events
        textField.addKeyListener(new KeyAdapter() {
            @Override
            public void keyPressed(KeyEvent e) {
                logEvent("KeyEvent: Pressed '" + KeyEvent.getKeyText(e.getKeyCode()) + 
                        "' (Code: " + e.getKeyCode() + ")");
            }
            
            @Override
            public void keyReleased(KeyEvent e) {
                if (e.getKeyCode() == KeyEvent.VK_ENTER) {
                    logEvent("KeyEvent: Enter key released - Text: '" + textField.getText() + "'");
                }
            }
            
            @Override
            public void keyTyped(KeyEvent e) {
                if (!Character.isISOControl(e.getKeyChar())) {
                    logEvent("KeyEvent: Typed character '" + e.getKeyChar() + "'");
                }
            }
        });
        
        // Focus events
        textField.addFocusListener(new FocusListener() {
            @Override
            public void focusGained(FocusEvent e) {
                logEvent("FocusEvent: Text field gained focus");
                textField.setBackground(Color.YELLOW);
            }
            
            @Override
            public void focusLost(FocusEvent e) {
                logEvent("FocusEvent: Text field lost focus");
                textField.setBackground(Color.WHITE);
            }
        });
        
        // Item events (checkbox and radio buttons)
        checkBox.addItemListener(e -> {
            String state = (e.getStateChange() == ItemEvent.SELECTED) ? "Selected" : "Deselected";
            logEvent("ItemEvent: Checkbox " + state);
        });
        
        radio1.addItemListener(e -> {
            if (e.getStateChange() == ItemEvent.SELECTED) {
                logEvent("ItemEvent: Radio button 1 selected");
            }
        });
        
        radio2.addItemListener(e -> {
            if (e.getStateChange() == ItemEvent.SELECTED) {
                logEvent("ItemEvent: Radio button 2 selected");
            }
        });
        
        // Change events (slider)
        slider.addChangeListener(e -> {
            JSlider source = (JSlider) e.getSource();
            if (!source.getValueIsAdjusting()) {
                logEvent("ChangeEvent: Slider value changed to " + source.getValue());
            }
            statusLabel.setText("Slider value: " + source.getValue());
        });
        
        // Window events
        addWindowListener(new WindowAdapter() {
            @Override
            public void windowOpening(WindowEvent e) {
                logEvent("WindowEvent: Window opening");
            }
            
            @Override
            public void windowClosing(WindowEvent e) {
                logEvent("WindowEvent: Window closing");
                int choice = JOptionPane.showConfirmDialog(
                    EventHandlingDemo.this,
                    "Are you sure you want to exit?",
                    "Confirm Exit",
                    JOptionPane.YES_NO_OPTION
                );
                if (choice == JOptionPane.YES_OPTION) {
                    dispose();
                    System.exit(0);
                }
            }
            
            @Override
            public void windowActivated(WindowEvent e) {
                statusLabel.setText("Window activated");
            }
            
            @Override
            public void windowDeactivated(WindowEvent e) {
                statusLabel.setText("Window deactivated");
            }
        });
        
        // Component events (window resize)
        addComponentListener(new ComponentAdapter() {
            @Override
            public void componentResized(ComponentEvent e) {
                Dimension size = getSize();
                statusLabel.setText("Window resized to " + size.width + "x" + size.height);
                logEvent("ComponentEvent: Window resized to " + size.width + "x" + size.height);
            }
        });
    }
    
    private void configureFrame() {
        setTitle("Advanced Event Handling Demo");
        setDefaultCloseOperation(JFrame.DO_NOTHING_ON_CLOSE); // Handle close event manually
        setSize(800, 600);
        setLocationRelativeTo(null);
        
        // Initial log message
        logEvent("Event Handling Demo started - " + new Date());
        logEvent("Interact with components to see different types of events");
        logEvent("=========================================================");
    }
    
    private void logEvent(String message) {
        eventCounter++;
        String formattedMessage = String.format("[%04d] %s\\n", eventCounter, message);
        eventLog.append(formattedMessage);
        eventLog.setCaretPosition(eventLog.getDocument().getLength());
    }
    
    private String getMouseButtonName(int button) {
        switch (button) {
            case MouseEvent.BUTTON1: return "Left";
            case MouseEvent.BUTTON2: return "Middle";
            case MouseEvent.BUTTON3: return "Right";
            default: return "Button " + button;
        }
    }
    
    private void startTimerDemo() {
        if (timer != null && timer.isRunning()) {
            timer.stop();
        }
        
        progressBar.setValue(0);
        logEvent("Timer Demo: Starting progress bar animation");
        
        timer = new Timer(100, new ActionListener() {
            int value = 0;
            
            @Override
            public void actionPerformed(ActionEvent e) {
                value += 2;
                progressBar.setValue(value);
                progressBar.setString("Progress: " + value + "%");
                
                if (value >= 100) {
                    timer.stop();
                    logEvent("Timer Demo: Animation completed");
                    JOptionPane.showMessageDialog(EventHandlingDemo.this, 
                        "Timer demo completed!", "Timer Demo", JOptionPane.INFORMATION_MESSAGE);
                    progressBar.setString("Complete");
                }
            }
        });
        
        timer.start();
    }
    
    public static void main(String[] args) {
        SwingUtilities.invokeLater(() -> {
            try {
                UIManager.setLookAndFeel(UIManager.getSystemLookAndFeel());
            } catch (Exception e) {
                e.printStackTrace();
            }
            
            new EventHandlingDemo().setVisible(true);
        });
    }
}`
          },
          {
            title: 'Custom Event System and Observer Pattern',
            explanation: 'Creating custom events and implementing the observer pattern for component communication.',
            code: `import javax.swing.*;
import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.util.ArrayList;
import java.util.List;
import java.util.Date;
import java.util.EventObject;

// Custom event class
class OrderEvent extends EventObject {
    private String orderType;
    private double amount;
    private Date timestamp;
    
    public OrderEvent(Object source, String orderType, double amount) {
        super(source);
        this.orderType = orderType;
        this.amount = amount;
        this.timestamp = new Date();
    }
    
    public String getOrderType() { return orderType; }
    public double getAmount() { return amount; }
    public Date getTimestamp() { return timestamp; }
}

// Custom event listener interface
interface OrderEventListener {
    void orderPlaced(OrderEvent event);
    void orderCancelled(OrderEvent event);
    void orderCompleted(OrderEvent event);
}

// Event source component
class OrderPanel extends JPanel {
    private List<OrderEventListener> listeners = new ArrayList<>();
    private JTextField itemField, priceField;
    private JButton orderButton, cancelButton, completeButton;
    private JList<String> orderList;
    private DefaultListModel<String> listModel;
    private int orderCounter = 0;
    
    public OrderPanel() {
        setupComponents();
        setupLayout();
        addEventHandlers();
    }
    
    private void setupComponents() {
        itemField = new JTextField(15);
        priceField = new JTextField(10);
        orderButton = new JButton("Place Order");
        cancelButton = new JButton("Cancel Order");
        completeButton = new JButton("Complete Order");
        
        listModel = new DefaultListModel<>();
        orderList = new JList<>(listModel);
        orderList.setSelectionMode(ListSelectionModel.SINGLE_SELECTION);
    }
    
    private void setupLayout() {
        setLayout(new BorderLayout());
        setBorder(BorderFactory.createTitledBorder("Order Management"));
        
        // Input panel
        JPanel inputPanel = new JPanel(new GridBagLayout());
        GridBagConstraints gbc = new GridBagConstraints();
        gbc.insets = new Insets(5, 5, 5, 5);
        
        gbc.gridx = 0; gbc.gridy = 0;
        inputPanel.add(new JLabel("Item:"), gbc);
        gbc.gridx = 1;
        inputPanel.add(itemField, gbc);
        
        gbc.gridx = 0; gbc.gridy = 1;
        inputPanel.add(new JLabel("Price:"), gbc);
        gbc.gridx = 1;
        inputPanel.add(priceField, gbc);
        
        // Button panel
        JPanel buttonPanel = new JPanel(new FlowLayout());
        buttonPanel.add(orderButton);
        buttonPanel.add(cancelButton);
        buttonPanel.add(completeButton);
        
        // Order list
        JScrollPane scrollPane = new JScrollPane(orderList);
        scrollPane.setPreferredSize(new Dimension(300, 150));
        
        add(inputPanel, BorderLayout.NORTH);
        add(scrollPane, BorderLayout.CENTER);
        add(buttonPanel, BorderLayout.SOUTH);
    }
    
    private void addEventHandlers() {
        orderButton.addActionListener(e -> placeOrder());
        cancelButton.addActionListener(e -> cancelOrder());
        completeButton.addActionListener(e -> completeOrder());
    }
    
    private void placeOrder() {
        String item = itemField.getText().trim();
        String priceText = priceField.getText().trim();
        
        if (item.isEmpty() || priceText.isEmpty()) {
            JOptionPane.showMessageDialog(this, "Please fill in all fields", "Error", JOptionPane.ERROR_MESSAGE);
            return;
        }
        
        try {
            double price = Double.parseDouble(priceText);
            orderCounter++;
            String orderItem = String.format("Order #%d: %s - $%.2f", orderCounter, item, price);
            listModel.addElement(orderItem);
            
            // Fire custom event
            OrderEvent event = new OrderEvent(this, item, price);
            fireOrderPlaced(event);
            
            // Clear fields
            itemField.setText("");
            priceField.setText("");
            itemField.requestFocus();
            
        } catch (NumberFormatException ex) {
            JOptionPane.showMessageDialog(this, "Invalid price format", "Error", JOptionPane.ERROR_MESSAGE);
        }
    }
    
    private void cancelOrder() {
        int selectedIndex = orderList.getSelectedIndex();
        if (selectedIndex == -1) {
            JOptionPane.showMessageDialog(this, "Please select an order to cancel", "No Selection", JOptionPane.WARNING_MESSAGE);
            return;
        }
        
        String selectedOrder = listModel.getElementAt(selectedIndex);
        listModel.removeElementAt(selectedIndex);
        
        // Extract order info for event
        String[] parts = selectedOrder.split(": ")[1].split(" - \\$");
        String item = parts[0];
        double price = Double.parseDouble(parts[1]);
        
        OrderEvent event = new OrderEvent(this, item, price);
        fireOrderCancelled(event);
    }
    
    private void completeOrder() {
        int selectedIndex = orderList.getSelectedIndex();
        if (selectedIndex == -1) {
            JOptionPane.showMessageDialog(this, "Please select an order to complete", "No Selection", JOptionPane.WARNING_MESSAGE);
            return;
        }
        
        String selectedOrder = listModel.getElementAt(selectedIndex);
        listModel.removeElementAt(selectedIndex);
        
        // Extract order info for event
        String[] parts = selectedOrder.split(": ")[1].split(" - \\$");
        String item = parts[0];
        double price = Double.parseDouble(parts[1]);
        
        OrderEvent event = new OrderEvent(this, item, price);
        fireOrderCompleted(event);
    }
    
    // Event listener management
    public void addOrderEventListener(OrderEventListener listener) {
        listeners.add(listener);
    }
    
    public void removeOrderEventListener(OrderEventListener listener) {
        listeners.remove(listener);
    }
    
    private void fireOrderPlaced(OrderEvent event) {
        for (OrderEventListener listener : listeners) {
            listener.orderPlaced(event);
        }
    }
    
    private void fireOrderCancelled(OrderEvent event) {
        for (OrderEventListener listener : listeners) {
            listener.orderCancelled(event);
        }
    }
    
    private void fireOrderCompleted(OrderEvent event) {
        for (OrderEventListener listener : listeners) {
            listener.orderCompleted(event);
        }
    }
}

// Event listener component - Statistics Panel
class StatisticsPanel extends JPanel implements OrderEventListener {
    private JLabel totalOrdersLabel, totalRevenueLabel, averageOrderLabel;
    private JTextArea logArea;
    private int totalOrders = 0;
    private double totalRevenue = 0.0;
    
    public StatisticsPanel() {
        setupComponents();
        setupLayout();
        updateStatistics();
    }
    
    private void setupComponents() {
        totalOrdersLabel = new JLabel("Total Orders: 0");
        totalRevenueLabel = new JLabel("Total Revenue: $0.00");
        averageOrderLabel = new JLabel("Average Order: $0.00");
        
        logArea = new JTextArea(10, 40);
        logArea.setEditable(false);
        logArea.setFont(new Font(Font.MONOSPACED, Font.PLAIN, 11));
    }
    
    private void setupLayout() {
        setLayout(new BorderLayout());
        setBorder(BorderFactory.createTitledBorder("Statistics & Event Log"));
        
        // Statistics panel
        JPanel statsPanel = new JPanel(new GridLayout(3, 1, 5, 5));
        statsPanel.add(totalOrdersLabel);
        statsPanel.add(totalRevenueLabel);
        statsPanel.add(averageOrderLabel);
        
        add(statsPanel, BorderLayout.NORTH);
        add(new JScrollPane(logArea), BorderLayout.CENTER);
        
        // Clear log button
        JButton clearLogButton = new JButton("Clear Log");
        clearLogButton.addActionListener(e -> logArea.setText(""));
        add(clearLogButton, BorderLayout.SOUTH);
    }
    
    @Override
    public void orderPlaced(OrderEvent event) {
        totalOrders++;
        totalRevenue += event.getAmount();
        updateStatistics();
        
        String logMessage = String.format("[%tT] ORDER PLACED: %s - $%.2f\\n", 
            event.getTimestamp(), event.getOrderType(), event.getAmount());
        logArea.append(logMessage);
        logArea.setCaretPosition(logArea.getDocument().getLength());
    }
    
    @Override
    public void orderCancelled(OrderEvent event) {
        totalOrders--;
        totalRevenue -= event.getAmount();
        updateStatistics();
        
        String logMessage = String.format("[%tT] ORDER CANCELLED: %s - $%.2f\\n", 
            event.getTimestamp(), event.getOrderType(), event.getAmount());
        logArea.append(logMessage);
        logArea.setCaretPosition(logArea.getDocument().getLength());
    }
    
    @Override
    public void orderCompleted(OrderEvent event) {
        String logMessage = String.format("[%tT] ORDER COMPLETED: %s - $%.2f\\n", 
            event.getTimestamp(), event.getOrderType(), event.getAmount());
        logArea.append(logMessage);
        logArea.setCaretPosition(logArea.getDocument().getLength());
    }
    
    private void updateStatistics() {
        totalOrdersLabel.setText("Total Orders: " + totalOrders);
        totalRevenueLabel.setText(String.format("Total Revenue: $%.2f", totalRevenue));
        
        double averageOrder = (totalOrders > 0) ? (totalRevenue / totalOrders) : 0.0;
        averageOrderLabel.setText(String.format("Average Order: $%.2f", averageOrder));
    }
}

// Notification panel - another event listener
class NotificationPanel extends JPanel implements OrderEventListener {
    private JTextArea notificationArea;
    private JCheckBox enableSoundCheck;
    
    public NotificationPanel() {
        setupComponents();
        setupLayout();
    }
    
    private void setupComponents() {
        notificationArea = new JTextArea(8, 30);
        notificationArea.setEditable(false);
        notificationArea.setBackground(new Color(255, 255, 200));
        
        enableSoundCheck = new JCheckBox("Enable Sound Notifications", true);
    }
    
    private void setupLayout() {
        setLayout(new BorderLayout());
        setBorder(BorderFactory.createTitledBorder("Notifications"));
        
        add(enableSoundCheck, BorderLayout.NORTH);
        add(new JScrollPane(notificationArea), BorderLayout.CENTER);
        
        JButton clearButton = new JButton("Clear Notifications");
        clearButton.addActionListener(e -> notificationArea.setText(""));
        add(clearButton, BorderLayout.SOUTH);
    }
    
    @Override
    public void orderPlaced(OrderEvent event) {
        showNotification("NEW ORDER", "Order placed for " + event.getOrderType(), Color.GREEN);
        if (enableSoundCheck.isSelected()) {
            Toolkit.getDefaultToolkit().beep();
        }
    }
    
    @Override
    public void orderCancelled(OrderEvent event) {
        showNotification("CANCELLED", "Order cancelled: " + event.getOrderType(), Color.RED);
    }
    
    @Override
    public void orderCompleted(OrderEvent event) {
        showNotification("COMPLETED", "Order completed: " + event.getOrderType(), Color.BLUE);
        if (enableSoundCheck.isSelected()) {
            // Double beep for completion
            Toolkit.getDefaultToolkit().beep();
            Timer timer = new Timer(200, e -> Toolkit.getDefaultToolkit().beep());
            timer.setRepeats(false);
            timer.start();
        }
    }
    
    private void showNotification(String type, String message, Color color) {
        String timestamp = String.format("%tT", new Date());
        String notification = String.format("[%s] %s: %s\\n", timestamp, type, message);
        
        notificationArea.append(notification);
        notificationArea.setCaretPosition(notificationArea.getDocument().getLength());
        
        // Temporarily change background color
        Color originalColor = notificationArea.getBackground();
        notificationArea.setBackground(color);
        
        Timer timer = new Timer(1000, e -> notificationArea.setBackground(originalColor));
        timer.setRepeats(false);
        timer.start();
    }
}

// Main application demonstrating custom events
public class CustomEventDemo extends JFrame {
    public CustomEventDemo() {
        setupApplication();
    }
    
    private void setupApplication() {
        setTitle("Custom Event System Demo");
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        setLayout(new BorderLayout());
        
        // Create components
        OrderPanel orderPanel = new OrderPanel();
        StatisticsPanel statsPanel = new StatisticsPanel();
        NotificationPanel notificationPanel = new NotificationPanel();
        
        // Register event listeners
        orderPanel.addOrderEventListener(statsPanel);
        orderPanel.addOrderEventListener(notificationPanel);
        
        // Layout
        add(orderPanel, BorderLayout.WEST);
        
        JPanel rightPanel = new JPanel(new GridLayout(2, 1));
        rightPanel.add(statsPanel);
        rightPanel.add(notificationPanel);
        add(rightPanel, BorderLayout.CENTER);
        
        // Instructions
        JTextArea instructions = new JTextArea(
            "Custom Event System Demo:\\n" +
            "1. Enter item name and price in the Order Management panel\\n" +
            "2. Click 'Place Order' to create a new order\\n" +
            "3. Select orders from the list and use Cancel/Complete buttons\\n" +
            "4. Watch how custom events are handled by multiple listeners\\n" +
            "5. Statistics and Notifications update automatically"
        );
        instructions.setEditable(false);
        instructions.setRows(6);
        add(new JScrollPane(instructions), BorderLayout.NORTH);
        
        pack();
        setLocationRelativeTo(null);
    }
    
    public static void main(String[] args) {
        SwingUtilities.invokeLater(() -> {
            try {
                UIManager.setLookAndFeel(UIManager.getSystemLookAndFeel());
            } catch (Exception e) {
                e.printStackTrace();
            }
            
            new CustomEventDemo().setVisible(true);
        });
    }
}`
          }
        ],
        keyPoints: [
          'Events are objects that contain information about user interactions or system changes',
          'Event listeners define how to respond to specific types of events',
          'Use adapter classes when you only need to implement some methods of a listener interface',
          'Lambda expressions provide concise syntax for simple event handlers',
          'Custom events enable communication between components without tight coupling',
          'Always remove event listeners when components are disposed to prevent memory leaks'
        ]
      }
    ]
  },
  {
    id: 'unit4',
    title: 'Unit IV: JDBC - Java Database Connectivity',
    description: 'Master database connectivity, SQL operations, and data persistence in Java applications.',
    duration: '10 Hours',
    topics: [
      {
        id: 'jdbc-introduction',
        title: 'JDBC Fundamentals and Architecture',
        description: 'Understanding JDBC architecture, drivers, and basic database connectivity',
        content: `
          <h3>JDBC (Java Database Connectivity)</h3>
          <p>JDBC is a Java API that provides a standard interface for connecting Java applications to relational databases. It allows Java programs to execute SQL statements, retrieve results, and manage database connections in a database-independent manner.</p>
          
          <h4>JDBC Architecture:</h4>
          <p>JDBC follows a layered architecture with the following components:</p>
          
          <h5>1. JDBC API Layer:</h5>
          <ul>
            <li>Provides interfaces and classes for database operations</li>
            <li>Located in java.sql and javax.sql packages</li>
            <li>Includes Connection, Statement, PreparedStatement, ResultSet interfaces</li>
          </ul>
          
          <h5>2. JDBC Driver Manager:</h5>
          <ul>
            <li>Manages multiple database drivers</li>
            <li>Selects appropriate driver for database connection</li>
            <li>Handles driver registration and deregistration</li>
          </ul>
          
          <h5>3. JDBC Drivers:</h5>
          <ul>
            <li>Database-specific implementations of JDBC interfaces</li>
            <li>Translate JDBC calls to database-specific calls</li>
            <li>Handle communication protocol with the database</li>
          </ul>
          
          <h4>Types of JDBC Drivers:</h4>
          
          <h5>Type 1: JDBC-ODBC Bridge Driver</h5>
          <ul>
            <li>Uses ODBC driver to connect to database</li>
            <li>Platform dependent (requires ODBC setup)</li>
            <li>Slow performance due to multiple layers</li>
            <li>Deprecated as of Java 8</li>
          </ul>
          
          <h5>Type 2: Native-API Driver</h5>
          <ul>
            <li>Uses database's native client libraries</li>
            <li>Platform dependent but faster than Type 1</li>
            <li>Requires native libraries on client machine</li>
          </ul>
          
          <h5>Type 3: Network Protocol Driver</h5>
          <ul>
            <li>Uses middleware server between client and database</li>
            <li>Platform independent</li>
            <li>Requires additional network layer</li>
          </ul>
          
          <h5>Type 4: Thin Driver (Pure Java Driver)</h5>
          <ul>
            <li>Written entirely in Java</li>
            <li>Platform independent</li>
            <li>Direct communication with database</li>
            <li>Most commonly used (MySQL Connector/J, PostgreSQL JDBC)</li>
          </ul>
          
          <h4>Core JDBC Interfaces:</h4>
          
          <h5>Connection Interface:</h5>
          <ul>
            <li>Represents a database connection session</li>
            <li>Provides methods to create Statement objects</li>
            <li>Manages transaction control (commit, rollback)</li>
          </ul>
          
          <h5>Statement Interface:</h5>
          <ul>
            <li>Used for executing static SQL statements</li>
            <li>Returns ResultSet for query operations</li>
            <li>Suitable for DDL operations</li>
          </ul>
          
          <h5>PreparedStatement Interface:</h5>
          <ul>
            <li>Pre-compiled SQL statements with parameters</li>
            <li>Better performance for repeated executions</li>
            <li>Prevents SQL injection attacks</li>
            <li>Preferred for DML operations</li>
          </ul>
          
          <h5>ResultSet Interface:</h5>
          <ul>
            <li>Represents result set from database queries</li>
            <li>Provides methods to navigate and extract data</li>
            <li>Supports different cursor types and concurrency modes</li>
          </ul>
          
          <h4>JDBC URL Format:</h4>
          <p>JDBC URLs follow a standard format: <code>jdbc:&lt;subprotocol&gt;:&lt;subname&gt;</code></p>
          <ul>
            <li>MySQL: <code>jdbc:mysql://hostname:port/database</code></li>
            <li>PostgreSQL: <code>jdbc:postgresql://hostname:port/database</code></li>
            <li>Oracle: <code>jdbc:oracle:thin:@hostname:port:sid</code></li>
            <li>SQLite: <code>jdbc:sqlite:database_file.db</code></li>
          </ul>
          
          <h4>Basic JDBC Operations:</h4>
          <ol>
            <li><strong>Load and register driver</strong> (automatic with JDBC 4.0+)</li>
            <li><strong>Establish connection</strong> using DriverManager.getConnection()</li>
            <li><strong>Create statement</strong> object</li>
            <li><strong>Execute SQL</strong> statement</li>
            <li><strong>Process results</strong> (for queries)</li>
            <li><strong>Close resources</strong> (ResultSet, Statement, Connection)</li>
          </ol>
        `,
        examples: [
          {
            title: 'Basic JDBC Connection and Setup',
            explanation: 'Demonstrates how to establish database connections with different databases and handle basic JDBC operations.',
            code: `import java.sql.*;
import java.util.Properties;

public class JDBCConnectionDemo {
    // Database connection parameters
    private static final String MYSQL_URL = "jdbc:mysql://localhost:3306/testdb";
    private static final String POSTGRESQL_URL = "jdbc:postgresql://localhost:5432/testdb";
    private static final String SQLITE_URL = "jdbc:sqlite:testdb.db";
    private static final String USERNAME = "username";
    private static final String PASSWORD = "password";
    
    public static void main(String[] args) {
        // Demonstrate different connection approaches
        demonstrateBasicConnection();
        demonstrateConnectionWithProperties();
        demonstrateSQLiteConnection();
        demonstrateDriverInformation();
        demonstrateConnectionMetadata();
    }
    
    // Basic connection approach
    public static void demonstrateBasicConnection() {
        System.out.println("=== Basic Connection Demo ===");
        
        Connection connection = null;
        try {
            // For older JDBC versions, you might need to load the driver manually:
            // Class.forName("com.mysql.cj.jdbc.Driver");
            
            // Establish connection
            connection = DriverManager.getConnection(MYSQL_URL, USERNAME, PASSWORD);
            
            if (connection != null) {
                System.out.println("Connected to MySQL database successfully!");
                System.out.println("Connection URL: " + connection.getMetaData().getURL());
                System.out.println("Database Product: " + connection.getMetaData().getDatabaseProductName());
                System.out.println("Database Version: " + connection.getMetaData().getDatabaseProductVersion());
                System.out.println("Driver Name: " + connection.getMetaData().getDriverName());
                System.out.println("Driver Version: " + connection.getMetaData().getDriverVersion());
            }
            
        } catch (SQLException e) {
            System.err.println("Connection failed: " + e.getMessage());
            System.err.println("SQL State: " + e.getSQLState());
            System.err.println("Error Code: " + e.getErrorCode());
        } finally {
            // Always close connection in finally block
            if (connection != null) {
                try {
                    connection.close();
                    System.out.println("Connection closed successfully");
                } catch (SQLException e) {
                    System.err.println("Error closing connection: " + e.getMessage());
                }
            }
        }
        System.out.println();
    }
    
    // Connection with Properties object
    public static void demonstrateConnectionWithProperties() {
        System.out.println("=== Connection with Properties Demo ===");
        
        Connection connection = null;
        try {
            Properties props = new Properties();
            props.setProperty("user", USERNAME);
            props.setProperty("password", PASSWORD);
            props.setProperty("useSSL", "false");
            props.setProperty("allowPublicKeyRetrieval", "true");
            props.setProperty("serverTimezone", "UTC");
            
            connection = DriverManager.getConnection(MYSQL_URL, props);
            
            if (connection != null) {
                System.out.println("Connected using Properties object!");
                
                // Test connection with a simple query
                testConnection(connection);
            }
            
        } catch (SQLException e) {
            System.err.println("Connection with properties failed: " + e.getMessage());
        } finally {
            closeConnection(connection);
        }
        System.out.println();
    }
    
    // SQLite connection (no username/password required)
    public static void demonstrateSQLiteConnection() {
        System.out.println("=== SQLite Connection Demo ===");
        
        Connection connection = null;
        try {
            // SQLite connection - creates file if it doesn't exist
            connection = DriverManager.getConnection(SQLITE_URL);
            
            if (connection != null) {
                System.out.println("Connected to SQLite database successfully!");
                System.out.println("Database path: " + SQLITE_URL);
                
                // Create a sample table to test the connection
                createSampleTable(connection);
                
                // Test basic operations
                testSQLiteOperations(connection);
            }
            
        } catch (SQLException e) {
            System.err.println("SQLite connection failed: " + e.getMessage());
        } finally {
            closeConnection(connection);
        }
        System.out.println();
    }
    
    // Demonstrate driver information
    public static void demonstrateDriverInformation() {
        System.out.println("=== Driver Information Demo ===");
        
        try {
            // Get all registered drivers
            System.out.println("Registered JDBC Drivers:");
            var drivers = DriverManager.getDrivers();
            
            while (drivers.hasMoreElements()) {
                Driver driver = drivers.nextElement();
                System.out.println("  Driver: " + driver.getClass().getName());
                System.out.println("  Version: " + driver.getMajorVersion() + "." + driver.getMinorVersion());
                System.out.println("  JDBC Compliant: " + driver.jdbcCompliant());
                System.out.println();
            }
            
        } catch (Exception e) {
            System.err.println("Error getting driver information: " + e.getMessage());
        }
        System.out.println();
    }
    
    // Demonstrate connection metadata
    public static void demonstrateConnectionMetadata() {
        System.out.println("=== Connection Metadata Demo ===");
        
        Connection connection = null;
        try {
            connection = DriverManager.getConnection(SQLITE_URL);
            
            if (connection != null) {
                DatabaseMetaData metaData = connection.getMetaData();
                
                System.out.println("Database Information:");
                System.out.println("  Product Name: " + metaData.getDatabaseProductName());
                System.out.println("  Product Version: " + metaData.getDatabaseProductVersion());
                System.out.println("  Driver Name: " + metaData.getDriverName());
                System.out.println("  Driver Version: " + metaData.getDriverVersion());
                System.out.println("  JDBC Version: " + metaData.getJDBCMajorVersion() + "." + metaData.getJDBCMinorVersion());
                
                System.out.println("\\nSupported Features:");
                System.out.println("  Transactions: " + metaData.supportsTransactions());
                System.out.println("  Batch Updates: " + metaData.supportsBatchUpdates());
                System.out.println("  Stored Procedures: " + metaData.supportsStoredProcedures());
                System.out.println("  Multiple ResultSets: " + metaData.supportsMultipleResultSets());
                
                System.out.println("\\nLimits:");
                System.out.println("  Max Connections: " + metaData.getMaxConnections());
                System.out.println("  Max Table Name Length: " + metaData.getMaxTableNameLength());
                System.out.println("  Max Column Name Length: " + metaData.getMaxColumnNameLength());
                
                // Get table types
                System.out.println("\\nSupported Table Types:");
                ResultSet tableTypes = metaData.getTableTypes();
                while (tableTypes.next()) {
                    System.out.println("  " + tableTypes.getString("TABLE_TYPE"));
                }
                tableTypes.close();
            }
            
        } catch (SQLException e) {
            System.err.println("Error getting metadata: " + e.getMessage());
        } finally {
            closeConnection(connection);
        }
    }
    
    // Helper method to test connection
    private static void testConnection(Connection connection) throws SQLException {
        Statement statement = connection.createStatement();
        ResultSet resultSet = statement.executeQuery("SELECT 1 as test_column");
        
        if (resultSet.next()) {
            System.out.println("Connection test successful! Result: " + resultSet.getInt("test_column"));
        }
        
        resultSet.close();
        statement.close();
    }
    
    // Helper method to create sample table in SQLite
    private static void createSampleTable(Connection connection) throws SQLException {
        String createTableSQL = """
            CREATE TABLE IF NOT EXISTS test_table (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                created_date DATETIME DEFAULT CURRENT_TIMESTAMP
            )
            """;
        
        Statement statement = connection.createStatement();
        statement.executeUpdate(createTableSQL);
        System.out.println("Sample table created/verified");
        statement.close();
    }
    
    // Helper method to test SQLite operations
    private static void testSQLiteOperations(Connection connection) throws SQLException {
        // Insert test data
        String insertSQL = "INSERT INTO test_table (name) VALUES (?)";
        PreparedStatement pstmt = connection.prepareStatement(insertSQL);
        
        pstmt.setString(1, "Test Record " + System.currentTimeMillis());
        int rowsInserted = pstmt.executeUpdate();
        System.out.println("Rows inserted: " + rowsInserted);
        
        // Query test data
        String querySQL = "SELECT * FROM test_table ORDER BY id DESC LIMIT 5";
        Statement statement = connection.createStatement();
        ResultSet rs = statement.executeQuery(querySQL);
        
        System.out.println("Recent records:");
        while (rs.next()) {
            System.out.printf("  ID: %d, Name: %s, Created: %s%n",
                rs.getInt("id"),
                rs.getString("name"),
                rs.getString("created_date"));
        }
        
        // Close resources
        rs.close();
        statement.close();
        pstmt.close();
    }
    
    // Helper method to close connection safely
    private static void closeConnection(Connection connection) {
        if (connection != null) {
            try {
                connection.close();
                System.out.println("Connection closed successfully");
            } catch (SQLException e) {
                System.err.println("Error closing connection: " + e.getMessage());
            }
        }
    }
}`
          },
          {
            title: 'Connection Pool Implementation and Management',
            explanation: 'Creating a basic connection pool for efficient database connection management.',
            code: `import java.sql.*;
import java.util.concurrent.ArrayBlockingQueue;
import java.util.concurrent.BlockingQueue;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.Properties;

// Custom connection wrapper to track usage
class PooledConnection {
    private Connection connection;
    private boolean inUse;
    private long lastUsed;
    private final String id;
    
    public PooledConnection(Connection connection, String id) {
        this.connection = connection;
        this.inUse = false;
        this.lastUsed = System.currentTimeMillis();
        this.id = id;
    }
    
    public Connection getConnection() {
        this.lastUsed = System.currentTimeMillis();
        return connection;
    }
    
    public boolean isInUse() { return inUse; }
    public void setInUse(boolean inUse) { 
        this.inUse = inUse; 
        this.lastUsed = System.currentTimeMillis();
    }
    
    public long getLastUsed() { return lastUsed; }
    public String getId() { return id; }
    
    public boolean isValid() {
        try {
            return connection != null && !connection.isClosed() && connection.isValid(5);
        } catch (SQLException e) {
            return false;
        }
    }
    
    public void close() {
        try {
            if (connection != null && !connection.isClosed()) {
                connection.close();
            }
        } catch (SQLException e) {
            System.err.println("Error closing connection " + id + ": " + e.getMessage());
        }
    }
}

// Simple connection pool implementation
class SimpleConnectionPool {
    private final String url;
    private final Properties properties;
    private final int maxPoolSize;
    private final int minPoolSize;
    private final long connectionTimeout;
    private final long maxIdleTime;
    
    private final BlockingQueue<PooledConnection> availableConnections;
    private final AtomicInteger totalConnections;
    private final AtomicInteger activeConnections;
    private final Object lock = new Object();
    private volatile boolean isShutdown = false;
    
    public SimpleConnectionPool(String url, String username, String password, 
                              int minPoolSize, int maxPoolSize, 
                              long connectionTimeout, long maxIdleTime) {
        this.url = url;
        this.minPoolSize = minPoolSize;
        this.maxPoolSize = maxPoolSize;
        this.connectionTimeout = connectionTimeout;
        this.maxIdleTime = maxIdleTime;
        
        // Setup connection properties
        this.properties = new Properties();
        this.properties.setProperty("user", username);
        this.properties.setProperty("password", password);
        this.properties.setProperty("useSSL", "false");
        this.properties.setProperty("allowPublicKeyRetrieval", "true");
        this.properties.setProperty("serverTimezone", "UTC");
        
        // Initialize data structures
        this.availableConnections = new ArrayBlockingQueue<>(maxPoolSize);
        this.totalConnections = new AtomicInteger(0);
        this.activeConnections = new AtomicInteger(0);
        
        // Create initial connections
        initializePool();
        
        // Start cleanup thread
        startCleanupThread();
    }
    
    private void initializePool() {
        synchronized (lock) {
            for (int i = 0; i < minPoolSize; i++) {
                try {
                    PooledConnection pooledConn = createNewConnection();
                    availableConnections.offer(pooledConn);
                    totalConnections.incrementAndGet();
                    System.out.println("Created initial connection: " + pooledConn.getId());
                } catch (SQLException e) {
                    System.err.println("Failed to create initial connection: " + e.getMessage());
                }
            }
            System.out.println("Connection pool initialized with " + availableConnections.size() + " connections");
        }
    }
    
    private PooledConnection createNewConnection() throws SQLException {
        String connectionId = "conn-" + System.currentTimeMillis() + "-" + totalConnections.get();
        Connection connection = DriverManager.getConnection(url, properties);
        return new PooledConnection(connection, connectionId);
    }
    
    public Connection getConnection() throws SQLException {
        if (isShutdown) {
            throw new SQLException("Connection pool is shutdown");
        }
        
        PooledConnection pooledConnection = null;
        
        // Try to get available connection
        pooledConnection = availableConnections.poll();
        
        if (pooledConnection == null) {
            // No available connection, try to create new one
            synchronized (lock) {
                if (totalConnections.get() < maxPoolSize) {
                    pooledConnection = createNewConnection();
                    totalConnections.incrementAndGet();
                    System.out.println("Created new connection: " + pooledConnection.getId());
                }
            }
        }
        
        if (pooledConnection == null) {
            // Pool is full, wait for available connection
            try {
                pooledConnection = availableConnections.take();
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
                throw new SQLException("Interrupted while waiting for connection");
            }
        }
        
        // Validate connection
        if (!pooledConnection.isValid()) {
            System.out.println("Invalid connection detected, creating new one");
            pooledConnection.close();
            totalConnections.decrementAndGet();
            pooledConnection = createNewConnection();
            totalConnections.incrementAndGet();
        }
        
        pooledConnection.setInUse(true);
        activeConnections.incrementAndGet();
        
        return new ConnectionWrapper(pooledConnection, this);
    }
    
    public void returnConnection(PooledConnection pooledConnection) {
        if (pooledConnection != null && !isShutdown) {
            pooledConnection.setInUse(false);
            activeConnections.decrementAndGet();
            availableConnections.offer(pooledConnection);
            System.out.println("Connection returned to pool: " + pooledConnection.getId());
        }
    }
    
    private void startCleanupThread() {
        Thread cleanupThread = new Thread(() -> {
            while (!isShutdown) {
                try {
                    Thread.sleep(30000); // Check every 30 seconds
                    cleanupIdleConnections();
                } catch (InterruptedException e) {
                    Thread.currentThread().interrupt();
                    break;
                }
            }
        });
        cleanupThread.setDaemon(true);
        cleanupThread.setName("ConnectionPool-Cleanup");
        cleanupThread.start();
    }
    
    private void cleanupIdleConnections() {
        long currentTime = System.currentTimeMillis();
        int cleaned = 0;
        
        synchronized (lock) {
            var iterator = availableConnections.iterator();
            while (iterator.hasNext() && availableConnections.size() > minPoolSize) {
                PooledConnection conn = iterator.next();
                
                if (currentTime - conn.getLastUsed() > maxIdleTime) {
                    iterator.remove();
                    conn.close();
                    totalConnections.decrementAndGet();
                    cleaned++;
                    System.out.println("Cleaned up idle connection: " + conn.getId());
                }
            }
        }
        
        if (cleaned > 0) {
            System.out.println("Cleaned up " + cleaned + " idle connections");
        }
    }
    
    public void shutdown() {
        isShutdown = true;
        
        synchronized (lock) {
            System.out.println("Shutting down connection pool...");
            
            // Close all available connections
            while (!availableConnections.isEmpty()) {
                PooledConnection conn = availableConnections.poll();
                if (conn != null) {
                    conn.close();
                }
            }
            
            totalConnections.set(0);
            activeConnections.set(0);
            System.out.println("Connection pool shutdown complete");
        }
    }
    
    public void printStats() {
        System.out.println("=== Connection Pool Statistics ===");
        System.out.println("Total connections: " + totalConnections.get());
        System.out.println("Active connections: " + activeConnections.get());
        System.out.println("Available connections: " + availableConnections.size());
        System.out.println("Max pool size: " + maxPoolSize);
        System.out.println("Min pool size: " + minPoolSize);
    }
}

// Wrapper class to handle connection return to pool
class ConnectionWrapper implements Connection {
    private final PooledConnection pooledConnection;
    private final SimpleConnectionPool pool;
    private boolean closed = false;
    
    public ConnectionWrapper(PooledConnection pooledConnection, SimpleConnectionPool pool) {
        this.pooledConnection = pooledConnection;
        this.pool = pool;
    }
    
    @Override
    public void close() throws SQLException {
        if (!closed) {
            closed = true;
            pool.returnConnection(pooledConnection);
        }
    }
    
    @Override
    public boolean isClosed() throws SQLException {
        return closed || pooledConnection.getConnection().isClosed();
    }
    
    // Delegate all other methods to the actual connection
    @Override
    public Statement createStatement() throws SQLException {
        checkClosed();
        return pooledConnection.getConnection().createStatement();
    }
    
    @Override
    public PreparedStatement prepareStatement(String sql) throws SQLException {
        checkClosed();
        return pooledConnection.getConnection().prepareStatement(sql);
    }
    
    @Override
    public CallableStatement prepareCall(String sql) throws SQLException {
        checkClosed();
        return pooledConnection.getConnection().prepareCall(sql);
    }
    
    @Override
    public String nativeSQL(String sql) throws SQLException {
        checkClosed();
        return pooledConnection.getConnection().nativeSQL(sql);
    }
    
    @Override
    public void setAutoCommit(boolean autoCommit) throws SQLException {
        checkClosed();
        pooledConnection.getConnection().setAutoCommit(autoCommit);
    }
    
    @Override
    public boolean getAutoCommit() throws SQLException {
        checkClosed();
        return pooledConnection.getConnection().getAutoCommit();
    }
    
    @Override
    public void commit() throws SQLException {
        checkClosed();
        pooledConnection.getConnection().commit();
    }
    
    @Override
    public void rollback() throws SQLException {
        checkClosed();
        pooledConnection.getConnection().rollback();
    }
    
    @Override
    public DatabaseMetaData getMetaData() throws SQLException {
        checkClosed();
        return pooledConnection.getConnection().getMetaData();
    }
    
    @Override
    public void setReadOnly(boolean readOnly) throws SQLException {
        checkClosed();
        pooledConnection.getConnection().setReadOnly(readOnly);
    }
    
    @Override
    public boolean isReadOnly() throws SQLException {
        checkClosed();
        return pooledConnection.getConnection().isReadOnly();
    }
    
    private void checkClosed() throws SQLException {
        if (closed) {
            throw new SQLException("Connection is closed");
        }
    }
    
    // ... implement remaining Connection interface methods with delegation
    // (For brevity, only showing key methods - in real implementation, delegate all methods)
    
    @Override public void setCatalog(String catalog) throws SQLException { checkClosed(); pooledConnection.getConnection().setCatalog(catalog); }
    @Override public String getCatalog() throws SQLException { checkClosed(); return pooledConnection.getConnection().getCatalog(); }
    @Override public void setTransactionIsolation(int level) throws SQLException { checkClosed(); pooledConnection.getConnection().setTransactionIsolation(level); }
    @Override public int getTransactionIsolation() throws SQLException { checkClosed(); return pooledConnection.getConnection().getTransactionIsolation(); }
    @Override public SQLWarning getWarnings() throws SQLException { checkClosed(); return pooledConnection.getConnection().getWarnings(); }
    @Override public void clearWarnings() throws SQLException { checkClosed(); pooledConnection.getConnection().clearWarnings(); }
    @Override public boolean isValid(int timeout) throws SQLException { return !closed && pooledConnection.getConnection().isValid(timeout); }
    
    // Implement remaining methods by delegating to pooledConnection.getConnection()...
    @Override public Statement createStatement(int resultSetType, int resultSetConcurrency) throws SQLException { checkClosed(); return pooledConnection.getConnection().createStatement(resultSetType, resultSetConcurrency); }
    @Override public PreparedStatement prepareStatement(String sql, int resultSetType, int resultSetConcurrency) throws SQLException { checkClosed(); return pooledConnection.getConnection().prepareStatement(sql, resultSetType, resultSetConcurrency); }
    @Override public CallableStatement prepareCall(String sql, int resultSetType, int resultSetConcurrency) throws SQLException { checkClosed(); return pooledConnection.getConnection().prepareCall(sql, resultSetType, resultSetConcurrency); }
    @Override public java.util.Map<String,Class<?>> getTypeMap() throws SQLException { checkClosed(); return pooledConnection.getConnection().getTypeMap(); }
    @Override public void setTypeMap(java.util.Map<String,Class<?>> map) throws SQLException { checkClosed(); pooledConnection.getConnection().setTypeMap(map); }
    @Override public void setHoldability(int holdability) throws SQLException { checkClosed(); pooledConnection.getConnection().setHoldability(holdability); }
    @Override public int getHoldability() throws SQLException { checkClosed(); return pooledConnection.getConnection().getHoldability(); }
    @Override public Savepoint setSavepoint() throws SQLException { checkClosed(); return pooledConnection.getConnection().setSavepoint(); }
    @Override public Savepoint setSavepoint(String name) throws SQLException { checkClosed(); return pooledConnection.getConnection().setSavepoint(name); }
    @Override public void rollback(Savepoint savepoint) throws SQLException { checkClosed(); pooledConnection.getConnection().rollback(savepoint); }
    @Override public void releaseSavepoint(Savepoint savepoint) throws SQLException { checkClosed(); pooledConnection.getConnection().releaseSavepoint(savepoint); }
    @Override public Statement createStatement(int resultSetType, int resultSetConcurrency, int resultSetHoldability) throws SQLException { checkClosed(); return pooledConnection.getConnection().createStatement(resultSetType, resultSetConcurrency, resultSetHoldability); }
    @Override public PreparedStatement prepareStatement(String sql, int resultSetType, int resultSetConcurrency, int resultSetHoldability) throws SQLException { checkClosed(); return pooledConnection.getConnection().prepareStatement(sql, resultSetType, resultSetConcurrency, resultSetHoldability); }
    @Override public CallableStatement prepareCall(String sql, int resultSetType, int resultSetConcurrency, int resultSetHoldability) throws SQLException { checkClosed(); return pooledConnection.getConnection().prepareCall(sql, resultSetType, resultSetConcurrency, resultSetHoldability); }
    @Override public PreparedStatement prepareStatement(String sql, int autoGeneratedKeys) throws SQLException { checkClosed(); return pooledConnection.getConnection().prepareStatement(sql, autoGeneratedKeys); }
    @Override public PreparedStatement prepareStatement(String sql, int[] columnIndexes) throws SQLException { checkClosed(); return pooledConnection.getConnection().prepareStatement(sql, columnIndexes); }
    @Override public PreparedStatement prepareStatement(String sql, String[] columnNames) throws SQLException { checkClosed(); return pooledConnection.getConnection().prepareStatement(sql, columnNames); }
    @Override public Clob createClob() throws SQLException { checkClosed(); return pooledConnection.getConnection().createClob(); }
    @Override public Blob createBlob() throws SQLException { checkClosed(); return pooledConnection.getConnection().createBlob(); }
    @Override public NClob createNClob() throws SQLException { checkClosed(); return pooledConnection.getConnection().createNClob(); }
    @Override public SQLXML createSQLXML() throws SQLException { checkClosed(); return pooledConnection.getConnection().createSQLXML(); }
    @Override public void setClientInfo(String name, String value) throws SQLClientInfoException { try { checkClosed(); pooledConnection.getConnection().setClientInfo(name, value); } catch (SQLException e) { throw new SQLClientInfoException(); } }
    @Override public void setClientInfo(Properties properties) throws SQLClientInfoException { try { checkClosed(); pooledConnection.getConnection().setClientInfo(properties); } catch (SQLException e) { throw new SQLClientInfoException(); } }
    @Override public String getClientInfo(String name) throws SQLException { checkClosed(); return pooledConnection.getConnection().getClientInfo(name); }
    @Override public Properties getClientInfo() throws SQLException { checkClosed(); return pooledConnection.getConnection().getClientInfo(); }
    @Override public Array createArrayOf(String typeName, Object[] elements) throws SQLException { checkClosed(); return pooledConnection.getConnection().createArrayOf(typeName, elements); }
    @Override public Struct createStruct(String typeName, Object[] attributes) throws SQLException { checkClosed(); return pooledConnection.getConnection().createStruct(typeName, attributes); }
    @Override public void setSchema(String schema) throws SQLException { checkClosed(); pooledConnection.getConnection().setSchema(schema); }
    @Override public String getSchema() throws SQLException { checkClosed(); return pooledConnection.getConnection().getSchema(); }
    @Override public void abort(java.util.concurrent.Executor executor) throws SQLException { checkClosed(); pooledConnection.getConnection().abort(executor); }
    @Override public void setNetworkTimeout(java.util.concurrent.Executor executor, int milliseconds) throws SQLException { checkClosed(); pooledConnection.getConnection().setNetworkTimeout(executor, milliseconds); }
    @Override public int getNetworkTimeout() throws SQLException { checkClosed(); return pooledConnection.getConnection().getNetworkTimeout(); }
    @Override public <T> T unwrap(Class<T> iface) throws SQLException { checkClosed(); return pooledConnection.getConnection().unwrap(iface); }
    @Override public boolean isWrapperFor(Class<?> iface) throws SQLException { checkClosed(); return pooledConnection.getConnection().isWrapperFor(iface); }
}

// Demo class
public class ConnectionPoolDemo {
    private static final String URL = "jdbc:sqlite:pool_test.db";
    
    public static void main(String[] args) {
        // Create connection pool
        SimpleConnectionPool pool = new SimpleConnectionPool(
            URL, "", "", // SQLite doesn't need username/password
            3, 10, // min 3, max 10 connections
            30000, // 30 second connection timeout
            60000  // 60 second max idle time
        );
        
        try {
            // Setup test database
            setupTestDatabase(pool);
            
            // Test concurrent access
            testConcurrentAccess(pool);
            
            // Show pool statistics
            Thread.sleep(2000);
            pool.printStats();
            
            // Test pool under load
            testPoolUnderLoad(pool);
            
            // Final statistics
            Thread.sleep(2000);
            pool.printStats();
            
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            pool.shutdown();
        }
    }
    
    private static void setupTestDatabase(SimpleConnectionPool pool) throws SQLException {
        try (Connection conn = pool.getConnection();
             Statement stmt = conn.createStatement()) {
            
            String createTableSQL = """
                CREATE TABLE IF NOT EXISTS users (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    name TEXT NOT NULL,
                    email TEXT UNIQUE NOT NULL,
                    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
                )
                """;
            
            stmt.executeUpdate(createTableSQL);
            System.out.println("Test database setup complete");
        }
    }
    
    private static void testConcurrentAccess(SimpleConnectionPool pool) {
        System.out.println("\\n=== Testing Concurrent Access ===");
        
        Runnable task = () -> {
            try (Connection conn = pool.getConnection();
                 PreparedStatement pstmt = conn.prepareStatement(
                     "INSERT INTO users (name, email) VALUES (?, ?)")) {
                
                String threadName = Thread.currentThread().getName();
                pstmt.setString(1, "User-" + threadName);
                pstmt.setString(2, threadName + "@example.com");
                
                int result = pstmt.executeUpdate();
                System.out.println(threadName + " inserted " + result + " row(s)");
                
                // Simulate some work
                Thread.sleep(1000);
                
            } catch (SQLException | InterruptedException e) {
                System.err.println("Error in " + Thread.currentThread().getName() + ": " + e.getMessage());
            }
        };
        
        // Start multiple threads
        for (int i = 0; i < 5; i++) {
            Thread thread = new Thread(task, "Thread-" + i);
            thread.start();
        }
    }
    
    private static void testPoolUnderLoad(SimpleConnectionPool pool) {
        System.out.println("\\n=== Testing Pool Under Load ===");
        
        for (int i = 0; i < 15; i++) {
            final int taskId = i;
            
            new Thread(() -> {
                try (Connection conn = pool.getConnection();
                     PreparedStatement pstmt = conn.prepareStatement(
                         "SELECT COUNT(*) FROM users")) {
                    
                    ResultSet rs = pstmt.executeQuery();
                    if (rs.next()) {
                        int count = rs.getInt(1);
                        System.out.println("Task-" + taskId + " found " + count + " users");
                    }
                    
                    // Hold connection for a while
                    Thread.sleep(2000);
                    
                } catch (SQLException | InterruptedException e) {
                    System.err.println("Error in Task-" + taskId + ": " + e.getMessage());
                }
            }, "LoadTask-" + i).start();
        }
    }
}`
          }
        ],
        keyPoints: [
          'JDBC provides a standard API for database connectivity across different database systems',
          'Type 4 (Pure Java) drivers are most commonly used for modern applications',
          'Always close JDBC resources (Connection, Statement, ResultSet) in proper order',
          'Use try-with-resources statement for automatic resource management',
          'Connection pooling significantly improves application performance',
          'PreparedStatement is preferred over Statement for security and performance'
        ]
      },
      {
        id: 'jdbc-operations',
        title: 'JDBC Operations and Best Practices',
        description: 'Complete guide to CRUD operations, transactions, and advanced JDBC techniques',
        content: `
          <h3>JDBC Operations and Best Practices</h3>
          <p>This section covers comprehensive database operations using JDBC, including CRUD operations, transaction management, batch processing, and security best practices.</p>
          
          <h4>CRUD Operations:</h4>
          
          <h5>Create (INSERT) Operations:</h5>
          <ul>
            <li>Use PreparedStatement for parameterized queries</li>
            <li>Handle auto-generated keys when needed</li>
            <li>Perform batch inserts for multiple records</li>
            <li>Validate data before insertion</li>
          </ul>
          
          <h5>Read (SELECT) Operations:</h5>
          <ul>
            <li>Use appropriate ResultSet navigation methods</li>
            <li>Handle different data types correctly</li>
            <li>Implement pagination for large result sets</li>
            <li>Use connection pooling for better performance</li>
          </ul>
          
          <h5>Update Operations:</h5>
          <ul>
            <li>Use WHERE clauses to prevent accidental mass updates</li>
            <li>Check affected row counts</li>
            <li>Handle optimistic locking scenarios</li>
          </ul>
          
          <h5>Delete Operations:</h5>
          <ul>
            <li>Always use WHERE clauses</li>
            <li>Consider soft deletes for important data</li>
            <li>Handle foreign key constraints</li>
          </ul>
          
          <h4>Transaction Management:</h4>
          
          <h5>ACID Properties:</h5>
          <ul>
            <li><strong>Atomicity:</strong> All operations in transaction succeed or all fail</li>
            <li><strong>Consistency:</strong> Database remains in valid state</li>
            <li><strong>Isolation:</strong> Concurrent transactions don't interfere</li>
            <li><strong>Durability:</strong> Committed changes persist</li>
          </ul>
          
          <h5>Transaction Isolation Levels:</h5>
          <ul>
            <li><strong>READ_UNCOMMITTED:</strong> Allows dirty reads</li>
            <li><strong>READ_COMMITTED:</strong> Prevents dirty reads</li>
            <li><strong>REPEATABLE_READ:</strong> Prevents dirty and non-repeatable reads</li>
            <li><strong>SERIALIZABLE:</strong> Highest isolation, prevents all phenomena</li>
          </ul>
          
          <h4>Batch Processing:</h4>
          <ul>
            <li>Use addBatch() and executeBatch() for multiple operations</li>
            <li>Significantly improves performance for bulk operations</li>
            <li>Handle batch exceptions appropriately</li>
            <li>Consider memory usage for large batches</li>
          </ul>
          
          <h4>Security Best Practices:</h4>
          
          <h5>SQL Injection Prevention:</h5>
          <ul>
            <li>Always use PreparedStatement with parameters</li>
            <li>Never concatenate user input directly into SQL</li>
            <li>Validate and sanitize input data</li>
            <li>Use stored procedures when appropriate</li>
          </ul>
          
          <h5>Connection Security:</h5>
          <ul>
            <li>Use encrypted connections (SSL/TLS)</li>
            <li>Store credentials securely</li>
            <li>Use connection pooling with proper authentication</li>
            <li>Implement proper error handling without exposing sensitive information</li>
          </ul>
          
          <h4>Performance Optimization:</h4>
          <ul>
            <li>Use connection pooling</li>
            <li>Optimize SQL queries with proper indexing</li>
            <li>Use batch operations for bulk updates</li>
            <li>Implement proper caching strategies</li>
            <li>Close resources promptly</li>
            <li>Use appropriate fetch sizes for large result sets</li>
          </ul>
          
          <h4>Error Handling:</h4>
          <ul>
            <li>Catch and handle SQLExceptions appropriately</li>
            <li>Use SQLException.getSQLState() and getErrorCode()</li>
            <li>Implement retry logic for transient failures</li>
            <li>Log errors appropriately without exposing sensitive data</li>
          </ul>
        `,
        examples: [
          {
            title: 'Comprehensive CRUD Operations with Best Practices',
            explanation: 'Complete implementation of Create, Read, Update, Delete operations with proper error handling and security practices.',
            code: `import java.sql.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.math.BigDecimal;

// Data Transfer Object
class Employee {
    private int id;
    private String firstName;
    private String lastName;
    private String email;
    private String department;
    private BigDecimal salary;
    private LocalDateTime hireDate;
    private boolean isActive;
    
    // Constructors
    public Employee() {}
    
    public Employee(String firstName, String lastName, String email, 
                   String department, BigDecimal salary) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.department = department;
        this.salary = salary;
        this.isActive = true;
    }
    
    // Getters and setters
    public int getId() { return id; }
    public void setId(int id) { this.id = id; }
    public String getFirstName() { return firstName; }
    public void setFirstName(String firstName) { this.firstName = firstName; }
    public String getLastName() { return lastName; }
    public void setLastName(String lastName) { this.lastName = lastName; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getDepartment() { return department; }
    public void setDepartment(String department) { this.department = department; }
    public BigDecimal getSalary() { return salary; }
    public void setSalary(BigDecimal salary) { this.salary = salary; }
    public LocalDateTime getHireDate() { return hireDate; }
    public void setHireDate(LocalDateTime hireDate) { this.hireDate = hireDate; }
    public boolean isActive() { return isActive; }
    public void setActive(boolean active) { isActive = active; }
    
    @Override
    public String toString() {
        return String.format("Employee{id=%d, name='%s %s', email='%s', dept='%s', salary=%s, hireDate=%s, active=%b}",
                id, firstName, lastName, email, department, salary, hireDate, isActive);
    }
}

// Data Access Object with comprehensive CRUD operations
class EmployeeDAO {
    private Connection connection;
    
    public EmployeeDAO(Connection connection) {
        this.connection = connection;
        createTableIfNotExists();
    }
    
    private void createTableIfNotExists() {
        String createTableSQL = """
            CREATE TABLE IF NOT EXISTS employees (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                first_name VARCHAR(50) NOT NULL,
                last_name VARCHAR(50) NOT NULL,
                email VARCHAR(100) UNIQUE NOT NULL,
                department VARCHAR(50) NOT NULL,
                salary DECIMAL(10,2) NOT NULL CHECK(salary >= 0),
                hire_date DATETIME DEFAULT CURRENT_TIMESTAMP,
                is_active BOOLEAN DEFAULT 1,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
            )
            """;
        
        try (Statement stmt = connection.createStatement()) {
            stmt.executeUpdate(createTableSQL);
            System.out.println("Employee table created/verified successfully");
        } catch (SQLException e) {
            System.err.println("Error creating employee table: " + e.getMessage());
        }
    }
    
    // CREATE operations
    public int insertEmployee(Employee employee) throws SQLException {
        String sql = """
            INSERT INTO employees (first_name, last_name, email, department, salary, is_active) 
            VALUES (?, ?, ?, ?, ?, ?)
            """;
        
        try (PreparedStatement pstmt = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS)) {
            
            // Validate input
            validateEmployee(employee);
            
            // Set parameters
            pstmt.setString(1, employee.getFirstName().trim());
            pstmt.setString(2, employee.getLastName().trim());
            pstmt.setString(3, employee.getEmail().toLowerCase().trim());
            pstmt.setString(4, employee.getDepartment().trim());
            pstmt.setBigDecimal(5, employee.getSalary());
            pstmt.setBoolean(6, employee.isActive());
            
            int affectedRows = pstmt.executeUpdate();
            
            if (affectedRows == 0) {
                throw new SQLException("Creating employee failed, no rows affected");
            }
            
            // Get generated ID
            try (ResultSet generatedKeys = pstmt.getGeneratedKeys()) {
                if (generatedKeys.next()) {
                    int generatedId = generatedKeys.getInt(1);
                    employee.setId(generatedId);
                    System.out.println("Employee created with ID: " + generatedId);
                    return generatedId;
                } else {
                    throw new SQLException("Creating employee failed, no ID obtained");
                }
            }
            
        } catch (SQLException e) {
            System.err.println("Error inserting employee: " + e.getMessage());
            throw e;
        }
    }
    
    public void insertEmployeesBatch(List<Employee> employees) throws SQLException {
        String sql = """
            INSERT INTO employees (first_name, last_name, email, department, salary, is_active) 
            VALUES (?, ?, ?, ?, ?, ?)
            """;
        
        try (PreparedStatement pstmt = connection.prepareStatement(sql)) {
            connection.setAutoCommit(false); // Start transaction
            
            for (Employee employee : employees) {
                validateEmployee(employee);
                
                pstmt.setString(1, employee.getFirstName().trim());
                pstmt.setString(2, employee.getLastName().trim());
                pstmt.setString(3, employee.getEmail().toLowerCase().trim());
                pstmt.setString(4, employee.getDepartment().trim());
                pstmt.setBigDecimal(5, employee.getSalary());
                pstmt.setBoolean(6, employee.isActive());
                
                pstmt.addBatch();
            }
            
            int[] results = pstmt.executeBatch();
            connection.commit();
            
            System.out.println("Batch insert completed. Rows affected: " + results.length);
            
        } catch (SQLException e) {
            connection.rollback();
            System.err.println("Batch insert failed, rolled back: " + e.getMessage());
            throw e;
        } finally {
            connection.setAutoCommit(true); // Reset to auto-commit
        }
    }
    
    // READ operations
    public Optional<Employee> findById(int id) throws SQLException {
        String sql = "SELECT * FROM employees WHERE id = ?";
        
        try (PreparedStatement pstmt = connection.prepareStatement(sql)) {
            pstmt.setInt(1, id);
            
            try (ResultSet rs = pstmt.executeQuery()) {
                if (rs.next()) {
                    return Optional.of(mapResultSetToEmployee(rs));
                } else {
                    return Optional.empty();
                }
            }
        }
    }
    
    public List<Employee> findAll() throws SQLException {
        return findAll(0, Integer.MAX_VALUE);
    }
    
    public List<Employee> findAll(int offset, int limit) throws SQLException {
        String sql = "SELECT * FROM employees ORDER BY id LIMIT ? OFFSET ?";
        List<Employee> employees = new ArrayList<>();
        
        try (PreparedStatement pstmt = connection.prepareStatement(sql)) {
            pstmt.setInt(1, limit);
            pstmt.setInt(2, offset);
            
            try (ResultSet rs = pstmt.executeQuery()) {
                while (rs.next()) {
                    employees.add(mapResultSetToEmployee(rs));
                }
            }
        }
        
        return employees;
    }
    
    public List<Employee> findByDepartment(String department) throws SQLException {
        String sql = "SELECT * FROM employees WHERE department = ? AND is_active = 1 ORDER BY last_name, first_name";
        List<Employee> employees = new ArrayList<>();
        
        try (PreparedStatement pstmt = connection.prepareStatement(sql)) {
            pstmt.setString(1, department);
            
            try (ResultSet rs = pstmt.executeQuery()) {
                while (rs.next()) {
                    employees.add(mapResultSetToEmployee(rs));
                }
            }
        }
        
        return employees;
    }
    
    public List<Employee> findBySalaryRange(BigDecimal minSalary, BigDecimal maxSalary) throws SQLException {
        String sql = "SELECT * FROM employees WHERE salary BETWEEN ? AND ? AND is_active = 1 ORDER BY salary DESC";
        List<Employee> employees = new ArrayList<>();
        
        try (PreparedStatement pstmt = connection.prepareStatement(sql)) {
            pstmt.setBigDecimal(1, minSalary);
            pstmt.setBigDecimal(2, maxSalary);
            
            try (ResultSet rs = pstmt.executeQuery()) {
                while (rs.next()) {
                    employees.add(mapResultSetToEmployee(rs));
                }
            }
        }
        
        return employees;
    }
    
    public int getTotalCount() throws SQLException {
        String sql = "SELECT COUNT(*) FROM employees WHERE is_active = 1";
        
        try (Statement stmt = connection.createStatement();
             ResultSet rs = stmt.executeQuery(sql)) {
            
            if (rs.next()) {
                return rs.getInt(1);
            }
            return 0;
        }
    }
    
    // UPDATE operations
    public boolean updateEmployee(Employee employee) throws SQLException {
        String sql = """
            UPDATE employees 
            SET first_name = ?, last_name = ?, email = ?, department = ?, 
                salary = ?, is_active = ?, updated_at = CURRENT_TIMESTAMP 
            WHERE id = ?
            """;
        
        try (PreparedStatement pstmt = connection.prepareStatement(sql)) {
            validateEmployee(employee);
            
            pstmt.setString(1, employee.getFirstName().trim());
            pstmt.setString(2, employee.getLastName().trim());
            pstmt.setString(3, employee.getEmail().toLowerCase().trim());
            pstmt.setString(4, employee.getDepartment().trim());
            pstmt.setBigDecimal(5, employee.getSalary());
            pstmt.setBoolean(6, employee.isActive());
            pstmt.setInt(7, employee.getId());
            
            int affectedRows = pstmt.executeUpdate();
            boolean updated = affectedRows > 0;
            
            if (updated) {
                System.out.println("Employee updated successfully: ID " + employee.getId());
            } else {
                System.out.println("No employee found with ID: " + employee.getId());
            }
            
            return updated;
        }
    }
    
    public boolean updateSalary(int employeeId, BigDecimal newSalary) throws SQLException {
        String sql = "UPDATE employees SET salary = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ? AND is_active = 1";
        
        if (newSalary.compareTo(BigDecimal.ZERO) < 0) {
            throw new IllegalArgumentException("Salary cannot be negative");
        }
        
        try (PreparedStatement pstmt = connection.prepareStatement(sql)) {
            pstmt.setBigDecimal(1, newSalary);
            pstmt.setInt(2, employeeId);
            
            int affectedRows = pstmt.executeUpdate();
            boolean updated = affectedRows > 0;
            
            if (updated) {
                System.out.println("Salary updated for employee ID " + employeeId + " to " + newSalary);
            }
            
            return updated;
        }
    }
    
    // DELETE operations
    public boolean deleteEmployee(int id) throws SQLException {
        // Soft delete - set is_active to false
        return softDeleteEmployee(id);
    }
    
    public boolean softDeleteEmployee(int id) throws SQLException {
        String sql = "UPDATE employees SET is_active = 0, updated_at = CURRENT_TIMESTAMP WHERE id = ?";
        
        try (PreparedStatement pstmt = connection.prepareStatement(sql)) {
            pstmt.setInt(1, id);
            
            int affectedRows = pstmt.executeUpdate();
            boolean deleted = affectedRows > 0;
            
            if (deleted) {
                System.out.println("Employee soft deleted: ID " + id);
            } else {
                System.out.println("No employee found with ID: " + id);
            }
            
            return deleted;
        }
    }
    
    public boolean hardDeleteEmployee(int id) throws SQLException {
        String sql = "DELETE FROM employees WHERE id = ?";
        
        try (PreparedStatement pstmt = connection.prepareStatement(sql)) {
            pstmt.setInt(1, id);
            
            int affectedRows = pstmt.executeUpdate();
            boolean deleted = affectedRows > 0;
            
            if (deleted) {
                System.out.println("Employee permanently deleted: ID " + id);
            }
            
            return deleted;
        }
    }
    
    // Helper methods
    private Employee mapResultSetToEmployee(ResultSet rs) throws SQLException {
        Employee employee = new Employee();
        employee.setId(rs.getInt("id"));
        employee.setFirstName(rs.getString("first_name"));
        employee.setLastName(rs.getString("last_name"));
        employee.setEmail(rs.getString("email"));
        employee.setDepartment(rs.getString("department"));
        employee.setSalary(rs.getBigDecimal("salary"));
        
        // Handle datetime conversion
        Timestamp hireDate = rs.getTimestamp("hire_date");
        if (hireDate != null) {
            employee.setHireDate(hireDate.toLocalDateTime());
        }
        
        employee.setActive(rs.getBoolean("is_active"));
        
        return employee;
    }
    
    private void validateEmployee(Employee employee) {
        if (employee == null) {
            throw new IllegalArgumentException("Employee cannot be null");
        }
        
        if (employee.getFirstName() == null || employee.getFirstName().trim().isEmpty()) {
            throw new IllegalArgumentException("First name is required");
        }
        
        if (employee.getLastName() == null || employee.getLastName().trim().isEmpty()) {
            throw new IllegalArgumentException("Last name is required");
        }
        
        if (employee.getEmail() == null || employee.getEmail().trim().isEmpty()) {
            throw new IllegalArgumentException("Email is required");
        }
        
        if (!isValidEmail(employee.getEmail())) {
            throw new IllegalArgumentException("Invalid email format");
        }
        
        if (employee.getDepartment() == null || employee.getDepartment().trim().isEmpty()) {
            throw new IllegalArgumentException("Department is required");
        }
        
        if (employee.getSalary() == null || employee.getSalary().compareTo(BigDecimal.ZERO) < 0) {
            throw new IllegalArgumentException("Salary must be non-negative");
        }
    }
    
    private boolean isValidEmail(String email) {
        return email != null && email.contains("@") && email.contains(".") && email.length() > 5;
    }
}

// Demo class showcasing all CRUD operations
public class CRUDOperationsDemo {
    private static final String DATABASE_URL = "jdbc:sqlite:employee_db.db";
    
    public static void main(String[] args) {
        try (Connection connection = DriverManager.getConnection(DATABASE_URL)) {
            connection.setAutoCommit(true);
            
            EmployeeDAO employeeDAO = new EmployeeDAO(connection);
            
            // Test all CRUD operations
            testCreateOperations(employeeDAO);
            testReadOperations(employeeDAO);
            testUpdateOperations(employeeDAO);
            testDeleteOperations(employeeDAO);
            
            // Test batch operations
            testBatchOperations(employeeDAO);
            
        } catch (SQLException e) {
            System.err.println("Database error: " + e.getMessage());
            e.printStackTrace();
        }
    }
    
    private static void testCreateOperations(EmployeeDAO dao) throws SQLException {
        System.out.println("\\n=== Testing CREATE Operations ===");
        
        // Create individual employees
        Employee emp1 = new Employee("John", "Doe", "john.doe@company.com", "IT", new BigDecimal("75000.00"));
        Employee emp2 = new Employee("Jane", "Smith", "jane.smith@company.com", "HR", new BigDecimal("65000.00"));
        Employee emp3 = new Employee("Bob", "Johnson", "bob.johnson@company.com", "Finance", new BigDecimal("70000.00"));
        
        dao.insertEmployee(emp1);
        dao.insertEmployee(emp2);
        dao.insertEmployee(emp3);
        
        System.out.println("Created 3 employees successfully");
    }
    
    private static void testReadOperations(EmployeeDAO dao) throws SQLException {
        System.out.println("\\n=== Testing READ Operations ===");
        
        // Find all employees
        System.out.println("\\nAll employees:");
        List<Employee> allEmployees = dao.findAll();
        allEmployees.forEach(System.out::println);
        
        // Find by ID
        System.out.println("\\nFind by ID (1):");
        Optional<Employee> foundEmployee = dao.findById(1);
        foundEmployee.ifPresent(System.out::println);
        
        // Find by department
        System.out.println("\\nFind by department (IT):");
        List<Employee> itEmployees = dao.findByDepartment("IT");
        itEmployees.forEach(System.out::println);
        
        // Find by salary range
        System.out.println("\\nFind by salary range (60000-70000):");
        List<Employee> salaryRangeEmployees = dao.findBySalaryRange(
            new BigDecimal("60000"), new BigDecimal("70000"));
        salaryRangeEmployees.forEach(System.out::println);
        
        // Get total count
        System.out.println("\\nTotal active employees: " + dao.getTotalCount());
    }
    
    private static void testUpdateOperations(EmployeeDAO dao) throws SQLException {
        System.out.println("\\n=== Testing UPDATE Operations ===");
        
        // Update employee information
        Optional<Employee> employeeOpt = dao.findById(1);
        if (employeeOpt.isPresent()) {
            Employee employee = employeeOpt.get();
            employee.setDepartment("Senior IT");
            employee.setSalary(new BigDecimal("80000.00"));
            
            boolean updated = dao.updateEmployee(employee);
            System.out.println("Employee update result: " + updated);
            
            // Verify update
            dao.findById(1).ifPresent(emp -> 
                System.out.println("Updated employee: " + emp));
        }
        
        // Update salary only
        dao.updateSalary(2, new BigDecimal("68000.00"));
    }
    
    private static void testDeleteOperations(EmployeeDAO dao) throws SQLException {
        System.out.println("\\n=== Testing DELETE Operations ===");
        
        // Soft delete
        boolean softDeleted = dao.softDeleteEmployee(3);
        System.out.println("Soft delete result: " + softDeleted);
        
        System.out.println("\\nActive employees after soft delete:");
        dao.findAll().forEach(System.out::println);
    }
    
    private static void testBatchOperations(EmployeeDAO dao) throws SQLException {
        System.out.println("\\n=== Testing BATCH Operations ===");
        
        List<Employee> batchEmployees = new ArrayList<>();
        batchEmployees.add(new Employee("Alice", "Williams", "alice.williams@company.com", "Marketing", new BigDecimal("55000.00")));
        batchEmployees.add(new Employee("Charlie", "Brown", "charlie.brown@company.com", "Sales", new BigDecimal("60000.00")));
        batchEmployees.add(new Employee("Diana", "Davis", "diana.davis@company.com", "IT", new BigDecimal("72000.00")));
        
        dao.insertEmployeesBatch(batchEmployees);
        
        System.out.println("\\nAll employees after batch insert:");
        dao.findAll().forEach(System.out::println);
    }
}`
          },
          {
            title: 'Advanced Transaction Management and Error Handling',
            explanation: 'Comprehensive implementation of transaction management, error handling, and advanced JDBC features.',
            code: `import java.sql.*;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

// Custom exceptions for better error handling
class DatabaseException extends Exception {
    public DatabaseException(String message, Throwable cause) {
        super(message, cause);
    }
}

class TransactionException extends Exception {
    public TransactionException(String message, Throwable cause) {
        super(message, cause);
    }
}

// Account class for banking example
class BankAccount {
    private int accountId;
    private String accountNumber;
    private String accountHolder;
    private BigDecimal balance;
    private boolean isActive;
    
    public BankAccount(String accountNumber, String accountHolder, BigDecimal balance) {
        this.accountNumber = accountNumber;
        this.accountHolder = accountHolder;
        this.balance = balance;
        this.isActive = true;
    }
    
    // Getters and setters
    public int getAccountId() { return accountId; }
    public void setAccountId(int accountId) { this.accountId = accountId; }
    public String getAccountNumber() { return accountNumber; }
    public void setAccountNumber(String accountNumber) { this.accountNumber = accountNumber; }
    public String getAccountHolder() { return accountHolder; }
    public void setAccountHolder(String accountHolder) { this.accountHolder = accountHolder; }
    public BigDecimal getBalance() { return balance; }
    public void setBalance(BigDecimal balance) { this.balance = balance; }
    public boolean isActive() { return isActive; }
    public void setActive(boolean active) { isActive = active; }
    
    @Override
    public String toString() {
        return String.format("BankAccount{id=%d, accountNumber='%s', holder='%s', balance=%s, active=%b}",
                accountId, accountNumber, accountHolder, balance, isActive);
    }
}

// Transaction record
class Transaction {
    private int transactionId;
    private int fromAccountId;
    private int toAccountId;
    private BigDecimal amount;
    private String type; // DEBIT, CREDIT, TRANSFER
    private String description;
    private Timestamp timestamp;
    
    public Transaction(int fromAccountId, int toAccountId, BigDecimal amount, String type, String description) {
        this.fromAccountId = fromAccountId;
        this.toAccountId = toAccountId;
        this.amount = amount;
        this.type = type;
        this.description = description;
    }
    
    // Getters and setters
    public int getTransactionId() { return transactionId; }
    public void setTransactionId(int transactionId) { this.transactionId = transactionId; }
    public int getFromAccountId() { return fromAccountId; }
    public void setFromAccountId(int fromAccountId) { this.fromAccountId = fromAccountId; }
    public int getToAccountId() { return toAccountId; }
    public void setToAccountId(int toAccountId) { this.toAccountId = toAccountId; }
    public BigDecimal getAmount() { return amount; }
    public void setAmount(BigDecimal amount) { this.amount = amount; }
    public String getType() { return type; }
    public void setType(String type) { this.type = type; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public Timestamp getTimestamp() { return timestamp; }
    public void setTimestamp(Timestamp timestamp) { this.timestamp = timestamp; }
    
    @Override
    public String toString() {
        return String.format("Transaction{id=%d, from=%d, to=%d, amount=%s, type='%s', desc='%s', time=%s}",
                transactionId, fromAccountId, toAccountId, amount, type, description, timestamp);
    }
}

// Banking service with transaction management
class BankingService {
    private Connection connection;
    
    public BankingService(Connection connection) {
        this.connection = connection;
        initializeTables();
    }
    
    private void initializeTables() {
        try {
            // Create accounts table
            String createAccountsTable = """
                CREATE TABLE IF NOT EXISTS accounts (
                    account_id INTEGER PRIMARY KEY AUTOINCREMENT,
                    account_number VARCHAR(20) UNIQUE NOT NULL,
                    account_holder VARCHAR(100) NOT NULL,
                    balance DECIMAL(15,2) NOT NULL DEFAULT 0.00,
                    is_active BOOLEAN DEFAULT 1,
                    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
                )
                """;
            
            // Create transactions table
            String createTransactionsTable = """
                CREATE TABLE IF NOT EXISTS transactions (
                    transaction_id INTEGER PRIMARY KEY AUTOINCREMENT,
                    from_account_id INTEGER,
                    to_account_id INTEGER,
                    amount DECIMAL(15,2) NOT NULL,
                    transaction_type VARCHAR(20) NOT NULL,
                    description TEXT,
                    transaction_date DATETIME DEFAULT CURRENT_TIMESTAMP,
                    FOREIGN KEY (from_account_id) REFERENCES accounts(account_id),
                    FOREIGN KEY (to_account_id) REFERENCES accounts(account_id)
                )
                """;
            
            try (Statement stmt = connection.createStatement()) {
                stmt.executeUpdate(createAccountsTable);
                stmt.executeUpdate(createTransactionsTable);
                System.out.println("Banking tables initialized successfully");
            }
            
        } catch (SQLException e) {
            System.err.println("Error initializing tables: " + e.getMessage());
        }
    }
    
    // Create account with proper transaction handling
    public int createAccount(BankAccount account) throws DatabaseException {
        String sql = "INSERT INTO accounts (account_number, account_holder, balance, is_active) VALUES (?, ?, ?, ?)";
        
        try (PreparedStatement pstmt = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS)) {
            
            pstmt.setString(1, account.getAccountNumber());
            pstmt.setString(2, account.getAccountHolder());
            pstmt.setBigDecimal(3, account.getBalance());
            pstmt.setBoolean(4, account.isActive());
            
            int affectedRows = pstmt.executeUpdate();
            
            if (affectedRows == 0) {
                throw new DatabaseException("Creating account failed, no rows affected", null);
            }
            
            try (ResultSet generatedKeys = pstmt.getGeneratedKeys()) {
                if (generatedKeys.next()) {
                    int accountId = generatedKeys.getInt(1);
                    account.setAccountId(accountId);
                    
                    // Log initial deposit if balance > 0
                    if (account.getBalance().compareTo(BigDecimal.ZERO) > 0) {
                        logTransaction(new Transaction(0, accountId, account.getBalance(), "CREDIT", "Initial deposit"));
                    }
                    
                    return accountId;
                } else {
                    throw new DatabaseException("Creating account failed, no ID obtained", null);
                }
            }
            
        } catch (SQLException e) {
            throw new DatabaseException("Error creating account: " + e.getMessage(), e);
        }
    }
    
    // Transfer money between accounts with full transaction support
    public void transferMoney(String fromAccountNumber, String toAccountNumber, 
                            BigDecimal amount, String description) throws TransactionException {
        
        if (amount.compareTo(BigDecimal.ZERO) <= 0) {
            throw new TransactionException("Transfer amount must be positive", null);
        }
        
        Connection conn = null;
        Savepoint savepoint = null;
        
        try {
            conn = connection;
            
            // Start transaction
            conn.setAutoCommit(false);
            
            // Set transaction isolation level
            conn.setTransactionIsolation(Connection.TRANSACTION_READ_COMMITTED);
            
            // Create savepoint for partial rollback if needed
            savepoint = conn.setSavepoint("transfer_start");
            
            // Get account details with row locking
            BankAccount fromAccount = getAccountForUpdate(fromAccountNumber);
            BankAccount toAccount = getAccountForUpdate(toAccountNumber);
            
            // Validate accounts
            if (fromAccount == null) {
                throw new TransactionException("Source account not found: " + fromAccountNumber, null);
            }
            if (toAccount == null) {
                throw new TransactionException("Destination account not found: " + toAccountNumber, null);
            }
            if (!fromAccount.isActive() || !toAccount.isActive()) {
                throw new TransactionException("One or both accounts are inactive", null);
            }
            if (fromAccount.getBalance().compareTo(amount) < 0) {
                throw new TransactionException("Insufficient funds in source account", null);
            }
            
            // Perform the transfer
            debitAccount(fromAccount.getAccountId(), amount);
            creditAccount(toAccount.getAccountId(), amount);
            
            // Log the transaction
            Transaction transaction = new Transaction(
                fromAccount.getAccountId(), 
                toAccount.getAccountId(), 
                amount, 
                "TRANSFER", 
                description != null ? description : "Money transfer"
            );
            logTransaction(transaction);
            
            // Commit transaction
            conn.commit();
            
            System.out.printf("Transfer successful: %s -> %s, Amount: %s%n", 
                fromAccountNumber, toAccountNumber, amount);
            
        } catch (SQLException e) {
            try {
                if (savepoint != null) {
                    conn.rollback(savepoint);
                    System.out.println("Transaction rolled back to savepoint");
                } else if (conn != null) {
                    conn.rollback();
                    System.out.println("Transaction rolled back completely");
                }
            } catch (SQLException rollbackEx) {
                System.err.println("Error during rollback: " + rollbackEx.getMessage());
            }
            
            throw new TransactionException("Transfer failed: " + e.getMessage(), e);
            
        } catch (TransactionException e) {
            try {
                if (conn != null) {
                    conn.rollback();
                    System.out.println("Transaction rolled back due to business rule violation");
                }
            } catch (SQLException rollbackEx) {
                System.err.println("Error during rollback: " + rollbackEx.getMessage());
            }
            throw e;
            
        } finally {
            try {
                if (conn != null) {
                    conn.setAutoCommit(true); // Reset to auto-commit
                }
            } catch (SQLException e) {
                System.err.println("Error resetting auto-commit: " + e.getMessage());
            }
        }
    }
    
    // Batch transfer with transaction management
    public void batchTransfer(List<TransferRequest> transfers) throws TransactionException {
        Connection conn = null;
        
        try {
            conn = connection;
            conn.setAutoCommit(false);
            
            System.out.println("Starting batch transfer of " + transfers.size() + " transactions");
            
            for (int i = 0; i < transfers.size(); i++) {
                TransferRequest request = transfers.get(i);
                
                try {
                    // Create savepoint for each transfer
                    Savepoint savepoint = conn.setSavepoint("transfer_" + i);
                    
                    transferMoney(request.fromAccount, request.toAccount, 
                                request.amount, request.description);
                    
                    System.out.println("Batch transfer " + (i + 1) + " completed");
                    
                } catch (TransactionException e) {
                    System.err.println("Batch transfer " + (i + 1) + " failed: " + e.getMessage());
                    
                    // Rollback to savepoint and continue with next transfer
                    Savepoint savepoint = conn.setSavepoint("transfer_" + i);
                    conn.rollback(savepoint);
                    
                    // Optionally, you could choose to fail the entire batch here
                    // throw e;
                }
            }
            
            conn.commit();
            System.out.println("Batch transfer completed successfully");
            
        } catch (SQLException e) {
            try {
                if (conn != null) {
                    conn.rollback();
                }
            } catch (SQLException rollbackEx) {
                System.err.println("Error during batch rollback: " + rollbackEx.getMessage());
            }
            
            throw new TransactionException("Batch transfer failed: " + e.getMessage(), e);
            
        } finally {
            try {
                if (conn != null) {
                    conn.setAutoCommit(true);
                }
            } catch (SQLException e) {
                System.err.println("Error resetting auto-commit: " + e.getMessage());
            }
        }
    }
    
    // Get account with row locking (SELECT FOR UPDATE)
    private BankAccount getAccountForUpdate(String accountNumber) throws SQLException {
        String sql = "SELECT * FROM accounts WHERE account_number = ? AND is_active = 1";
        
        try (PreparedStatement pstmt = connection.prepareStatement(sql)) {
            pstmt.setString(1, accountNumber);
            
            try (ResultSet rs = pstmt.executeQuery()) {
                if (rs.next()) {
                    BankAccount account = new BankAccount(
                        rs.getString("account_number"),
                        rs.getString("account_holder"),
                        rs.getBigDecimal("balance")
                    );
                    account.setAccountId(rs.getInt("account_id"));
                    account.setActive(rs.getBoolean("is_active"));
                    return account;
                }
            }
        }
        
        return null;
    }
    
    private void debitAccount(int accountId, BigDecimal amount) throws SQLException {
        String sql = "UPDATE accounts SET balance = balance - ?, updated_at = CURRENT_TIMESTAMP WHERE account_id = ?";
        
        try (PreparedStatement pstmt = connection.prepareStatement(sql)) {
            pstmt.setBigDecimal(1, amount);
            pstmt.setInt(2, accountId);
            
            int affectedRows = pstmt.executeUpdate();
            if (affectedRows == 0) {
                throw new SQLException("Failed to debit account: " + accountId);
            }
        }
    }
    
    private void creditAccount(int accountId, BigDecimal amount) throws SQLException {
        String sql = "UPDATE accounts SET balance = balance + ?, updated_at = CURRENT_TIMESTAMP WHERE account_id = ?";
        
        try (PreparedStatement pstmt = connection.prepareStatement(sql)) {
            pstmt.setBigDecimal(1, amount);
            pstmt.setInt(2, accountId);
            
            int affectedRows = pstmt.executeUpdate();
            if (affectedRows == 0) {
                throw new SQLException("Failed to credit account: " + accountId);
            }
        }
    }
    
    private void logTransaction(Transaction transaction) throws SQLException {
        String sql = """
            INSERT INTO transactions (from_account_id, to_account_id, amount, transaction_type, description) 
            VALUES (?, ?, ?, ?, ?)
            """;
        
        try (PreparedStatement pstmt = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS)) {
            pstmt.setObject(1, transaction.getFromAccountId() == 0 ? null : transaction.getFromAccountId());
            pstmt.setObject(2, transaction.getToAccountId() == 0 ? null : transaction.getToAccountId());
            pstmt.setBigDecimal(3, transaction.getAmount());
            pstmt.setString(4, transaction.getType());
            pstmt.setString(5, transaction.getDescription());
            
            pstmt.executeUpdate();
            
            try (ResultSet generatedKeys = pstmt.getGeneratedKeys()) {
                if (generatedKeys.next()) {
                    transaction.setTransactionId(generatedKeys.getInt(1));
                }
            }
        }
    }
    
    // Get account balance
    public BigDecimal getAccountBalance(String accountNumber) throws DatabaseException {
        String sql = "SELECT balance FROM accounts WHERE account_number = ? AND is_active = 1";
        
        try (PreparedStatement pstmt = connection.prepareStatement(sql)) {
            pstmt.setString(1, accountNumber);
            
            try (ResultSet rs = pstmt.executeQuery()) {
                if (rs.next()) {
                    return rs.getBigDecimal("balance");
                } else {
                    throw new DatabaseException("Account not found: " + accountNumber, null);
                }
            }
        } catch (SQLException e) {
            throw new DatabaseException("Error getting account balance: " + e.getMessage(), e);
        }
    }
    
    // Get transaction history
    public List<Transaction> getTransactionHistory(String accountNumber, int limit) throws DatabaseException {
        String sql = """
            SELECT t.*, a1.account_number as from_account, a2.account_number as to_account
            FROM transactions t
            LEFT JOIN accounts a1 ON t.from_account_id = a1.account_id
            LEFT JOIN accounts a2 ON t.to_account_id = a2.account_id
            WHERE a1.account_number = ? OR a2.account_number = ?
            ORDER BY t.transaction_date DESC
            LIMIT ?
            """;
        
        List<Transaction> transactions = new ArrayList<>();
        
        try (PreparedStatement pstmt = connection.prepareStatement(sql)) {
            pstmt.setString(1, accountNumber);
            pstmt.setString(2, accountNumber);
            pstmt.setInt(3, limit);
            
            try (ResultSet rs = pstmt.executeQuery()) {
                while (rs.next()) {
                    Transaction transaction = new Transaction(
                        rs.getInt("from_account_id"),
                        rs.getInt("to_account_id"),
                        rs.getBigDecimal("amount"),
                        rs.getString("transaction_type"),
                        rs.getString("description")
                    );
                    transaction.setTransactionId(rs.getInt("transaction_id"));
                    transaction.setTimestamp(rs.getTimestamp("transaction_date"));
                    transactions.add(transaction);
                }
            }
        } catch (SQLException e) {
            throw new DatabaseException("Error getting transaction history: " + e.getMessage(), e);
        }
        
        return transactions;
    }
}

// Transfer request class for batch operations
class TransferRequest {
    public String fromAccount;
    public String toAccount;
    public BigDecimal amount;
    public String description;
    
    public TransferRequest(String fromAccount, String toAccount, BigDecimal amount, String description) {
        this.fromAccount = fromAccount;
        this.toAccount = toAccount;
        this.amount = amount;
        this.description = description;
    }
}

// Demo class
public class TransactionManagementDemo {
    private static final String DATABASE_URL = "jdbc:sqlite:banking_db.db";
    
    public static void main(String[] args) {
        try (Connection connection = DriverManager.getConnection(DATABASE_URL)) {
            
            BankingService bankingService = new BankingService(connection);
            
            // Create test accounts
            setupTestAccounts(bankingService);
            
            // Test individual transfers
            testIndividualTransfers(bankingService);
            
            // Test batch transfers
            testBatchTransfers(bankingService);
            
            // Test error scenarios
            testErrorScenarios(bankingService);
            
            // Show final balances and transaction history
            showAccountSummary(bankingService);
            
        } catch (SQLException e) {
            System.err.println("Database connection error: " + e.getMessage());
            e.printStackTrace();
        }
    }
    
    private static void setupTestAccounts(BankingService service) throws DatabaseException {
        System.out.println("=== Setting up test accounts ===");
        
        BankAccount account1 = new BankAccount("ACC001", "John Doe", new BigDecimal("10000.00"));
        BankAccount account2 = new BankAccount("ACC002", "Jane Smith", new BigDecimal("5000.00"));
        BankAccount account3 = new BankAccount("ACC003", "Bob Johnson", new BigDecimal("2000.00"));
        
        service.createAccount(account1);
        service.createAccount(account2);
        service.createAccount(account3);
        
        System.out.println("Test accounts created successfully");
    }
    
    private static void testIndividualTransfers(BankingService service) {
        System.out.println("\\n=== Testing individual transfers ===");
        
        try {
            service.transferMoney("ACC001", "ACC002", new BigDecimal("1000.00"), "Test transfer 1");
            service.transferMoney("ACC002", "ACC003", new BigDecimal("500.00"), "Test transfer 2");
            
            System.out.println("Individual transfers completed successfully");
            
        } catch (TransactionException e) {
            System.err.println("Transfer failed: " + e.getMessage());
        }
    }
    
    private static void testBatchTransfers(BankingService service) {
        System.out.println("\\n=== Testing batch transfers ===");
        
        List<TransferRequest> batchRequests = new ArrayList<>();
        batchRequests.add(new TransferRequest("ACC001", "ACC003", new BigDecimal("200.00"), "Batch transfer 1"));
        batchRequests.add(new TransferRequest("ACC002", "ACC001", new BigDecimal("300.00"), "Batch transfer 2"));
        batchRequests.add(new TransferRequest("ACC003", "ACC002", new BigDecimal("100.00"), "Batch transfer 3"));
        
        try {
            service.batchTransfer(batchRequests);
        } catch (TransactionException e) {
            System.err.println("Batch transfer failed: " + e.getMessage());
        }
    }
    
    private static void testErrorScenarios(BankingService service) {
        System.out.println("\\n=== Testing error scenarios ===");
        
        try {
            // Test insufficient funds
            service.transferMoney("ACC003", "ACC001", new BigDecimal("10000.00"), "Should fail - insufficient funds");
        } catch (TransactionException e) {
            System.out.println("Expected error caught: " + e.getMessage());
        }
        
        try {
            // Test invalid account
            service.transferMoney("ACC999", "ACC001", new BigDecimal("100.00"), "Should fail - invalid account");
        } catch (TransactionException e) {
            System.out.println("Expected error caught: " + e.getMessage());
        }
    }
    
    private static void showAccountSummary(BankingService service) {
        System.out.println("\\n=== Account Summary ===");
        
        String[] accounts = {"ACC001", "ACC002", "ACC003"};
        
        for (String accountNumber : accounts) {
            try {
                BigDecimal balance = service.getAccountBalance(accountNumber);
                System.out.println("Account " + accountNumber + " balance: " + balance);
                
                List<Transaction> history = service.getTransactionHistory(accountNumber, 5);
                System.out.println("Recent transactions:");
                history.forEach(t -> System.out.println("  " + t));
                System.out.println();
                
            } catch (DatabaseException e) {
                System.err.println("Error getting account info: " + e.getMessage());
            }
        }
    }
}`
          }
        ],
        keyPoints: [
          'Always use PreparedStatement to prevent SQL injection attacks',
          'Implement proper transaction management with commit/rollback for data consistency',
          'Use connection pooling for better performance in multi-user applications',
          'Handle SQLException appropriately and provide meaningful error messages',
          'Validate input data before executing database operations',
          'Use batch operations for bulk data processing to improve performance'
        ]
      }
    ]
  }
];

export default notesData;
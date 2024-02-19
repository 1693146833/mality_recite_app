const defaultCardGroups: {
  id: string;
  name: string;
  cardList: {
    back: string;
    front: string;
    hint: string;
    tag: [string];
    progress: number;
    id: string;
    timestamp: number;
  }[];
}[] = [
  {
    id: "1",
    name: "Algorithm analysis and design",
    cardList: [
      {
        front: "What is the time complexity of the following code?",
        back: "O(n^2)",
        hint: "Time complexity",
        tag: ["Algorithm"],
        progress: 0,
        id: "1",
        timestamp: 1703914808432,
      },
      {
        front: "Decrease and Conquer Method:",
        back: "The design concept of the decrease and conquer method is similar to the divide and conquer method, but it does not require solving each subproblem separately. Instead, it only needs to solve one of the subproblems. Binary search is a classic application of the decrease and conquer method. Binary search starts with a sorted list, compares the middle element with the target value, and depending on the result, continues the search in either the left or right half of the list. This process is repeated until the target value is found or the search range is empty.",
        hint: "Decrease and Conquer",
        tag: ["Algorithm"],
        progress: 0,
        id: "2",
        timestamp: 1703914808432,
      },
      {
        front: "Full Binary Tree and Complete Binary Tree",
        back: `Full Binary Tree: A binary tree in which every node has either 0 or 2 children (no nodes with only one child)
                Complete Binary Tree: A binary tree in which all levels are completely filled except possibly the last level, which is filled from left to right.`,
        hint: "Binary Tree",
        tag: ["Data Structure"],
        progress: 0,
        id: "3",
        timestamp: 1703914808432,
      },
      {
        front:
          "What are the two main types of file logical structures, and how do they differ in terms of organization and data representation within files? ",
        back: `The two main types of file logical structures are record structures and tree structures.
                Record structures are organized as a sequence of records, with each record containing a number of data fields. The data representation within files is usually in the form of a two-dimensional array of data items, with each row in the array representing a record and each column representing a data field within a record.
                Tree structures are organized as a set of tree nodes, with each node containing a number of data fields. The data representation within files is usually in the form of a tree, with each node representing a record and each branch representing a data field within a record.`,
        hint: "File logical structures",
        tag: ["Data Structure"],
        progress: 1,
        id: "4",
        timestamp: 1703914808432,
      },
      {
        front:
          "What is virtual memory, and how does it help in efficient memory management and the execution of large programs? ",
        back: `Virtual memory is a technique that allows the execution of processes that are not completely in memory. This technique is implemented by breaking the process into smaller units called pages. The pages are loaded into memory as needed. The main advantage of virtual memory is that it allows us to execute processes that are not completely in memory, thus allowing us to execute large programs even when the physical memory is small.`,
        hint: "Virtual memory",
        tag: ["Operating System"],
        progress: 2,
        id: "5",
        timestamp: 1703914808432,
      },
      {
        front: "What is the difference between a process and a thread? ",
        back: `A process is a program in execution. A thread is a subset of the process. A process can have multiple threads. A thread is a basic unit of CPU utilization. A process is a basic unit of resource utilization.`,
        hint: "Process and Thread",
        tag: ["Operating System"],
        progress: 2,
        id: "6",
        timestamp: 1703914808432,
      },
      {
        front:
          "How does the semaphore mechanism work, and what is its role in process synchronization and coordination? ",
        back: `A semaphore is a synchronization tool that allows multiple processes to access a common resource. A semaphore is an integer variable that, apart from initialization, is accessed only through two standard atomic operations: wait and signal. The wait operation decrements the semaphore value by 1, while the signal operation increments its value by 1. The semaphore value can never be negative. The wait operation can block the process if the semaphore value is 0, while the signal operation can unblock a waiting process.`,
        hint: "Semaphore",
        tag: ["Operating System"],
        progress: 2,
        id: "7",
        timestamp: 1703914808432,
      },
      {
        front: "What is the difference between a mutex and a semaphore? ",
        back: `A mutex is a synchronization tool that allows multiple processes to access a common resource. A mutex is an integer variable that, apart from initialization, is accessed only through two standard atomic operations: lock and unlock. The lock operation decrements the mutex value by 1, while the unlock operation increments its value by 1. The mutex value can never be negative. The lock operation can block the process if the mutex value is 0, while the unlock operation can unblock a waiting process.
                A semaphore is a synchronization tool that allows multiple processes to access a common resource. A semaphore is an integer variable that, apart from initialization, is accessed only through two standard atomic operations: wait and signal. The wait operation decrements the semaphore value by 1, while the signal operation increments its value by 1. The semaphore value can never be negative. The wait operation can block the process if the semaphore value is 0, while the signal operation can unblock a waiting process.`,
        hint: "Mutex and Semaphore",
        tag: ["Operating System"],
        progress: 1,
        id: "8",
        timestamp: 1703914808432,
      },
      {
        front:
          "What is the purpose of the Pseudo Offline (SPOOLING) technique, and how does it address the challenges of device access and utilization in computer systems?",
        back: `The Pseudo Offline (SPOOLING) technique is used to address the challenges of device access and utilization in computer systems. The Pseudo Offline (SPOOLING) technique uses a buffer to hold the jobs that are waiting to be processed by the device. The jobs are processed in the order in which they arrive in the buffer. The Pseudo Offline (SPOOLING) technique allows the CPU to perform other tasks while the device is processing a job. The Pseudo Offline (SPOOLING) technique also allows the device to process jobs at its own speed, without affecting the CPU.`,
        hint: "Pseudo Offline (SPOOLING)",
        tag: ["Operating System"],
        progress: 1,
        id: "9",
        timestamp: 1703914808432,
      },
      {
        front:
          "What are the purposes of introducing buffers in computer systems, and how do they improve the efficiency of data transfer between the CPU and external devices?",
        back: `The purpose of introducing buffers in computer systems is to improve the efficiency of data transfer between the CPU and external devices. Buffers are used to hold data that is being transferred between the CPU and external devices. The data is transferred in blocks, rather than in individual bytes. This reduces the number of times that the CPU has to access the external device, thus improving the efficiency of data transfer between the CPU and external devices.`,
        hint: "Buffers",
        tag: ["Operating System"],
        progress: 0,
        id: "10",
        timestamp: 0,
      },
      {
        front:
          "What is the purpose of the Direct Memory Access (DMA) technique, and how does it improve the efficiency of data transfer between the CPU and external devices?",
        back: `The Direct Memory Access (DMA) technique is used to improve the efficiency of data transfer between the CPU and external devices. The Direct Memory Access (DMA) technique uses a special device called a DMA controller to transfer data between the CPU and external devices. The DMA controller is a special device that is connected to the CPU and external devices. The DMA controller
                transfers data between the CPU and external devices without the intervention of the CPU. This reduces the number of times that the CPU has to access the external device, thus improving the efficiency of data transfer between the CPU and external devices.`,
        hint: "Direct Memory Access (DMA)",
        tag: ["Operating System"],
        progress: 0,
        id: "11",
        timestamp: 0,
      },
      {
        front:
          "Both Monitor and Semaphore are synchronization mechanisms for multithreaded programming, but they have some differences in implementation and use: ",
        back: `The Monitor is a synchronization mechanism that allows only one thread to access a shared resource at a time. The Monitor is implemented using a mutex and a condition variable. The mutex is used to protect the shared resource from concurrent access. The condition variable is used to signal the waiting threads when the shared resource is available.
                The Semaphore is a synchronization mechanism that allows multiple threads to access a shared resource at a time. The Semaphore is implemented using a mutex and a counter. The mutex is used to protect the shared resource from concurrent access. The counter is used to keep track of the number of threads that are accessing the shared resource.`,
        hint: "Monitor and Semaphore",
        tag: ["Operating System"],
        progress: 0,
        id: "12",
        timestamp: 0,
      },
    ],
  },
  {
    id: "2",
    name: "Computer network we could be a long long long long long headline",
    cardList: [
      {
        front: "Breadth-First Search (BFS):",
        back: "Breadth-first search is an algorithm for traversing or searching tree or graph data structures. It explores all the neighbor nodes at the current depth before moving to the next level. BFS is typically implemented using a queue data structure.",
        hint: "BFS",
        tag: ["Algorithm"],
        progress: 0,
        id: "13",
        timestamp: 0,
      },
      {
        front: "What are some applications of UDP?",
        back: `UDP is used in applications where speed is more important than reliability. UDP is used in applications such as online games, video conferencing, and streaming media.`,
        hint: "UDP",
        tag: ["Computer Network"],
        progress: 0,
        id: "14",
        timestamp: 0,
      },
      {
        front: "What are some applications of TCP?",
        back: `TCP is used in applications where reliability is more important than speed. TCP is used in applications such as email, file transfer, and web browsing.`,
        hint: "TCP",
        tag: ["Computer Network"],
        progress: 0,
        id: "15",
        timestamp: 0,
      },
      {
        front: "What is the difference between TCP and UDP?",
        back: `TCP is a connection-oriented protocol. UDP is a connectionless protocol.
                TCP is reliable. UDP is unreliable.
                TCP is slower than UDP. UDP is faster than TCP.
                TCP is used in applications where reliability is more important than speed. UDP is used in applications where speed is more important than reliability.
                TCP is used in applications such as email, file transfer, and web browsing. UDP is used in applications such as online games, video conferencing, and streaming media.`,
        hint: "TCP and UDP",
        tag: ["Computer Network"],
        progress: 0,
        id: "16",
        timestamp: 0,
      },
      {
        front:
          "What is the purpose of the Transport Layer, and what are some of the protocols that are used at this layer?",
        back: `The Transport Layer`,
        hint: "Transport Layer",
        tag: ["Computer Network"],
        progress: 2,
        id: "17",
        timestamp: 0,
      },
    ],
  },
  {
    id: "3",
    name: "Data structure",
    cardList: [],
  },
];

export default defaultCardGroups;

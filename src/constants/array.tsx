export const questions = [
  "What are the benefits in the company?",
  "What is your Time Off?",
  "What should be the dress code?",
  "What are the working hours?",
  "Tell me about the orientation?",
  "What is your code of conduct?",
  "How you calculate the performance review?",
];

export const allQuestions = [
  {
      "question": "How can you create a reusable component that fetches data from an API in React using hooks?",
      "options": [
          "Use `useState` and `useEffect` to manage the state and lifecycle of the component.",
          "Use `createRef` to manage the state and lifecycle of the component.",
          "Use `React.Component` with `componentDidMount` for API calls.",
          "Use `useMemo` and `useCallback` to manage the state and lifecycle."
      ],
      "answer": "Use `useState` and `useEffect` to manage the state and lifecycle of the component."
  },
  {
      "question": "What is the purpose of using TypeScript in a Node.js application?",
      "options": [
          "To provide static typing and better developer tooling.",
          "To transpile JavaScript code into machine code.",
          "To implement styles for the application.",
          "To manage database connections."
      ],
      "answer": "To provide static typing and better developer tooling."
  },
  {
      "question": "In Next.js, how would you implement dynamic routing based on a product id?",
      "options": [
          "Create a file with the name `[productId].js` inside the `pages` directory.",
          "Use the `getInitialProps` method in `_app.js`.",
          "Use the `Link` component from `next/link`.",
          "Use the `Router.push` method to handle dynamic redirects."
      ],
      "answer": "Create a file with the name `[productId].js` inside the `pages` directory."
  },
  {
      "question": "How can you configure Tailwind CSS in a Next.js project?",
      "options": [
          "Import the Tailwind CSS file in the `_app.js` file of Next.js.",
          "Install Tailwind CSS via npm or yarn and configure it in the `tailwind.config.js` and `postcss.config.js`.",
          "Add CSS properties directly in the JSX code.",
          "Use a `custom.css` file to add Tailwind CSS styles."
      ],
      "answer": "Install Tailwind CSS via npm or yarn and configure it in the `tailwind.config.js` and `postcss.config.js`."
  },
  {
      "question": "Which of the following is a middleware used to parse JSON bodies in Express?",
      "options": [
          "`express-json`",
          "`body-parser`",
          "`express-parser`",
          "`json-body`"
      ],
      "answer": "`body-parser`"
  },
  {
      "question": "Which MongoDB method is used to insert multiple documents into a collection?",
      "options": [
          "insertMany",
          "insertDocuments",
          "insertBatch",
          "bulkInsert"
      ],
      "answer": "insertMany"
  },
  {
      "question": "How do you dispatch an action in Redux?",
      "options": [
          "Using the `useDispatch` hook from `react-redux`.",
          "Using the `useAction` hook from `redux-react`.",
          "Using `store.dispatch` method.",
          "Using `Action.dispatch` method."
      ],
      "answer": 
          "store.dispatch method",
  },
  {
      "question": "What is the purpose of a `key` prop in a React list?",
      "options": [
          "To uniquely identify each element in the list.",
          "To style the elements in the list.",
          "To run lifecycle methods on list items.",
          "To bind event listeners to list items."
      ],
      "answer": "To uniquely identify each element in the list."
  },
  {
      "question": "How would you handle state management in a large-scale React application?",
      "options": [
          "By using Redux or Context API together with React hooks.",
          "By using local component state only.",
          "By using inline states and passing props.",
          "By storing state in global variables."
      ],
      "answer": "By using Redux or Context API together with React hooks."
  },
  {
      "question": "What is the purpose of using `getServerSideProps` in a Next.js page?",
      "options": [
          "To fetch data on the server side for each request.",
          "To fetch data on the client side when the component mounts.",
          "To define routes for the Next.js application.",
          "To add static resources to a Next.js application."
      ],
      "answer": "To fetch data on the server side for each request."
  },
  {
      "question": "What is a common use of the `useCallback` hook in React?",
      "options": [
          "To memoize functions that are passed as props to avoid unnecessary re-renders.",
          "To memoize entire components to optimize performance.",
          "To manage asynchronous data-fetching logic.",
          "To persist state between component re-renders."
      ],
      "answer": "To memoize functions that are passed as props to avoid unnecessary re-renders."
  },
  {
      "question": "Which MongoDB function is used to update a document?",
      "options": [
          "updateOne",
          "replaceOne",
          "modifyOne",
          "changeOne"
      ],
      "answer": "updateOne"
  },
  {
      "question": "Which HTTP method is used to retrieve data from a server in RESTful APIs?",
      "options": [
          "GET",
          "POST",
          "PUT",
          "DELETE"
      ],
      "answer": "GET"
  },
  {
      "question": "How can you use Tailwind CSS to create a responsive design?",
      "options": [
          "Using utility classes like `sm:`, `md:`, `lg:`, and `xl:` for different breakpoints.",
          "Using a custom CSS file to define media queries.",
          "Using JavaScript to dynamically apply classes.",
          "Using inline styles with media queries."
      ],
      "answer": "Using utility classes like `sm:`, `md:`, `lg:`, and `xl:` for different breakpoints."
  },
  {
      "question": "Why would you use `createSlice` from Redux Toolkit?",
      "options": [
          "To simplify the creation and management of Redux state.",
          "To create React components.",
          "To store API endpoints.",
          "To integrate with external APIs."
      ],
      "answer": "To simplify the creation and management of Redux state."
  },
  {
      "question": "Which Express method is used to define a route handler for HTTP POST requests?",
      "options": [
          "app.post",
          "app.get",
          "app.send",
          "app.put"
      ],
      "answer": "app.post"
  },
  {
      "question": "How would you connect a MongoDB database in a Node.js application?",
      "options": [
          "Using the `mongoose` package for Object Data Modeling.",
          "Using the `mongodb` package for direct interaction with MongoDB.",
          "Using the `mysql` package to interact with MongoDB.",
          "Writing raw queries to interact with the database."
      ],
      "answer": 
          "Using the `mongoose` package for Object Data Modeling.",
  },
  {
      "question": "How can you handle errors in async functions in Node.js?",
      "options": [
          "Using try-catch blocks to catch errors within async functions.",
          "Using the `errorHandler` middleware.",
          "Using synchronous code to avoid errors.",
          "Using the `reject` method from the Promise API."
      ],
      "answer": "Using try-catch blocks to catch errors within async functions."
  },
  {
      "question": "What is the main benefit of using hooks like `useState` and `useEffect` in React?",
      "options": [
          "To use state and lifecycle methods in function components.",
          "To create class-based components.",
          "To define custom elements in JSX.",
          "To integrate with third-party libraries."
      ],
      "answer": "To use state and lifecycle methods in function components."
  },
  {
      "question": "In Redux, what is a reducer?",
      "options": [
          "A function that takes the current state and an action and returns the new state.",
          "A middleware to handle asynchronous actions.",
          "A function to dispatch actions.",
          "A root component in the application."
      ],
      "answer": "A function that takes the current state and an action and returns the new state."
  },
  {
      "question": "How do you protect routes in a React application using Next.js?",
      "options": [
          "Using `getServerSideProps` to implement authentication logic.",
          "Using JavaScript to hide components.",
          "Specifying protected routes in a JSON configuration file.",
          "Using a custom API endpoint to guard routes."
      ],
      "answer": "Using `getServerSideProps` to implement authentication logic."
  },
  {
      "question": "What is the purpose of middleware in an Express application?",
      "options": [
          "To execute code during the request-response cycle.",
          "To manage routes.",
          "To define the database schema.",
          "To set up authentication guards."
      ],
      "answer": "To execute code during the request-response cycle."
  },
  {
      "question": "How would you create a nested route in Next.js?",
      "options": [
          "By creating a folder within the `pages` directory and adding files for sub-routes inside that folder.",
          "By defining routes manually in a configuration file.",
          "By using `Route` component from `react-router-dom`.",
          "By defining nested routes in `_app.js`."
      ],
      "answer": "By creating a folder within the `pages` directory and adding files for sub-routes inside that folder."
  },
  {
      "question": "Which hook is used to access the Redux store in a functional component?",
      "options": [
          "useSelector",
          "useRedux",
          "useStore",
          "useDispatch"
      ],
      "answer": "useSelector"
  },
  {
      "question": "How do you apply conditional classes in Tailwind CSS?",
      "options": [
          "By using template literals and conditional operators in the className attribute.",
          "By defining classes in a separate CSS file.",
          "By using inline styles with JSX.",
          "By passing classes as props."
      ],
      "answer": "By using template literals and conditional operators in the className attribute."
  }
]
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import MicroFrontend from "./MicroFrontend";

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <div>Hello world!</div>,
//   },
// ]);

const React16App = () => {
  const react16AppHost = env.react16AppHost;
  if (react16AppHost) {
    return <MicroFrontend host={react16AppHost} name="React16" />;
  }
  return null;
};

function App() {
  return (
    <RouterProvider
      router={createBrowserRouter([
        {
          path: "/",
          element: React16App(),
        },
      ])}
    />
  );
}

export default App;

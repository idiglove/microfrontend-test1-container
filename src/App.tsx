import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import MicroFrontend, { Version } from "./MicroFrontend";

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

const React18App = () => {
  const react18AppHost = env.react18AppHost;
  if (react18AppHost) {
    return (
      <MicroFrontend
        host={react18AppHost}
        name="React18"
        version={Version.React18}
      />
    );
  }
  return null;
};

const VueNavApp = () => {
  const vueNavAppHost = env.vueNavAppHost;
  if (vueNavAppHost) {
    return (
      <MicroFrontend
        host={vueNavAppHost}
        name="VueNav"
        version={Version.VueNav}
      />
    );
  }
  return null;
};

function App() {
  return (
    <>
      <VueNavApp />
      <RouterProvider
        router={createBrowserRouter([
          {
            path: "/",
            element: React16App(),
          },
          {
            path: "/react18",
            element: React18App(),
          },
        ])}
      />
    </>
  );
}

export default App;

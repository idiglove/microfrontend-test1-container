import { useEffect } from "react";

interface MicroFrontendProps {
  host: string;
  name: string;
  version: Version;
}

export enum Version {
  React16 = "react16",
  React18 = "react18",
  VueNav = "vueNav",
}

const MicroFrontend = ({ host, name, version }: MicroFrontendProps) => {
  const renderMicroFrontend = (name: string) => {
    console.log({ name });
    window[`render${name}`](`${name}-container`, history);
  };

  useEffect(() => {
    const scriptName = `micro-frontend-${name}`;

    if (document.getElementById(scriptName)) {
      renderMicroFrontend(name);
      return;
    }

    if (version === Version.VueNav) {
      const script = document.createElement("script");
      script.id = scriptName;
      // @TODO: what is this for?
      script.crossOrigin = "";
      script.src = `${host}/vue-bundle.js`;
      script.onload = () => window[`renderVueNav`](`#VueNav-container`);
      document.head.appendChild(script);
    }

    if (version === Version.React18) {
      const script = document.createElement("script");
      script.id = scriptName;
      // @TODO: what is this for?
      script.crossOrigin = "";
      script.src = `${host}/bundle.js`;
      script.onload = () => renderMicroFrontend(name);
      document.head.appendChild(script);
    } else {
      fetch(`${host}/asset-manifest.json`)
        .then((res) => res.json())
        .then((manifest) => {
          console.log({ manifest });
          const script = document.createElement("script");
          script.id = scriptName;
          // @TODO: what is this for?
          script.crossOrigin = "";
          script.src = `${host}${manifest.files["main.js"]}`;
          script.onload = () => renderMicroFrontend(name);
          document.head.appendChild(script);
        });
    }
  }, [host, name, version]);

  return (
    <>
      <main id={`${name}-container`} />
    </>
  );
};

export default MicroFrontend;

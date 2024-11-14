import { useEffect } from "react";

interface MicroFrontendProps {
  host: string;
  name: string;
}

const MicroFrontend = ({ host, name }: MicroFrontendProps) => {
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

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <main id={`${name}-container`} />
    </>
  );
};

export default MicroFrontend;

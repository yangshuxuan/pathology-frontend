import OpenSeaDragon from "openseadragon";
import React, { useEffect, useState } from "react";
import * as Annotorious from "@recogito/annotorious-openseadragon";

import "@recogito/annotorious-openseadragon/dist/annotorious.min.css";
import HelloWorldWidget from "./HelloWorldWidget";

const OpenSeaDragonViewer = ({ image }) => {
  const [viewer, setViewer] = useState(null);

  useEffect(() => {
    if (image && viewer) {
      viewer.open(image.source);
    }
  }, [image]);

  const InitOpenseadragon = () => {
    viewer && viewer.destroy();
    const newViewer = OpenSeaDragon({
      id: "openSeaDragon",
      prefixUrl: "openseadragon-images/",
      animationTime: 0.5,
      blendTime: 0.1,
      constrainDuringPan: true,
      maxZoomPixelRatio: 2,
      minZoomLevel: 1,
      visibilityRatio: 1,
      zoomPerScroll: 2,
    });
    newViewer.gestureSettingsMouse.clickToZoom = false;
    setViewer(newViewer);
    Annotorious(newViewer, {
      widgets: [HelloWorldWidget, "TAG"],
    });
  };

  useEffect(() => {
    InitOpenseadragon();
    return () => {
      viewer && viewer.destroy();
    };
  }, []);

  return (
    <div
      id="openSeaDragon"
      style={{
        height: "800px",
        width: "1200px",
      }}
    ></div>
  );
};

export { OpenSeaDragonViewer };

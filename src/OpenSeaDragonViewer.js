import OpenSeaDragon from "openseadragon";
import React, { useEffect, useState } from "react";
import * as Annotorious from "@recogito/annotorious-openseadragon";

import "@recogito/annotorious-openseadragon/dist/annotorious.min.css";
import HellowChinaWidget from "./HellowChinaWidget";
import HelloWorldWidget from "./HelloWorldWidget";

const OpenSeaDragonViewer = ({ image, slideAnnotations }) => {
  console.log(image);
  const [viewer, setViewer] = useState(null);
  const [anno, setAnno] = useState();
  // console.log(slideAnnotations);
  // const index = slideAnnotations.findIndex(v => v.id === image.id);

  useEffect(() => {
    if (image && viewer) {
      anno.clearAnnotations();
      anno.off("createAnnotation");
      viewer.open(image.slide.source);
      // const index = slideAnnotations.findIndex((v) => v.id === image.id);
      image.annotation.forEach((e) => anno.addAnnotation(e));
      // anno.addAnnotation(a);
      anno.on("createAnnotation", function (annotation) {
        // console.log(image);
        // console.log(annotation);
        image.annotation.push(annotation);
        // slideAnnotations[index] = image;
      });
    }
  }, [image]);
  const a = {
    type: "Annotation",
    body: [
      {
        value: "2",
        purpose: "category",
      },
      {
        type: "TextualBody",
        value: "afas",
        purpose: "tagging",
      },
      {
        value: "green",
        purpose: "highlighting",
      },
    ],
    target: {
      source: "http://localhost:3001/undefined",
      selector: {
        type: "FragmentSelector",
        conformsTo: "http://www.w3.org/TR/media-frags/",
        value: "xywh=pixel:18005,6586,3835,4680",
      },
    },
    "@context": "http://www.w3.org/ns/anno.jsonld",
    id: "#36bb0d9b-29a7-4147-b75f-c5c26f37477b",
  };
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
    const anno = Annotorious(newViewer, {
      widgets: [HelloWorldWidget, "TAG", HellowChinaWidget],
    });
    setAnno(anno);
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

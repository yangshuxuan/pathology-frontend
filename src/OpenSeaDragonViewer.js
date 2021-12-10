import OpenSeaDragon from "openseadragon";
import React, { useEffect, useState } from "react";
import * as Annotorious from "@recogito/annotorious-openseadragon";

import "@recogito/annotorious-openseadragon/dist/annotorious.min.css";
import HellowChinaWidget from "./HellowChinaWidget";
import HelloWorldWidget from "./HelloWorldWidget";

const OpenSeaDragonViewer = ({
  image,
  setAnnotable,
  annotable,
  anno,
  setAnno,
  viewer,
  setViewer,
}) => {
  const [myImage, setMyImage] = useState();
  if (anno && viewer) {
    anno.off("createAnnotation");
    anno.on("createAnnotation", function (annotation) {
      // setAnnotable([image.annotation]); //这样干是行不通的，为什么呢，因为这个值没有改变，所以触发不了
      const zoom = viewer.viewport.getZoom();
      annotation.zoom = zoom;
      setAnnotable([...annotable, annotation]);
    });
    anno.off("deleteAnnotation");
    anno.on("deleteAnnotation", function (annotation) {
      setAnnotable(annotable.filter((v) => v.id != annotation.id));
    });
  }

  useEffect(() => {
    // if (image && viewer) {
    if (myImage && viewer) {
      anno.clearAnnotations();

      // viewer.open(image.slide.source);
      viewer.open(myImage);

      // image.annotation.forEach((e) => anno.addAnnotation(e));
    }
  }, [image,myImage]);

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

    // newViewer.open(image);
    const anno = Annotorious(newViewer, {
      widgets: [HelloWorldWidget, "TAG", HellowChinaWidget],
    });
    setAnno(anno);
  };
  const getImages = async () => {
    const response = await fetch(
      // "http://127.0.0.1:9001/store/orders/history/?format=json"
      "http://127.0.0.1:9001/pathology/pathologypictureitems/16/history/?format=json"
    );
    const image = await response.json();
    setMyImage(image);
  };

  useEffect(() => {
    InitOpenseadragon();
    getImages();
    return () => {
      viewer && viewer.destroy();
    };
  }, []);

  return <div id="openSeaDragon" className="openseadragon-container"></div>;
};

export { OpenSeaDragonViewer };

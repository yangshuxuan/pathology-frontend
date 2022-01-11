import OpenSeaDragon from "openseadragon";
import React, { useEffect } from "react";
import * as Annotorious from "@recogito/annotorious-openseadragon";
import axios from "axios";
import "@recogito/annotorious-openseadragon/dist/annotorious.min.css";
import HellowChinaWidget from "./HellowChinaWidget";
import HelloWorldWidget from "./HelloWorldWidget";

import { largeimageLabelitemsURL, eachlargeimageLabelitemsURL } from "./api";

const OpenSeaDragonViewer = ({
  image,
  setAnnotable,
  annotable,
  setAnno,
  setViewer,
  viewer,
  anno,
  fromDatabase,
  setFromDatabase,
  curDiagnosisItem,
  token
}) => {
  const transform = (e) => {
    const a = {
      type: "Annotation",
      body: [
        {
          value: `${e.category}`,
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
          value: `xywh=pixel:${e.x},${e.y},${e.w},${e.h}`,
        },
      },
      "@context": "http://www.w3.org/ns/anno.jsonld",
      id: `#${e.id}`,
    };
    return a;
  };
  const extract = (e) => {
    const [x, y, w, h] = e.target.selector.value.slice(11).split(",");
    return {
      category: e.body.find((t) => t.purpose === "category").value,
      id: e.id.slice(1),
      x: x,
      y: y,
      w: w,
      h: h,
    };
  };
  useEffect(() => {
    if (image && viewer && anno) {
      viewer.open(image);
    }
  }, [image]);
  useEffect(() => {
    if (viewer && anno && fromDatabase) {
      // console.log(annotable.length);
      anno.clearAnnotations();
      console.log(Array.isArray(annotable) && annotable.length > 0);
      annotable.forEach((e) => anno.addAnnotation(transform(e)));
      // console.log(annotable);
      // console.log(Array.isArray(annotable) && annotable.length > 0);
      // console.log(annotable);
      setFromDatabase(false);
      // console.log(annotable);
    }
  }, [annotable]);
  if (anno && curDiagnosisItem) {
    anno.off("createAnnotation");
    anno.on("createAnnotation", async function (annotation) {
      const zoom = viewer.viewport.getZoom();
      const e = extract(annotation);
      e.zoomLevel = zoom;
      const pathId = curDiagnosisItem;
      const headers = {
        "Content-Type": "application/json",
        Authorization: `JWT ${token.access}`,
      };
      
      const f = await axios.post(largeimageLabelitemsURL(pathId), e, {
        headers: headers,
      });
      setAnnotable([...annotable, f.data]);
    });
    anno.off("deleteAnnotation");
    anno.on("deleteAnnotation", async function (annotation) {
      const id = annotation.id.slice(1);
      const headers = {
        "Content-Type": "application/json",
        Authorization: `JWT ${token.access}`,
      };

      await axios.delete(eachlargeimageLabelitemsURL(curDiagnosisItem, id), {
        headers: headers,
      });
      setAnnotable(annotable.filter((v) => v.id != id));
    });
  }
  useEffect(() => {
    initSeaDragon();
  }, []);
  const initSeaDragon = () => {
    const viewer = OpenSeaDragon({
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

    viewer.gestureSettingsMouse.clickToZoom = false;
    setViewer(viewer);

    const anno = Annotorious(viewer, {
      widgets: [HelloWorldWidget, "TAG", HellowChinaWidget],
    });
    setAnno(anno);
  };

  return <div id="openSeaDragon" className="openseadragon-container"></div>;
};

export { OpenSeaDragonViewer };

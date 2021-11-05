import React, { useState, useEffect } from "react";
import { v4 as uuid_v4 } from "uuid";

import AnnotationTable from "../components/AnnotationTable";
import ImageList from "../components/ImageList";
import { OpenSeaDragonViewer } from "../OpenSeaDragonViewer";

function Label() {
  const [anno, setAnno] = useState();
  const [manifest, setManifest] = useState(null);
  const [slideAnnotations, setSlideAnnotations] = useState([]);
  const [annotable, setAnnotable] = useState([]);
  const [viewer, setViewer] = useState(null);
  useEffect(() => {
    getImages();
  }, []);

  const getImages = async () => {
    const response = await fetch(
      "https://openslide-demo.s3.dualstack.us-east-1.amazonaws.com/info.json"
    );
    const image = await response.json();
    // 从每个groups里面提取所有的slide
    setSlideAnnotations(
      image.groups
        .map((g) =>
          g.slides.map((slide) => ({ ...slide, id: uuid_v4(), annotation: [] }))
        )
        .flat()
    );
  };

  return (
    <div
      className="Label"
      style={{
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <ImageList
        slideAnnotations={slideAnnotations}
        setSlideAnnotations={setSlideAnnotations}
        setManifest={setManifest}
        manifest={manifest}
        annotable={annotable}
        setAnnotable={setAnnotable}
      />
      <AnnotationTable annotable={annotable} anno={anno}  viewer={viewer} />

      <OpenSeaDragonViewer
        viewer={viewer}
        setViewer={setViewer}
        anno={anno}
        setAnno={setAnno}
        image={manifest}
        slideAnnotations={slideAnnotations}
        setAnnotable={setAnnotable}
        annotable={annotable}
      />
    </div>
  );
}

export default Label;

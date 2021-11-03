import React, { useState, useEffect } from "react";
import "./App.css";
import { Button } from "antd";
import "antd/dist/antd.css";
import { OpenSeaDragonViewer } from "./OpenSeaDragonViewer";
import { uuid } from "uuidv4";
function App() {
  const [images, setImages] = useState([]);
  const [manifest, setManifest] = useState();
  const [slideAnnotations, setSlideAnnotations] = useState([]);

  useEffect(() => {
    getImages();
  }, []);

  const getImages = async () => {
    const response = await fetch(
      "https://openslide-demo.s3.dualstack.us-east-1.amazonaws.com/info.json"
    );
    let image = await response.json();
    // console.log("image", image);
    const p = image.groups.map((g) =>
      g.slides.map((slide) => ({ ...slide, id: uuid(), annotation: [] }))
    );
    const q = p.flat();
    // console.log(q);
    setSlideAnnotations(q);
    setImages(image.groups);
  };

  const previewImage = async (slide) => {
    const index = slideAnnotations.findIndex((v) => v.id === slide.id);
    setManifest(slideAnnotations[index]);
  };

  return (
    <div
      className="App"
      style={{
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <div>
        {slideAnnotations.map((slideAnnotation, index) => {
          return (
            <div>
              <button
                key={index}
                onClick={() => {
                  return previewImage(slideAnnotation);
                }}
              >
                {slideAnnotation.name}
              </button>
            </div>
          );
        })}
      </div>
      <div>
        <Button type="primary">Button</Button>
        <h2>Test Images</h2>
        {images.map((group, index) => {
          return (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <h3 key={index}>{group.name}</h3>
              {group.slides.map((slide, index) => {
                // setSlideAnnotations([...slideAnnotations, slideAnnotation]);

                return (
                  <button
                    key={index}
                    onClick={() => {
                      return previewImage(slide);
                    }}
                  >
                    {slide.name}
                  </button>
                );
              })}
            </div>
          );
        })}
      </div>
      <div>
        <OpenSeaDragonViewer
          image={manifest}
          slideAnnotations={slideAnnotations}
        />
      </div>
    </div>
  );
}

export default App;

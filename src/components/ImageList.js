import React from "react";

const ImageList = ({
  slideAnnotations,
  annotable,
  manifest,
  setManifest,
  setAnnotable,
}) => {
  const previewImage = async (slide) => {
    if(manifest){
      manifest.annotation=annotable;//将新的标注信息更新到图像中
    }
    const index = slideAnnotations.findIndex((v) => v.id === slide.id);

    setManifest(slideAnnotations[index]);
    setAnnotable(slideAnnotations[index].annotation);
  };
  return (
    <div>
      {slideAnnotations.map((slideAnnotation, index) => {
        return (
          <div key={index}>
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
  );
};
export default ImageList;

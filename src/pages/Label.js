import React, { useState, useEffect } from "react";
import { v4 as uuid_v4 } from "uuid";
import TaskList from "../components/TaskList";
import AnnotationTable from "../components/AnnotationTable";
import ImageList from "../components/ImageList";
import { OpenSeaDragonViewer } from "../OpenSeaDragonViewer";
import Title from "antd/lib/skeleton/Title";

function Label() {
  const [anno, setAnno] = useState();
  const [manifest, setManifest] = useState(null);
  const [slideAnnotations, setSlideAnnotations] = useState([]);
  const [annotable, setAnnotable] = useState([]);
  const [viewer, setViewer] = useState(null);
  const [taskListInfo, setTaskListInfo] = useState();
  const [tasksInfo, setTasksInfo] = useState([]);
  useEffect(() => {
    getImages();
  }, []);

  const getImages = async () => {
    const response = await fetch(
      "https://openslide-demo.s3.dualstack.us-east-1.amazonaws.com/info.json"
    );
    const image = await response.json();
    // 从每个groups里面提取所有的slide
    // setTaskListInfo(image.groups.map((g) => ({
    //   title: g.name,
    //   key: uuid_v4(),
    //   children: g.slides.map((s) => ({
    //     title: s.name,
    //     key: { ...s, id: uuid_v4(), annotation: [] },
    //   })),
    // })));
    const tasksInfo = image.groups.map((g) => ({
      ...g,
      id: uuid_v4(),
      slides: g.slides.map((slide) => ({
        ...slide,
        id: uuid_v4(),
        annotation: [],
      })),
    }));
    setTasksInfo(tasksInfo);

    setTaskListInfo(
      tasksInfo.map((g) => ({
        title: g.name,
        key: g.id,
        disabled: true,
        children: g.slides.map((s) => ({
          title: s.name,
          key: s.id,
          isLeaf: true,
        })),
      }))
    );
    setSlideAnnotations(
      image.groups
        .map((g) =>
          g.slides.map((slide) => ({ ...slide, id: uuid_v4(), annotation: [] }))
        )
        .flat()
    );
  };

  return (
    <div className="Label">
      {taskListInfo && (
        <TaskList
          taskListInfo={taskListInfo}
          tasksInfo={tasksInfo}
          setManifest={setManifest}
          manifest={manifest}
          annotable={annotable}
          setAnnotable={setAnnotable}
        />
      )}

      {/* <AnnotationTable annotable={annotable} anno={anno} viewer={viewer} /> */}

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

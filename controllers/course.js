const User = require("../models/User");

const coursesProgressUser = async (req, res = response) => {
  const {
    id,
    courseId,
    topicId,
    lessonId,
    videoId,
    viewVideo,
    sequentialTopic,
    sequentialLesson,
  } = req.body;
  if (sequentialTopic === undefined) {
    return res.status(400).json({
      ok: false,
      msg: "La propiedad sequentialTopic no está definida en la solicitud.",
    });
  }
  try {
    const user = await User.findOne({ _id: id });

    if (!user) {
      return res.status(404).json({
        ok: false,
        msg: "Usuario no encontrado",
      });
    }
    const courseProgress = user.CourseProgress.find(
      (c) => c.idCourse === courseId
    );
    if (!courseProgress) {
      user.CourseProgress.push({
        idCourse: courseId,
        topics: [
          {
            idTopic: topicId,
            sequentialTopic: sequentialTopic,
            lessons: [
              {
                idLesson: lessonId,
                sequentialLesson: sequentialLesson,
                idVideo: videoId,
                viewVideo: viewVideo,
              },
            ],
          },
        ],
      });
    } else {
      if (sequentialTopic > courseProgress.topics[0].sequentialTopic) {
        const topics = [
          {
            idTopic: topicId,
            sequentialTopic: sequentialTopic,
            lessons: [
              {
                idLesson: lessonId,
                sequentialLesson: sequentialLesson,
                idVideo: videoId,
                viewVideo: viewVideo,
              },
            ],
          },
        ];

        courseProgress.topics = topics;
        await user.save();
      } else if (sequentialTopic === courseProgress.topics[0].sequentialTopic) {
        const findSequentialLesson =
          courseProgress.topics[0].lessons[0].sequentialLesson;
        if (sequentialLesson > findSequentialLesson) {
          const lesson = [
            {
              idLesson: lessonId,
              sequentialLesson: sequentialLesson,
              idVideo: videoId,
              viewVideo: viewVideo,
            },
          ];
          courseProgress.topics[0].lessons = lesson;
          await user.save();
        }
      }
    }
    await user.save();

    res.json({
      ok: true,
      msg: "Estado del video actualizado correctamente",
    });
  } catch (error) {
    console.error("Error al actualizar el estado del video:", error);
    res.status(500).json({
      ok: false,
      msg: "Error al actualizar el estado del video. Por favor, comunícate con el administrador.",
    });
  }
};

const lastViewedVideos = async (req, res = response) => {
  const {
    id,
    courseName,
    courseId,
    videoId,
    topicName,
    sequentialTopic,
    URLVideo,
    videoViewed,
  } = req.body;

  try {
    let user = await User.findOne({ _id: id });
    if (!user) {
      return res.status(404).json({
        ok: false,
        msg: "Usuario no encontrado",
      });
    }
    if (!user.lastViewedVideos) {
      user.lastViewedVideos = [];
    }

    let courseIndex = user.lastViewedVideos.findIndex(
      (info) => info.courseId === courseId
    );

    if (courseIndex !== -1) {
      user.lastViewedVideos[courseIndex] = {
        courseName,
        courseId: courseId,
        videoId: videoId,
        topicName,
        sequentialTopic,
        URLVideo,
        videoViewed: videoViewed,
      };
    } else {
      if (user.lastViewedVideos.length === 3) {
        user.lastViewedVideos.shift();
      }
      user.lastViewedVideos.push({
        courseName,
        courseId: courseId,
        videoId: videoId,
        topicName,
        sequentialTopic,
        URLVideo,
        videoViewed,
      });
    }

    await user.save();
    res.json({
      ok: true,
      msg: "Estado del último video visualizado actualizado correctamente",
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Error al actualizar el estado del video. Por favor, comunícate con el administrador.",
    });
  }
};

module.exports = {
  coursesProgressUser,
  lastViewedVideos,
};
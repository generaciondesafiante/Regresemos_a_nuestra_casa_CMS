const User = require("../models/User");

const updateVideoStatus = async (req, res = response) => {
  const { id, courseId, topicId, lessonId, videoId } = req.params;
  const { viewVideo } = req.body;

  try {
    const user = await User.findOne({ _id: id });

    if (!user) {
      return res.status(404).json({
        ok: false,
        msg: "Usuario no encontrado",
      });
    }

    let courseIndex = user.CourseProgress.findIndex(
      (c) => c.idCourse === courseId
    );

    if (courseIndex === -1) {
      user.CourseProgress.push({
        idCourse: courseId,
        topics: [
          {
            idTopic: topicId,
            lessons: [
              {
                idLesson: lessonId,
                idVideo: videoId,
                viewVideo: viewVideo,
              },
            ],
          },
        ],
      });
    } else {
      let topicIndex = user.CourseProgress[courseIndex].topics.findIndex(
        (t) => t.idTopic === topicId
      );

      if (topicIndex === -1) {
        user.CourseProgress[courseIndex].topics.push({
          idTopic: topicId,
          lessons: [
            {
              idLesson: lessonId,
              idVideo: videoId,
              viewVideo: true,
            },
          ],
        });
      } else {
        let lessonIndex = user.CourseProgress[courseIndex].topics[
          topicIndex
        ].lessons.findIndex((l) => l.idLesson === lessonId);

        if (lessonIndex === -1) {
          user.CourseProgress[courseIndex].topics[topicIndex].lessons.push({
            idLesson: lessonId,
            idVideo: videoId,
            viewVideo: true,
          });
        } else {
          let videoIndex = user.CourseProgress[courseIndex].topics[
            topicIndex
          ].lessons[lessonIndex].videos.findIndex((v) => v.idVideo === videoId);

          if (videoIndex === -1) {
            user.CourseProgress[courseIndex].topics[topicIndex].lessons[
              lessonIndex
            ].videos.push({
              idVideo: videoId,
              viewVideo,
            });
          } else {
            user.CourseProgress[courseIndex].topics[topicIndex].lessons[
              lessonIndex
            ].videos[videoIndex].viewVideo = viewVideo;
          }
        }
      }
    }

    user.lastViewedVideos = Array.isArray(user.lastViewedVideos)
      ? user.lastViewedVideos.filter(
          (info) => info.idCourse !== courseId || info.idVideo !== videoId
        )
      : [];

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
  const { id } = req.params;
  const { courseName, courseId, videoId, tema, indexTopic, urlVideo } =
    req.body;

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
      (info) => info.idCourse === courseId
    );

    if (courseIndex !== -1) {
      user.lastViewedVideos[courseIndex] = {
        courseName,
        idCourse: courseId,
        idVideo: videoId,
        tema,
        indexTopic,
        urlVideo,
      };
    } else {
      if (user.lastViewedVideos.length === 3) {
        user.lastViewedVideos.shift();
      }
      user.lastViewedVideos.push({
        courseName,
        idCourse: courseId,
        idVideo: videoId,
        tema,
        indexTopic,
        urlVideo,
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
  updateVideoStatus,
  lastViewedVideos,
};

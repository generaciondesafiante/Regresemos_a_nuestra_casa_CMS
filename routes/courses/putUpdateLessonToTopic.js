const { Router } = require("express");
const { validateUserAndRole } = require("../../middlewares/validate-rolUser");
const updateResourceInTopic = require("../../controllers/courses/topic/updateResourcesToTopic");

const router = Router();


/**
 * @swagger
 * /api/course/{userId}/{courseId}/topic/updateResourceWithinTopic:
 *   put:
 *     summary: Add or update a resource in a course topic
 *     tags: [Courses]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: User ID who owns the course
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               courseId:
 *                 type: string
 *                 example: "60f9e5215c25b837e4e9a1b1"
 *                 description: ID of the course to which the topic belongs
 *               topicId:
 *                 type: string
 *                 example: "60f9e5215c25b837e4e9a1b2"
 *                 description: ID of the topic within the course
 *               resourceId:
 *                 type: string
 *                 example: "60f9e5215c25b837e4e9a1b3"
 *                 description: ID of the resource to add or update
 *               newResourceData:
 *                 type: object
 *                 properties:
 *                   isMandatory:
 *                     type: boolean
 *                     example: true
 *                     description: Indicates if the resource is mandatory
 *     responses:
 *       201:
 *         description: Resource updated successfully, returning updated resources list
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     example: "60f9e5215c25b837e4e9a1b3"
 *                   isMandatory:
 *                     type: boolean
 *                     example: true
 *                   title:
 *                     type: string
 *                     example: "Introduction to Programming"
 *                   description:
 *                     type: string
 *                     example: "A beginner's guide to programming."
 *                   typeResource:
 *                     type: string
 *                     example: "video"
 *                   visibility:
 *                     type: string
 *                     example: "public"
 *       400:
 *         description: Bad request or validation error
 *       404:
 *         description: Course, topic, or resource not found
 *       500:
 *         description: Internal server error
 */


router.put(
  "/:userId/:courseId/topic/updateResourceWithinTopic",
  validateUserAndRole,
  updateResourceInTopic
);

module.exports = router;

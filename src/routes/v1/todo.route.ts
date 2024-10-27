import express, { Router } from "express";
import { validate } from "../../modules/validate";
import { auth } from "../../modules/auth";
import { todoController, todoValidation } from "../../modules/todo";

const router: Router = express.Router();

router
  .route("/")
  .post(auth(), validate(todoValidation.createTodo), todoController.createTodo)
  .get(auth(), validate(todoValidation.getTodos), todoController.getTodos);

router
  .route("/:todoId")
  .get(auth(), validate(todoValidation.getTodo), todoController.getTodo)
  .patch(auth(), validate(todoValidation.updateTodo), todoController.updateTodo)
  .delete(
    auth(),
    validate(todoValidation.deleteTodo),
    todoController.deleteTodo
  );

export default router;

/**
 * @swagger
 * tags:
 *   name: Todos
 *   description: Manage and retrieve todos
 */

/**
 * @swagger
 * /todos:
 *   post:
 *     summary: Create a todo
 *     description: Only authorized users can create todos.
 *     tags: [Todos]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - description
 *               - dueDate
 *               - user
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               dueDate:
 *                 type: string
 *                 format: date-time
 *             example:
 *               title: "My first todo"
 *               description: "This is the description of my todo."
 *               dueDate: "2024-10-31"
 *     responses:
 *       "201":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 title:
 *                   type: string
 *                 description:
 *                   type: string
 *                 dueDate:
 *                   type: string
 *                   format: date-time
 *                 completed:
 *                   type: boolean
 *                   default: false
 *                 user:
 *                   type: string
 *       "400":
 *         description: Invalid input
 *       "401":
 *         description: Unauthorized
 *       "403":
 *         description: Forbidden
 *
 *   get:
 *     summary: Get all todos
 *     description: Only authorized users can retrieve all todos.
 *     tags: [Todos]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 results:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       title:
 *                         type: string
 *                       description:
 *                         type: string
 *                       dueDate:
 *                         type: string
 *                         format: date-time
 *                       completed:
 *                         type: boolean
 *                       user:
 *                         type: string
 *                 totalResults:
 *                   type: integer
 *       "401":
 *         description: Unauthorized
 *       "403":
 *         description: Forbidden
 */

/**
 * @swagger
 * /todos/{todoId}:
 *   get:
 *     summary: Get a todo
 *     description: Retrieve a specific todo by its ID.
 *     tags: [Todos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: todoId
 *         required: true
 *         schema:
 *           type: string
 *         description: Todo ID
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 title:
 *                   type: string
 *                 description:
 *                   type: string
 *                 dueDate:
 *                   type: string
 *                   format: date-time
 *                 completed:
 *                   type: boolean
 *                 user:
 *                   type: string
 *       "404":
 *         description: Not found
 *       "401":
 *         description: Unauthorized
 *       "403":
 *         description: Forbidden
 *
 *   patch:
 *     summary: Update a todo
 *     description: Update a specific todo by its ID.
 *     tags: [Todos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: todoId
 *         required: true
 *         schema:
 *           type: string
 *         description: Todo ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               dueDate:
 *                 type: string
 *                 format: date-time
 *               completed:
 *                 type: boolean
 *             example:
 *               title: "Updated todo"
 *               description: "This is an updated description."
 *               dueDate: "2024-11-01"
 *               completed: true
 *     responses:
 *       "200":
 *         description: OK
 *       "400":
 *         description: Invalid input
 *       "404":
 *         description: Not found
 *       "401":
 *         description: Unauthorized
 *       "403":
 *         description: Forbidden
 *
 *   delete:
 *     summary: Delete a todo
 *     description: Delete a specific todo by its ID.
 *     tags: [Todos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: todoId
 *         required: true
 *         schema:
 *           type: string
 *         description: Todo ID
 *     responses:
 *       "204":
 *         description: No content
 *       "404":
 *         description: Not found
 *       "401":
 *         description: Unauthorized
 *       "403":
 *         description: Forbidden
 */

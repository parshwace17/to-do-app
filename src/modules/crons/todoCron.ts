import cron from "node-cron";
import Todo from "../todo/todo.model";
import { logger } from "../logger";

const markExpiredTodosAsCompleted = () => {
  cron.schedule("0 0 * * *", async () => {
    try {
      const currentDate = new Date();
      await Todo.updateMany(
        { dueDate: { $lt: currentDate }, completed: false },
        { completed: true }
      );
      logger.info("Expired todos marked as completed");
    } catch (error) {
      logger.error("Error marking expired todos:", error);
    }
  });
};

export default markExpiredTodosAsCompleted;

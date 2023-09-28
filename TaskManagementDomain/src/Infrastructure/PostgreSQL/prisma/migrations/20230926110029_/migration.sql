-- DropForeignKey
ALTER TABLE "Task" DROP CONSTRAINT "Task_taskGroupId_fkey";

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_taskGroupId_fkey" FOREIGN KEY ("taskGroupId") REFERENCES "TaskGroup"("id") ON DELETE CASCADE ON UPDATE CASCADE;

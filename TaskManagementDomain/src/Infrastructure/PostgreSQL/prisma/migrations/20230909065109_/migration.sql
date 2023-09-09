-- DropForeignKey
ALTER TABLE "Task" DROP CONSTRAINT "Task_id_fkey";

-- AlterTable
ALTER TABLE "Task" ALTER COLUMN "taskGroupId" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_taskGroupId_fkey" FOREIGN KEY ("taskGroupId") REFERENCES "TaskGroup"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

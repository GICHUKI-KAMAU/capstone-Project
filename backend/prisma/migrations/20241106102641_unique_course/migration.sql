/*
  Warnings:

  - A unique constraint covering the columns `[title]` on the table `Course` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `user` MODIFY `role` VARCHAR(191) NOT NULL DEFAULT 'student';

-- CreateIndex
CREATE UNIQUE INDEX `Course_title_key` ON `Course`(`title`);

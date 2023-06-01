/*
  Warnings:

  - You are about to drop the column `Reported` on the `articles` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `articles` DROP COLUMN `Reported`,
    ADD COLUMN `Reporter` VARCHAR(191) NULL;

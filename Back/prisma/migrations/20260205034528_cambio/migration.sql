/*
  Warnings:

  - Added the required column `date` to the `Events` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `Events` table without a default value. This is not possible if the table is not empty.
  - Added the required column `time` to the `Events` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `events` ADD COLUMN `date` VARCHAR(191) NOT NULL,
    ADD COLUMN `description` VARCHAR(191) NOT NULL,
    ADD COLUMN `time` VARCHAR(191) NOT NULL;

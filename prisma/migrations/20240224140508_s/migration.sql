/*
  Warnings:

  - You are about to drop the column `date` on the `historicalevents` table. All the data in the column will be lost.
  - Added the required column `day` to the `HistoricalEvents` table without a default value. This is not possible if the table is not empty.
  - Added the required column `month` to the `HistoricalEvents` table without a default value. This is not possible if the table is not empty.
  - Added the required column `year` to the `HistoricalEvents` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `historicalevents` DROP COLUMN `date`,
    ADD COLUMN `day` VARCHAR(191) NOT NULL,
    ADD COLUMN `month` VARCHAR(191) NOT NULL,
    ADD COLUMN `year` VARCHAR(191) NOT NULL;

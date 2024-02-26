/*
  Warnings:

  - You are about to drop the column `contentId` on the `waypoints` table. All the data in the column will be lost.
  - You are about to drop the `content` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `historicalEventsId` to the `Waypoints` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `waypoints` DROP FOREIGN KEY `Waypoints_contentId_fkey`;

-- AlterTable
ALTER TABLE `waypoints` DROP COLUMN `contentId`,
    ADD COLUMN `historicalEventsId` INTEGER NOT NULL;

-- DropTable
DROP TABLE `content`;

-- CreateTable
CREATE TABLE `HistoricalEvents` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `content` TEXT NOT NULL,
    `image` LONGTEXT NOT NULL,
    `date` VARCHAR(191) NOT NULL,
    `era` VARCHAR(191) NOT NULL,
    `createAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    FULLTEXT INDEX `HistoricalEvents_title_idx`(`title`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Waypoints` ADD CONSTRAINT `Waypoints_historicalEventsId_fkey` FOREIGN KEY (`historicalEventsId`) REFERENCES `HistoricalEvents`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

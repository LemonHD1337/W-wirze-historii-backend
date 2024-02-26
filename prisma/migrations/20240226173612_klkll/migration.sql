-- DropForeignKey
ALTER TABLE `waypoints` DROP FOREIGN KEY `Waypoints_mapId_fkey`;

-- AddForeignKey
ALTER TABLE `Waypoints` ADD CONSTRAINT `Waypoints_mapId_fkey` FOREIGN KEY (`mapId`) REFERENCES `Map`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

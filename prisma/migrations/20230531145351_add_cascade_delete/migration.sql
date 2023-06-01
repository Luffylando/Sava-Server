-- DropForeignKey
ALTER TABLE `articles` DROP FOREIGN KEY `articles_CategoryID_fkey`;

-- AddForeignKey
ALTER TABLE `articles` ADD CONSTRAINT `articles_CategoryID_fkey` FOREIGN KEY (`CategoryID`) REFERENCES `categories`(`CategoryID`) ON DELETE CASCADE ON UPDATE CASCADE;

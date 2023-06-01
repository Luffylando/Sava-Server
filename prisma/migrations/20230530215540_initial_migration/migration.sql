-- CreateTable
CREATE TABLE `articles` (
    `ArticleID` INTEGER NOT NULL AUTO_INCREMENT,
    `Title` VARCHAR(191) NOT NULL,
    `Reported` VARCHAR(191) NOT NULL,
    `Body` VARCHAR(191) NOT NULL,
    `CategoryID` INTEGER NOT NULL,
    `PublishDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`ArticleID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `categories` (
    `CategoryID` INTEGER NOT NULL AUTO_INCREMENT,
    `Title` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`CategoryID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `articles` ADD CONSTRAINT `articles_CategoryID_fkey` FOREIGN KEY (`CategoryID`) REFERENCES `categories`(`CategoryID`) ON DELETE RESTRICT ON UPDATE CASCADE;

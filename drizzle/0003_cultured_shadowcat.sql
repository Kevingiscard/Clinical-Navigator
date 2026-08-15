CREATE TABLE `contentItems` (
	`id` int AUTO_INCREMENT NOT NULL,
	`slug` varchar(160) NOT NULL,
	`contentType` enum('SCENARIO','GUIDE','MODULE','SOURCE_NOTE') NOT NULL,
	`title` varchar(300) NOT NULL,
	`summary` text NOT NULL,
	`body` text,
	`jurisdiction` varchar(160) NOT NULL DEFAULT 'International / à préciser',
	`versionLabel` varchar(80) NOT NULL,
	`status` enum('VERIFIED','NEEDS_REVIEW','OUTDATED','DRAFT','ARCHIVED') NOT NULL DEFAULT 'DRAFT',
	`reviewAt` timestamp,
	`publishedAt` timestamp,
	`createdByUserId` int NOT NULL,
	`updatedByUserId` int,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `contentItems_id` PRIMARY KEY(`id`),
	CONSTRAINT `contentItems_slug_unique` UNIQUE(`slug`)
);

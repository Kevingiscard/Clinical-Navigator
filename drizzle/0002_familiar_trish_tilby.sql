CREATE TABLE `savedCaseItems` (
	`id` int AUTO_INCREMENT NOT NULL,
	`savedCaseId` int NOT NULL,
	`itemType` enum('ACTION','CHECKLIST','MILESTONE') NOT NULL,
	`title` varchar(300) NOT NULL,
	`dueAt` timestamp,
	`completed` boolean NOT NULL DEFAULT false,
	`itemOrder` int NOT NULL DEFAULT 0,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `savedCaseItems_id` PRIMARY KEY(`id`)
);

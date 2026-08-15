CREATE TABLE `studyProjectMembers` (
	`id` int AUTO_INCREMENT NOT NULL,
	`studyProjectId` int NOT NULL,
	`userId` int NOT NULL,
	`projectRole` enum('OWNER','EDITOR','REVIEWER','VIEWER') NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `studyProjectMembers_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `studyProjectReferences` (
	`id` int AUTO_INCREMENT NOT NULL,
	`studyProjectId` int NOT NULL,
	`sectionKey` varchar(80) NOT NULL,
	`citation` text NOT NULL,
	`sourceUrl` varchar(1000),
	`referenceStatus` enum('VERIFIED','NEEDS_REVIEW','OUTDATED','DRAFT','ARCHIVED') NOT NULL DEFAULT 'DRAFT',
	`versionLabel` varchar(80) NOT NULL DEFAULT 'v1.0',
	`createdByUserId` int NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `studyProjectReferences_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `studyProjectVisits` (
	`id` int AUTO_INCREMENT NOT NULL,
	`studyProjectId` int NOT NULL,
	`label` varchar(180) NOT NULL,
	`visitOrder` int NOT NULL DEFAULT 0,
	`targetDay` int NOT NULL,
	`windowBeforeDays` int NOT NULL DEFAULT 0,
	`windowAfterDays` int NOT NULL DEFAULT 0,
	`assessments` json NOT NULL,
	`participantStage` varchar(120),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `studyProjectVisits_id` PRIMARY KEY(`id`)
);

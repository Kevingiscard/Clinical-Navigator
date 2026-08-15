CREATE TABLE `studyProjectCalculations` (
	`id` int AUTO_INCREMENT NOT NULL,
	`studyProjectId` int NOT NULL,
	`calculationType` varchar(100) NOT NULL,
	`assumptions` json NOT NULL,
	`result` json NOT NULL,
	`warning` text NOT NULL,
	`createdByUserId` int NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `studyProjectCalculations_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `studyProjectSections` (
	`id` int AUTO_INCREMENT NOT NULL,
	`studyProjectId` int NOT NULL,
	`sectionKey` varchar(80) NOT NULL,
	`title` varchar(240) NOT NULL,
	`payload` json NOT NULL,
	`completionState` enum('NOT_STARTED','IN_PROGRESS','COMPLETE','NEEDS_REVIEW') NOT NULL DEFAULT 'NOT_STARTED',
	`versionNumber` int NOT NULL DEFAULT 1,
	`updatedByUserId` int NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `studyProjectSections_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `studyProjectVersions` (
	`id` int AUTO_INCREMENT NOT NULL,
	`studyProjectId` int NOT NULL,
	`versionLabel` varchar(80) NOT NULL,
	`changeReason` text NOT NULL,
	`snapshot` json NOT NULL,
	`createdByUserId` int NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `studyProjectVersions_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `studyProjects` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`studyId` varchar(80) NOT NULL,
	`acronym` varchar(80),
	`title` varchar(500) NOT NULL,
	`shortTitle` varchar(240),
	`studyQuestion` text,
	`indication` varchar(300),
	`condition` varchar(300),
	`sponsor` varchar(300),
	`coordinatingCenter` varchar(300),
	`principalInvestigator` varchar(300),
	`studyType` varchar(120),
	`interventionType` varchar(160),
	`phase` varchar(120),
	`jurisdiction` varchar(160) NOT NULL DEFAULT 'International / à préciser',
	`status` enum('DRAFT','IN_REVIEW','READY_FOR_REVIEW','ARCHIVED') NOT NULL DEFAULT 'DRAFT',
	`protocolVersion` varchar(80) NOT NULL DEFAULT 'v0.1',
	`dataSafetyConfirmed` boolean NOT NULL DEFAULT false,
	`lastReviewDate` timestamp,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `studyProjects_id` PRIMARY KEY(`id`),
	CONSTRAINT `studyProjects_studyId_unique` UNIQUE(`studyId`)
);

CREATE TABLE `studyProjectReferenceVersions` (
	`id` int AUTO_INCREMENT NOT NULL,
	`studyProjectReferenceId` int NOT NULL,
	`versionNumber` int NOT NULL,
	`versionLabel` varchar(80) NOT NULL,
	`changeReason` text NOT NULL,
	`snapshot` json NOT NULL,
	`reviewedAt` timestamp,
	`createdByUserId` int NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `studyProjectReferenceVersions_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `studyProjectReferences` ADD `versionNumber` int DEFAULT 1 NOT NULL;--> statement-breakpoint
ALTER TABLE `studyProjectReferences` ADD `reviewedAt` timestamp;
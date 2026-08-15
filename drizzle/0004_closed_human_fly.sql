CREATE TABLE `analyticsConsents` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`status` enum('GRANTED','DENIED') NOT NULL,
	`policyVersion` varchar(40) NOT NULL,
	`grantedAt` timestamp,
	`revokedAt` timestamp,
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `analyticsConsents_id` PRIMARY KEY(`id`),
	CONSTRAINT `analyticsConsents_userId_unique` UNIQUE(`userId`)
);
--> statement-breakpoint
CREATE TABLE `exportAuditLogs` (
	`id` int AUTO_INCREMENT NOT NULL,
	`requestedByUserId` int NOT NULL,
	`exportType` varchar(80) NOT NULL,
	`destination` varchar(320),
	`rowCount` int NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `exportAuditLogs_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `loginEvents` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`occurredAt` timestamp NOT NULL DEFAULT (now()),
	`loginMethod` varchar(64),
	CONSTRAINT `loginEvents_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `anonymousUsage` MODIFY COLUMN `eventName` varchar(100) NOT NULL;--> statement-breakpoint
ALTER TABLE `anonymousUsage` MODIFY COLUMN `route` varchar(255);
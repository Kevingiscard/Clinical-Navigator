CREATE TABLE `actions` (
	`id` int AUTO_INCREMENT NOT NULL,
	`scenarioId` int NOT NULL,
	`title` varchar(300) NOT NULL,
	`detail` text NOT NULL,
	`actionOrder` int NOT NULL DEFAULT 0,
	`actorRole` varchar(160),
	`sourceIds` json,
	`status` enum('VERIFIED','NEEDS_REVIEW','OUTDATED','DRAFT','ARCHIVED') NOT NULL DEFAULT 'DRAFT',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `actions_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `anonymousUsage` (
	`id` int AUTO_INCREMENT NOT NULL,
	`eventName` varchar(120) NOT NULL,
	`route` varchar(240),
	`contentSlug` varchar(160),
	`properties` json,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `anonymousUsage_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `authorities` (
	`id` int AUTO_INCREMENT NOT NULL,
	`jurisdictionId` int,
	`name` varchar(200) NOT NULL,
	`websiteUrl` varchar(1000),
	`status` enum('VERIFIED','NEEDS_REVIEW','OUTDATED','DRAFT','ARCHIVED') NOT NULL DEFAULT 'DRAFT',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `authorities_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `checklists` (
	`id` int AUTO_INCREMENT NOT NULL,
	`scenarioId` int,
	`slug` varchar(160) NOT NULL,
	`title` varchar(300) NOT NULL,
	`items` json NOT NULL,
	`versionLabel` varchar(80) NOT NULL,
	`status` enum('VERIFIED','NEEDS_REVIEW','OUTDATED','DRAFT','ARCHIVED') NOT NULL DEFAULT 'DRAFT',
	`reviewAt` timestamp,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `checklists_id` PRIMARY KEY(`id`),
	CONSTRAINT `checklists_slug_unique` UNIQUE(`slug`)
);
--> statement-breakpoint
CREATE TABLE `contentBacklog` (
	`id` int AUTO_INCREMENT NOT NULL,
	`role` varchar(120),
	`studyType` varchar(120),
	`phase` varchar(120),
	`jurisdiction` varchar(160),
	`requestSummary` text NOT NULL,
	`status` varchar(64) NOT NULL DEFAULT 'NOUVEAU',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `contentBacklog_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `contentVersions` (
	`id` int AUTO_INCREMENT NOT NULL,
	`entityType` varchar(80) NOT NULL,
	`entityId` int NOT NULL,
	`versionLabel` varchar(80) NOT NULL,
	`changeReason` text,
	`authorLabel` varchar(180),
	`snapshot` json,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `contentVersions_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `documents` (
	`id` int AUTO_INCREMENT NOT NULL,
	`sourceId` int,
	`title` varchar(400) NOT NULL,
	`category` varchar(120) NOT NULL,
	`documentUrl` varchar(1000),
	`contentSummary` text,
	`versionLabel` varchar(160),
	`status` enum('VERIFIED','NEEDS_REVIEW','OUTDATED','DRAFT','ARCHIVED') NOT NULL DEFAULT 'DRAFT',
	`publishedAt` timestamp,
	`verifiedAt` timestamp,
	`reviewAt` timestamp,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `documents_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `examples` (
	`id` int AUTO_INCREMENT NOT NULL,
	`scenarioId` int,
	`title` varchar(300) NOT NULL,
	`content` text NOT NULL,
	`isSimulated` boolean NOT NULL DEFAULT true,
	`status` enum('VERIFIED','NEEDS_REVIEW','OUTDATED','DRAFT','ARCHIVED') NOT NULL DEFAULT 'DRAFT',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `examples_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `favorites` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`scenarioSlug` varchar(160) NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `favorites_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `feedback` (
	`id` int AUTO_INCREMENT NOT NULL,
	`helpful` boolean NOT NULL,
	`comment` text,
	`scenarioSlug` varchar(160),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `feedback_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `jurisdictions` (
	`id` int AUTO_INCREMENT NOT NULL,
	`slug` varchar(100) NOT NULL,
	`name` varchar(160) NOT NULL,
	`scope` text,
	`status` enum('VERIFIED','NEEDS_REVIEW','OUTDATED','DRAFT','ARCHIVED') NOT NULL DEFAULT 'DRAFT',
	`lastVerifiedAt` timestamp,
	`nextReviewAt` timestamp,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `jurisdictions_id` PRIMARY KEY(`id`),
	CONSTRAINT `jurisdictions_slug_unique` UNIQUE(`slug`)
);
--> statement-breakpoint
CREATE TABLE `modules` (
	`id` int AUTO_INCREMENT NOT NULL,
	`slug` varchar(120) NOT NULL,
	`title` varchar(180) NOT NULL,
	`summary` text,
	`icon` varchar(80),
	`position` int NOT NULL DEFAULT 0,
	`status` enum('VERIFIED','NEEDS_REVIEW','OUTDATED','DRAFT','ARCHIVED') NOT NULL DEFAULT 'DRAFT',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `modules_id` PRIMARY KEY(`id`),
	CONSTRAINT `modules_slug_unique` UNIQUE(`slug`)
);
--> statement-breakpoint
CREATE TABLE `savedCases` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`title` varchar(180) NOT NULL,
	`scenarioSlug` varchar(160),
	`role` varchar(120),
	`phase` varchar(120),
	`jurisdiction` varchar(160),
	`note` text,
	`dataSafetyConfirmed` boolean NOT NULL DEFAULT false,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `savedCases_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `scenarios` (
	`id` int AUTO_INCREMENT NOT NULL,
	`slug` varchar(160) NOT NULL,
	`title` varchar(300) NOT NULL,
	`description` text,
	`category` varchar(120) NOT NULL,
	`severity` enum('CRITIQUE','HAUTE','NORMALE','FAIBLE') NOT NULL DEFAULT 'NORMALE',
	`jurisdiction` varchar(160) NOT NULL DEFAULT 'International / à préciser',
	`roleTags` json,
	`studyTypeTags` json,
	`phaseTags` json,
	`keywordTags` json,
	`versionLabel` varchar(80) NOT NULL,
	`status` enum('VERIFIED','NEEDS_REVIEW','OUTDATED','DRAFT','ARCHIVED') NOT NULL DEFAULT 'DRAFT',
	`effectiveAt` timestamp,
	`reviewAt` timestamp,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `scenarios_id` PRIMARY KEY(`id`),
	CONSTRAINT `scenarios_slug_unique` UNIQUE(`slug`)
);
--> statement-breakpoint
CREATE TABLE `sources` (
	`id` int AUTO_INCREMENT NOT NULL,
	`externalId` varchar(128) NOT NULL,
	`title` varchar(400) NOT NULL,
	`publisher` varchar(240) NOT NULL,
	`sourceUrl` varchar(1000) NOT NULL,
	`jurisdiction` varchar(160) NOT NULL,
	`versionLabel` varchar(160),
	`publishedAt` timestamp,
	`verifiedAt` timestamp,
	`nextReviewAt` timestamp,
	`isOfficial` boolean NOT NULL DEFAULT false,
	`status` enum('VERIFIED','NEEDS_REVIEW','OUTDATED','DRAFT','ARCHIVED') NOT NULL DEFAULT 'DRAFT',
	`scope` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `sources_id` PRIMARY KEY(`id`),
	CONSTRAINT `sources_externalId_unique` UNIQUE(`externalId`)
);
--> statement-breakpoint
CREATE TABLE `systemChecks` (
	`id` int AUTO_INCREMENT NOT NULL,
	`checkType` varchar(100) NOT NULL,
	`status` varchar(64) NOT NULL,
	`detail` text,
	`checkedAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `systemChecks_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `workflowNodes` (
	`id` int AUTO_INCREMENT NOT NULL,
	`workflowId` int NOT NULL,
	`nodeKey` varchar(128) NOT NULL,
	`nodeType` varchar(64) NOT NULL,
	`question` text,
	`answers` json,
	`conditions` json,
	`nextNodeKey` varchar(128),
	`action` text,
	`severity` enum('CRITIQUE','HAUTE','NORMALE','FAIBLE'),
	`sourceIds` json,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `workflowNodes_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `workflows` (
	`id` int AUTO_INCREMENT NOT NULL,
	`scenarioId` int NOT NULL,
	`workflowId` varchar(128) NOT NULL,
	`versionLabel` varchar(80) NOT NULL,
	`status` enum('VERIFIED','NEEDS_REVIEW','OUTDATED','DRAFT','ARCHIVED') NOT NULL DEFAULT 'DRAFT',
	`jurisdiction` varchar(160) NOT NULL DEFAULT 'International / à préciser',
	`sourceIds` json,
	`effectiveAt` timestamp,
	`reviewAt` timestamp,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `workflows_id` PRIMARY KEY(`id`),
	CONSTRAINT `workflows_workflowId_unique` UNIQUE(`workflowId`)
);

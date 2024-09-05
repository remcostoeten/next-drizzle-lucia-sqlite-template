ALTER TABLE `app_user` ADD `username` text;--> statement-breakpoint
CREATE UNIQUE INDEX `app_user_username_unique` ON `app_user` (`username`);
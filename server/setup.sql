USE kevinu;

CREATE TABLE IF NOT EXISTS wordgame (
	`user` VARCHAR(36) NOT NULL COLLATE 'armscii8_bin',
	`id` VARCHAR(36) NOT NULL COLLATE 'armscii8_bin',
	`answer` TINYTEXT NOT NULL COLLATE 'armscii8_bin',
	`phrase` TINYTEXT NULL DEFAULT NULL COLLATE 'armscii8_bin',
	`level` TINYINT(3) NULL DEFAULT NULL,
	`guesses` VARCHAR(50) NULL DEFAULT NULL COLLATE 'armscii8_bin',
	`remaining` TINYINT(3) NOT NULL,
	`status` ENUM('In Progress','Victory','Loss') NOT NULL DEFAULT 'In Progress' COLLATE 'armscii8_bin',
	`font` TINYTEXT NOT NULL COLLATE 'armscii8_bin',
	`textColor` VARCHAR(7) NOT NULL COLLATE 'armscii8_bin',
	`bgColor` VARCHAR(7) NOT NULL COLLATE 'armscii8_bin',
	`guessColor` VARCHAR(7) NOT NULL COLLATE 'armscii8_bin',
	`insertTime` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
)
COLLATE='armscii8_bin'
ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS timer (
	`user` VARCHAR(36) NOT NULL COLLATE 'armscii8_bin',
	`rounds` INT(10) NOT NULL,
	`currentRound` INT(10) NOT NULL DEFAULT '1',
	`items` VARCHAR(15) NOT NULL COLLATE 'armscii8_bin',
	`game` ENUM('Quake Live','Quake Champions') NOT NULL COLLATE 'armscii8_bin'
)
COLLATE='armscii8_bin'
ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS timer_round (
	`id` VARCHAR(36) NOT NULL COLLATE 'armscii8_bin',
	`item` ENUM('Heavy','Mega') NOT NULL COLLATE 'armscii8_bin',
	`startTime` INT(10) NOT NULL,
	`spawnTime` INT(10) NOT NULL,
	`round` INT(10) NOT NULL,
	`guess` INT(10) NULL DEFAULT NULL,
	`status` ENUM('In Progress','Correct','Incorrect') NOT NULL DEFAULT 'In Progress' COLLATE 'armscii8_bin',
	`game` ENUM('Quake Live','Quake Champions') NOT NULL COLLATE 'armscii8_bin'
)
COLLATE='armscii8_bin'
ENGINE=InnoDB;
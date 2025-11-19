-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Lis 19, 2025 at 03:33 AM
-- Wersja serwera: 10.4.32-MariaDB
-- Wersja PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `treework`
--

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `calendar`
--

CREATE TABLE `calendar` (
                            `id` int(11) NOT NULL,
                            `text` varchar(255) NOT NULL,
                            `date` date NOT NULL,
                            `hour_from` time DEFAULT NULL,
                            `hour_to` time DEFAULT NULL,
                            `user_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `calendar`
--

INSERT INTO `calendar` (`id`, `text`, `date`, `hour_from`, `hour_to`, `user_id`) VALUES
                                                                                     (1, 'test', '2025-11-20', NULL, '14:44:00', 1),
                                                                                     (3, 'test1', '2025-11-05', NULL, '12:32:00', 1),
                                                                                     (4, 'adweq', '2025-11-14', NULL, '12:54:00', 1);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `links`
--

CREATE TABLE `links` (
                         `id` int(11) NOT NULL,
                         `link` varchar(255) NOT NULL,
                         `user_id` int(11) NOT NULL,
                         `image_url` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `notes`
--

CREATE TABLE `notes` (
                         `id` int(11) NOT NULL,
                         `user_id` int(11) NOT NULL,
                         `title` varchar(100) NOT NULL,
                         `text` varchar(255) DEFAULT NULL,
                         `attributes` varchar(20) DEFAULT NULL,
                         `tags` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `project`
--

CREATE TABLE `project` (
                           `id` int(11) NOT NULL,
                           `user_id` int(11) NOT NULL,
                           `name` varchar(255) NOT NULL,
                           `owner` varchar(255) DEFAULT NULL,
                           `estimated_time` int(11) DEFAULT NULL,
                           `description` text DEFAULT NULL,
                           `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `project`
--

INSERT INTO `project` (`id`, `user_id`, `name`, `owner`, `estimated_time`, `description`, `created_at`) VALUES
                                                                                                            (1, 1, 'test', 'olivier', 60, 'test czy dziala', '2025-11-19 01:21:42'),
                                                                                                            (12, 1, 'test2', 'olivier', 60, 'test czy dziala wczytywanie ', '2025-11-19 01:41:39'),
                                                                                                            (13, 1, 'afasadsa', '', 0, '', '2025-11-19 02:11:08'),
                                                                                                            (14, 1, 'asdasdsad', '', 0, '', '2025-11-19 02:13:54'),
                                                                                                            (15, 1, 'asfasdsadsa', '', 0, '', '2025-11-19 02:14:23');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `subtask`
--

CREATE TABLE `subtask` (
                           `id` int(11) NOT NULL,
                           `task_id` int(11) NOT NULL,
                           `title` varchar(255) NOT NULL,
                           `due_date` date DEFAULT NULL,
                           `assignee` varchar(255) DEFAULT NULL,
                           `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `subtask`
--

INSERT INTO `subtask` (`id`, `task_id`, `title`, `due_date`, `assignee`, `created_at`) VALUES
                                                                                           (1, 1, 'test01', '0000-00-00', '', '2025-11-19 01:21:42'),
                                                                                           (5, 14, 'test02', '0000-00-00', '', '2025-11-19 01:41:39'),
                                                                                           (6, 17, 'asdsadad', '0000-00-00', '', '2025-11-19 02:13:54'),
                                                                                           (7, 18, 'sadasdasda', '0000-00-00', '', '2025-11-19 02:14:23');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `task`
--

CREATE TABLE `task` (
                        `id` int(11) NOT NULL,
                        `project_id` int(11) NOT NULL,
                        `title` varchar(255) NOT NULL,
                        `due_date` date DEFAULT NULL,
                        `assignee` varchar(255) DEFAULT NULL,
                        `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `task`
--

INSERT INTO `task` (`id`, `project_id`, `title`, `due_date`, `assignee`, `created_at`) VALUES
                                                                                           (1, 1, 'test1', '0000-00-00', '', '2025-11-19 01:21:42'),
                                                                                           (13, 12, 'test1', '0000-00-00', '', '2025-11-19 01:41:39'),
                                                                                           (14, 12, 'task2', '0000-00-00', '', '2025-11-19 01:41:39'),
                                                                                           (15, 12, 'tast 3', '0000-00-00', '', '2025-11-19 01:41:39'),
                                                                                           (16, 13, 'sadasd', '0000-00-00', '', '2025-11-19 02:11:08'),
                                                                                           (17, 14, 'asdasd', '0000-00-00', '', '2025-11-19 02:13:54'),
                                                                                           (18, 15, 'asdsada', '0000-00-00', '', '2025-11-19 02:14:23');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `users`
--

CREATE TABLE `users` (
                         `id` int(11) NOT NULL,
                         `name_and_surname` varchar(100) NOT NULL,
                         `nickname` varchar(100) DEFAULT NULL,
                         `email` varchar(100) NOT NULL,
                         `PASSWORD` varchar(255) NOT NULL,
                         `profile_picture` longblob DEFAULT NULL,
                         `phone_number` varchar(15) DEFAULT NULL,
                         `country` varchar(20) DEFAULT NULL,
                         `city` varchar(20) DEFAULT NULL,
                         `profesion` varchar(30) DEFAULT NULL,
                         `POSITION` varchar(30) DEFAULT NULL,
                         `linkedin_url` varchar(255) DEFAULT NULL,
                         `instagram_url` varchar(255) DEFAULT NULL,
                         `facebook_url` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name_and_surname`, `nickname`, `email`, `PASSWORD`, `profile_picture`, `phone_number`, `country`, `city`, `profesion`, `POSITION`, `linkedin_url`, `instagram_url`, `facebook_url`) VALUES
    (1, 'olivier', NULL, 'olivier@test.com', '$2b$10$q6i/jyqxjouJed//Z/4JNeWpIx9hOyvEFVhLHlfPsuBM3sJHf2WEK', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);

--
-- Indeksy dla zrzutów tabel
--

--
-- Indeksy dla tabeli `calendar`
--
ALTER TABLE `calendar`
    ADD PRIMARY KEY (`id`),
  ADD KEY `calendar_user_fk` (`user_id`);

--
-- Indeksy dla tabeli `links`
--
ALTER TABLE `links`
    ADD PRIMARY KEY (`id`),
  ADD KEY `fk_links_user` (`user_id`);

--
-- Indeksy dla tabeli `notes`
--
ALTER TABLE `notes`
    ADD PRIMARY KEY (`id`),
  ADD KEY `fk_notes_user2` (`user_id`);

--
-- Indeksy dla tabeli `project`
--
ALTER TABLE `project`
    ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indeksy dla tabeli `subtask`
--
ALTER TABLE `subtask`
    ADD PRIMARY KEY (`id`),
  ADD KEY `task_id` (`task_id`);

--
-- Indeksy dla tabeli `task`
--
ALTER TABLE `task`
    ADD PRIMARY KEY (`id`),
  ADD KEY `project_id` (`project_id`);

--
-- Indeksy dla tabeli `users`
--
ALTER TABLE `users`
    ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `calendar`
--
ALTER TABLE `calendar`
    MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `links`
--
ALTER TABLE `links`
    MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `notes`
--
ALTER TABLE `notes`
    MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `project`
--
ALTER TABLE `project`
    MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `subtask`
--
ALTER TABLE `subtask`
    MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `task`
--
ALTER TABLE `task`
    MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
    MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `calendar`
--
ALTER TABLE `calendar`
    ADD CONSTRAINT `calendar_user_fk` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `links`
--
ALTER TABLE `links`
    ADD CONSTRAINT `fk_links_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `links_ibfk_1` FOREIGN KEY (`id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `notes`
--
ALTER TABLE `notes`
    ADD CONSTRAINT `fk_notes_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_notes_user2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `notes_ibfk_1` FOREIGN KEY (`id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `project`
--
ALTER TABLE `project`
    ADD CONSTRAINT `project_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `subtask`
--
ALTER TABLE `subtask`
    ADD CONSTRAINT `subtask_ibfk_1` FOREIGN KEY (`task_id`) REFERENCES `task` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `task`
--
ALTER TABLE `task`
    ADD CONSTRAINT `task_ibfk_1` FOREIGN KEY (`project_id`) REFERENCES `project` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

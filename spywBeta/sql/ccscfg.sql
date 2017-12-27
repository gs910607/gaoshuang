/*
Navicat MySQL Data Transfer

Source Server         : 253
Source Server Version : 50620
Source Host           : 10.46.178.253:3306
Source Database       : ccscfg

Target Server Type    : MYSQL
Target Server Version : 50620
File Encoding         : 65001

Date: 2017-07-20 10:57:36
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for t_booking_meeting_info
-- ----------------------------
DROP TABLE IF EXISTS `t_booking_meeting_info`;
CREATE TABLE `t_booking_meeting_info` (
  `id` varchar(64) NOT NULL,
  `meetingTheme` varchar(64) NOT NULL,
  `startTime` varchar(40) NOT NULL,
  `expectTime` varchar(40) NOT NULL,
  `isMessage` varchar(2) NOT NULL,
  `sponsor` varchar(64) DEFAULT NULL,
  `sponsorNumber` varchar(64) NOT NULL,
  `status` varchar(2) NOT NULL,
  `endTime` varchar(40) DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for t_conference_info_his
-- ----------------------------
DROP TABLE IF EXISTS `t_conference_info_his`;
CREATE TABLE `t_conference_info_his` (
  `conferenceId` varchar(64) NOT NULL,
  `subject` varchar(64) DEFAULT NULL,
  `sponsor` varchar(40) NOT NULL,
  `chairman` varchar(40) DEFAULT NULL,
  `displayNum` varchar(64) DEFAULT NULL,
  `startTime` varchar(64) NOT NULL,
  `endTime` varchar(64) DEFAULT NULL,
  `duration` int(11) NOT NULL DEFAULT '0',
  `enterpriseId` varchar(64) DEFAULT NULL,
  `confStatus` varchar(16) DEFAULT NULL,
  `confReason` varchar(16) DEFAULT NULL,
  `confMemberPhone` varchar(2000) DEFAULT NULL,
  `createDate` varchar(64) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


-- ----------------------------
-- Table structure for t_conference_member
-- ----------------------------
DROP TABLE IF EXISTS `t_conference_member`;
CREATE TABLE `t_conference_member` (
  `id` varchar(64) DEFAULT NULL,
  `phone` varchar(64) DEFAULT NULL,
  `name` varchar(64) DEFAULT NULL,
  `address` varchar(200) DEFAULT NULL,
  `email` varchar(64) DEFAULT NULL,
  `headImg` varchar(200) DEFAULT NULL,
  `headColor` varchar(200) DEFAULT NULL,
  `company` varchar(200) DEFAULT NULL,
  `birthday` varchar(64) DEFAULT NULL,
  `position` varchar(64) DEFAULT NULL,
  `enterpriseId` varchar(64) DEFAULT NULL,
  `participantStatus` varchar(64) DEFAULT NULL,
  `speakStatus` varchar(10) DEFAULT NULL,
  `jionTime` varchar(64) DEFAULT NULL,
  `quitTime` varchar(64) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


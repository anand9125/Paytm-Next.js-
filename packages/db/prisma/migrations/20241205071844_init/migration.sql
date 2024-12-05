/*
  Warnings:

  - You are about to drop the `Balance` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Merchant` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `onRanpTransition` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Balance" DROP CONSTRAINT "Balance_userId_fkey";

-- DropForeignKey
ALTER TABLE "onRanpTransition" DROP CONSTRAINT "onRanpTransition_userId_fkey";

-- DropTable
DROP TABLE "Balance";

-- DropTable
DROP TABLE "Merchant";

-- DropTable
DROP TABLE "onRanpTransition";

-- DropEnum
DROP TYPE "AuthType";

-- DropEnum
DROP TYPE "OnRampStatus";

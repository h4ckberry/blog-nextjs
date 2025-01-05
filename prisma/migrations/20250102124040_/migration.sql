/*
  Warnings:

  - You are about to drop the column `access_Token` on the `accounts` table. All the data in the column will be lost.
  - You are about to drop the column `expries_at` on the `accounts` table. All the data in the column will be lost.
  - You are about to drop the column `refresh_Token` on the `accounts` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "accounts" DROP COLUMN "access_Token",
DROP COLUMN "expries_at",
DROP COLUMN "refresh_Token",
ADD COLUMN     "access_token" TEXT,
ADD COLUMN     "expires_at" INTEGER,
ADD COLUMN     "refresh_token" TEXT;

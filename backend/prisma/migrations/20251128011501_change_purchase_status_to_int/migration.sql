/*
  Warnings:

  - You are about to alter the column `status` on the `Purchase` table. The data in that column could be lost. The data in that column will be cast from `VarChar(20)` to `TinyInt`.

*/
-- AlterTable
ALTER TABLE `Purchase` MODIFY `status` TINYINT NOT NULL DEFAULT 0;

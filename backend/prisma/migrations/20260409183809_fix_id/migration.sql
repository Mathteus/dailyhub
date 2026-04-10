/*
  Warnings:

  - The primary key for the `acounts` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_acounts" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "salt" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_acounts" ("createdAt", "email", "id", "password", "salt", "updatedAt") SELECT "createdAt", "email", "id", "password", "salt", "updatedAt" FROM "acounts";
DROP TABLE "acounts";
ALTER TABLE "new_acounts" RENAME TO "acounts";
CREATE UNIQUE INDEX "acounts_email_key" ON "acounts"("email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

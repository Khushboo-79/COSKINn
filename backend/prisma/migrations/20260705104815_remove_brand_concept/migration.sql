/*
  Warnings:

  - You are about to drop the column `preferredBrands` on the `customer_makeup_preferences` table. All the data in the column will be lost.
  - You are about to drop the column `brandId` on the `products` table. All the data in the column will be lost.
  - You are about to drop the `brands` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "products" DROP CONSTRAINT "products_brandId_fkey";

-- AlterTable
ALTER TABLE "customer_makeup_preferences" DROP COLUMN "preferredBrands";

-- AlterTable
ALTER TABLE "products" DROP COLUMN "brandId";

-- DropTable
DROP TABLE "brands";

/*
  Warnings:

  - You are about to drop the column `mode` on the `categories` table. All the data in the column will be lost.
  - You are about to drop the column `preferredMode` on the `customer_profiles` table. All the data in the column will be lost.
  - You are about to drop the column `flavor` on the `product_variants` table. All the data in the column will be lost.
  - You are about to drop the column `fragrance` on the `product_variants` table. All the data in the column will be lost.
  - You are about to drop the column `shadeCode` on the `product_variants` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `refund_transactions` table. All the data in the column will be lost.
  - You are about to drop the column `mode` on the `subcategories` table. All the data in the column will be lost.
  - You are about to drop the `home_layout_config` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "categories" DROP COLUMN "mode";

-- AlterTable
ALTER TABLE "customer_profiles" DROP COLUMN "preferredMode";

-- AlterTable
ALTER TABLE "product_variants" DROP COLUMN "flavor",
DROP COLUMN "fragrance",
DROP COLUMN "shadeCode",
ADD COLUMN     "netQuantity" TEXT;

-- AlterTable
ALTER TABLE "products" ADD COLUMN     "countryOfOrigin" TEXT,
ADD COLUMN     "manufacturerAddress" TEXT,
ADD COLUMN     "manufacturerName" TEXT;

-- AlterTable
ALTER TABLE "refund_transactions" DROP COLUMN "updatedAt";

-- AlterTable
ALTER TABLE "subcategories" DROP COLUMN "mode";

-- DropTable
DROP TABLE "home_layout_config";

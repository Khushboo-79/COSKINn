/*
  Warnings:

  - You are about to drop the column `placement` on the `banners` table. All the data in the column will be lost.
  - You are about to drop the column `minOrderAmount` on the `coupons` table. All the data in the column will be lost.
  - Added the required column `position` to the `banners` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "banners" DROP COLUMN "placement",
ADD COLUMN     "position" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "coupons" DROP COLUMN "minOrderAmount",
ADD COLUMN     "minPurchase" DOUBLE PRECISION,
ALTER COLUMN "perUserLimit" DROP NOT NULL,
ALTER COLUMN "perUserLimit" DROP DEFAULT;

-- AlterTable
ALTER TABLE "orders" ADD COLUMN     "couponId" TEXT;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_couponId_fkey" FOREIGN KEY ("couponId") REFERENCES "coupons"("id") ON DELETE SET NULL ON UPDATE CASCADE;

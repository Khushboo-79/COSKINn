-- AlterTable
ALTER TABLE "products" ADD COLUMN     "isCodAvailable" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "isReturnable" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "returnPolicy" TEXT,
ADD COLUMN     "storageInstructions" TEXT;

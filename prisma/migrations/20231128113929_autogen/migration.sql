-- AlterTable
ALTER TABLE "adoptions" ALTER COLUMN "id" SET DEFAULT gen_random_uuid();

-- AlterTable
ALTER TABLE "pets" ALTER COLUMN "id" SET DEFAULT gen_random_uuid();

-- AlterTable
ALTER TABLE "user_profiles" ALTER COLUMN "id" SET DEFAULT gen_random_uuid();

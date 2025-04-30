-- CreateTable
CREATE TABLE "PayYou" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "dueDate" TIMESTAMP(3) NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PayYou_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "PayYou_userId_idx" ON "PayYou"("userId");

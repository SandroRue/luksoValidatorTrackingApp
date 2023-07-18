-- CreateTable
CREATE TABLE "LuksoData" (
    "id" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "creationDate" TIMESTAMP(3) NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "LuksoData_pkey" PRIMARY KEY ("id")
);

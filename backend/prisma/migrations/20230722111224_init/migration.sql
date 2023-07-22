-- CreateTable
CREATE TABLE "LuksoDataAverage" (
    "id" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "creationDate" TIMESTAMP(3) NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "LuksoDataAverage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Episode" (
    "id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "airDate" TEXT NOT NULL,
    "episodeCode" TEXT NOT NULL,

    CONSTRAINT "Episode_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Recommendation" (
    "id" SERIAL NOT NULL,
    "month" TEXT NOT NULL,
    "episodeId" INTEGER NOT NULL,

    CONSTRAINT "Recommendation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Recommendation_month_episodeId_key" ON "Recommendation"("month", "episodeId");

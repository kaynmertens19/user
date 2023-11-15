-- CreateTable
CREATE TABLE "User" (
    "_id" UUID NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "surname" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "watchList" TEXT[],

    CONSTRAINT "User_pkey" PRIMARY KEY ("_id")
);

-- CreateTable
CREATE TABLE "Movies" (
    "_id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "userId" UUID,
    "genreId" UUID,
    "score" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "poster_img" TEXT NOT NULL,

    CONSTRAINT "Movies_pkey" PRIMARY KEY ("_id")
);

-- CreateTable
CREATE TABLE "Genres" (
    "_id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "movieId" UUID,

    CONSTRAINT "Genres_pkey" PRIMARY KEY ("_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Movies" ADD CONSTRAINT "Movies_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Genres" ADD CONSTRAINT "Genres_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "Movies"("_id") ON DELETE SET NULL ON UPDATE CASCADE;

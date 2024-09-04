-- CreateTable
CREATE TABLE "BookmarkedMovie" (
    "movieID" INTEGER NOT NULL,

    CONSTRAINT "BookmarkedMovie_pkey" PRIMARY KEY ("movieID")
);

-- CreateTable
CREATE TABLE "Rating" (
    "id" TEXT NOT NULL,
    "rated" BOOLEAN NOT NULL DEFAULT false,
    "rating" INTEGER,
    "userEmail" TEXT NOT NULL,
    "movieID" INTEGER NOT NULL,

    CONSTRAINT "Rating_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Comment" (
    "id" TEXT NOT NULL,
    "comment" TEXT NOT NULL,
    "userEmail" TEXT NOT NULL,
    "movieID" INTEGER NOT NULL,

    CONSTRAINT "Comment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_BookmarkedMovieToUser" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_BookmarkedMovieToUser_AB_unique" ON "_BookmarkedMovieToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_BookmarkedMovieToUser_B_index" ON "_BookmarkedMovieToUser"("B");

-- AddForeignKey
ALTER TABLE "Rating" ADD CONSTRAINT "Rating_userEmail_fkey" FOREIGN KEY ("userEmail") REFERENCES "User"("email") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_userEmail_fkey" FOREIGN KEY ("userEmail") REFERENCES "User"("email") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BookmarkedMovieToUser" ADD CONSTRAINT "_BookmarkedMovieToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "BookmarkedMovie"("movieID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BookmarkedMovieToUser" ADD CONSTRAINT "_BookmarkedMovieToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("email") ON DELETE CASCADE ON UPDATE CASCADE;

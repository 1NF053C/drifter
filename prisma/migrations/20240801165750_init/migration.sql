-- CreateTable
CREATE TABLE "MapboxPublicConfig" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "publicKey" TEXT NOT NULL,
    "startLng" REAL NOT NULL,
    "startLat" REAL NOT NULL,
    "zoomLevel" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "Place" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "url" TEXT NOT NULL,
    "summary" TEXT NOT NULL
);

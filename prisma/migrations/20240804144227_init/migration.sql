-- CreateTable
CREATE TABLE "MapboxPublicConfig" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "publicKey" TEXT NOT NULL,
    "startLng" REAL NOT NULL,
    "startLat" REAL NOT NULL,
    "zoomLevel" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "RunningShoeStore" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "streetAddress" TEXT NOT NULL,
    "lng" REAL NOT NULL,
    "lat" REAL NOT NULL
);

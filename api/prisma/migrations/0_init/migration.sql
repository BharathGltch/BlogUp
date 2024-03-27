-- CreateTable

CREATE TABLE "blogs" (

    "blogid" SERIAL NOT NULL,

    "userid" INTEGER,

    "date" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,



    CONSTRAINT "blogs_pkey" PRIMARY KEY ("blogid")

);



-- CreateTable

CREATE TABLE "users" (

    "userid" SERIAL NOT NULL,

    "username" VARCHAR(255),

    "password" VARCHAR(255),



    CONSTRAINT "users_pkey" PRIMARY KEY ("userid")

);



-- AddForeignKey

ALTER TABLE "blogs" ADD CONSTRAINT "blogs_userid_fkey" FOREIGN KEY ("userid") REFERENCES "users"("userid") ON DELETE NO ACTION ON UPDATE NO ACTION;




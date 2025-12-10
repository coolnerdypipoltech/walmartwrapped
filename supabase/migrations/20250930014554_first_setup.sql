CREATE TABLE "public"."Store" (
    "id" uuid not null DEFAULT uuid_generate_v4(),
    "name" text,
    "storeId" text,
    "link" text
);

CREATE UNIQUE INDEX "Store_pkey" ON public."Store" USING btree (id);
ALTER TABLE "public"."Store" ADD CONSTRAINT "Store_pkey" PRIMARY KEY USING INDEX "Store_pkey";


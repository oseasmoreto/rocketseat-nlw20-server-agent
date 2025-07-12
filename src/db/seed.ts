import { seed, reset } from "drizzle-seed";
import { db, sql } from "./connection.ts";
import { schema } from "./schema/index.ts";
import { generateDateLast } from "../utils/generate-date-last.ts";

await reset(db, schema);

const { minDate, maxDate } = generateDateLast();

await seed(db, schema).refine((f) => ({
  rooms: {
    count: 5,
    columns: {
      name: f.companyName(),
      description: f.loremIpsum(),
      createdAt: f.date({ minDate, maxDate }),
    },
  },
  questions: {
    count: 5,
  },
}));

await sql.end();

import { fastifyCors } from "@fastify/cors";
import { fastify } from "fastify";
import { fastifyMultipart } from "@fastify/multipart";
import {
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from "fastify-type-provider-zod";
import { env } from "./env.ts";
import { getRoomsRoute } from "./http/routes/get-rooms.ts";
import { createRoomsRoute } from "./http/routes/create-rooms.ts";
import { getRoomQuestionsRoute } from "./http/routes/get-room-questions.ts";
import { createRoomQuestionRoute } from "./http/routes/create-room-questions.ts";
import { uploadAudioRoute } from "./http/routes/upload-audio.ts";

const app = fastify().withTypeProvider<ZodTypeProvider>();

app.register(fastifyCors, {
  origin: "http://localhost:5173",
});

app.setSerializerCompiler(serializerCompiler);
app.setValidatorCompiler(validatorCompiler);

app.register(fastifyMultipart);

app.get("/health", () => {
  return { message: "OK" };
});

app.register(getRoomsRoute);
app.register(createRoomsRoute);
app.register(getRoomQuestionsRoute);
app.register(createRoomQuestionRoute);
app.register(uploadAudioRoute);

app.listen({
  port: env.PORT,
});

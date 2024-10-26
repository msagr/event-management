import express from "express";
import env from "dotenv";
import { createClient } from '@supabase/supabase-js'


env.config();

const app = express();

const supabase = createClient(process.env.PROJECT_URL,process.env.API_KEY);

app.get("/", (_, response) => 
    response.json({info: "Express app with Supabase"})
);

app.listen(process.env.PORT, () =>
    console.log(
      new Date().toLocaleTimeString() +
        `: Server is running on port ${process.env.PORT}...`
    )
  );
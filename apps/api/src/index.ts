import { serve } from "@hono/node-server"
import { Hono } from "hono"

const app = new Hono()

app.get("/", (c) => {
  return c.json({
    service: "daerah-kita-api",
    status: "ok",
    version: "0.1.0",
  })
})

const port = Number(process.env.PORT ?? 3001)

serve(
  {
    fetch: app.fetch,
    port,
  },
  (info) => {
    console.log(`Daerah Kita API running on http://localhost:${info.port}`)
  }
)

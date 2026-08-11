import app from "./app.js";

const PORT = 4000

app.listen(PORT, () => {
    console.log(`DB Service listening on PORT:${PORT}`)
})
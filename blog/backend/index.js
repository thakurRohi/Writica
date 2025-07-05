import express from 'express'
import cors from 'cors'

const app=express();

app.use(cors())

app.get('/',(req,res)=>{
    res.send('server is ready')
})
// /api/jokes is standardization of url
app.get('/api/jokes',(req,res)=>{
    const jokes = [
        { id: 1, joke: "Why don't scientists trust atoms? Because they make up everything!" },
        { id: 2, joke: "Why did the math book look sad? Because it had too many problems." },
        { id: 3, joke: "Why did the scarecrow win an award? Because he was outstanding in his field!" },
        { id: 4, joke: "Why don't programmers like nature? It has too many bugs." },
        { id: 5, joke: "Why did the bicycle fall over? Because it was two-tired!" }
    ]

    res.send(jokes)
})

const port = process.env.PORT||3000

app.listen(port,()=>{
    console.log(`server at http://localhost:${port}`)
})
import express from 'express'
import cors from 'cors'

const app = express()
app.use(cors())
app.use(express.json())

const users = []

const tweets = []

app.post('/sign-up', (req, res) => {
    users.push(req.body)
    res.send('OK');
})

app.post('/tweets', (req, res) => {
    let nicks = users.map((i) => i.username)
    if(nicks.includes(req.body.username)){
        const usuario = users.find(e => e.username === req.body.username)
        const img = usuario.avatar
        const twit = {username: req.body.username, avatar: img, tweet: req.body.tweet}
        tweets.push(twit)
        res.send('OK')
    } else{
    res.send('UNAUTHORIZED');
    }
})

app.get('/tweets', (req, res) => {
    res.send(tweets.slice(-10));
})


app.listen(5000)
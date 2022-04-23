const express = require('express');
const {Readable} = require('stream');
const path = require('path');
const {google} = require('googleapis')
const fileUpload = require('express-fileupload')
const KEYFILEPATH = require('./key.json');
const { ideahub } = require('googleapis/build/src/apis/ideahub');
const scopes = ['https://www.googleapis.com/auth/drive']
const auth = new google.auth.GoogleAuth( {
  keyFile: './key.json',
  scopes: scopes
})

const app = express();
const port = process.env.PORT || 8080;
app.use(express.static(path.join(__dirname, '')));
app.use(fileUpload());
// sendFile will go here
app.get('/', async function(req, res) {
  res.sendFile(path.join(__dirname, '/index.html'));
});

app.get('/musics', async function(req, res) {
    const driveService = google.drive({version: 'v3', auth})
    const queryResponse = await driveService.files.list({q: `'1FoR2mOjk_havDABg9ea6xIoFn3PHKNwR' in parents and trashed = false`});
    res.send(queryResponse.data.files);
});

app.post('/upload', async function(req, res) {
    console.log(req.files.sampleFile); // the uploaded file object
    //let file = new Blob([req.files.sampleFile]); 
    //this is to ensure the file is in a format that can be understood by the API
    const driveService = google.drive({version: 'v3', auth})
    let fileMetadata = {
        name: req.files.sampleFile.name,
        parents: ['1FoR2mOjk_havDABg9ea6xIoFn3PHKNwR']
    }
    const readable = new Readable()
    readable.push(req.files.sampleFile.data)
    let media = {
        mimeType: req.files.sampleFile.mimetype,
        body: Readable.from(req.files.sampleFile.data)
    }
    let response = await driveService.files.create({
        requestBody: fileMetadata,
        media: media,
        fields: 'id'
    })
    if (response.status == 200) {
        res.send(response.data.id)
    } 
    else {
        res.end('Error')
    }
});

app.listen(port);
console.log('Server started at http://localhost:' + port);
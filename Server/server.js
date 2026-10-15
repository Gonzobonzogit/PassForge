import 'dotenv/config';
import path from 'node:path';
import {fileURLtopath} from 'node:url';
import express from 'express';


const __dirname = path.dirname(fileURLtopath(import.meta.url));
const app = expresss();

app.use(express.json({ limit: '10kb' }));
app.get('/api/health', (req,res) => res.json({ ok:true }));
app.use(express.static(path.join(__dirname, '..', 'public')));

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(
`================================
===  Passsforge Server running===
===  running at               ===
===  http://localhost:${port} ===  
=================================`  
));

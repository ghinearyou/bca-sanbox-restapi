const normalizedPath = require("path").join(__dirname);
const fs = require('fs');
const all_file = fs.readdirSync(normalizedPath)
require('dotenv').config()

let provider = process.env.DB_DIALECT || 'mysql'
let uname = process.env.DB_USERNAME || 'root'
let pword = process.env.DB_PASSWORD || ''
let host = process.env.DB_HOST || '127.0.0.1'
let db = process.env.DB_DATABASE || 'testing'

let models = 
`generator client {
    provider = "prisma-client-js"
    previewFeatures = ["groupBy"]
}

datasource db {
    provider = "${provider}"
    url      = "${provider}://${uname}:${pword}@${host}:3306/${db}"
}

`
const schema = () => {
  for(let i = 0; i < all_file.length; i++) {
    if(all_file[i].includes('.prisma') && all_file[i] !== 'schema.prisma') {
      let data = fs.readFileSync("./schema/" + all_file[i],'utf8')
      models = models + data
    } else if (all_file[i] === 'schema.prisma') {
      fs.unlinkSync('./schema/schema.prisma')
    }
  }
  fs.writeFileSync('./schema/schema.prisma', models)
  return models
}

schema()
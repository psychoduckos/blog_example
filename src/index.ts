import express from 'express'
import * as dotenv from 'dotenv'
import path from "path";
import {prisma} from "./prisma";


dotenv.config()
const PORT = process.env.PORT || 5001

const importThis = (toImport: any) => {
    return typeof toImport;
};

async function main() {

    importThis(prisma)

    // init express app
    const app = express();

    // configure express app
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    // get developer HTLM page
    app.get('/', (req, res) => {
        res.send('Hello, World!');
    });

    // public images
    const images = path.join(__dirname, '../public', 'images');
    app.use('/public/images', express.static(images));

    // listen port
    app.listen(PORT,  () => {
        console.log(`Server was started on PORT ${PORT}`);
    })
}

main()
    .then(() => {
        console.log(`Server was started on PORT ${PORT}`);
    })
    .catch(async (err) => {
        console.error(err);
        process.exit(1);
    });





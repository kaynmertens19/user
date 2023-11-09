import httpServer from "./config/http";
import "#Config/env.js"
import connectDB from "./config/db";
const bootstrap = async () => {

    const mongoDB = process.env.MONGODB_URL || "local"

   await connectDB(mongoDB);

    httpServer.listen(process.env.PORT  , () =>{
        console.log(`listening on ${process.env.PORT}`);
    })
}

bootstrap();
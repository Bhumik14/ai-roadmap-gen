import fastapiClient from "../config/fastapi.js";

async function generateRoadmap() {
    try{
        // const response = await fastapiClient.post("/roadmap/generate", );
        // console.log(response);
    }
    catch (error) {
        console.error("Error while generating Roadmap: ",error);
    }
}
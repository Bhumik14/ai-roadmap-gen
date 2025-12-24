import {fastapiClient} from "../config/fastapi.js"

export async function roadmapCreationController (req, res) {
    try{
        const { target_role, experience, skills, goals, weeklyTime } = req.body;
        if(!target_role || !experience || skills.length < 1) {
            return res.status(400).send({error: 'All fields are required'});
        }

        const prompt_response = await fastapiClient.post("/api/roadmap/format-prompt", req.body); // output - formated prompt (string)
        const { formatted_message } = prompt_response.data;
        console.log(formatted_message);

        const prompt = {
            "system": formatted_message[0].content,
            "human": formatted_message[1].content,
        }
        console.log(prompt);
        const roadmap = await fastapiClient.post("/api/roadmap/create-roadmap", prompt);

         res.status(201).json({
            message: "Roadmap Created Sucessfully",
             roadmap: roadmap.data
        })
    }

    catch(err){
        console.error("Error in Roadmap Creation: ", err);
        res.status(500).json({
            error: "Internal Server Error"
        })
    }
}

export function roadmapCreationResumeController (req, res) {
    try{

        res.status(201).json({
            message: "Roadmap Creation Controller"
        })
    }
    catch(err){
        console.error("Error in Roadmap Creation From Resume: ", err);
        res.status(500).json({
            error: "Internal Server Error"
        })
    }
}


export function quizCreationController (req, res) {
    try{

        res.status(201).json({
            message: "Quiz Creation Controller"
        })
    }
    catch(err){
        console.error("Error in Quiz Creation: ", err);
        res.status(500).json({
            error: "Internal Server Error"
        })
    }
}
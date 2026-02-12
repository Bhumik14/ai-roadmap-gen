import {fastapiClient} from "../config/fastapi.js";
import {PDFParse} from 'pdf-parse';

export async function roadmapCreationController (req, res) {
    console.log(req.body);
    try{
        const { target_role, skills, goals, duration } = req.body;
        if(!target_role || !skills || !goals || !duration) {
            return res.status(400).send({error: 'All fields are required'});
        }
        console.log(req.body);

        const body = {
            target_role: req.body.target_role,
            experience: req.body.experience,
            skills: req.body.skills,
            goals: req.body.goals,
            duration: req.body.duration,
        }
        const prompt_response = await fastapiClient.post("/roadmap/format-prompt", body); // output - formated prompt (string)
        console.log(prompt_response);
        const { formatted_message } = prompt_response.data;
        console.log(formatted_message);

        const prompt = {
            "system": formatted_message[0].content,
            "human": formatted_message[1].content,
        }
        console.log(prompt);

        const roadmap = await fastapiClient.post("/roadmap/create-roadmap", prompt);
        console.log(roadmap);
        
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

export async function roadmapCreationResumeController (req, res) {
    try{
        console.log(process.cwd())
        if(!req.file){
            console.error('no file found')
            return res.status(400).json("Resume is required");
        }
        const file = req.file;

        const parser = new PDFParse({url: req.file.path});
        const resume =await parser.getText();
        const text = resume.text.replace(/[^\x20-\x7E\n]/g, " ").replace(/\s+/g, " ").replace(/\n+/g, "\n").trim();

        // console.log(text);
        const body = {
            resume: text,
            goals: req.body.goals,
            duration: req.body.duration
        };

        const roadmap_prompt = (await fastapiClient.post("/roadmap/format-resume-prompt", body)).data;
        console.log(roadmap_prompt.formatted_message)
        const prompt = {
            "system": roadmap_prompt.formatted_message[0].content,
            "human": roadmap_prompt.formatted_message[1].content
        }
        
        const roadmap = await fastapiClient.post("/roadmap/create-roadmap", prompt);
        console.log(roadmap.data.roadmap)
        console.log("Roadmap Creation Success")

        res.status(201).json({
            message: "Roadmap Creation Controller",
            roadmap: roadmap.data
        })
    }
    catch(err){
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
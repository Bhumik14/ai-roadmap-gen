
export function roadmapCreationController (req, res) {
    try{

        res.status(201).json({
            message: "Roadmap Creation Controller"
        })
    }
    catch(err){
        console.error("Error in Roadmap Creation: ", err);
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
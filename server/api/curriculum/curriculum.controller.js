let curriculum = require('./curriculum.model')();
let models  = require('./../../sqldb')();

module.exports = {

    addCurriculum: (req, res) => {

        if(req.body){
            if(req.body.curriculumType=='SAME' && !req.body.curriculumName)
                res.status(400).json({error:"Missing Name Parameters", message: 'IS_INVALID_INPUT_FORM'});
            else{
                curriculum.createCurriculumForGivenDepartments(models, req.body)
                    .then((output) =>{
                        let result= output.result;
                        let error= output.error;
                        if(result){
                            if(result.length>0){
                                res.status(200).json({data:result, message: 'SUCCESS_OPERATION'});
                            }
                            else
                                res.status(500).json({data:[], message: 'NO_ROW_INSERTED'});
                        }
                        else{
                            if(error=='IS_ALREADY_EXISTS')
                                res.status(400).json({data:[], message: 'IS_ALREADY_EXISTS'});
                            else{
                                res.status(500).json({error: error, message: 'IS_INTERNAL_SERVER_ERROR'});
                            }
                        }
                    })
            }
        }
        else{
            res.status(400).json({error: "Missing Parameters", message: 'IS_INVALID_INPUT_FORM'});
        }
    },

    getCurriculum: (req, res) => {
        if(req.body){
            curriculum.getAllCurriculum(models, req.body)
                .then((output) =>{
                    let result= output.result;
                    let error= output.error;
                    if(result)
                        res.status(200).json({data:result, message: 'ROWS_FOUND'});
                    else{
                        if(error=='NO_ROWS_FOUND')
                            res.status(200).json({data:[], message: 'NO_ROWS_FOUND'});
                        else
                            res.status(500).json({error: error, message: 'IS_INTERNAL_SERVER_ERROR'});
                    }
                })
        }
        else{
            res.status(400).json({error: "Missing Paramters: courseId and academicYearId", message: 'IS_INVALID_INPUT_FORM'});
        }
    },

    deleteCurriculum: (req, res) => {
        if(req.body){
            curriculum.deleteCurriculum(models, req.body)
                .then((output) =>{
                    let result= output.result;
                    let error= output.error;
                    if(result){
                        res.status(200).json({data:result, message: 'SUCCESS_OPERATION'});
                    }
                    else{
                        if(error=='NO_ROWS_FOUND')
                            res.status(200).json({data:[], message: 'NO_ROWS_FOUND'});
                        else
                            res.status(500).json({error: error, message: 'IS_INTERNAL_SERVER_ERROR'});
                    }
                })
        }
        else{
            res.status(400).json({error: "Missing Paramters", message: 'IS_INVALID_INPUT_FORM'});
        }
    },


    assignSubjectElective: (req, res) => {
        if(req.body){
            curriculum.allocateSubjectElective(models, req.body)
                .then((output) =>{
                    let result= output.result;
                    let error= output.error;
                    if(result){
                        res.status(200).json({data:result, message: 'SUCCESS_OPERATION'});
                    }
                    else{
                        if(error=='NO_ROWS_FOUND')
                            res.status(200).json({data:[], message: 'NO_ROWS_FOUND'});
                        else
                            res.status(500).json({error: error, message: 'IS_INTERNAL_SERVER_ERROR'});
                    }
                })
        }
        else{
            res.status(400).json({error: "Missing Paramters", message: 'IS_INVALID_INPUT_FORM'});
        }
    },


    getSemesterListWithNoCurriculum: (req, res) => {
        if(req.body){
            curriculum.getSemesterList(models, req.body)
                .then((output) =>{
                    let result= output.result;
                    let error= output.error;
                    if(result){
                        res.status(200).json({data:result, message: 'ROWS_FOUND'});
                    }
                    else{
                        if(error=='NO_ROWS_FOUND')
                            res.status(200).json({data:[], message: 'NO_ROWS_FOUND'});
                        else{
                            console.log("Error: ", error);
                            res.status(500).json({error: error, message: 'IS_INTERNAL_SERVER_ERROR'});
                        }
                    }
                })
        }
        else{
            res.status(400).json({error: "Missing Paramters", message: 'IS_INVALID_INPUT_FORM'});
        }
    },

    getDepartmentList: (req, res) => {

        if(req.body){
            curriculum.getDepartmentList(models, req.body)
                .then((output) =>{
                    let result= output.result;
                    let error= output.error;
                    if(result){
                        res.status(200).json({data:result, message: 'ROWS_FOUND'});
                    }
                    else{
                        if(error=='NO_ROWS_FOUND')
                            res.status(200).json({data:[], message: 'NO_ROWS_FOUND'});
                        else{
                            console.log("Error: ", error);
                            res.status(500).json({error: error, message: 'IS_INTERNAL_SERVER_ERROR'});
                        }
                    }
                })
        }
        else{
            res.status(400).json({error: "Missing Paramters", message: 'IS_INVALID_INPUT_FORM'});
        }
    },

    freezeCurriculum: (req, res) => {
        if(req.body){
            curriculum.freezeCurriculum(models, req.body)
                .then((output) =>{
                    let result= output.result;
                    let error= output.error;
                    if(result)
                        res.status(200).json({data:{No_OF_ROWS_UPDATED: result}, message: 'SUCCESS_OPERATION'});
                    else{
                        console.log("Error: ", error);
                        if(error=='NO_ROW_UPDATED')
                            res.status(500).json({data:[], message: 'NO_ROW_UPDATED'});
                        else
                            res.status(500).json({error: error, message: 'IS_INTERNAL_SERVER_ERROR'});
                    }
                })
        }
        else{
            res.status(400).json({error: "Missing Paramters: curriculum Id", message: 'IS_INVALID_INPUT_FORM'});
        }
    }
}

const Resume = require('./models/Resume')

const validateResume = (req, res, next) => {
    let errors = {};
    
    if(!req.body.first_name || req.body.first_name.length == 0)
        errors.first_name = "Поле Имя обязательное"

    if(!req.body.last_name || req.body.last_name.length == 0)
        errors.last_name = "Поле Фамилия обязательное"         

    if(JSON.stringify(errors) !== JSON.stringify({})) res.status(400).send(errors)
    else next()
}

const isAuthorOfResume = async (req, res, next) => {
    const id = req.params.id || req.body.id

    const resume = await Resume.findByPk(id)

    if(!resume) res.status(400).send({message: "Резюме с таким идентификатором не найдено"})
    // if(resume && req.user.id === resume.userId) next();
    else if(resume && req.user.id === resume.userId) next();
    else res.status(403).send({message: "Доступ запрещён"})
}


module.exports = {
    validateResume,
    isAuthorOfResume
}
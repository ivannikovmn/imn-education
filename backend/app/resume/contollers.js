const Resume = require('./models/Resume')

const createResume = async (req, res) => {
    const resume = await Resume.create({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        userId: req.user.id
    })

    res.status(200).send(resume);
}

const getMyResumes = async (req, res) => {
    const resumes = await Resume.findAll({where: {userId: req.user.id}});
    res.status(200).send(resumes)
}

const getResume = async (req, res) => {
    const resume = await Resume.findByPk(req.params.id);
    res.status(200).send(resume)
}

const deleteResume = async (req, res) => {
    const data = await Resume.destroy({
        where: {
            id: req.params.id,
        }
    })
    console.log(data);
    res.status(200).end()
}

const editResume = async (req, res) => {
    await Resume.update({
        first_name: req.body.first_name,
        last_name: req.body.last_name,        
        userId: req.user.id
    }, 
    {
        where: {
        id: req.body.id
        }
    })              
    res.status(200).end()

}

module.exports = {
    createResume,
    getMyResumes,
    getResume,
    deleteResume,
    editResume   
}
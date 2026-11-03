const Apply = require('../applies/Apply')
const Resume = require('../resume/models/Resume')
const Vacancy = require('../vacancy/models/Vacancy')
const { ATTENDED } = require('../applies/utils')

const getCertificate = async (req, res) => {
    try {
        const { userId, vacancyId } = req.params

        const resume = await Resume.findOne({
            where: {
                userId
            }
        })

        if (!resume) {
            return res.status(404).send({
                message: 'Резюме не найдено'
            })
        }

        const apply = await Apply.findOne({
            where: {
                resumeId: resume.id,
                vacancyId,
                status: ATTENDED
            }
        })

        if (!apply) {
            return res.status(404).send({
                message: 'Сертификат недоступен'
            })
        }

        const vacancy = await Vacancy.findByPk(vacancyId)

        if (!vacancy) {
            return res.status(404).send({
                message: 'Воркшоп не найден'
            })
        }

        res.status(200).send({
            participant: `${resume.first_name} ${resume.last_name}`,
            event: vacancy.name,
            about_company: vacancy.about_company,
            address: vacancy.address,
            date: vacancy.event_date,
            updatedAt: apply.updatedAt
        })

    } catch (error) {
        console.error(error)
        res.status(500).send({
            message: error.message
        })
    }
}

module.exports = {
    getCertificate
}
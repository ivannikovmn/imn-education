const User = require('../auth/User');
const Role = require('../auth/Role');
const Vacancy = require('./models/Vacancy');
const Company = require('../auth/Company');

const parseMaterials = (value) => {
    if (value === undefined || value === null || value === '') {
        return [];
    }

    const materials = typeof value === 'string' ? JSON.parse(value) : value;

    if (!Array.isArray(materials)) {
        throw new Error('Материалы должны быть массивом ссылок');
    }

    return materials
        .filter((item) => typeof item === 'string')
        .map((item) => item.trim())
        .filter(Boolean);
};

const createVacancy = async (req, res, next) => {
    try {
        const vacancy = await Vacancy.create({
            name: req.body.name,
            about_company: req.body.about_company,
            description: req.body.description,
            event_date: req.body.event_date || null,
            address: req.body.address || null,
            materials: parseMaterials(req.body.materials),
            branding_photo: req.file
                ? '/vacancy/' + req.file.filename
                : null,
            userId: req.user.id,
            companyId: req.user.companyId,
        });

        res.status(201).send(vacancy);        
    } catch (error) {
        next(error);
    }
};

const getMyVacancies = async (req, res) => {
    const vacancies = await Vacancy.findAll({
        where: {
            companyId: req.user.companyId,
        },
    });

    res.status(200).send(vacancies);
};

const getPublicVacancies = async (req, res, next) => {
    try {
        const vacancies = await Vacancy.findAll({
            attributes: ['id', 'name', 'updatedAt'],
            include: [{
                model: User,
                attributes: [],
                required: true,
                include: [{
                    model: Role,
                    attributes: [],
                    where: {
                        name: 'manager',
                    },
                    required: true,
                }],
            }],
            order: [['updatedAt', 'DESC']],
        });

        res.status(200).send(vacancies);
    } catch (error) {
        next(error);
    }
};

const getVacancy = async (req, res) => {
    const vacancy = await Vacancy.findByPk(req.params.id, {
        include: [{
            model: Company,
            as: 'company',
        }],
    });

    if (vacancy) {
        res.status(200).send(vacancy);
    } else {
        res.status(404).send({
            message: 'Воркшоп с таким идентификатором не найден',
        });
    }
};

const deleteVacancy = async (req, res) => {
    await Vacancy.destroy({
        where: {
            id: req.params.id,
        },
    });

    res.status(200).end();
};

const editVacancy = async (req, res, next) => {
    try {
        const vacancy = await Vacancy.findByPk(req.body.id);

        if (!vacancy) {
            return res.status(404).send({
                message: 'Воркшоп не найден',
            });
        }

        await vacancy.update({
            name: req.body.name,
            about_company: req.body.about_company,
            description: req.body.description,
            event_date: req.body.event_date || null,
            address: req.body.address || null,
            materials: parseMaterials(req.body.materials),
            branding_photo: req.file
                ? '/vacancy/' + req.file.filename
                : vacancy.branding_photo,
        });

        res.status(200).send(vacancy);
    } catch (error) {
        next(error);
    }
};

module.exports = {
    createVacancy,
    getMyVacancies,
    getPublicVacancies,
    getVacancy,
    deleteVacancy,
    editVacancy,
};

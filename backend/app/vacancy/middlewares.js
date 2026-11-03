const Vacancy = require('./models/Vacancy');

const validateVacancy = (req, res, next) => {
    const errors = {};

    if (!req.body.name || !req.body.name.trim()) {
        errors.name = 'Укажите название воркшопа';
    }

    if (!req.body.description || !req.body.description.trim()) {
        errors.description = 'Добавьте описание воркшопа';
    }

    if (!req.body.about_company || !req.body.about_company.trim()) {
        errors.about_company = 'Укажите автора или источник';
    }

    if (req.body.materials) {
        try {
            const materials = JSON.parse(req.body.materials);

            if (
                !Array.isArray(materials) ||
                !materials.every((item) => typeof item === 'string')
            ) {
                errors.materials = 'Материалы должны быть массивом ссылок';
            } else if (
                materials.some((item) => {
                    const value = item.trim();
                    return value && !/^https?:\/\/\S+$/i.test(value);
                })
            ) {
                errors.materials = 'Укажите корректные ссылки, начиная с http:// или https://';
            }
        } catch {
            errors.materials = 'Не удалось прочитать список материалов';
        }
    }

    if (Object.keys(errors).length > 0) {
        return res.status(400).send(errors);
    }

    next();
};

const isAuthorVacancy = async (req, res, next) => {
    const id = req.params.id || req.body.id;
    const vacancy = await Vacancy.findByPk(id);

    if (!vacancy) {
        return res.status(404).send({
            message: 'Воркшоп не найден',
        });
    }

    if (vacancy.userId === req.user.id) {
        return next();
    }

    return res.status(403).send({
        message: 'Доступ запрещён',
    });
};

module.exports = {
    validateVacancy,
    isAuthorVacancy,
};

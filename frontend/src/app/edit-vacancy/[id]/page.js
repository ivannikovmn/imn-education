"use client"

import Header from "@/components/header"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import dynamic from "next/dynamic"
import { useRouter, useParams } from "next/navigation"
import { getVacancyById, editVacancy } from "@/app/store/slices/vacancySlice"
import { END_POINT } from "@/config/end-point"
import Image from "next/image"

const Editor = dynamic(() => import("@/components/editor"), {
    ssr: false
})

function EditVacancyForm({ vacancy, router, dispatch }) {
    const [name, setName] = useState(vacancy.name ?? "")
    const [about_company, setAbout_company] = useState(vacancy.about_company ?? "")
    const [description, setDescription] = useState(vacancy.description ?? "")
    const [materials, setMaterials] = useState(
        Array.isArray(vacancy.materials) && vacancy.materials.length
            ? vacancy.materials
            : [""]
    )
    const [branding_photo, setBrandingPhoto] = useState(null)

    const updateMaterial = (index, value) => {
        setMaterials((current) =>
            current.map((item, i) => i === index ? value : item)
        )
    }

    const addMaterial = () => {
        setMaterials((current) => [...current, ""])
    }

    const removeMaterial = (index) => {
        setMaterials((current) => current.filter((_, i) => i !== index))
    }

    const handleSave = () => {
        dispatch(editVacancy({
            id: vacancy.id,
            name,
            about_company,
            description,
            materials: materials.map((item) => item.trim()).filter(Boolean),
            branding_photo
        }, router))
    }

    return (
        <div className="container p7">
            <h1>Редактирование воркшопа</h1>

            <fieldset className="fieldset-vertical">
                <label>Название воркшопа</label>
                <input
                    className="input"
                    placeholder="Введите название"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </fieldset>

            <fieldset className="fieldset-vertical fieldset-md">
                <label>Спикер</label>
                <textarea
                    className="textarea"
                    value={about_company}
                    onChange={(e) => setAbout_company(e.target.value)}
                    rows="5"
                />
            </fieldset>

            <fieldset className="fieldset-vertical fieldset-md">
                <label>Описание</label>
                <div className="editor-field">
                    <Editor data={description} onChange={setDescription} />
                </div>
            </fieldset>

            <fieldset className="fieldset-vertical fieldset-md">
                <label>Ссылки к воркшопу</label>
                {materials.map((material, index) => (
                    <div
                        key={index}
                        className="flex flex-ai-c"
                        style={{ gap: "8px", marginBottom: "8px" }}
                    >
                        <input
                            className="input"
                            type="url"
                            placeholder="https://..."
                            value={material}
                            onChange={(e) => updateMaterial(index, e.target.value)}
                        />
                        <button
                            className="button button-secondary-bordered"
                            type="button"
                            onClick={() => removeMaterial(index)}
                            aria-label="Удалить ссылку"
                        >
                            −
                        </button>
                    </div>
                ))}
                <button
                    className="button button-secondary-bordered"
                    type="button"
                    onClick={addMaterial}
                >
                    + Добавить ссылку
                </button>
            </fieldset>

            <fieldset className="fieldset-vertical">
                <label>Превью к воркшопу</label>

                {vacancy.branding_photo && (
                    <Image
                        src={`${END_POINT}${vacancy.branding_photo}`}
                        alt={vacancy.name ?? "Фото воркшопа"}
                        width={300}
                        height={200}
                        style={{ maxWidth: "300px", height: "auto" }}
                    />
                )}

                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setBrandingPhoto(e.target.files?.[0] ?? null)}
                />
            </fieldset>

            <button
                className="button button-primary"
                type="button"
                onClick={handleSave}
            >
                Сохранить
            </button>
        </div>
    )
}

export default function EditVacancy() {
    const router = useRouter()
    const dispatch = useDispatch()
    const { id } = useParams()
    const vacancy = useSelector((state) => state.vacancy.vacancy)

    useEffect(() => {
        dispatch(getVacancyById(id))
    }, [dispatch, id])

    const isCorrectVacancy =
        vacancy.id != null && String(vacancy.id) === String(id)

    return (
        <main>
            <Header />

            {isCorrectVacancy ? (
                <EditVacancyForm
                    key={String(vacancy.id)}
                    vacancy={vacancy}
                    router={router}
                    dispatch={dispatch}
                />
            ) : (
                <div className="container p7">
                    <p>Загрузка воркшопа...</p>
                </div>
            )}
        </main>
    )
}

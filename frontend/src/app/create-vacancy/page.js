"use client"

import Header from "@/components/header"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { createVacancy } from "@/app/store/slices/vacancySlice"
import dynamic from "next/dynamic"
import { useRouter } from "next/navigation"

const Editor = dynamic(() => import("@/components/editor"), {
    ssr: false
})

export default function CreateVacancy() {
    const [name, setName] = useState("")
    const [about_company, setAbout_company] = useState("")
    const [description, setDescription] = useState("")
    const [materials, setMaterials] = useState([""])
    const [branding_photo, setBrandingPhoto] = useState(null)

    const router = useRouter()
    const dispatch = useDispatch()

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
        dispatch(createVacancy({
            name,
            about_company,
            description,
            materials: materials.map((item) => item.trim()).filter(Boolean),
            branding_photo
        }, router))
    }

    return (
        <main>
            <Header />
            <div className="container p7">
                <h1>Создание воркшопа</h1>

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
                        rows="2"
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
                    Создать воркшоп
                </button>
            </div>
        </main>
    )
}

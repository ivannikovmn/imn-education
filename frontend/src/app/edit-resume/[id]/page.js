'use client';

import Header from '@/components/header';
import Input from '@/components/input';
import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { editResume, getResumeById } from '@/app/store/slices/resumeSlice';

function EditResumeForm({ resume, router, dispatch }) {
  const [first_name, setName] = useState(resume.first_name ?? '');
  const [last_name, setSurname] = useState(resume.last_name ?? '');

  const handleSave = () => {
    dispatch(editResume({
      id: resume.id,
      first_name,
      last_name,
    }, router));
  };

  return (
    <div className="container p7">
      <h1>Ваше резюме</h1>

      <h3>Контактные данные</h3>

      <Input
        placeholder=""
        type="text"
        label="Имя"
        size="fieldset-md"
        onChange={(e) => setName(e.target.value)}
        value={first_name}
      />

      <Input
        placeholder=""
        type="text"
        label="Фамилия"
        size="fieldset-md"
        onChange={(e) => setSurname(e.target.value)}
        value={last_name}
      />

      <button
        className="button button-primary"
        onClick={handleSave}
      >
        Сохранить и опубликовать
      </button>
    </div>
  );
}

export default function EditResume() {
  const router = useRouter();
  const { id } = useParams();
  const dispatch = useDispatch();
  const resume = useSelector((state) => state.resume.resume);

  useEffect(() => {
    dispatch(getResumeById(id));
  }, [dispatch, id]);

  const isCorrectResume =
    resume.id != null && String(resume.id) === String(id);

  return (
    <main>
      <Header />

      {isCorrectResume ? (
        <EditResumeForm
          key={String(resume.id)}
          resume={resume}
          router={router}
          dispatch={dispatch}
        />
      ) : (
        <div className="container p7">
          <p>Загрузка резюме...</p>
        </div>
      )}
    </main>
  );
}
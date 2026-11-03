import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

import { END_POINT } from '@/config/end-point'


export const vacancySlice = createSlice({
  name: 'vacancy',
  initialState: {
    vacancies: [],
    vacancy: {}
  },
  reducers: {
    setVacancies: (state, action) => {
        state.vacancies = action.payload.vacancies
    },
    appendVacancy: (state, action) => {
      state.vacancies = [...state.vacancies, action.payload.newvacancy]
    },
    setVacancy: (state, action) => {
      state.vacancy = action.payload.vacancy
    },
    handleDeleteVacancy: (state, action) => {
      let vacancies = [...state.vacancies]
      vacancies = vacancies.filter(item => item.id !== action.payload)
      state.vacancies = vacancies
    }
  },
})

// Action creators are generated for each case reducer function
export const { setVacancies, setVacancy, handleDeleteVacancy } = vacancySlice.actions

export const getMyVacancies = () => async (dispatch) => {
    
    try{   
        const res = await axios.get(`${END_POINT}/api/vacancy`);        
        dispatch(setVacancies({vacancies: res.data}))       
    }catch(e){
        alert("Что-то пошло не так, сообщите об ошибке тех спецам сайта!")        
    }    
}

export const getVacancyById = (id) => async (dispatch) => {
  try {    
      const res = await axios.get(`${END_POINT}/api/vacancy/${id}`);
      dispatch(setVacancy({vacancy: res.data}))        
  } catch(e) {
      alert("Что-то пошло не так, сообщите об ошибке тех спецам сайта!")
  }
}

export const createVacancy = (sendData, router) => async (dispatch) => {
    try {
        const fd = new FormData()

        fd.append("name", sendData.name)
        fd.append("about_company", sendData.about_company)
        fd.append("description", sendData.description)
        fd.append("materials", JSON.stringify(sendData.materials ?? []))

        if (sendData.branding_photo) {
            fd.append("branding_photo", sendData.branding_photo)
        }

        const res = await axios.post(`${END_POINT}/api/vacancy`, fd)

        router.push("/vacancy")
    } catch(e) {
        console.log(e)
        alert("Что-то пошло не так, сообщите об ошибке тех спецам сайта!")        
    }
}

export const editVacancy = (sendData, router) => async (dispatch) => {
  try {
    const fd = new FormData()

    fd.append("id", sendData.id)
    fd.append("name", sendData.name)
    fd.append("about_company", sendData.about_company)
    fd.append("description", sendData.description)
    fd.append("materials", JSON.stringify(sendData.materials ?? []))

    if (sendData.branding_photo) {
      fd.append("branding_photo", sendData.branding_photo)
    }

    await axios.put(`${END_POINT}/api/vacancy`, fd)

    router.push(`/vacancy/${sendData.id}`)
  } catch(e) {
    console.log(e)
    alert("Что-то пошло не так, сообщите об ошибке тех спецам сайта!")
  }
}
export const deleteVacancy = (id) => async (dispatch) => {  
  try{      
      const res = await axios.delete(`${END_POINT}/api/vacancy/${id}`); 
      dispatch(handleDeleteVacancy(id))
  }catch(e){
    console.log(e);
      alert("Что-то пошло не так, сообщите об ошибке тех спецам сайта!")
  }  
}


export default vacancySlice.reducer
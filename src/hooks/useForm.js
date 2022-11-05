import { useState } from 'react'

const useForm = (json) => {


    const [form, setForm] = useState(json);


    const handleChange = (e) => {

        const { name, value } = e.target;
        
        setForm({
            ...form,
            [name]: value,
        });
        
    };

    const handleSubmit = (e, calback) => {
        e.preventDefault();
        
        calback();

    };

    return {
        form,
        setForm,
        handleChange,
        handleSubmit    
    }

};

export default useForm
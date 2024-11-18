"use client";

import { Breadcrumb } from "@/components/Breadcrumb";
import { Formik } from "formik";
import api from "@/services/api";
import { CustomToast } from "@/components/CustomToast";
import { useState } from "react";

type AssignorForm = {
    document: string;
    email: string;
    phone: string;
    name: string;
}

export default function RegisterAssignor() {
    const [isToastOpen, setIsToastOpen] = useState(false);

    const handleSubmit = async (values: AssignorForm) => {
        try {
            const response = await api.post('/assignor', values, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('bankme_token')}`,
                },
            });
            
            if (response.status === 201) {
                setIsToastOpen(true);

                
            }
        } catch (error) {
            console.error('Error registering receivable:', error);
        }
    }

    const validateAssignorForm = (values: AssignorForm) => {
        const errors: { [key in keyof AssignorForm]?: string } = {};

        if (!values.document) {
            errors.document = "O documento é obrigatório";
        }
        if (!values.email) {
            errors.email = "O email é obrigatório";
        }
        if (!values.phone) {
            errors.phone = "O telefone é obrigatório";
        }
        if (!values.name) {
            errors.name = "O nome é obrigatório";
        }
        return errors;
    }

    return (
        <div className="flex flex-col h-screen p-4 sm:ml-64">
        <Breadcrumb routes={[{name: "Cadastrar cedente", href: "/home/register-assignor"}]} />
        <div className="flex flex-col justify-center items-center">
            <p className="text-2xl pt-6 text-gray-900 font-bold">Cadastrar cedente</p>
        </div>
        <div className="flex flex-col justify-center items-center pt-6">
            <div className="w-full max-w-2xl">
                <Formik 
                    initialValues={{
                        document: "", 
                        email: "", 
                        phone: "",
                        name: ""
                    }} 
                    onSubmit={handleSubmit}
                    validate={validateAssignorForm}
                >
                    {({
                        values, 
                        handleChange, 
                        handleSubmit,
                        errors
                    }) => (
                        <form onSubmit={handleSubmit}>
                            <div className="mb-5">
                                <label 
                                    htmlFor="document" 
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Documento
                                </label>
                                <input
                                    id="document"
                                    name="document"
                                    type="text"
                                    onChange={handleChange}
                                    value={values.document}
                                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                                    required
                                />
                                {errors.document && <p className="text-red-500 text-sm">{errors.document}</p>}
                            </div>
                            <div className="mb-5">
                                <label 
                                    htmlFor="email" 
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Email
                                </label>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    onChange={handleChange}
                                    value={values.email}
                                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                                    required
                                />
                                {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                            </div>
                            <div className="mb-5">
                                <label 
                                    htmlFor="name" 
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Telefone
                                </label>
                                <input
                                    id="phone"
                                    name="phone"
                                    type="text"
                                    onChange={handleChange}
                                    value={values.phone}
                                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                                    required
                                />
                                {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
                            </div>
                            <div className="mb-5">
                                <label 
                                    htmlFor="name" 
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Nome
                                </label>
                                <input
                                    id="name"
                                    name="name"
                                    type="text"
                                    onChange={handleChange}
                                    value={values.name}
                                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                                    required
                                />
                                {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                            </div>
                            <div className="flex justify-center">
                                <button 
                                    type="submit" 
                                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                >
                                    Cadastrar
                                </button>
                            </div>
                        </form>
                    )}
                </Formik>
            </div>
        </div>
        <CustomToast 
            title="Sucesso" 
            text="Cedente cadastrado com sucesso" 
            isOpen={isToastOpen} 
            onClose={() => {setIsToastOpen(false)}} 
        />
    </div>
  );
}

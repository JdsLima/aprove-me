import api from '@/services/api';
import { useState } from 'react';
import { CustomToast } from '../CustomToast';
import { useRouter } from 'next/navigation';
import { Formik } from 'formik';

export const LoginForm = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [isToastOpen, setIsToastOpen] = useState(false);
  const [toastTitle, setToastTitle] = useState('');
  const [toastText, setToastText] = useState('');

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Validate login form
  const validateLogin = (values: typeof formData) => {
    const errors: Partial<typeof formData> = {};
    if (!values.username) errors.username = 'Usuário é obrigatório';
    if (!values.password) errors.password = 'Senha é obrigatória';
    return errors;
  };

  // Handle form submit
  const handleSubmit = async (values: typeof formData) => {
    try {
      const response = await api.post('/auth', values);
      console.log(response.data);
      // Save token in localStorage
      localStorage.setItem('bankme_token', response.data.access_token);
      // Redirect to home page
      router.push('/home');
    } catch (error) {
      console.error(error);
      setIsToastOpen(true);
      setToastTitle('Erro');
      setToastText('Usuário ou senha inválidos');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen lg:py-0">
      <CustomToast 
        title={toastTitle} 
        text={toastText} 
        isOpen={isToastOpen} 
        onClose={() => setIsToastOpen(false)} 
      />
      {/* Main Card Container */}
      <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          {/* Logo Header */}
          <div className="flex w-full items-center justify-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
            <img
              src="https://bankme.tech/hs-fs/hubfs/BANKME%20AZUL%20NOVO-4.png"
              width={240}
              height={134}
              alt="logo"
            />
          </div>

          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
            Entre com suas credenciais
          </h1>

          {/* Sign In Form */}
          <Formik
            initialValues={formData}
            onSubmit={handleSubmit}
            validate={validateLogin}
          >
            {({ values, handleChange, errors }) => (
              <>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSubmit(values);
                  }}
                  className="space-y-4 md:space-y-6"
                >
                  {/* Email Input */}
                  <div>
                    <label
                      htmlFor="email"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Usuário
                    </label>
                    <input
                      type="text"
                      name="username"
                      id="username"
                      value={values.username}
                      onChange={handleChange}
                      className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="aprovame"
                      required
                    />
                    {errors.username && <p className="text-red-500">{errors.username}</p>}
                  </div>

                  {/* Password Input */}
                  <div>
                    <label
                      htmlFor="password"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Senha
                    </label>
                    <input
                      type="password"
                      name="password"
                      id="password"
                      value={values.password}
                      onChange={handleChange}
                      placeholder="aprovame"
                      className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      required
                    />
                    {errors.password && <p className="text-red-500">{errors.password}</p>}
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={!values.username || !values.password}
                    className="w-full text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Entrar
                    </button>
                </form>
              </>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};
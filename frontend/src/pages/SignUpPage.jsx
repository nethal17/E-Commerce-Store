import { useState } from "react";
import { Link } from "react-router-dom";
import { UserPlus, Mail, Lock, User, ArrowRight, Loader } from "lucide-react";
import { motion } from "framer-motion";
import { useUserStore } from "../../stores/useUserStore";

const SignUpPage = () => {
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		password: "",
		confirmPassword: "",
	});

	const { signup, loading } = useUserStore();

	const handleSubmit = (e) => {
		e.preventDefault();
    	signup(formData);
	};

	return (
		<div className='flex flex-col justify-center py-10 sm:px-6 lg:px-8'>
			<motion.div
				className='sm:mx-auto sm:w-full sm:max-w-md'
				initial={{ opacity: 0, y: -20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.8 }}
			>
				<h2 className='mt-6 text-4xl font-extrabold text-center text-sky-500'>Create your account</h2>
			</motion.div>

			<motion.div
				className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.8, delay: 0.2 }}
			>
				<div className='px-4 py-8 bg-gray-800 shadow-2xl sm:rounded-lg sm:px-10'>
					<form onSubmit={handleSubmit} className='space-y-6'>
						<div>
							<label htmlFor='name' className='block font-medium text-md text-gray-50'>
								Full name
							</label>
							<div className='relative mt-1 rounded-md shadow-sm'>
								<div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
									<User className='w-5 h-5 text-gray-400' aria-hidden='true' />
								</div>
								<input
									id='name'
									type='text'
									required
									value={formData.name}
									onChange={(e) => setFormData({ ...formData, name: e.target.value })}
									className='block w-full px-3 py-2 pl-10 placeholder-gray-400 bg-gray-700 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm'
									placeholder='John Doe'
								/>
							</div>
						</div>

						<div>
							<label htmlFor='email' className='block font-medium text-md text-gray-50'>
								Email address
							</label>
							<div className='relative mt-1 rounded-md shadow-sm'>
								<div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
									<Mail className='w-5 h-5 text-gray-400' aria-hidden='true' />
								</div>
								<input
									id='email'
									type='email'
									required
									value={formData.email}
									onChange={(e) => setFormData({ ...formData, email: e.target.value })}
									className='block w-full px-3 py-2 pl-10 placeholder-gray-400 bg-gray-700 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm'
									placeholder='you@example.com'
								/>
							</div>
						</div>

						<div>
							<label htmlFor='password' className='block font-medium text-md text-gray-50'>
								Password
							</label>
							<div className='relative mt-1 rounded-md shadow-sm'>
								<div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
									<Lock className='w-5 h-5 text-gray-400' aria-hidden='true' />
								</div>
								<input
									id='password'
									type='password'
									required
									value={formData.password}
									onChange={(e) => setFormData({ ...formData, password: e.target.value })}
									className='block w-full px-3 py-2 pl-10 placeholder-gray-400 bg-gray-700 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm'
									placeholder='••••••••'
								/>
							</div>
						</div>

						<div>
							<label htmlFor='confirmPassword' className='block font-medium text-md text-gray-50'>
								Confirm Password
							</label>
							<div className='relative mt-1 rounded-md shadow-sm'>
								<div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
									<Lock className='w-5 h-5 text-gray-400' aria-hidden='true' />
								</div>
								<input
									id='confirmPassword'
									type='password'
									required
									value={formData.confirmPassword}
									onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
									className='block w-full px-3 py-2 pl-10 placeholder-gray-400 bg-gray-700 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm'
									placeholder='••••••••'
								/>
							</div>
						</div>

						<button
							type='submit'
							className="flex justify-center w-full px-4 py-2 text-sm font-medium text-white transition duration-150 ease-in-out border border-transparent rounded-md shadow-sm bg-sky-600 hover:bg-sky-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 disabled:opacity-50"
							disabled={loading}
						>
							{loading ? (
								<>
									<Loader className='w-5 h-5 mr-2 animate-spin' aria-hidden='true' />
									Loading...
								</>
							) : (
								<>
									<UserPlus className='w-5 h-5 mr-2' aria-hidden='true' />
									Sign up
								</>
							)}
						</button>
					</form>

					<p className='mt-8 text-sm text-center text-gray-400'>
						Already have an account?{" "}
						<Link to='/login' className='font-medium text-sky-400 hover:text-sky-300'>
							Login here <ArrowRight className='inline w-4 h-4' />
						</Link>
					</p>
				</div>
			</motion.div>
		</div>
	);
};
export default SignUpPage;
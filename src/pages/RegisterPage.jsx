import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { FaUser, FaEnvelope, FaLock, FaCheck, FaPhone } from 'react-icons/fa'
import { toast } from 'react-toastify'
import { useState } from 'react'
import { register as registerUser } from '../services/authService'

export default function RegisterPage() {
  const { register, handleSubmit, watch, formState: { errors } } = useForm()
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  const password = watch('password', '')

  const onSubmit = async (data) => {
    setIsLoading(true)
    try {
      const userData = {
        email: data.email,
        password: data.password,
        fullName: data.fullName,
        phone: data.phone,
        address: data.address
      }
      
      await registerUser(userData)
      toast.success('Đăng ký thành công!')
      navigate('/login')
    } catch (error) {
      toast.error(error.message || 'Đăng ký thất bại')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="max-w-md mx-auto my-12 p-6 bg-white rounded-xl shadow-md">
      <h1 className="text-2xl font-bold text-center mb-8">Đăng ký tài khoản</h1>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-gray-700 mb-1">Họ và tên</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaUser className="text-gray-400" />
            </div>
            <input
              type="text"
              {...register('fullName', { required: 'Vui lòng nhập họ tên' })}
              className="pl-10 w-full border border-gray-300 rounded-lg py-2 px-4"
              placeholder="Nguyễn Văn A"
            />
          </div>
          {errors.fullName && (
            <p className="mt-1 text-sm text-red-600">{errors.fullName.message}</p>
          )}
        </div>

        <div>
          <label className="block text-gray-700 mb-1">Số điện thoại</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaPhone className="text-gray-400" />
            </div>
            <input
              type="tel"
              {...register('phone', { 
                required: 'Vui lòng nhập số điện thoại',
                pattern: {
                  value: /^[0-9]{10,11}$/,
                  message: 'Số điện thoại không hợp lệ'
                }
              })}
              className="pl-10 w-full border border-gray-300 rounded-lg py-2 px-4"
              placeholder="0987654321"
            />
          </div>
          {errors.phone && (
            <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
          )}
        </div>

        <div>
          <label className="block text-gray-700 mb-1">Địa chỉ</label>
          <textarea
            {...register('address', { required: 'Vui lòng nhập địa chỉ' })}
            className="w-full border border-gray-300 rounded-lg py-2 px-4"
            rows={3}
          />
          {errors.address && (
            <p className="mt-1 text-sm text-red-600">{errors.address.message}</p>
          )}
        </div>

        <div>
          <label className="block text-gray-700 mb-1">Email</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaEnvelope className="text-gray-400" />
            </div>
            <input
              type="email"
              {...register('email', { 
                required: 'Vui lòng nhập email',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Email không hợp lệ'
                }
              })}
              className="pl-10 w-full border border-gray-300 rounded-lg py-2 px-4"
              placeholder="email@example.com"
            />
          </div>
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label className="block text-gray-700 mb-1">Mật khẩu</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaLock className="text-gray-400" />
            </div>
            <input
              type="password"
              {...register('password', { 
                required: 'Vui lòng nhập mật khẩu',
                minLength: {
                  value: 6,
                  message: 'Mật khẩu ít nhất 6 ký tự'
                }
              })}
              className="pl-10 w-full border border-gray-300 rounded-lg py-2 px-4"
            />
          </div>
          {errors.password && (
            <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
          )}
        </div>

        <div>
          <label className="block text-gray-700 mb-1">Nhập lại mật khẩu</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaLock className="text-gray-400" />
            </div>
            <input
              type="password"
              {...register('confirmPassword', { 
                required: 'Vui lòng nhập lại mật khẩu',
                validate: value => 
                  value === password || 'Mật khẩu không khớp'
              })}
              className="pl-10 w-full border border-gray-300 rounded-lg py-2 px-4"
            />
          </div>
          {errors.confirmPassword && (
            <p className="mt-1 text-sm text-red-600">{errors.confirmPassword.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
        >
          {isLoading ? 'Đang đăng ký...' : 'Đăng ký'}
        </button>
      </form>

      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600">
          Đã có tài khoản?{' '}
          <Link to="/login" className="text-blue-600 hover:text-blue-700">
            Đăng nhập ngay
          </Link>
        </p>
      </div>
    </div>
  )
}

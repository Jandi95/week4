import { useId, useState } from 'react'
import { FieldError, UseFormRegisterReturn } from 'react-hook-form'

interface FormInput {
  type: 'text' | 'password'
  isSubmitting: boolean
  label: string
  register: UseFormRegisterReturn
  error?: FieldError
  eyeButton?: boolean
}

export default function FormInput({
  type,
  isSubmitting,
  label,
  error,
  register,
  eyeButton,
}: FormInput) {
  const formInputId = useId()
  const [isShow, setisShow] = useState(false)

  return (
    <div className="relative">
      <label
        htmlFor={formInputId}
        className={`text-sm ${error ? `text-red-500` : `text-[rgba(255,255,255,0.4)]`}`}
      >
        {label}
      </label>
      <input
        id={formInputId}
        type={isShow ? 'text' : type}
        autoComplete="off"
        readOnly={isSubmitting}
        className={`peer w-full text-xl border-b h-12 outline-0 focus:border-white focus:pl-2 transition-[padding] ${error ? `border-red-500` : `border-[rgba(255,255,255,0.4)]`}`}
        {...register}
      />
      {error && (
        <div className="absolute text-red-500 text-xs top-20">
          {error.message}
        </div>
      )}
      {eyeButton && (
        <button
          type="button"
          className="absolute top-9 right-0 w-5"
          onClick={() => setisShow(!isShow)}
          aria-label={isShow ? `${label} 숨기기` : `${label} 보기`}
        >
          {isShow ? (
            <img src="/eye-off.svg" alt="" />
          ) : (
            <img src="/eye.svg" alt="" />
          )}
        </button>
      )}
    </div>
  )
}

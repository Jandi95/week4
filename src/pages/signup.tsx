import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { FormButton, FormInput, Layout } from '@/components'

interface FormSignUp {
  name: string
  email: string
  password: string
  passwordAgain: string
  bio?: string
}

export default function SignUp() {
  const {
    register,
    trigger,
    watch,
    formState: { errors, isSubmitting },
    // handleSubmit,
    // reset,
  } = useForm<FormSignUp>({
    mode: 'onChange',
  })

  const password = watch('password')
  const passwordAgain = watch('passwordAgain')

  useEffect(() => {
    if (passwordAgain) {
      trigger('passwordAgain')
    }
  }, [password, passwordAgain, trigger])

  return (
    <div className="max-w-[620px] mx-auto my-15 bg-[#292929] p-8">
      <form>
        <div className="flex flex-col gap-14 mb-20">
          <FormInput
            label="이름"
            type="text"
            isSubmitting={isSubmitting}
            register={register('name', {
              required: '이름을 입력해주세요.',
            })}
            error={errors.name}
          />
          <FormInput
            label="이메일"
            type="text"
            isSubmitting={isSubmitting}
            register={register('email', {
              required: '이메일을 입력하세요',
              pattern: {
                value: /^[^@\s]+@[^@\s]+\.[^@\s]+$/,
                message: '올바른 이메일 형식을 입력해주세요.',
              },
            })}
            error={errors.email}
          />
          <FormInput
            label="비밀번호"
            type="password"
            isSubmitting={isSubmitting}
            register={register('password', {
              required: '패스워드를 입력해주세요.',
              minLength: {
                value: 8,
                message: '8자 이상 입력해주세요.',
              },
              validate: (value: string) => {
                if (!/[a-z]/.test(value))
                  return '영문 소문자가 하나 이상 포함되어야 합니다.'
                if (!/[A-Z]/.test(value))
                  return '영문 대문자가 하나 이상 포함되어야 합니다.'
                if (!/[0-9]/.test(value))
                  return '숫자가 하나 이상 포함되어야 합니다.'
              },
            })}
            error={errors.password}
            eyeButton
          />
          <FormInput
            label="비밀번호 확인"
            type="password"
            isSubmitting={isSubmitting}
            register={register('passwordAgain', {
              required: '패스워드 확인을 입력하세요',
              validate: (value: string) =>
                value === password || '패스워드가 일치하지 않습니다',
            })}
            error={errors.passwordAgain}
            eyeButton
          />
        </div>
        <FormButton isSubmitting={isSubmitting}>
          {isSubmitting ? '잠시만 기다려 주세요 ...' : '회원가입'}
        </FormButton>
      </form>
    </div>
  )
}

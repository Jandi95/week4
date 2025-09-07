import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { FormButton, FormInput, Layout } from '@/components'
import supabase from '@/libs/supabase'
import navSet from '@/utils/nav-set'

interface FormSignIn {
  email: string
  password: string
}

export default function SignIn() {
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm<FormSignIn>({
    mode: 'onChange',
  })

  const onSubmit = async (formData: FormSignIn) => {
    if (isSubmitting) return

    const { error, data } = await supabase.auth.signInWithPassword(formData)

    if (error) {
      toast.error(
        `로그인 실패, ${error.name}(${error.status}: ${error.message})`
      )
    } else {
      if (data.user) {
        toast.success(`로그인 성공`)
        navSet('main')
      }
    }
  }

  return (
    <div className="max-w-[620px] mx-auto my-15 bg-[#292929] p-8">
      <form onSubmit={handleSubmit(onSubmit)} autoComplete="off" noValidate>
        <div className="flex flex-col gap-14 mb-20">
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
        </div>
        <FormButton isSubmitting={isSubmitting}>
          {isSubmitting ? '잠시만 기다려 주세요 ...' : '로그인'}
        </FormButton>
      </form>
    </div>
  )
}

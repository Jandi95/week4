import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { FormButton, FormInput } from '@/components'
import supabase from '@/libs/supabase'
import navSet from '@/utils/nav-set'

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
    handleSubmit,
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

  const onSubmit = async (formData: FormSignUp) => {
    if (isSubmitting) return

    const { data, error } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
      options: {
        data: {
          username: formData.name,
        },
      },
    })

    if (error) {
      console.error(
        `회원가입 실패, ${error.name}(${error.status}): ${error.message}`
      )
    } else {
      if (data.user) {
        const { error } = await supabase.from('profiles').insert({
          id: data.user.id,
          email: data.user.email,
          username: data.user.user_metadata.username,
          bio: data.user.user_metadata.bio,
          created_at: new Date().toISOString(),
        })

        if (error) {
          toast.error(`회원가입 실패, ${error.name}: ${error.message}`)
        } else {
          toast.success(`회원가입에 성공했습니다.`)
          navSet('signin')
        }
      }
    }
  }

  return (
    <div className="max-w-[620px] mx-auto my-15 bg-[#292929] p-8">
      <form onSubmit={handleSubmit(onSubmit)} autoComplete="off" noValidate>
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

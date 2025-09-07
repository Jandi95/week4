import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { FormInput } from '@/components'
import supabase, { SupaProfile } from '@/libs/supabase'

interface Props {
  user: SupaProfile | null
}

interface FormProfile {
  name: string
}

export default function Profile({ user }: Props) {
  const [isEdit, setIsEdit] = useState<boolean>(false)

  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm<FormProfile>({
    mode: 'onChange',
    defaultValues: {
      name: user?.username ?? '',
    },
  })

  const onSubmit = async (formData: FormProfile) => {
    if (!user) return
    const { error } = await supabase
      .from('profiles')
      .update({ username: formData.name })
      .eq('id', user.id)
      .select()
      .single()
    if (error) {
      console.log(error)
    } else {
      toast.success('프로필 수정이 완료됐습니다.')
      setIsEdit(false)
    }
  }

  return (
    <div className="max-w-[620px] mx-auto my-15 bg-[#292929] p-8">
      <h2 className="text-2xl font-bold text-center">Profile</h2>
      {isEdit ? (
        <>
          <form onSubmit={handleSubmit(onSubmit)} autoComplete="off" noValidate>
            <ul className="flex flex-col gap-8">
              <FormInput
                label="이름"
                type="text"
                isSubmitting={isSubmitting}
                register={register('name', {
                  required: '이름을 입력해주세요.',
                })}
                error={errors.name}
              />
              <li>
                <h3 className="text-xs text-[rgba(255,255,255,0.6)] mb-1">
                  이메일
                </h3>
                <p>{user?.email}</p>
              </li>
            </ul>
            <button type="submit" className="w-full bg-green-500 mt-10 py-3">
              {isSubmitting ? '잠시만 기다려주세요...' : '프로필 수정'}
            </button>
          </form>
        </>
      ) : (
        <>
          <ul className="flex flex-col gap-8">
            <li>
              <h3 className="text-xs text-[rgba(255,255,255,0.6)] mb-1">
                이름
              </h3>
              <p>{user?.username}</p>
            </li>
            <li>
              <h3 className="text-xs text-[rgba(255,255,255,0.6)] mb-1">
                이메일
              </h3>
              <p>{user?.email}</p>
            </li>
          </ul>
          <button
            type="button"
            className="w-full bg-[#1f1f1f] mt-10 py-3"
            onClick={() => setIsEdit(true)}
          >
            프로필 수정
          </button>
        </>
      )}
    </div>
  )
}

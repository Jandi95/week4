interface FormButton {
  children: string
  isSubmitting: boolean
}

export default function FormButton({ children, isSubmitting }: FormButton) {
  return (
    <button
      type="submit"
      aria-disabled={isSubmitting}
      className="w-full text-center bg-green-600 py-4 font-bold aria-disabled:cursor-default aria-disabled:bg-green-900"
    >
      {children}
    </button>
  )
}

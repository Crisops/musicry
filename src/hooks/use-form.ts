import { validateRulesForm } from '@/utils/validate-rules-form'
import {
  useForm as useFormHook,
  type DefaultValues,
  type Path,
  type RegisterOptions,
} from 'react-hook-form'

interface UseFormProps<T extends Record<string, any>> {
  initialForm: DefaultValues<T>
}

export const useForm = <T extends Record<string, any>>({
  initialForm,
}: UseFormProps<T>) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useFormHook<T>({ defaultValues: initialForm })

  const registerField = (name: Path<T>) => {
    const rules = validateRulesForm[name as keyof typeof validateRulesForm] as
      | RegisterOptions<T>
      | undefined
    return register(name, rules)
  }

  return {
    registerField,
    handleSubmit,
    errors,
    setValue,
    watch,
  }
}

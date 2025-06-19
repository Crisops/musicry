import { addToast } from '@heroui/toast'

type ToastOptions = {
  title: string
  description?: string
}

export const Toast = () => {
  const success = (props: ToastOptions) => {
    return addToast({
      ...props,
      classNames: {
        base: [`bg-blue-silver/20 border-blue-argentinian`],
        description: ['text-blue-argentinian'],
        title: ['text-blue-argentinian'],
        closeButton: ['bg-blue-silver/10'],
        closeIcon: ['text-night bg-blue-argentinian border-blue-silver'],
        icon: ['text-blue-argentinian'],
      },
    })
  }

  const error = (props: ToastOptions) => {
    return addToast({
      ...props,
      classNames: {
        base: [`bg-red-500/10 border-danger`],
        title: ['text-danger'],
        description: ['text-danger-400'],
        closeButton: ['bg-red-500/10'],
        closeIcon: ['text-red-700 bg-rich-black-dark border-danger-400'],
        icon: ['text-danger'],
      },
    })
  }

  return {
    success,
    error,
  }
}

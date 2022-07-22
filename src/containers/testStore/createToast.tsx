import { remove, success, error, warning, clear, options } from 'toastr'

interface Parameters {
  message: string | string[]
  type?: 'error' | 'success' | 'warning'
}

export const createToast = (params: Parameters) => {
  // options.preventDuplicates = true;
  clear()
  const { type = 'error', message } = params
  let msgs = ''
  if (Array.isArray(message)) {
    message.forEach((msg: string) => (msgs += `<p>${msg}</p>`))
  } else {
    message.split('\n').forEach((msg: string) => (msgs += `<p>${msg}</p>`))
  }
  remove()
  if (type === 'error') {
    return error(msgs, 'Error!', { timeOut: 20000000 })
  }
  if (type === 'success') {
    return success(msgs, 'Success!')
  }
  return warning(msgs)
}

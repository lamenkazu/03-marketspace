import axios, { AxiosError, AxiosInstance } from 'axios'

import { getAuthToken, saveAuthToken } from '@/storage/authToken'
import { AppError } from '@/utils/AppError'

interface PromiseType {
  onSuccess: (token: string) => void
  onFailure: (error: AxiosError) => void
}

type SignOut = () => void

interface APIInstanceProps extends AxiosInstance {
  registerInterceptTokenManager: (signOut: SignOut) => () => void
}

const api = axios.create({
  baseURL: 'http://192.168.1.2:3333',
}) as APIInstanceProps

let failedQueue: PromiseType[] = []
let isRefreshing = false

api.registerInterceptTokenManager = (signOut) => {
  const interceptTokenManager = api.interceptors.response.use(
    (response) => response,
    async (requestError) => {
      if (requestError?.response?.status === 401) {
        if (
          requestError.response.data?.message === 'token.expired' ||
          requestError.response.data?.message === 'token.invalid'
        ) {
          const { refreshToken } = await getAuthToken()

          if (!refreshToken) {
            signOut()
            return Promise.reject(requestError)
          }

          const originalRequestConfig = requestError.config

          if (isRefreshing) {
            return new Promise((resolve, reject) => {
              failedQueue.push({
                onSuccess: (token: string) => {
                  originalRequestConfig.headers = {
                    Authorization: `Bearer ${token}`,
                  }
                  resolve(api(originalRequestConfig))
                },
                onFailure: (error: AxiosError) => {
                  reject(error)
                },
              })
              resolve(requestError)
            })
          }
          isRefreshing = true

          // eslint-disable-next-line no-async-promise-executor
          return new Promise(async (resolve, reject) => {
            try {
              const { data } = await api.post('/sessions/refresh-token', {
                refresh_token: refreshToken,
              })

              await saveAuthToken({
                token: data.token,
                refreshToken: data.refresh_token,
              })

              if (originalRequestConfig.data) {
                originalRequestConfig.data = JSON.parse(
                  originalRequestConfig.data,
                )
              }

              originalRequestConfig.headers = {
                Authorization: `Bearer ${data.token}`,
              }
              api.defaults.headers.common.Authorization = `Bearer ${data.token}`

              failedQueue.forEach((request) => {
                request.onSuccess(data.token)
              })

              console.log('TOKEN ATUALIZADO!')
              resolve(api(originalRequestConfig))
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
            } catch (error: any) {
              failedQueue.forEach((request) => {
                request.onFailure(error)
              })
            } finally {
              isRefreshing = false
              failedQueue = []
            }
          })
        }
        signOut()
      }
      if (requestError.response && requestError.response.data) {
        return Promise.reject(new AppError(requestError.response.data.message))
      } else {
        return Promise.reject(requestError)
      }
    },
  )

  return () => {
    api.interceptors.response.eject(interceptTokenManager)
  }
}

export { api }

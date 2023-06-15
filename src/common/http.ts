import type { QueryType, HttpMethodType } from '@/types';
import handleErrors from '../services/errors'

const http = (): HttpMethodType => {
  const user = window.location.search ? window.location.search.split('=')[1] : 'unknown'
  const base: string = 'https://api.hebale.com/gojiri/'
  const queryString = (params: QueryType): string => {
    return Object.keys(params)
      .map((value) => `${value}=${params[value]}`)
      .join('&')
  };

  return {
    get: async (path, queries?) => {
      try {
        const response = await fetch(
          `${base}${path}?USER=${user}${queries ? `&${queryString(queries)}` : ''}`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json'
            }
          }
        )
        const data = await response.json()
        return data
      } catch (error) {
        let message = "Unknown Error!"
        if (error instanceof Error) message = error.message;
        handleErrors(message)
      }
    },
    post: async (path, body) => {
      try {
        const response = await fetch(`${base}${path}?USER=${user}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(body)
        })
        const data = await response.json()
        return data
      } catch (error) {
        let message = "Unknown Error!"
        if (error instanceof Error) message = error.message;
        handleErrors(message)
      }
    },
    pull: async (path, body) => {
      try {
        const response = await fetch(`${base}${path}?USER=${user}`, {
          method: 'PULL',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(body)
        })
        const data = await response.json()
        return data
      } catch (error) {
        let message = "Unknown Error!"
        if (error instanceof Error) message = error.message;
        handleErrors(message)
      }
    },
    patch: async (path, body) => {
      try {
        const response = await fetch(`${base}${path}?USER=${user}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(body)
        })
        const data = await response.json()
        return data
      } catch (error) {
        let message = "Unknown Error!"
        if (error instanceof Error) message = error.message;
        handleErrors(message)
      }
    },
    delete: async (path, body) => {
      try {
        const response = await fetch(`${base}${path}?USER=${user}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(body)
        })
        const data = await response.json()
        return data
      } catch (error) {
        let message = "Unknown Error!"
        if (error instanceof Error) message = error.message;
        handleErrors(message)
      }
    }
  }
}

export default http()

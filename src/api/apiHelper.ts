import React from 'react'
import * as qs from 'qs'
import { get, has } from '../common/helpers/session'
import { assign, isEmpty } from 'lodash'
import axios from 'axios'

export const getDomain = (parameters) => {
  return parameters.$domain
    ? parameters.$domain
    : process.env.REACT_APP_API_ENDPOINT
}

export const getConfig = (parameters) => {
  return parameters.$config ? parameters.$config : {}
}

export const request = (
  method: string,
  url: string,
  queryParametters: any,
  jsonBody: any,
  form: any,
  config: any,
) => {
  method = method.toUpperCase()
  let keys = Object.keys(queryParametters)
  let queryUrl = url
  if (keys.length > 0) {
    queryUrl = url + '?' + qs.stringify(queryParametters)
  }

  const headers: any = {}
  if (method !== 'GET') {
    headers['content-type'] = 'application/x-www-form-urlencoded'

    if (has()) {
      const userToken = get()
      headers.Authorization = `Bearer ${userToken}`
    }

    const defaultConfig = {
      method: method,
      responseType: 'json',
      withCredentials: false,
      headers,
    }

    let mergedConfig
    if (isEmpty(jsonBody) && isEmpty(form)) {
      mergedConfig = assign(defaultConfig, config)
    } else if (!isEmpty(jsonBody)) {
      /* For raw POST, PUT */
      mergedConfig = assign(
        {
          data: jsonBody,
        },
        defaultConfig,
        config,
      )
    } else {
      /* For form field POST, PUT */
      mergedConfig = assign(
        {
          data: qs.stringify(form),
        },
        defaultConfig,
        config,
      )
    }
    return axios(queryUrl, mergedConfig)
  }
}

export const mergeQueryParams = (parameters, queryParameters) => {
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
      let parameter = parameters.$queryParameters[parameterName]
      queryParameters[parameterName] = parameter
    })
  }

  return queryParameters
}

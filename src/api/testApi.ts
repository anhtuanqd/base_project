import { getConfig, getDomain, mergeQueryParams, request } from './apiHelper'

export const getData = (parameters = {}) => {
  let path = 'todos'
  let queryParameters = {}
  let jsonBody = {}
  let form = {}

  queryParameters = mergeQueryParams(parameters, queryParameters)
  return request(
    'GET',
    getDomain(parameters) + path,
    queryParameters,
    jsonBody,
    form,
    getConfig(parameters),
  )
}

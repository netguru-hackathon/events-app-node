import { Error } from 'jsonapi-serializer'

export function handleError(res, status, title, detail, source ) {
  res.status(status)
  res.json(new Error({ code: status, source, title, detail}))
}

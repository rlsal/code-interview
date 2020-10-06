import { Request, Response } from "express"

export const printRequest = async (req: Request, res: Response, next) => {
  console.log('url=', req.path)
  console.log('headers=', req.headers)
  console.log('params=', req.query)
  console.log('query=', req.query)
  console.log('body=', req.body, '\n')
  next()
}
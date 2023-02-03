interface SuccessApiRes<result> {
  isOk: true
  result: result
}

interface ErrorApiRes {
  isOk: false
}

export type ApiRes<Result> = SuccessApiRes<Result> | ErrorApiRes

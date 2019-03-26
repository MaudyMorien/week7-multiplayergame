import 'reflect-metadata'
import {createKoaServer} from 'routing-controllers'
// import Controller from './score/controller'
// import Controller from './users/controller'
import setupDb from './db'

const port = process.env.PORT || 4000

const app = createKoaServer({
   controllers: [Controller]
})

setupDb()
  .then(_ =>
    app.listen(port, () => console.log(`Listening on port ${port}`))
  )
  .catch(err => console.error(err))
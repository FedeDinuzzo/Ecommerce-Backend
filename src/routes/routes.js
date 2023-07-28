import { Router } from "express";

import routerCarts from './carts.routes.js'
import routerGithub from './github.routes.js'
import routerGoogle from './google.routes.js'
import routerProducts from './products.routes.js'
import routerSession from './session.routes.js'
import routerUser from './user.routes.js'
import routerMockingProducts from './mockingProducts.routes.js'
import routerLogger from './logger.routes.js'
//import routerApidocs from './swagger.routes.js'

const router = Router()

// Routes
router.use('/api/products', routerProducts)
router.use('/api/carts', routerCarts)
router.use('/api/users', routerUser)
router.use('/api/session', routerSession)
router.use('/authGithub', routerGithub)
router.use('/authGoogle', routerGoogle)
router.use('/mockingproducts', routerMockingProducts)
router.use('/loggerTest', routerLogger)
// router.use('/apidocs', routerApidocs)

export default router
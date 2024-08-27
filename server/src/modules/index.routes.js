import userRouter from './user/user.routes.js';

export const bootstrap = (app) => {
    app.use('/user', userRouter)
}
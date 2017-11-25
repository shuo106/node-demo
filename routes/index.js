
import user from '../api/routes/userRoute';

export default app => {
  app.use('/user', user);
}
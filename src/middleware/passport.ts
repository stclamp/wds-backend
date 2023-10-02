import { Strategy as LocalStrategy } from 'passport-local';
import { PassportStatic } from 'passport';
import bcrypt from 'bcrypt';
import { User } from '../models/user.model';

export default (passport: PassportStatic) => {
  passport.use(
    new LocalStrategy(async (username, password, done) => {
      try {
        const user = await User.findOne({ where: { username } });

        if (!user) {
          return done(null, false); // user not found
        }

        const isComparedPassword = await bcrypt.compare(
          password,
          user.password
        );

        if (!isComparedPassword) {
          return done(null, false); //incorrect password
        }

        return done(null, user); //all ok
      } catch (error) {
        return done(error); //something went wrong
      }
    })
  );
};

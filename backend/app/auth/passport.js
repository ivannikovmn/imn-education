const passport = require('passport')
const passportJWT = require('passport-jwt');
const JwtStrategy = passportJWT.Strategy;
const ExtractJwt = passportJWT.ExtractJwt;

const User = require('./User')

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
};

passport.use (new JwtStrategy(jwtOptions, async(jwPayload, done) => {
  // Здесь можно выполнить проверку и поиск пользователя в базе данных,
  // используя данные, содержащиеся в payload.
  // Если пользователь найден, вызовите `done(null, user)`,
  // иначе `done(null, false)` или `done(error)` в случае ошибки.
  const user = await User.findByPk(jwPayload.id)
  if(user) done(null, user)
  else done(null, false)
}));

module.exports = {
    jwtOptions
}
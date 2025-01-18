const bcrypt = require('bcrypt')
const saltRounds = 10

export const hashPasswordHelper = async (password: string) => {
  try {
    return await bcrypt.hash(password, saltRounds)
  } catch (err) {
    console.log(err)
  }
}
export const comparePasswordHelper = async (
  password: string,
  hassPassword: string,
) => {
  try {
    return await bcrypt.compare(password, hassPassword)
  } catch (err) {
    console.log(err)
  }
}

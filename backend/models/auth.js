const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Verifica si el modelo ya está definido para evitar la sobrescritura
const UserSchema = mongoose.models.User?.schema || new mongoose.Schema({
  /**
   * Nombre de usuario del usuario.
   * @type {String}
   * @required
   * @unique
   */
  username: { type: String, required: true, unique: true },

  /**
   * Correo electrónico del usuario.
   * @type {String}
   * @required
   * @unique
   */
  email: { type: String, required: true, unique: true },

  /**
   * Contraseña del usuario.
   * @type {String}
   * @required
   */
  password: { type: String, required: true },
});

/**
 * Middleware que encripta la contraseña antes de guardar el documento.
 * @function
 * @param {Function} next - La función para pasar al siguiente middleware.
 * @returns {void} Llama a `next()` para continuar con el proceso de guardado.
 */
UserSchema.pre('save', async function(next) {
  // Verificar si la contraseña ha sido modificada
  if (!this.isModified('password')) return next();

  // Generar un nuevo salt y encriptar la contraseña
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

/**
 * Método para comparar una contraseña con la almacenada en el modelo.
 * @function comparePassword
 * @param {String} password - La contraseña a comparar con la almacenada.
 * @returns {Promise<Boolean>} Devuelve `true` si las contraseñas coinciden, `false` en caso contrario.
 */
UserSchema.methods.comparePassword = async function(password) {
  return await bcrypt.compare(password, this.password);
};

// Exporta el modelo, utilizando la verificación previa
/**
 * Modelo de usuario para la base de datos MongoDB.
 * @type {mongoose.Model}
 */
const User = mongoose.models.User || mongoose.model('User', UserSchema);

module.exports = User;

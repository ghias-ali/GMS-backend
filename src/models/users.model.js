// users-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const modelName = 'users'
  const mongooseClient = app.get('mongooseClient')
  const schema = new mongooseClient.Schema({

    email: { type: String, unique: true, lowercase: true },
    password: { type: String },
    name: { type: String, lowercase: true },
    role: { type: Number, },//0 for admin 1 for employee
    area: { type: String, defaultValue: "headquarter" },
    employeeId: { type: String, unique: true },
    isVerified: { type: Boolean },
    verifyToken: { type: String },
    verifyExpires: { type: Date },
    verifyChanges: { type: Object },
    resetToken: { type: String },
    resetExpires: { type: Date }
  }, {
    timestamps: true
  })

  // This is necessary to avoid model compilation errors in watch mode
  // see https://mongoosejs.com/docs/api/connection.html#connection_Connection-deleteModel
  if (mongooseClient.modelNames().includes(modelName)) {
    mongooseClient.deleteModel(modelName)
  }
  return mongooseClient.model(modelName, schema)
}

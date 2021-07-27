// ============================================
// Database
const mongoose = require("mongoose");

const ProjectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    phone: String,
    loja: String,
    created_at: { type: Date, default: Date.now },
});
const Project = mongoose.model("client", ProjectSchema);
// ============================================
// Admin Bro
const AdminBro = require('admin-bro')
const AdminBroExpress = require('@admin-bro/express')
const AdminBroMongoose = require('@admin-bro/mongoose')
// use mongoose in AdminBro
AdminBro.registerAdapter(AdminBroMongoose)
// config
const adminBroOptions = new AdminBro({
	resources: [
    { resource: Project, options: {
      properties: {
        created_at: {
          isVisible: { edit: false, list: true, show: true, filter: true }
        },
        _id: {
            isVisible: { edit: false, list: false, show: false}
        }
      }
   }},
  ],
  locale: {
    translations: {
      labels: {
        Project: 'Agendamento de Exames'
      }
    }
  },
  rootPath: '/'
})
const router = AdminBroExpress.buildRouter(adminBroOptions)
// ============================================
// Server
const express = require("express");
const server = express();
server
    .use(adminBroOptions.options.rootPath, router)
// =============================================
// Run App
const run = async () => {
    await mongoose.connect("mongodb+srv://admin:admin@adminexams.5vvj4.mongodb.net/examsclients?retryWrites=true&w=majority", {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    await server.listen(5500, () => console.log("Server started"));
}
run()
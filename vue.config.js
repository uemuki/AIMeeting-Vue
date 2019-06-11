// vue.config.js
module.exports = {
  devServer: {
    proxy: {
      "/api": {
        target: "http://localhost:3000"
      }
    }
  }
};


//http://localhost:8081/api/company/addroom
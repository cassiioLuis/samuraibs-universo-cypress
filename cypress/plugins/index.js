/// <reference types="cypress" />

const { Pool } = require('pg')

/**
 * @type {Cypress.PluginConfig}
 */
// eslint-disable-next-line no-unused-vars
module.exports = (on, config) => {

  const configJson = require(config.configFile)
  const pool = new Pool(configJson.dbConfig)

  on('task', {
    removeUser(email) {

      return new Promise(function (resolve) {
        pool.query('DELETE FROM public.users WHERE email = $1', [email], function (error, result) {

          if (error) {
            throw error
          }
          resolve({ success: result })
        })
      })

    }
  })

}

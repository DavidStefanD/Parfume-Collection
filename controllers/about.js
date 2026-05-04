'use strict';
import logger from "../utils/logger.js";
import empStore from "../models/employee.js";
import accounts from './accounts.js';

const about = {
  createView(request, response) {
    const loggedInUser = accounts.getCurrentUser(request);
    logger.info("About page loading!");
    
    if (loggedInUser) {
      const viewData = {
        title: 'About the Parfume Collection App',
        fullname: loggedInUser.firstName + ' ' + loggedInUser.lastName,
        emps: empStore.getAppInfo()
      };
      response.render('about', viewData);
    }
    else response.redirect('/');    
},

};

export default about;

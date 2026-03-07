'use strict';
import logger from "../utils/logger.js";
import empStore from "../models/employee.js";

const about = {
  createView(request, response) {
    logger.info("About page loading!");
   
      const viewData = {
      title: "Parfume Collection About",
      emps: empStore.getAppInfo()
    };
    logger.info(viewData.emps)
    response.render('about', viewData); 
  },
};

export default about;

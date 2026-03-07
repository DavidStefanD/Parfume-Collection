'use strict';

import logger from "../utils/logger.js";
import parfumeStore from "../models/parfume-store.js";

const dashboard = {
  createView(request, response) {
    logger.info("Dashboard page loading!");
    
    const viewData = {
      title: "Parfume App Dashboard",
      parfumeCollection: parfumeStore.getAllParfumes()
    };
    
    logger.debug(viewData.parfumeCollection);
    
    response.render('dashboard', viewData);
  },
};

export default dashboard;


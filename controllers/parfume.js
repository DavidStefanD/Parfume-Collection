'use strict';

import logger from '../utils/logger.js';
import parfumeStore from '../models/parfume-store.js';

const parfumeList = {
  createView(request, response) {
    const parfumeId = request.params.id;
    logger.debug(`Parfume id = ${parfumeId}`);
    
    const viewData = {
      title: 'Parfume Collection',
      singleParfume: parfumeStore.getParfume(parfumeId)
    };

    response.render('playlist', viewData);
  },
};

export default parfumeList;

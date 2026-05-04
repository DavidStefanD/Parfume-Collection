'use strict';

import logger from '../utils/logger.js';
import parfumeStore from '../models/parfume-store.js';
import { v4 as uuidv4 } from 'uuid';
import accounts from './accounts.js';

const parfumeList = {
  createView(request, response) {
    const parfumeId = request.params.id;
    const loggedInUser = accounts.getCurrentUser(request);
    logger.debug('Parfume id = ' + parfumeId);
    
    const viewData = {
      title: 'Parfume Collection',
      singleParfume: parfumeStore.getParfume(parfumeId),
      fullname: loggedInUser.firstName + ' ' + loggedInUser.lastName,
    };

    response.render('playlist', viewData);
},


  addParfume(request, response) {
    const parfumeId = request.params.id;
    const parfume = parfumeStore.getParfume(parfumeId);
    const newParfume = {
      id: uuidv4(),
      name: request.body.name,
      brand: request.body.brand,
    };
    parfumeStore.addParfume(parfumeId, newParfume);
    response.redirect('/parfume-collection/' + parfumeId);
},
  deleteParfume(request, response) {
    const collectionId = request.params.id;
    const parfumeId = request.params.parfumeid;
    logger.debug(`Deleting Parfume ${parfumeId} from Collection ${collectionId}`);
    parfumeStore.removeParfume(collectionId, parfumeId);
    response.redirect('/parfume-collection/' + collectionId);
},
   updateParfume(request, response) {
    const collectionId = request.params.id;
    const parfumeId = request.params.parfumeid;
    logger.debug("updating parfume " + parfumeId);
    const updatedParfume = {
      id: parfumeId,
      name: request.body.name,
      brand: request.body.brand
    };
    parfumeStore.updateParfume(collectionId, parfumeId, updatedParfume);
    response.redirect('/parfume-collection/' + collectionId);
}


};

export default parfumeList;

'use strict';

import logger from "../utils/logger.js";
import parfumeStore from "../models/parfume-store.js";
import { v4 as uuidv4 } from 'uuid';
import accounts from './accounts.js';

const dashboard = {
    createView(request, response) {
    logger.info("Dashboard page loading!");

    const loggedInUser = accounts.getCurrentUser(request);

    if (loggedInUser) {
      const searchTerm = request.query.searchTerm || "";

      const collections = searchTerm
        ? parfumeStore.searchUserCollections(searchTerm, loggedInUser.id)
        : parfumeStore.getUserCollections(loggedInUser.id);

      const sortField = request.query.sort;
      const order = request.query.order === "desc" ? -1 : 1;

      let sorted = collections;

      if (sortField) {
        sorted = collections.slice().sort((a, b) => {
          if (sortField === "name") {
            return a.name.localeCompare(b.name) * order;
          }

          if (sortField === "rating") {
            return (a.rating - b.rating) * order;
          }

          return 0;
        });
      }

      const viewData = {
        title: "Parfume Collection Dashboard",
        fullname: loggedInUser.firstName + ' ' + loggedInUser.lastName,
        parfumeCollection: sortField ? sorted : collections,
        search: searchTerm,
        nameSelected: request.query.sort === "name",
        ratingSelected: request.query.sort === "rating",
        ascSelected: request.query.order === "asc",
        descSelected: request.query.order === "desc",
      };
      
      logger.info('about to render' + viewData.parfumeCollection);
      
      response.render('dashboard', viewData);
    }
    else response.redirect('/');

  },

  async addcollection(request, response) {
    const loggedInUser = accounts.getCurrentUser(request);
    logger.debug(loggedInUser.id);
    const timestamp = new Date();
    const newcollection = {
      userid: loggedInUser.id,
      id: uuidv4(),
      name: request.body.name,
      rating: parseInt(request.body.rating),
      date: timestamp,
      parfumes: [],
    };
    await parfumeStore.addcollection(newcollection, request.files.picture, function() {
        response.redirect("/dashboard");
    });
    
},
deleteCollection(request, response) {
    const collectionId = request.params.id;
    logger.debug(`Deleting Collection ${collectionId}`);
    parfumeStore.removeCollection(collectionId, function() {
      response.redirect("/dashboard");
    });
    },

};

export default dashboard;


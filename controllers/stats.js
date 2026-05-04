"use strict";
import logger from "../utils/logger.js";
import parfumeStore from "../models/parfume-store.js";
import accounts from './accounts.js';

const stats = {
  createView(request, response) {
    const loggedInUser = accounts.getCurrentUser(request);

    if (loggedInUser) {
      logger.info("Stats page loading!");

    // app statistics calculations
    const parfumes = parfumeStore.getAllParfumes();

    let numcollection = parfumes.length;
    
    let numParfumes = parfumes.reduce((total, parfume) => total + parfume.parfumes.length, 0);  
	
	let average = numcollection > 0 ? (numParfumes / numcollection).toFixed(2) : 0;

    let totalRating = parfumes.reduce((total, parfume) => total + parseInt(parfume.rating), 0);

    let avgRating = numcollection > 0 ? totalRating/numcollection : 0;

    let maxRating = Math.max(...parfumes.map(parfume => parfume.rating));

    let maxRated = parfumes.filter(parfume => parfume.rating === maxRating);

    let favParfumes = maxRated.map(item => item.name);


    const statistics = {
      displayNumCollection: numcollection,
      displayNumParfumes: numParfumes,
	  displayAverage: average,
      displayAvgRating: avgRating.toFixed(2),
	  highest: maxRating,
      displayFav: favParfumes
    }

    const viewData = {
      title: "Parfume Collection Statistics",
      stats: statistics,
      fullname: loggedInUser.firstName + ' ' + loggedInUser.lastName
    };
    response.render("stats", viewData);
      }
  else response.redirect('/');
  
    
  }, 
    
};

export default stats;

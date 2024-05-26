const baseEndpoint = "https://taqreebat-backend-production.up.railway.app/";

const Endpoints = {
  //Authentication
  login: `${baseEndpoint}login`,
  signup: `${baseEndpoint}signup`,
  getUserData: `${baseEndpoint}getUserData`,

  //get all vendors bussiness
  bussiness: `${baseEndpoint}getAllBussiness`,
  businessDetails: `${baseEndpoint}getBussiness/details`,

  // Book order
  booking: `${baseEndpoint}addrequest`,
  getBookings: `${baseEndpoint}userBooking`, // for detail /userBooking?bookingId=65d342ffa9f2e63853d229ee

  // Featured vendors
  featuredVendors: `${baseEndpoint}getFeatured`,

  // add payment
  addPayment: `${baseEndpoint}addPayment`,

  addReview: `${baseEndpoint}addReview`,
};

export default Endpoints;

const payloads = {
  loginPayload: (email: String, pass: String) => {
    return { email, password: pass };
  },
  signupPayload: (
    name: String,
    email: String,
    password: String,
    phoneNo: String
  ) => {
    return { name, email, password, phoneNo };
  },
  addReviewPayload: (reviewId: String, comment: String, rated: number) => {
    return {
      reviewId,
      comment,
      rated,
    };
  },
};

export default payloads;

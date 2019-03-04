(() => {
  var pairs = window.location.search
    .substring(1)
    .split('&')
    .map((s) => s.split('='));
  var query = {};
  pairs.forEach((pair) => {
    if (pair[0] !== '') {
      query[pair[0]] = pair[1];
    }
  });
  if (!query.key) {
    throw new Error(
      'Please supply Stripe publishable key as `key` query param.'
    );
  }
  if (!query.session) {
    throw new Error(
      'Please supply Stripe Checkout Session id as `session` query param.'
    );
  }
  var stripe = window.Stripe(query.key, {betas: ['checkout_beta_4']});
  stripe.redirectToCheckout({sessionId: query.session}).then((result) => {
    if (result.error) {
      throw new Error(result.error);
    }
  });
})();

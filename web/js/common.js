(function () {
  const params = new URLSearchParams(window.location.search);

  if (params.has('_fresh')) {
    return;
  }

  params.set('_fresh', Date.now().toString());

  window.location.replace(
    window.location.pathname +
    '?' +
    params.toString() +
    window.location.hash
  );
})();
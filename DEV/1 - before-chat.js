<script>
(function () {
  const params = new URLSearchParams(window.location.search);

  // Если уже добавили параметр при текущем открытии — не зацикливаемся
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
</script>
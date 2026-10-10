<script setup>
// Redirect to the appropriate locale
</script>

<script>
(function () {
  const lang = (navigator.language || 'en').toLowerCase();
  const short = lang.split('-')[0];

  const target =
    short === 'zh' ? '/zh/' :
    '/en/';

  window.location.replace(target);
})();
</script>
<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vitepress'

onMounted(() => {
  const router = useRouter()
  const lang = (navigator.language || 'en').toLowerCase();
  const short = lang.split('-')[0];
  const target = short === 'zh' ? '/zh/' : '/en/';
  router.go(target);
});
</script>
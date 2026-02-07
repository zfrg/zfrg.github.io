document.addEventListener('DOMContentLoaded', () => {
  // 初始化Swup，配置与Fuwari完全一致
  const swup = new Swup({
    containers: ['#content-body'], // 与Fuwari核心容器一致
    linkSelector: 'a[href^="/"], a[href^="' + window.location.origin + '"]:not([target="_blank"]):not([download]):not([href^="#"])', // 拦截规则与Fuwari一致
    plugins: [
      new SwupFadeTheme(), // 修正：无.default
      new SwupHeadPlugin({ persistAssets: true }),
      new SwupScrollPlugin({ // 修正：无.default，配置与Fuwari一致
        scrollTop: true,
        animateScroll: true
      })
    ]
  });
  // 添加CSS样式
  // 补全 Fuwari 的 CSS 动画（若主题无此样式）
  const style = document.createElement('style');
  style.textContent = `
  /* 匹配 Fuwari 的页面过渡逻辑 */
  html.is-changing #content-body {
    transition: all 200ms ease; /* Fuwari 的 duration-200 */
  }
  html.is-animating #content-body {
    opacity: 0;
    transform: translateY(16px); /* Fuwari 的 translate-y-4（4rem=16px，适配 Vivia 的 rem 基准） */
  }

  /* 可选：移植 Fuwari 的组件渐入动画（按需） */
  @keyframes fade-in-up {
    0% {
      transform: translateY(2rem);
      opacity: 0;
    }
    100% {
      transform: translateY(0);
      opacity: 1;
    }
  }
  .onload-animation {
    opacity: 0;
    animation: 300ms fade-in-up forwards;
  }
  /* 动画延迟（参考 Fuwari） */
  #nav { animation-delay: 0ms; }
  #content-body { animation-delay: 100ms; }
  #footer-wrapper { animation-delay: 250ms; }
  `;
  document.head.appendChild(style);
  // 内容替换后重新执行脚本（适配Hexo静态页面，与Fuwari逻辑一致）
  swup.hooks.on('page:view', () => {
    // 暗色模式同步（若Vivia有，与Fuwari一致）
    if (localStorage.getItem('theme') === 'dark' || (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    // 重新执行容器内的内联脚本（代码高亮、评论等，Hexo核心适配）
    const scripts = document.querySelectorAll('#content-body script');
    scripts.forEach(script => {
      const newScript = document.createElement('script');
      Object.assign(newScript, {
        src: script.src,
        type: script.type,
        textContent: script.textContent
      });
      script.parentNode.replaceChild(newScript, script);
    });
  });
});
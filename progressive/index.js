/**
 * 核心类：实现渐进加载背景效果
 */
class ProgressiveLoad {
  constructor(smallSrc, largeSrc) {
    this.smallSrc = smallSrc;
    this.largeSrc = largeSrc;
    this.initTpl();
    this.progressiveLoad();
  }

  /**
   * 生成UI模板
   */
  initTpl() {
    this.container = document.createElement('div');
    this.smallStage = document.createElement('div');
    this.largeStage = document.createElement('div');
    this.smallImg = new Image();
    this.largeImg = new Image();
    this.container.className = 'pl-container';
    this.smallStage.className = 'pl-img pl-blur';
    this.largeStage.className = 'pl-img';
    this.container.appendChild(this.smallStage);
    this.container.appendChild(this.largeStage);
    this.smallImg.onload = this._onSmallLoaded.bind(this);
    this.largeImg.onload = this._onLargeLoaded.bind(this);
  }

  /**
   * 开始加载背景
   */
  progressiveLoad() {
    this.smallImg.src = this.smallSrc;
    this.largeImg.src = this.largeSrc;
  }

  /**
   * 大图加载完成
   */
  _onLargeLoaded() {
    this.largeStage.classList.add('pl-visible');
    this.largeStage.style.backgroundImage = `url('${this.largeSrc}')`;
  }

  /**
   * 小图加载完成
   */
  _onSmallLoaded() {
    this.smallStage.classList.add('pl-visible');
    this.smallStage.style.backgroundImage = `url('${this.smallSrc}')`;
  }
}

// --- 以下是你询问的那段代码 ---
// ... (上面 ProgressiveLoad 类的代码保持不变) ...

// --- 修改底部的调用逻辑 ---

// 1. 传入全屏背景的小图和大图
const loader = new ProgressiveLoad('/media/bg_min.png', '/media/bg.png');

// 2. 获取 Butterfly 主题的背景容器
// Butterfly 主题通常有一个 id="web_bg" 的元素用于放背景
const webBg = document.getElementById('web_bg');

if (webBg) {
  // 如果找到了 web_bg，就把我们的加载器放进去
  webBg.appendChild(loader.container);
} else {
  // 如果没找到（或者是其他主题），直接放到 body 也可以
  document.body.appendChild(loader.container);
}
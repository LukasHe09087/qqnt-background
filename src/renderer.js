const { plugin: pluginPath, data: dataPath } = LiteLoader?.plugins?.qqnt_background?.path;

// 打开设置界面时触发
// export const onSettingWindowCreated = (view) => {
//     // view 为 Element 对象，修改将同步到插件设置界面
// }

interval();
function interval(try_count = 0) {
  try_count++;
  const body = document.querySelector('.tab-container');
//   const body = document.querySelector('.chat-msg-area__vlist');
  if (body) {
    setTimeout(() => {
      main(body);
    }, 100);
  } else if (try_count < 800 || window.location.hash.includes('main')) {
    setTimeout(() => {
      interval(try_count);
    }, 100);
  }
}
async function main(body) {
  const backgroundElement = `<div class="qqnt-background-wallpaper"><div class="qqnt-background-wallpaper-inner1"></div></div>`;

  const backgroundFilePath_light = `local:///${pluginPath}/assets/chat-bg-pattern-light.png`;
  let backgroundFile_light = await (await fetch(backgroundFilePath_light)).blob();
  backgroundFile_light = URL.createObjectURL(backgroundFile_light);
  const backgroundFilePath_dark = `local:///${pluginPath}/assets/chat-bg-pattern-dark.png`;
  let backgroundFile_dark = await (await fetch(backgroundFilePath_dark)).blob();
  backgroundFile_dark = URL.createObjectURL(backgroundFile_dark);

  const backgroundStylePath = `local:///${pluginPath}/src/style.css`;
  let backgroundStyle = await (await fetch(backgroundStylePath)).text();
  // Options;
  document.body.classList.toggle('changed-lite-tools-blur-filter', true);
  document.body.classList.toggle('changed-lite-tools-background-visible', true);

  const backgroundWallpaperStyle = `
.qqnt-background-wallpaper {
  transition: all 0.2s ease;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  background: linear-gradient(155deg, #d8dcbb 10%, #83b48c 30% 40%, #ced58d 80%);
  background-repeat: no-repeat;
  background-size: cover;
}
.qqnt-background-wallpaper-inner1 {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-image: url('${backgroundFile_light}');
  background-repeat: repeat;
  background-position: top right;
  background-size: 510px auto;
  background-repeat: repeat;
  mix-blend-mode: overlay;
}
@media (prefers-color-scheme: dark) {
  .qqnt-background-wallpaper {
    background: #0F0F0F;
  }
  .qqnt-background-wallpaper-inner1 {
    background-image: url('${backgroundFile_dark}');
    mix-blend-mode: unset;
  }
}
`;

  (() => {
    let foo = document.createElement('div');
    foo.innerHTML = backgroundElement;
    foo = foo.firstChild;
    body.appendChild(foo);
  })();
  (() => {
    let foo = document.createElement('style');
    foo.innerText = backgroundWallpaperStyle;
    document.body.appendChild(foo);
  })();
  (() => {
    let foo = document.createElement('style');
    foo.innerText = backgroundStyle;
    document.body.appendChild(foo);
  })();
}

const { getChildren } = require("./utils/autoSidebar");
const getDirectory = (ele) => getChildren("./src", ele);
const nav = [
  // {
  //   text: "版本切换",
  //   items: [
  //     // { text: "5.0.3.0", link: "/5.0.3.0/系统介绍", activeMatch: "/5.0.3.0/系统介绍" },
  //     //{ text: "5.0.4.0", link: "/5.0.4.0/系统介绍", activeMatch: "/5.0.4.0/系统介绍" },
  //   ],
  // },
];
const sidebar = {};
nav.forEach(({ text, link, items }) => {
  if (!link) {
    // 说明存在多级目录
    items.forEach(({ text, link}) => {
      if (!link) return;
      link = link.split("/")[1];
      sidebar[`/${link}`] = [{ text, items: getDirectory(link) }];
    });
  } else {
    link = link.split("/")[1];
    sidebar[`/${link}`] = [{ text, items: getDirectory(link) }]; // sidebar.push({text,items:getDirectory(link.replaceAll('/',""))})
  }
});

module.exports = {
  base: '/',
  title: "Online Notes",
  description: "在线笔记",
  head: [
    ["link", { rel: "icon", type: "image/x-icon", href: "/receive.png" }], // 增加一个自定义的 favicon(网页标签的图标)
  ],
  markdown: {
    lineNumbers: true, // 代码块显示行号
  },
  // 打包时忽略死链
  ignoreDeadLinks: true,
  // 打包输出路径，输出到src/docs中
  outDir: './docs',
  // 缓存路径，输出到src/cache中
  cacheDir: './cache',
  themeConfig: {
    logo: '/receive.png',
    siteTitle: 'Online Notes',
    sidebar,
    nav,
    // 本章标题深度遍历 
    outline: {
      level: [2,3],
      label: '目录'
    },
    // 本地搜索
    search: {
      provider: 'local'
    },
    footer: {
      copyright: "Copyright © 2023-present CaiCai",
    },
  },
};

const navConf = require('./config/nav')
const { readFileList, readTotalFileWords, readEachFileWords } = require('./webSiteInfo/readFile');

// 定义常量
const author = "程序员沉梦听雨";
const domain = "https://cmty256.github.io/";
const tags = ["程序员", "编程", "计算机"];

module.exports = {
    title: '沉梦听雨的编程指南',
    // base: '/cmty256/',
    description: '满招损，谦受益',
    locales: {
        '/': {
            lang: 'zh-CN'
        }
    },
    theme: 'vdoing',
      markdown: {
        lineNumbers: true, // 显示代码块的行号
        extractHeaders: ['h2','h3','h4', 'h5','h6']

    },
    base: '/',
    head: [
        ['link', { rel: 'icon', href: 'https://cmty256.github.io/imgs-blog/logo/白云.38zbldnhh180.jpg' }], // 网页选项卡的logo
        [
            'meta',
            {
              name: 'keywords',
              content: "编程分享, 开发, 程序员, Java, 计算机, IT, 八股"
            }
       ],[
            'meta',
            {
              name: 'description',
              content: '沉梦听雨的编程指南'
            }
       ],
        // 阿里在线矢量库
        ['link', { rel: 'stylesheet', href: 'https://at.alicdn.com/t/font_3077305_pt8umhrn4k9.css' }],
        // 解决 Chrome 网站统计不准确问题
        ['meta', { name: 'referrer', content: 'no-referrer-when-downgrade' }],
        // 移动浏览器主题颜色
        ['meta', { name: 'theme-color', content: '#11a8cd' }],
        // 百度统计
        [
          "script",
          {},
          `
            var _hmt = _hmt || [];
            (function() {
              var hm = document.createElement("script");
              hm.src = "https://hm.baidu.com/hm.js?04a2517feeaf9f0d4d507cee97057d7c";
              var s = document.getElementsByTagName("script")[0]; 
              s.parentNode.insertBefore(hm, s);
            })();
          `,
        ],

    ],
    themeConfig: {
        updateBar:{showToArticle: false},
        logo: 'https://cmty256.github.io/imgs-blog/logo/白云.38zbldnhh180.jpg',
        sidebar: 'structuring',
        sidebarDepth: 2,
        lastUpdated: '上次更新',
        // 导航栏仓库链接设置
        repo: 'https://gitee.com/dream-deeply-tyu/cmty256',
        // 自定义导航栏仓库链接名称
        repoLabel: "Gitee",
        nav: navConf,
        sidebar: {
            mode: 'structuring',
            collapsable: false, // 侧边栏是否可折叠
        },
        pageStyle: 'line',
        category: false,
        tag: false,
        archive: false,

        // 文章默认的作者信息，(可在md文件中单独配置此信息) string | {name: string, link?: string}
        author: {
          name: '沉梦听雨', // 必需
          link: 'https://gitee.com/dream-deeply-tyu', // 可选的
        },

        // 社交图标 (显示于博主信息栏和页脚栏。内置图标：https://doc.xugaoyi.com/pages/a20ce8/#social)
        social: {
            // iconfontCssFile: '//at.alicdn.com/t/xxx.css', // 可选，阿里图标库在线css文件地址，对于主题没有的图标可自己添加。阿里图片库：https://www.iconfont.cn/
            icons: [
                {
                    iconClass: 'icon-youjian',
                    title: '发邮件',
                    link: 'mailto:2691357857@qq.com',
                },
                {
                    iconClass: 'icon-gitee',
                    title: 'Gitee',
                    link: 'https://gitee.com/dream-deeply-tyu',
                },
                {
                    iconClass: 'icon-csdn',
                    title: 'CSDN',
                    link: 'https://blog.csdn.net/qq_54088234?spm=1011.2124.3001.5343',
                },
            ],
        },

        // 页脚信息
        footer: {
            createYear: 2023, // 博客创建年份
            copyrightInfo:
                '沉梦听雨 | <a href="https://gitee.com/dream-deeply-tyu" target="_blank">MIT License</a>', // 博客版权信息、备案信息等，支持a标签或换行标签</br>
        },

        // 扩展自动生成frontmatter。（当md文件的frontmatter不存在相应的字段时将自动添加。不会覆盖已有的数据。）
        extendFrontmatter: {
            author: {
                name: '沉梦听雨',
                link: 'https://gitee.com/dream-deeply-tyu'
            }
        },

        // 站点配置（首页 & 文章页）
        blogInfo: {
            blogCreate: '2023-5-10', // 博客创建时间
            indexView: false,  // 开启首页的访问量和排名统计，默认 true（开启）
            pageView: false,  // 开启文章页的浏览量统计，默认 true（开启）
            readingTime: true,  // 开启文章页的预计阅读时间，条件：开启 eachFileWords，默认 true（开启）。可在 eachFileWords 的 readEachFileWords 的第二个和第三个参数自定义，默认 1 分钟 300 中文、160 英文
            eachFileWords: readEachFileWords([''], 300, 160),  // 开启每个文章页的字数。readEachFileWords(['xx']) 关闭 xx 目录（可多个，可不传参数）下的文章页字数和阅读时长，后面两个参数分别是 1 分钟里能阅读的中文字数和英文字数。无默认值。readEachFileWords() 方法默认排除了 article 为 false 的文章
            mdFileCountType: 'archives',  // 开启文档数。1. archives 获取归档的文档数（默认）。2. 数组 readFileList(['xx']) 排除 xx 目录（可多个，可不传参数），获取其他目录的文档数。提示：readFileList() 获取 docs 下所有的 md 文档（除了 `.vuepress` 和 `@pages` 目录下的文档）
            totalWords: 'archives',  // 开启本站文档总字数。1. archives 获取归档的文档数（使用 archives 条件：传入 eachFileWords，否则报错）。2. readTotalFileWords(['xx']) 排除 xx 目录（可多个，可不传参数），获取其他目录的文章字数。无默认值
            moutedEvent: '.tags-wrapper',   // 首页的站点模块挂载在某个元素后面（支持多种选择器），指的是挂载在哪个兄弟元素的后面，默认是热门标签 '.tags-wrapper' 下面，提示：'.categories-wrapper' 会挂载在文章分类下面。'.blogger-wrapper' 会挂载在博客头像模块下面
            // 下面两个选项：第一次获取访问量失败后的迭代时间
            indexIteration: 2500,   // 如果首页获取访问量失败，则每隔多少时间后获取一次访问量，直到获取成功或获取 10 次后。默认 3 秒。注意：设置时间太低，可能导致访问量 + 2、+ 3 ......
            pageIteration: 2500,    // 如果文章页获取访问量失败，则每隔多少时间后获取一次访问量，直到获取成功或获取 10 次后。默认 3 秒。注意：设置时间太低，可能导致访问量 + 2、+ 3 ......
            // 说明：成功获取一次访问量，访问量 + 1，所以第一次获取失败后，设置的每个隔段重新获取时间，将会影响访问量的次数。如 100 可能每次获取访问量 + 3
        },
        // bodyBgImg: '/img/banner.jpg',
        // titleBadgeIcons: ['/img/2.png',],
    },
    plugins: [
        [
            'one-click-copy',  // 一键复制插件
            {
            copySelector: ['div[class*="language-"] pre', 'div[class*="aside-code"] aside'], // String or Array
            copyMessage: '复制成功', // default is 'Copied successfully!'
            toolTipMessage: '点击复制', // default is ''Copy to clipboard'
            duration: 300, // prompt message display time
            }
        ],
        ["cursor-effects"], // 星星点击特效
        [
            'vuepress-plugin-reading-time',
            {
                // 以下是插件的默认配置
                excludes: [],
                options: {}
            }
        ],
        ['fulltext-search'], // 全文搜索
        ['reading-progress'], // 页面进度条
        [
            {
                name: 'custom-plugins',
                globalUIComponents: ["PageInfo"] // 2.x 版本 globalUIComponents 改名为 clientAppRootComponentFiles
            }
        ],
        [
            'vuepress-plugin-zooming', // 放大图片
            {
                selector: '.theme-vdoing-content img:not(.no-zoom)', // 排除class是no-zoom的图片
                options: {
                    bgColor: 'rgba(0,0,0,0.6)',
                },
            },
        ],
        // 图片懒加载：https://github.com/tolking/vuepress-plugin-img-lazy
        ['img-lazy'],
        // 自定义生成的网站 meta 标签内容
        [
            "seo",
            {
                siteTitle: (_, $site) => $site.title,
                title: ($page) => $page.title,
                description: ($page) =>
                    $page.frontmatter.description || $page.description,
                author: (_, $site) => $site.themeConfig.author || author,
                tags: ($page) => $page.frontmatter.tags || tags,
                type: ($page) => "article",
                url: (_, $site, path) =>
                    ($site.themeConfig.domain || domain || "") + path,
                image: ($page, $site) =>
                    $page.frontmatter.image &&
                    (($site.themeConfig.domain &&
                            !$page.frontmatter.image.startsWith("http")) ||
                        "") + $page.frontmatter.image,
                publishedAt: ($page) =>
                    $page.frontmatter.date && new Date($page.frontmatter.date),
                modifiedAt: ($page) => $page.lastUpdated && new Date($page.lastUpdated),
            },
        ],
        // 站点地图
        [
            "sitemap",
            {
                hostname: domain,
            },
        ],
        // 配置RSS订阅
        [
            "feed",
            {
                canonical_base: domain,
                count: 10000,
                // 需要自动推送的文档目录
                posts_directories: [],
            },
        ],
        // 自动推送百度插件
        [
            'vuepress-plugin-baidu-autopush'
        ]
    ],
}

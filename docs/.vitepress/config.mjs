import {defineConfig} from 'vitepress'

const SITE_URL = 'https://ayiyoyoyo.pages.dev'

// https://vitepress.dev/reference/site-config
export default defineConfig({
    title: "ayiyoyoyo",
    description: 'Package Web/Vue/React/HTML projects into Desktop Apps in minutes, 打包网页/Vue/React/HTML 项目为桌面应用只需几分钟',

    // vite: {
    //     server: {
    //         host: '0.0.0.0',
    //     },
    //     css: {
    //         preprocessorOptions: {
    //             scss: {
    //                 api: 'modern-compiler',
    //             },
    //         },
    //     },
    //     plugins: [],
    // },

    sitemap: {
        hostname: SITE_URL,
    },

    head: [
        // ['link', { rel: 'icon', href: 'https://ayiyoyoyo.pages.dev/app.svg' }],
        // ['link', { rel: 'canonical', href: SITE_URL }],
        // Open Graph
        // ['meta', { property: 'og:type', content: 'website' }],
        // ['meta', { property: 'og:site_name', content: 'PakePlus' }],
        // ['meta', { property: 'og:url', content: SITE_URL }],
        // [
        //     'meta',
        //     {
        //         property: 'og:image',
        //         content: 'https://ayiyoyoyo.pages.dev/app.webp',
        //     },
        // ],
        // ['meta', { property: 'og:image:width', content: '1200' }],
        // ['meta', { property: 'og:image:height', content: '630' }],
        // // Twitter Card
        // ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
        // ['meta', { name: 'twitter:site', content: '@1024xiaoshen' }],
        // ['meta', { name: 'twitter:creator', content: '@1024xiaoshen' }],
        // [
        //     'meta',
        //     {
        //         name: 'twitter:image',
        //         content: 'https://ayiyoyoyo.pages.dev/app.webp',
        //     },
        // ],
        // Additional SEO
        ['meta', {name: 'author', content: 'Chanix@github'}],
        [
            'meta',
            {
                name: 'robots',
                content: 'index, follow, max-image-preview:large',
            },
        ],
        ['meta', {name: 'googlebot', content: 'index, follow'}],
        // JSON-LD Structured Data
        // 注入一段 JSON-LD 脚本，这是 Google 推荐的结构化数据格式。搜索引擎读它来理解“这个页面描述的是什么”。
        // 这里的 @type: SoftwareApplication 表示它是一个软件应用，并提供了：
        // name：应用名
        // url：官网地址
        // description：描述
        // applicationCategory：应用分类（DeveloperApplication）
        // operatingSystem：支持的平台
        // offers：价格信息（免费）
        //
        // author / publisher：作者和发布方
        //
        // 效果：Google 搜索结果里，你的站点可能显示为带星级、价格等信息的“富摘要”（rich snippet），比普通结果更醒目。
        [
            'script',
            {type: 'application/ld+json'},
            JSON.stringify({
                '@context': 'https://schema.org',
                '@type': 'SoftwareApplication',
                name: 'ayiyoyoyo',
                url: SITE_URL,
                description:
                    'Package HTML/Web/Vue/React projects into Desktop Apps in minutes. Open source free packaging tool.',
                applicationCategory: 'DeveloperApplication',
                operatingSystem: 'Windows, macOS, Linux',
                offers: {
                    '@type': 'Offer',
                    price: '0',
                    priceCurrency: 'USD',
                },
                author: {
                    '@type': 'Person',
                    name: 'Chanix',
                    url: 'https://github.com/chanix',
                },
                publisher: {
                    '@type': 'Organization',
                    name: 'ayiyoyoyo',
                    logo: {
                        '@type': 'ImageObject',
                        url: 'https://ayiyoyoyo.pages.dev/app.svg',
                    },
                },
            }),
        ],
        // 自定义脚本
        // ['script', { src: '/ppweb.js', type: 'module' }],
    ],
    transformPageData(pageData) {
        const isZh = pageData.relativePath.startsWith('zh/')
        const canonicalUrl = `${SITE_URL}/${pageData.relativePath}`
            .replace(/index\.md$/, '')
            .replace(/\.md$/, '.html')
        const title =
            pageData.frontmatter.title || (isZh ? 'PakePlus' : 'PakePlus')
        const description =
            pageData.frontmatter.description ||
            (isZh
                ? '打包HTML/网页/Vue/React项目为桌面应用只需几分钟，官方开源免费打包工具'
                : 'Package HTML/Web/Vue/React projects into Desktop Apps in minutes, open source free packaging tool')
        pageData.frontmatter.head = [
            ...(pageData.frontmatter.head || []),
            ['link', {rel: 'canonical', href: canonicalUrl}],
            ['meta', {property: 'og:title', content: title}],
            ['meta', {property: 'og:description', content: description}],
            ['meta', {property: 'og:url', content: canonicalUrl}],
            [
                'meta',
                {property: 'og:locale', content: isZh ? 'zh_CN' : 'en_US'},
            ],
            ['meta', {name: 'twitter:title', content: title}],
            ['meta', {name: 'twitter:description', content: description}],
            ['meta', {name: 'description', content: description}],
        ]
    },

    locales: {
        // root: {
        //     label: 'English', lang: 'en', link: '/en/',
        //     themeConfig: {
        //         langMenuLabel: 'lang',
        //         returnToTopLabel: 'top',
        //         sidebarMenuLabel: 'Menu',
        //         darkModeSwitchLabel: 'Theme',
        //         lightModeSwitchTitle: 'Switch to light theme',
        //         darkModeSwitchTitle: 'Switch to dark theme',
        //         skipToContentLabel: '跳转到内容',
        //
        //         nav: [
        //             {text: 'home', link: '/en/'},
        //         ],
        //
        //         docFooter: {
        //             prev: 'Previous',
        //             next: 'Next'
        //         },
        //
        //         footer: {
        //             message: 'Released under the MIT License.',
        //             copyright: `Copyright © 2025-${new Date().getFullYear()}, ayiyoyoyo, Chanix@GitHub`
        //         },
        //
        //         outline: {
        //             label: 'nav'
        //         },
        //
        //         lastUpdated: {
        //             text: 'last-modified',
        //             formatOptions: {
        //                 dateStyle: 'short',
        //                 timeStyle: 'medium'
        //             }
        //         },
        //
        //         sidebar: [
        //             {
        //                 text: 'ayiyoyoyo 简介',
        //                 collapsed: false,
        //                 items: [
        //                     {text: 'What is ayiyoyoyo', link: '/zh/what-is-ayiyoyoyo'},
        //                     {text: 'What is ayiyoyoyo222', link: '/zh/what-is-ayiyoyoyo'},
        //                     {text: 'What is ayiyoyoyo333', link: '/zh/what-is-ayiyoyoyo'},
        //                 ],
        //             },
        //         ],
        //
        //         socialLinks: [
        //             {icon: 'github', link: 'https://Chanix.github.io/'}
        //         ]
        //     },
        // },
        zh: {
            label: '简体中文', lang: 'zh-Hans', link: '/zh/',
            themeConfig: {
                langMenuLabel: '多语言',
                returnToTopLabel: '回到顶部',
                sidebarMenuLabel: '菜单',
                darkModeSwitchLabel: '主题',
                lightModeSwitchTitle: '切换到浅色模式',
                darkModeSwitchTitle: '切换到深色模式',
                skipToContentLabel: '跳转到内容',

                nav: [
                    {text: '回首页', link: '/zh/'},
                ],

                docFooter: {
                    prev: '上一页',
                    next: '下一页'
                },

                footer: {
                    message: '基于 MIT 许可发布',
                    copyright: `版权所有 © 2025-${new Date().getFullYear()}, ayiyoyoyo, Chanix@GitHub`
                },

                outline: {
                    label: '本页导航'
                },

                lastUpdated: {
                    text: '最后更新于',
                    formatOptions: {
                        dateStyle: 'short',
                        timeStyle: 'medium'
                    }
                },

                sidebar: [
                    {
                        text: '新手上路',
                        collapsed: false,
                        items: [
                            {text: 'ayiyoyoyo 简介', link: '/zh/what-is-ayiyoyoyo'},
                            {text: '快速开始', link: '/zh/getting-started.md'},
                            {text: '命令行参数', link: '/zh/what-is-ayiyoyoyo'},
                            {text: '文件与目录结构', link: '/zh/what-is-ayiyoyoyo'},
                            {
                                text: '小应用开发',
                                items: [
                                    {text: '基础知识', link: '/zh/what-is-ayiyoyoyo'},
                                    {text: '开发流程', link: '/zh/getting-started.md'},
                                    {text: '如何分发', link: '/zh/advanced'},
                                    {text: '如何调试', link: '/zh/advanced'},
                                    {text: '进阶使用', link: '/zh/advanced'},
                                    {text: '如何提升性能', link: '/zh/advanced'},
                                    {text: '如何提升效率', link: '/zh/advanced'},
                                    {text: '如何扩展功能JS+PYTHON', link: '/zh/advanced'},
                                ],
                            },
                        ],

                    },
                    {
                        text: 'JS 扩展与 API',
                        collapsed: false,
                        items: [
                            {text: '扩展对象概述', link: '/zh/jsapi'},
                            {
                                items: [
                                    {text: '小应用　　　appchip', link: '/zh/jsapi/JsapiAppchip'},
                                    {text: '剪贴板　　　clipboard', link: '/zh/jsapi/JsapiClipboard'},
                                    {text: '对话框　　　dialog', link: '/zh/jsapi/JsapiDialog'},
                                    {text: 'python&nbsp;&nbsp;　　python', link: '/zh/jsapi/JsapiPython'},
                                    {text: 'Shell&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;　　Shell', link: '/zh/jsapi/JsapiShell'},
                                    // {text: '开机自启　　autostart', link: './jsapi/autostart'},
                                    // {text: '基础功能　　core', link: './jsapi/core'},
                                    // {text: '设备信息　　device', link: './jsapi/device'},
                                    // {text: '环境变量　　env', link: './jsapi/env'},
                                    // {text: '文件系统　　fsys', link: './jsapi/fsys'},
                                    // {text: '全局热键　　hotkey', link: './jsapi/hotkey'},
                                    // {text: '主窗口　　　mainwin', link: './jsapi/mainwin'},
                                    // {text: '内存数据库　memdb', link: './jsapi/memdb'},
                                    // {text: '进程管理　　process', link: './jsapi/process'},
                                    // {text: '属性数据　　properties', link: './jsapi/properties'},
                                ]
                            },
                        ],
                    },
                ],

                socialLinks: [
                    {icon: 'github', link: 'https://Chanix.github.io/'}
                ]
            },
        }
    },
    themeConfig: {
        search: {
            provider: 'local',
            options: {
                locales: {
                    zh: {
                        translations: {
                            button: {
                                buttonText: '搜索文档',
                                buttonAriaLabel: '搜索文档',
                            },
                            modal: {
                                noResultsText: '无法找到相关结果',
                                resetButtonTitle: '清除查询条件',
                                footer: {
                                    selectText: '选择',
                                    navigateText: '切换',
                                },
                            },
                        },
                    },
                    en: {
                        translations: {
                            button: {
                                buttonText: 'Search',
                                buttonAriaLabel: 'Search',
                            },
                            modal: {
                                noResultsText: 'No results found',
                                resetButtonTitle: 'Reset',
                                footer: {
                                    selectText: 'Select',
                                    navigateText: 'Switch',
                                },
                            },
                        },
                    },
                },
            },
        },
        // 基础配置
        logo: {
            src: '/icon.svg',
            alt: 'ayiyoyoyo',
        },
    },
})

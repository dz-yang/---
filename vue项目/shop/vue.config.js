configureWebpack: config => {
    require('vux-loader').merge(config, {
        plugins: [
            'vux-ui',
            'progress-bar',
            'duplicate-style',
            {
                name: 'less-theme',
                path: 'src/assets/styles/vux_theme.less',
                options: {
                    cssProcessorOptions: {
                        safe: true,
                        zindex: false,
                        autoprefixer: {
                            add: true,
                            browsers: [
                                'iOS >= 7',
                                'Android >= 4.1',
                            ],
                        },
                    },
                },
            },
        ],
    })
}
module.exports = function(grunt) {
  // 项目配置
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    clean: { //清除目标文件下文件
      mobile_recruit: {
        src: "mobile_recruit/build"
      }
    },
    copy: {
      mobile_recruit: {
        expand: true,
        cwd: './src',//源文件路径
        src: '*.html',//源文件目录下的所有文件
        dest: './build/',//目标文件路径，把源文件下的文件复制到该目录下
        // flatten: false,//用来指定是否保持文件目录结构
        filter: 'isFile'
      },
      img:{
        expand: true,
        cwd: './src/css/img',//源文件路径
        src: '**',//源文件目录下的所有文件
        dest: './build/css/img',//目标文件路径，把源文件下的文件复制到该目录下
        // flatten: false,//用来指定是否保持文件目录结构
        // filter: 'isFile'
      },
      css:{
        expand: true,
        cwd: './src/css',//源文件路径
        src: '**',//源文件目录下的所有文件
        dest: './build/css',//目标文件路径，把源文件下的文件复制到该目录下
        // flatten: false,//用来指定是否保持文件目录结构
        // filter: 'isFile'
      }
    },
    // sass: {
    //   mobile_recruit: {
    //     files: [{
    //       expand: true,
    //       cwd: 'src',
    //       src: ['*.scss'],
    //       dest: 'mobile_recruit/build',
    //       ext: '.css'
    //     }]
    //   }
    // },
    concat: {
      options:{
                stripBanners:true, //合并时允许输出头部信息
                banner:'/*!<%= pkg.name %>-<%= pkg.version %>-'+'<%=grunt.template.today("yyyy-mm-dd") %> */'
            },
            // cssConcat:{
            //     src:['src/css/css1.css','src/css/css2.css'],
            //     dest:'src/css/concat/<%= pkg.name %> - <%= pkg.version %>.css' //dest 是目的地输出
            // },
      jsConcat:{
          files: {
            './src/js/concat/<%=pkg.name %>-<%= pkg.version %>.js': ['./src/js/*.js'],
            './src/js/concat/<%=pkg.name %>-vendor-<%= pkg.version %>.js': ['bower_components/zepto/zepto.min.js','./src/js/vendor/zepto.fullpage.js','./src/js/vendor/rem.js']
          }
          // src:['./src/js/*.js','bower_components/zepto/zepto.min.js'],
          // dest:'./src/js/concat/<%=pkg.name %> - <%= pkg.version %>.js'
      },
    },
    uglify: {//压缩js文件
      mobile_recruit: {
        files: [{
          expand: true,
          cwd: './src/js/concat', //js源文件目录
          src: '*.js', //所有js文件
          dest: './build/js' //输出到此目录下
        }]
      }
    },
    cssmin: { //压缩css
      mobile_recruit: {
        "files": {
          './build/css/main.css': ['./src/css/*.css']//将数组里面的css文件压缩成一个目标文件
        }
      }
    },
    less: {
       development: {
         cleancss: true,
         expand: true,
         flatten: true,
         cwd: '<%= pkg.src %>/css/',
         src: ['*.less'],
         dest: './build/assets/css/',
         ext: '.css'
       },
     },
    connect: {
                options:{
                  port: 8080,
                  hostname: 'localhost', //默认就是这个值，可配置为本机某个 IP，localhost 或域名
                  livereload: 35729  //声明给 watch 监听的端口
                },
                server: {
                    options: {
                      open: true,
                      base: ['../moqi0620/']
                    }
                }
            },
    watch: {
        options: {
          livereload: '<%=connect.options.livereload%>'  //监听前面声明的端口  35729
        },
        scripts: {
          options:{
            livereload: true
          },
          files: [  //下面文件的改变就会实时刷新网页
            './html/*.html',
            './css/{,*/}*.css',
            './js/{,*/}*.js'
          ]
        }
    },
    // htmlmin: { //压缩html
    //   mobile_recruit: {
    //     options: { // Target options
    //       removeComments: true,
    //       collapseWhitespace: true
    //     },
    //     files: [{
    //       expand: true, // Enable dynamic expansion.
    //       cwd: 'mobile_recruit/src', // Src matches are relative to this path.
    //       src: ['*.html'], // Actual pattern(s) to match.
    //       dest: 'mobile_recruit/build/', // Destination path prefix.
    //       ext: '.html', // Dest filepaths will have this extension.
    //       extDot: 'first' // Extensions in filenames begin after the first dot
    //     }]
    //   }
    // }
  });
  //默认任务
  // grunt.registerTask('default', [ 'concat', 'copy','uglify', 'connect','watch']);
  grunt.registerTask('dev', ['connect','watch']);
  // 加载提供"uglify"任务的插件
  // grunt.loadNpmTasks('grunt-contrib-clean');
  // grunt.loadNpmTasks('grunt-contrib-copy');
  // grunt.loadNpmTasks('grunt-contrib-uglify');
  // grunt.loadNpmTasks('grunt-contrib-concat');
  // grunt.loadNpmTasks('grunt-contrib-cssmin');
  // grunt.loadNpmTasks('grunt-contrib-htmlmin');
  // grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  // grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');
  // 默认任务
  // grunt.registerTask('mobile_recruit', ['clean:mobile_recruit','copy:mobile_recruit', 'uglify:mobile_recruit', 'cssmin:mobile_recruit', 'htmlmin:mobile_recruit']);
}
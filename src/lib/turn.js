/**
 * 简化版的 Turn.js，基于 CSS 3D transforms
 * 参考九寨六绝书本翻页效果
 */

const initTurn = (jQuery) => {
  jQuery.fn.turn = function(options) {
    if (!this.data('turn')) {
      this.data('turn', new Turn(this, options));
      return this;
    } else if (typeof options === 'string') {
      const turn = this.data('turn');
      if (options === 'next') {
        turn.next();
      } else if (options === 'previous') {
        turn.previous();
      } else if (options === 'destroy') {
        turn.destroy();
        this.removeData('turn');
      } else if (options === 'page' && arguments[1]) {
        turn.goToPage(arguments[1]);
      }
      return this;
    }
    return this.data('turn');
  };

  class Turn {
    constructor(el, options) {
      this.el = jQuery(el);
      this.options = jQuery.extend({
        width: 800,
        height: 600,
        autoCenter: true,
        acceleration: true,
        gradients: true,
        elevation: 50,
        duration: 1500,
        pages: this.el.children().length,
        display: 'single',
        when: {}
      }, options);
      
      this.currentPage = 1;
      this.pagesCount = this.options.pages;
      this.flipping = false;
      
      this.init();
    }
    
    init() {
      this.el.addClass('turn-book');
      this.el.css({
        width: this.options.width,
        height: this.options.height,
        position: 'relative',
        transformStyle: 'preserve-3d',
        transition: `transform ${this.options.duration}ms ease`
      });
      
      // 设置每个页面
      this.el.children().each((i, page) => {
        const $page = jQuery(page);
        const pageNum = i + 1;
        
        $page.addClass('turn-page');
        $page.attr('data-page', pageNum);
        $page.css({
          position: 'absolute',
          width: this.options.display === 'single' ? this.options.width : this.options.width / 2,
          height: this.options.height,
          transformStyle: 'preserve-3d',
          transition: `transform ${this.options.duration}ms ease, opacity ${this.options.duration / 2}ms ease`,
          backfaceVisibility: 'hidden',
          zIndex: this.pagesCount - i,
          opacity: pageNum === 1 ? 1 : 0
        });
        
        // 初始时只显示第一页，其他页隐藏
        if (pageNum === 1) {
          $page.css({
            display: 'block',
            transform: 'rotateY(0deg)',
            left: '0',
            transformOrigin: 'right center'
          });
        } else {
          $page.css({
            display: 'none',
            transform: 'rotateY(0deg)',
            left: '0',
            transformOrigin: 'right center'
          });
        }
      });
      
      // 触发初始化完成事件
      if (this.options.when.turned) {
        this.options.when.turned.call(this, null, this.currentPage, null);
      }
      
      // 绑定事件
      this.bindEvents();
    }
    
    bindEvents() {
      // 可以添加更多事件处理
    }
    
    next() {
      if (this.flipping || this.currentPage >= this.pagesCount) return;
      this.flip(this.currentPage + 1);
    }
    
    previous() {
      if (this.flipping || this.currentPage <= 1) return;
      this.flip(this.currentPage - 1);
    }
    
    goToPage(page) {
      if (this.flipping || page < 1 || page > this.pagesCount || page === this.currentPage) return;
      
      // 如果目标页与当前页相差较大，使用渐变过渡而不是翻页
      if (Math.abs(page - this.currentPage) > 1) {
        this.jumpToPage(page);
      } else {
        this.flip(page);
      }
    }
    
    jumpToPage(page) {
      this.flipping = true;
      
      // 触发turning事件
      if (this.options.when.turning) {
        this.options.when.turning.call(this, null, page, null);
      }
      
      // 获取当前页和目标页
      const $currentPage = this.el.find(`.turn-page[data-page="${this.currentPage}"]`);
      const $nextPage = this.el.find(`.turn-page[data-page="${page}"]`);
      
      // 淡出当前页
      $currentPage.css({
        opacity: 0,
        transition: `opacity 500ms ease`
      });
      
      // 显示并淡入下一页
      $nextPage.css({
        display: 'block',
        opacity: 0,
        transition: `opacity 500ms ease`
      });
      
      setTimeout(() => {
        $nextPage.css({
          opacity: 1
        });
        
        // 动画完成后
        setTimeout(() => {
          $currentPage.css({
            display: 'none'
          });
          
          this.currentPage = page;
          this.flipping = false;
          
          // 触发turned事件
          if (this.options.when.turned) {
            this.options.when.turned.call(this, null, page, null);
          }
        }, 500);
      }, 50);
    }
    
    flip(page) {
      if (this.flipping) return;
      
      this.flipping = true;
      const prevPage = this.currentPage;
      this.currentPage = page;
      
      // 触发turning事件
      if (this.options.when.turning) {
        this.options.when.turning.call(this, null, page, null);
      }
      
      // 获取当前页和目标页
      const $currentPage = this.el.find(`.turn-page[data-page="${prevPage}"]`);
      const $nextPage = this.el.find(`.turn-page[data-page="${page}"]`);
      
      // 显示下一页
      $nextPage.css({
        display: 'block',
        opacity: 1,
        transform: page > prevPage ? 'rotateY(-180deg)' : 'rotateY(0deg)',
        transformOrigin: page > prevPage ? 'right center' : 'left center'
      });
      
      // 添加翻页时的阴影
      if (this.options.gradients) {
        $currentPage.append('<div class="shadow"></div>');
        $nextPage.append('<div class="gradient"></div>');
      }
      
      // 开始翻页动画
      setTimeout(() => {
        $currentPage.css({
          transform: page > prevPage ? 'rotateY(-180deg)' : 'rotateY(180deg)',
          transformOrigin: page > prevPage ? 'right center' : 'left center'
        });
        
        $nextPage.css({
          transform: 'rotateY(0deg)'
        });
        
        // 添加书脊阴影
        this.el.append('<div class="spine-shadow"></div>');
        
        // 动画完成后
        setTimeout(() => {
          $currentPage.css({
            display: 'none'
          });
          
          // 移除阴影
          this.el.find('.shadow, .gradient, .spine-shadow').remove();
          
          this.flipping = false;
          
          // 触发turned事件
          if (this.options.when.turned) {
            this.options.when.turned.call(this, null, page, null);
          }
        }, this.options.duration);
      }, 50);
    }
    
    destroy() {
      this.el.removeClass('turn-book');
      this.el.css({
        width: '',
        height: '',
        position: '',
        transformStyle: '',
        transition: ''
      });
      
      this.el.children().each((i, page) => {
        const $page = jQuery(page);
        $page.removeClass('turn-page');
        $page.removeAttr('data-page');
        $page.css({
          position: '',
          width: '',
          height: '',
          transformStyle: '',
          transition: '',
          backfaceVisibility: '',
          zIndex: '',
          display: '',
          transform: '',
          transformOrigin: '',
          opacity: ''
        });
      });
      
      this.el.find('.shadow, .gradient, .spine-shadow').remove();
    }
  }
};

export default function initializeTurn() {
  if (typeof window !== 'undefined' && window.jQuery) {
    initTurn(window.jQuery);
  }
} 
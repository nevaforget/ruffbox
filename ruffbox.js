/**
 * @author d.kressler
 * @date 2020-08-12
 * @version 1.0.0
 */
const Ruffbox = function(params)
{
    let instance = this;
    const defaults = {
        transition: 300,
        selector: 'a.ruffbox'
    };
    params = {...params, ...defaults};

    let elms = {};
    elms.container = document.createElement('ruffbox-container');
    elms.container.classList.add('ruffboxContainer');
    elms.wrap = document.createElement('ruffbox-wrap');
    elms.wrap.classList.add('ruffboxWrap');

    let styles = document.createElement('style');
    styles.innerHTML = `
    .ruffboxContainer {
        background: rgba(0,0,0,.8);
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 2000;
        opacity: 0;
        pointer-events: none;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        transition: ${params.transition}ms all ease-in-out
    }
    .ruffboxContainer.show {
        opacity: 1;
        pointer-events: all
    }
    .ruffboxContainer:after {
        display: block;
        position: absolute;
        top: 0;
        right: 0;
        content: '×';
        font-family: sans-serif;
        font-size: 24px;
        z-index: 2001;
        text-align: center;
        color: #333;
        width: 24px;
        height: 24px;
        cursor: pointer;
        background: #fff;
        border-bottom-left-radius: 3px
    }
    .ruffboxWrap {
        background: url(/images/layout/loading.svg) no-repeat center center
    }
    .ruffboxWrap img {
        transition: ${params.transition}ms all ease-in-out
    }
    @media (orientation:landscape) {
        .ruffboxWrap.landscape img {
            max-height: 90vh;
            height: 100%;
            width: auto;
            max-width:100%
        }
        .ruffboxWrap.portrait img {
            max-height: 90vh;
            height: 100%;
            width: auto;
            max-width:none
        }
    }
    @media (orientation:portrait) {
        .ruffboxWrap.landscape img {
           max-width: 90vw;
           width: 100%;
           height: auto;
           max-height:none
        }
        .ruffboxWrap.portrait img {
           max-width: 90vw;
           width: 100%;
           height: auto;
           max-height:none
        }
    }
    `;
    
    elms.container.appendChild(elms.wrap);
    document.body.appendChild(elms.container);
    document.body.appendChild(styles);

    elms.container.addEventListener('click', function(){
        elms.container.classList.remove('show');
        setTimeout(function(){elms.wrap.innerHTML = '';}, params.transition);
    });
    
    instance.elements = document.querySelectorAll(params.selector);
    for(let i = 0; i < instance.elements.length; i++) {
        instance.elements[i].addEventListener('click', function(e) {
            e.preventDefault();
            let image = new Image();
            elms.container.classList.add('show');

            image.onload = function() {
                if(image.clientHeight > image.clientWidth) elms.wrap.classList.add('portrait');
                else elms.wrap.classList.add('landscape');
                image.style.opacity = '1';
            }
            image.src = this.href;
            image.style.opacity = '0';

            elms.wrap.appendChild(image);
        });
    }    

    return instance;
};

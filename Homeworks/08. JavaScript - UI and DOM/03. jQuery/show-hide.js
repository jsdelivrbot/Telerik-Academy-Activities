/* globals $ */

/*
Create a function that takes a selector and:
* Finds all elements with class `button` or `content` within the provided element
  * Change the content of all `.button` elements with "hide"
* When a `.button` is clicked:
  * Find the topmost `.content` element, that is before another `.button` and:
    * If the `.content` is visible:
      * Hide the `.content`
      * Change the content of the `.button` to "show"       
    * If the `.content` is hidden:
      * Show the `.content`
      * Change the content of the `.button` to "hide"
    * If there isn't a `.content` element **after the clicked `.button`** and **before other `.button`**, do nothing
* Throws if:
  * The provided ID is not a **jQuery object** or a `string` 

*/
function solve() {
  return function (selector) {
                 if (typeof (selector) !== 'string' || $(selector).size() === 0) {
                    throw new Error("provided ID is not a jQuery object or a string");
                }

                var buttons,
                    content;


                var buttons,
                    content,
                    i,
                    len;

                buttons = $('.button');
                content = $('.content');

                for (i = 0, len = buttons.length; i < len; i+=1) {
                    $(buttons[i]).text('hide');
                    $(buttons[i]).on('click', function () {
                        var clickedButton = $(this),
                            nextSibling = clickedButton.next(),
                            firstContent,
                            validFirstContent = false;

                        while(nextSibling){
                            if(nextSibling.hasClass('content')){
                                firstContent = nextSibling;
                                nextSibling = nextSibling.next();
                                
                                while(nextSibling){
                                    if (nextSibling.hasClass('button')) {
                                        validFirstContent = true;
                                        break;
                                    }
                                    nextSibling = nextSibling.next();
                                }
                                break;
                            } else {
                                nextSibling = nextSibling.next();
                            }
                        }


                        if (validFirstContent) {
                            if (firstContent.css('display') === 'none') {
                                firstContent.css('display','');
                                clickedButton.text('hide');
                            } else {
                                clickedButton.text('show');
                                firstContent.hide();
                            }
                        }

                    })
                }
            };
        };

module.exports = solve;
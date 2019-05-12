$("#container").addClass("background-color-green").addClass("color-orange")

function $(selector) {
    const element = selectElement(selector);

    if (!element) {
        return null;
    }

    const methods = {
        addClass: function(className) {
            element.classList.add(className);
            return methods;
        },

        removeClass: function(className) {
            element.classList.remove(className);
            return methods;
        }
    }

    function selectElement(selector) {
        selector = selector.trim();
        let element = null ;
        if (selector.startsWith("#")) {
            element = document.getElementById(selector.slice(1));
        } else if (selector.startsWith(".")) {
            element = document.getElementsByClassName(selector.slice(1));
        } else if (isTagName(selector)) {
            element = document.getElementsByTagName(selector);
        }
        return element;

        function isTagName(selector) {
            selector = selector.toLowerCase();
            const tagNames = new Set(["div", "a", "button", "img", "span", "h1", "h2", "h3", "h4", "h5", "h6"]);
            return tagNames.has(selector);
        }
    }
}
export default function(obj, prop) {
    var input = document.querySelector('[name="' + prop + '"]');
    var observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            var val = mutation.target.innerHTML;
            if (obj[prop] !== val) {
                console.log('Inequality detected: "' + obj[prop] + '" !== "' + val + '"');
                obj[prop] = mutation.target.innerHTML;
            }
        });
    });
    var config = {
        attributes: true,
        childList: true,
        characterData: true
    };
    var list = document.querySelectorAll('[data-bind="' + prop + '"]'), i;
    for (i = 0; i < list.length; i++) {
        observer.observe(list[i], config);
    }
    input.value = obj[prop] || input.value;
    Object.defineProperty(obj, prop, {
        get: function() {
            return input.value;
        },
        set: function(val) {
            var list = document.querySelectorAll('[data-bind="' + prop + '"]'), i;
            for (i = 0; i < list.length; i++) {
                list[i].innerHTML = val;
            }
            input.value = val;
        },
        configurable: true,
        enumerable: true
    });
    obj[prop] = obj[prop];
    input.oninput = function() {
        obj[prop] = obj[prop];
    };
};
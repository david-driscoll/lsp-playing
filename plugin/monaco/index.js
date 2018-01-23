var RevealMonaco =
    window.RevealMonaco ||
    (function() {
        var options = Reveal.getConfig().monaco || {};
        options.base = options.base || 'plugin/monaco/';

        var currentEditors = [];

        var indices = Reveal.getIndices();
        loadEditors(Reveal.getCurrentSlide(), {
            indexh: indices.h,
            indexv: indices.v,
        });

        Reveal.addEventListener('slidechanged', function(event) {
            if (event.previousSlide) unloadEditors(event.previousSlide);
            if (event.currentSlide) loadEditors(event.currentSlide, event);
        });

        function loadEditors(element, event) {
            var elements = element.querySelectorAll('monaco-editor');
            elements.forEach(function(element, i) {
                element.setAttribute(
                    'theme',
                    element.getAttribute('theme') || options.theme
                );
                element.setAttribute(
                    'fontSize',
                    element.getAttribute('fontSize') || options.fontSize
                );
                element.className = 'stretch';
                element.id = 'monaco-' + event.indexh + '-' + event.indexv + '-' + i;

                var iframe = document.createElement('iframe');
                iframe.className = 'monaco-frame';
                iframe.src = options.base + 'monaco-container.html';
                iframe.onload = () => {
                    iframe.contentWindow
                        .bootstrapEditor(
                            iframe.contentDocument.getElementById('monaco-container'),
                            extractCode(element)
                        )
                        .then(editor => {
                            currentEditors.push(currentEditors);
                        });
                };
                element.appendChild(iframe);
            });
        }

        function unloadEditors(element) {
            currentEditors.forEach(editor => {
                editor.dispose();
            });
            currentEditors = [];
            var elements = element.querySelectorAll('monaco-editor');
            elements.forEach(function(element) {
                element.querySelectorAll('iframe.monaco-frame').forEach(function(el) {
                    el.remove();
                });
            });
        }

        function extractCode(element) {
            var code;
            var url = element.getAttribute('url');
            if (url) {
                config.promises.push(
                    xhr('../../' + url).then(
                        function(c) {
                            config.code = c.responseText;
                        },
                        function(e) {
                            config.code =
                                "Error loading '" + url + "': " + JSON.stringify(e);
                        }
                    )
                );
                code = '(Loading ' + url + '...)';
            } else {
                code = element.getAttribute('code');
                if (code) {
                    code = code
                        .replace(/\\n/g, '\n')
                        .replace(/\\r/g, '\r')
                        .replace(/\\t/g, '\t');
                } else {
                    var codeElement = element.querySelectorAll('.monaco-code')[0];
                    if (codeElement) {
                        code = codeElement.innerHTML.trim();
                    } else {
                        console.warn(
                            'Monaco Code editor with id of ' +
                                element.id +
                                ' has no code to display. Either use the "code" attribute on "#' +
                                element.id +
                                '" or create a child span with class "monaco-code" to provide code for the editor.'
                        );
                    }
                }
            }
            return code;
        }
    })();

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
window.addEventListener('load', function (x) {
    window.require(['vs/editor/editor.main'], function () {
        var ReconnectingWebSocket = require('reconnecting-websocket');
        monaco.editor.onDidCreateEditor(function (editor) {
            editor.getDomNode();
        });
        // register Monaco languages
        monaco.languages.register({
            id: 'json',
            extensions: [
                '.json',
                '.bowerrc',
                '.jshintrc',
                '.jscsrc',
                '.eslintrc',
                '.babelrc',
            ],
            aliases: ['JSON', 'json'],
            mimetypes: ['application/json'],
        });
        // create Monaco editor
        var value = "{\n    \"$schema\": \"http://json.schemastore.org/coffeelint\",\n    \"line_endings\": \"unix\"\n}";
        // const editor = monaco.editor.create(document.getElementById('container')!, {
        //     model: monaco.editor.createModel(
        //         value,
        //         'json',
        //         monaco.Uri.parse('inmemory://model.json')
        //     ),
        //     glyphMargin: true,
        // });
        // create the web socket
        // const url = createUrl('/sampleServer');
        // const webSocket = createWebSocket(url);
        // listen when the web socket is opened
        // listen({
        //     webSocket,
        //     onConnection: connection => {
        //         // create and start the language client
        //         const languageClient = createLanguageClient(connection);
        //         const disposable = languageClient.start();
        //         connection.onClose(() => disposable.dispose());
        //     },
        // });
        // const services = createMonacoServices(editor);
        // function createLanguageClient(connection: MessageConnection): BaseLanguageClient {
        //     return new BaseLanguageClient({
        //         name: 'Sample Language Client',
        //         clientOptions: {
        //             // use a language id as a document selector
        //             documentSelector: ['json'],
        //             // disable the default error handler
        //             errorHandler: {
        //                 error: () => ErrorAction.Continue,
        //                 closed: () => CloseAction.DoNotRestart,
        //             },
        //         },
        //         services,
        //         // create a language client connection from the JSON RPC connection on demand
        //         connectionProvider: {
        //             get: (errorHandler, closeHandler) => {
        //                 return Promise.resolve(
        //                     createConnection(connection, errorHandler, closeHandler)
        //                 );
        //             },
        //         },
        //     });
        // }
        function createUrl(path) {
            var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
            return protocol + "://" + location.host + path;
        }
        function createWebSocket(url) {
            var socketOptions = {
                maxReconnectionDelay: 10000,
                minReconnectionDelay: 1000,
                reconnectionDelayGrowFactor: 1.3,
                connectionTimeout: 10000,
                maxRetries: Infinity,
                debug: false,
            };
            return new ReconnectingWebSocket(url, undefined, socketOptions);
        }
    });
});
//# sourceMappingURL=client.js.map
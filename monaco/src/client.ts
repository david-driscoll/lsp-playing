/* --------------------------------------------------------------------------------------------
 * Copyright (c) 2017 TypeFox GmbH (http://www.typefox.io). All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */
import { listen, MessageConnection } from 'vscode-ws-jsonrpc';
import {
    BaseLanguageClient,
    CloseAction,
    ErrorAction,
    createMonacoServices,
    createConnection,
} from 'monaco-languageclient';

window.addEventListener('load', x => {

    (window as any).require(['vs/editor/editor.main'], () => {
        const ReconnectingWebSocket = require('reconnecting-websocket');

        monaco.editor.onDidCreateEditor(editor => {
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
        const value = `{
    "$schema": "http://json.schemastore.org/coffeelint",
    "line_endings": "unix"
}`;
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

        function createUrl(path: string): string {
            const protocol = location.protocol === 'https:' ? 'wss' : 'ws';
            return `${protocol}://${location.host}${path}`;
        }

        function createWebSocket(url: string): WebSocket {
            const socketOptions = {
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

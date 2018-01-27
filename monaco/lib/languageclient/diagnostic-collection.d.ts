import { DiagnosticCollection, Diagnostic } from 'vscode-base-languageclient/lib/services';
import { DisposableCollection, Disposable } from './disposable';
import { ProtocolToMonacoConverter } from './converter';
import IModel = monaco.editor.IModel;
import IMarkerData = monaco.editor.IMarkerData;
export declare class MonacoDiagnosticCollection implements DiagnosticCollection {
    protected readonly name: string;
    protected readonly p2m: ProtocolToMonacoConverter;
    protected readonly diagnostics: Map<string, MonacoModelDiagnostics | undefined>;
    protected readonly toDispose: DisposableCollection;
    constructor(name: string, p2m: ProtocolToMonacoConverter);
    dispose(): void;
    get(uri: string): Diagnostic[];
    set(uri: string, diagnostics: Diagnostic[]): void;
}
export declare class MonacoModelDiagnostics implements Disposable {
    readonly owner: string;
    protected readonly p2m: ProtocolToMonacoConverter;
    readonly uri: monaco.Uri;
    protected _markers: IMarkerData[];
    protected _diagnostics: Diagnostic[];
    constructor(uri: string, diagnostics: Diagnostic[], owner: string, p2m: ProtocolToMonacoConverter);
    diagnostics: Diagnostic[];
    readonly markers: ReadonlyArray<IMarkerData>;
    dispose(): void;
    updateModelMarkers(): void;
    protected doUpdateModelMarkers(model: IModel | undefined): void;
}

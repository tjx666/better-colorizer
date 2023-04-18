import vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
    // support git error file syntax highlight
    vscode.workspace.onDidOpenTextDocument(
        async (document) => {
            const { uri } = document;
            if (uri.scheme === 'git-output' && /\/git-error-/.test(uri.fsPath)) {
                await vscode.languages.setTextDocumentLanguage(document, 'log');
            }
        },
        null,
        context.subscriptions,
    );

    // support output panel syntax highlight
    vscode.workspace.onDidOpenTextDocument(
        async (document) => {
            const { uri } = document;
            // output channel default languageId is Log and has no highlight
            // we can change it to log to get log language syntax highlight
            // NOTE: log !== Log
            if (uri.scheme === 'output' && document.languageId === 'Log') {
                await vscode.languages.setTextDocumentLanguage(document, 'log');
            }
        },
        null,
        context.subscriptions,
    );
}

export function deactivate() {}

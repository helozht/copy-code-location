import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
  const disposable = vscode.commands.registerCommand('copy-code-location.copyLocation', async () => {
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
      return;
    }

    const selection = editor.selection;
    const document = editor.document;
    const fileName = document.fileName.split(/[/\\]/).pop() || 'unknown';

    if (selection.isEmpty) {
      return;
    }

    const startLine = selection.start.line + 1;
    const endLine = selection.end.line + 1;

    const location = `@${fileName}#L${startLine}-${endLine}`;

    await vscode.env.clipboard.writeText(location);
    vscode.window.setStatusBarMessage(`Copied: ${location}`, 3000);
  });

  context.subscriptions.push(disposable);
}

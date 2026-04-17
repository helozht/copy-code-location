import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
  const disposable = vscode.commands.registerCommand('copy-code-location.copyLocation', async () => {
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
      return;
    }

    const selection = editor.selection;
    const document = editor.document;

    if (selection.isEmpty) {
      return;
    }

    const workspaces = vscode.workspace.workspaceFolders;
    let relativePath = document.fileName;

    if (workspaces && workspaces.length > 0) {
      const workspaceUri = workspaces[0].uri;
      const workspacePath = workspaceUri.fsPath;
      if (document.fileName.startsWith(workspacePath)) {
        relativePath = document.fileName.substring(workspacePath.length + 1);
      }
    }

    const startLine = selection.start.line + 1;
    const endLine = selection.end.line + 1;

    const location = `@${relativePath}#L${startLine}-${endLine}`;

    await vscode.env.clipboard.writeText(location);
    vscode.window.setStatusBarMessage(`Copied: ${location}`, 3000);
  });

  context.subscriptions.push(disposable);
}

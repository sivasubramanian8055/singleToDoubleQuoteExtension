const {
    Console
} = require('console');
const vscode = require('vscode');
const fs =require('fs')
/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
    let disposable = vscode.commands.registerCommand('singleToDoubleQoutes.helloWorld', function () {
        const activeTextEditor = vscode.window.activeTextEditor;
        if (activeTextEditor) {
            const document = activeTextEditor.document;
            activeTextEditor.edit(editBuilder => {
                let firstLine = document.lineAt(0);
                let lastLine = document.lineAt(document.lineCount - 1);
                let textRange = new vscode.Range(firstLine.range.start, lastLine.range.end);
                let textDoc = document.getText(textRange);
                let singleToDoubleQoutesText = textDoc.split('\'').join('"');
                editBuilder.replace(textRange, singleToDoubleQoutesText);
            })
        }
        if (vscode.workspace.workspaceFolders !== undefined) {
            let f = vscode.workspace.workspaceFolders[0].uri.fsPath;
            debugger
            fs.readFile(`${f}/package.json`, "utf8", (err, jsonString) => {
                if (err) {
                    console.log("File read failed:", err);
                    return;
                }
                const packageJson = JSON.parse(jsonString)
                packageJson['vsComments'] = {
                    "body": "body"
                }
                vscode.window.showInformationMessage('Hello World!');
                fs.writeFileSync(`${f}/package.json`, JSON.stringify(packageJson))
            });
        }
    });

    context.subscriptions.push(disposable);
}

function deactivate() {}

module.exports = {
    activate,
    deactivate
}
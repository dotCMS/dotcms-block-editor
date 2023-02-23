import { Extension } from '@tiptap/core';
import { Plugin, PluginKey } from 'prosemirror-state'
import { CustomPluginView } from './custom-plugin';


export const CustomExtension = Extension.create({
    name: 'customExtension',

    addOptions() {
        return {
            element: null,
            pluginKey: "",
        }
    },

    addProseMirrorPlugins() {
        const button = document.createElement("button");
        button.innerText = "Add";
        button.style.position = 'absolute';
        button.style.top = '-50px';
        button.style.left = '-33px';
        button.style.border = '0';
        button.style.padding = '5px';

        button.onclick = () => this.editor.commands.addHelloWorld();
        return [
            CustomPlugin({
                pluginKey: this.options.pluginKey,
                editor: this.editor,
                element: button,
            }),
        ]
    },
})

export const CustomPlugin = (options: any) => {
    return new Plugin({
        key: typeof options.pluginKey === 'string'
            ? new PluginKey(options.pluginKey)
            : options.pluginKey,
         view: view => new CustomPluginView({ view, ...options }),
    })
}

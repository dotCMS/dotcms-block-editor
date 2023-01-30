import { mergeAttributes, Node } from '@tiptap/core';

declare module "@tiptap/core" {
    interface Commands<ReturnType> {
        CustomNode: {
            addHelloWorld: () => ReturnType;
        };
    }
}

export const CustomNode = Node.create({
    name: 'helloWorld',

    addAttributes() {
        return {};
    },

    parseHTML() {
        return [
            {
                tag: 'video'
            }
        ];
    },

    addOptions() {
        return {
            inline: false
        };
    },

    inline() {
        return this.options.inline;
    },

    group() {
        return 'block';
    },

    addCommands() {
        return {
            addHelloWorld: () => ({ commands }: any) => {
                return  commands.insertContent({ type: this.name });
            }
        }
    },

    addNodeView() {
        return () => {
            const dom = document.createElement('div');
            dom.contentEditable = 'false';

            // Styles
            dom.style.padding = '4px';
            dom.style.background = "#f9dc5c";
            dom.style.borderRadius = '5px'
            dom.style.border = '2px solid #333'

            const label = document.createElement('label');

            label.innerHTML = 'Hello World';
            label.contentEditable = 'false';
            
            // Styles
            label.style.fontWeight = 'bold';
            label.style.fontSize = '25px';
            label.style.paddingBottom = '10px';

            dom.append(label);

            return { dom };
        };
    }
});
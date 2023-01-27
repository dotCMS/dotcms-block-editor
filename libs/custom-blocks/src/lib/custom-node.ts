import { mergeAttributes, Node } from '@tiptap/core';

export const CustomNode = Node.create({
    name: 'helloWorld',

    group: 'block',

    content: 'inline',

    parseHTML() {
        return [
            {
                tag: 'hellow-world'
            }
        ];
    },

    renderHTML({ HTMLAttributes }) {
        return ['hellow-world', mergeAttributes(HTMLAttributes), 0];
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
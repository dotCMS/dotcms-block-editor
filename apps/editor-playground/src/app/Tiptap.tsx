// src/Tiptap.jsx
import { useEditor, EditorContent } from '@tiptap/react'

import StarterKit from '@tiptap/starter-kit'
import { CustomNode, CustomExtension, HighlightCustom } from '@dotcms-block-editor/custom-blocks'

const Tiptap = () => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      CustomNode,
      CustomExtension,
      HighlightCustom
    ],
    content: `
      <p>This is content.</p>
      <p>And this.</p>
    `,
  })

  return (
    <div className="editor-container">

      <button
        onClick={() => editor?.chain().focus().toggleHighlight().run()}
      >
        Toggle Highlight: {editor?.isActive('italic') ? 'On' : 'Off'}
      </button>

      <EditorContent editor={editor} />
    </div>
  )
}

export default Tiptap
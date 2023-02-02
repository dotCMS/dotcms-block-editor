// src/Tiptap.jsx
import { useEditor, EditorContent } from '@tiptap/react'

import StarterKit from '@tiptap/starter-kit'
import { CustomNode, CustomExtension, ItalicCustom } from '@dotcms-block-editor/custom-blocks'

const Tiptap = () => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      CustomNode,
      CustomExtension,
      ItalicCustom
    ],
    content: `
      <p><em>This is italic.</em></p>
      <p><i>And this.</i></p>
    `,
  })

  return (
    <div className="editor-container">

      <button
        onClick={() => editor?.chain().focus().toggleItalic().run()}
        className={editor?.isActive('italic') ? 'is-active' : ''}
      >
        Toggle Italic
      </button>

      <EditorContent editor={editor} />
    </div>
  )
}

export default Tiptap
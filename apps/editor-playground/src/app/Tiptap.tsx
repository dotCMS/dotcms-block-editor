// src/Tiptap.jsx
import { useEditor, EditorContent } from '@tiptap/react'

import StarterKit from '@tiptap/starter-kit'
import { CustomNode, CustomExtension } from '@dotcms-block-editor/custom-blocks'


const Tiptap = () => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      CustomNode,
      CustomExtension
    ],
  })

  return (
    <div className="editor-container">
      <EditorContent editor={editor} />
    </div>
  )
}

export default Tiptap
import {
    Mark,
    markInputRule,
    markPasteRule,
    mergeAttributes,
  } from '@tiptap/core'
  
  export interface HighlightOptions {
    HTMLAttributes: Record<string, any>,
  }
  
  declare module '@tiptap/core' {
    interface Commands<ReturnType> {
      highlightCustom: {
        /**
         * Set an italic mark
         */
        setHighlight: () => ReturnType,
        /**
         * Toggle an italic mark
         */
        toggleHighlight: () => ReturnType,
        /**
         * Unset an italic mark
         */
        unsetHighlight: () => ReturnType,
      }
    }
  }
  
  export const starInputRegex = /(?:^|\s)((?:\*)((?:[^*]+))(?:\*))$/
  export const starPasteRegex = /(?:^|\s)((?:\*)((?:[^*]+))(?:\*))/g
  export const underscoreInputRegex = /(?:^|\s)((?:_)((?:[^_]+))(?:_))$/
  export const underscorePasteRegex = /(?:^|\s)((?:_)((?:[^_]+))(?:_))/g
  
  export const HighlightCustom = Mark.create<HighlightOptions>({
    name: 'highlightCustom',
  
    addOptions() {
      return {
        HTMLAttributes: {
          style: `background-color: #FFFF00; padding: 5px;`,
        },
      }
    },
  
    renderHTML({ HTMLAttributes }) {
      return ['span', mergeAttributes(this.options.HTMLAttributes, HTMLAttributes), 0]
    },
  
    addCommands() {
      return {
        setHighlight: () => ({ commands }) => {
          return commands.setMark(this.name)
        },
        toggleHighlight: () => ({ commands }) => {
          return commands.toggleMark(this.name)
        },
        unsetHighlight: () => ({ commands }) => {
          return commands.unsetMark(this.name)
        },
      }
    },
  
    addKeyboardShortcuts() {
      return {
        'Mod-i': () => this.editor.commands.toggleHighlight(),
        'Mod-I': () => this.editor.commands.toggleHighlight(),
      }
    },
  
    addInputRules() {
      return [
        markInputRule({
          find: starInputRegex,
          type: this.type,
        }),
        markInputRule({
          find: underscoreInputRegex,
          type: this.type,
        }),
      ]
    },
  
    addPasteRules() {
      return [
        markPasteRule({
          find: starPasteRegex,
          type: this.type,
        }),
        markPasteRule({
          find: underscorePasteRegex,
          type: this.type,
        }),
      ]
    },
  })
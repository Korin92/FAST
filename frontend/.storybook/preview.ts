import type { Preview } from '@storybook/react'
import { mswDecorator } from 'msw-storybook-addon'

const preview: Preview = {
  parameters: {
    decorators: [mswDecorator],
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
}

export default preview

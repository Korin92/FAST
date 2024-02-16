import type { Meta, StoryObj } from '@storybook/react'

import { DotLoader } from './DotLoader'

const meta = {
  title: 'Loaders/DotLoader',
  component: DotLoader,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} satisfies Meta<typeof DotLoader>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    backgroundColor: '#2FA0EC',
  },
}

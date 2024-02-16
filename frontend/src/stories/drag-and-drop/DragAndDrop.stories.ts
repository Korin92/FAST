import type { Meta, StoryObj } from '@storybook/react'

import { DragAndDrop } from './DragAndDrop'

const meta = {
  title: 'Drag and drops/DragAndDrop',
  component: DragAndDrop,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    buttonColor: { control: 'color' },
  },
} satisfies Meta<typeof DragAndDrop>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    buttonColor: '#2FA0EC',
  },
}

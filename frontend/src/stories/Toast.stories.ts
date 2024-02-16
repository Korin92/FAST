import type { Meta, StoryObj } from '@storybook/react'
import { Toast } from './Toast'

const meta = {
  title: 'Example/Toast',
  component: Toast,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof Toast>

export default meta
type Story = StoryObj<typeof meta>

export const Template: Story = {
  args: {
    type: 'success',
    message: 'Success!',
  },
}

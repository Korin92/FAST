import type { Meta, StoryObj } from '@storybook/react'

import { Login } from './Login'

const meta = {
  title: 'Pages/Login',
  component: Login,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof Login>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {},
}

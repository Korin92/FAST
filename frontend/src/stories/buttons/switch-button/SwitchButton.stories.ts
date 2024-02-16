import type { Meta, StoryObj } from '@storybook/react'

import { SwitchButton } from './SwitchButton'

const meta = {
  title: 'Buttons/SwitchButton',
  component: SwitchButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    colorChecked: { control: 'color' },
    colorUnChecked: { control: 'color' },
    colorCircleFront: { control: 'color' },
    colorCircleBack: { control: 'color' },
  },
} satisfies Meta<typeof SwitchButton>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    colorChecked: 'rgba(47,160,236,0.18)',
    colorUnChecked: '#2FA0EC',
    colorCircleFront: '#bd2a2a',
    colorCircleBack: '#3bf407',
  },
}
